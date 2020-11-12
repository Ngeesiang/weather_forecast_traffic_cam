import { Divider, message, Table, Space, Button } from "antd";
import moment from "moment";
import "moment-timezone";
import React from "react";
import { Spin } from "antd";
import { LoadingOutlined, DownloadOutlined } from "@ant-design/icons";
import ImageComponent from "../ImageComponent/";

function mapArea(latitudeInput, longitudeInput, geoCodingData) {
  let area;
  let diff = Number.MAX_SAFE_INTEGER;
  geoCodingData.forEach((element) => {
    const { latitude, longitude } = element.label_location;
    if (
      Math.abs(latitudeInput - latitude) +
        Math.abs(longitudeInput - longitude) <
      diff
    ) {
      diff =
        Math.abs(latitudeInput - latitude) +
        Math.abs(longitudeInput - longitude);
      area = element.name;
    }
  });
  return area;
}
function mapWeather(area, weatherForecastData) {
  for (var i = 0; i < weatherForecastData.length; i++) {
    if (weatherForecastData[i].area === area) {
      return weatherForecastData[i].forecast;
    }
  }
}

export default function LocationListComponent(props) {
  moment.tz.setDefault("Asia/Singapore");
  console.log("In LocationListComponent");

  const [cameraData, setCameraData] = React.useState(null);
  const [geoCodingData, setGeoCoding] = React.useState(null);
  const [weatherForecastData, setWeatherForecastData] = React.useState(null);
  const [loadedState, setLoadedState] = React.useState(false);
  const [filters, setFilters] = React.useState([])

  React.useEffect(() => {
    console.log("Preparing to retrieve info");
    async function fetchData() {
      const cam = await retrieveCameraInfo(
        moment(props.date).format("YYYY-MM-DD[T]HH:mm:ss")
      );
      const [meta, fc] = await retrieveGeocodingInfo(
        moment(props.date).format("YYYY-MM-DD[T]HH:mm:ss")
      );
      cam.map((e, index) => {
        const area = mapArea(e.location.latitude, e.location.longitude, meta);
        e.timestamp = moment(e.timestamp).format(("dddd, MMMM Do YYYY, h:mm:ss a"))
        e.location = area;
        e.weather = mapWeather(area, fc);
        e.key = index + 1;
      });
      setCameraData(cam);
      setGeoCoding(meta);
      setWeatherForecastData(fc);
      console.log("Info retrieved");
      setLoadedState(true);
    }
    fetchData();
    if (loadedState && (cameraData.length===0|| geoCodingData.length===0 || weatherForecastData.length===0)) {
      message.error("Time period chosen has no data available")
    }
    else if (loadedState) {
      let filter = [];
      geoCodingData.forEach(element => {
        const filterValue = {
          text: element.name,
          value: element.name
        }
        filter.push(filterValue)
      })
      setFilters(filter)
    }
  }, [loadedState]);

  async function retrieveCameraInfo(date) {
    return await fetch(
      `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${date}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then(({items}) => {
        console.log('camera')
        console.log(items)
        if (items[0].cameras ===undefined) return []
        return items[0].cameras;
      })
      .catch((error) => {
        console.log("Error in retrieveCameraInfo: " + error);
      });
  }

  async function retrieveGeocodingInfo(date) {
    return await fetch(
      `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${date}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log('geocoding')
        console.log(result)
        if (result.area_metadata === 0) return [[], []]
        const metadata = result.area_metadata;
        const forecast = result.items[0].forecasts;
        setGeoCoding(metadata);
        setWeatherForecastData(forecast);
        return [metadata, forecast];
      })
      .catch((error) => {
        console.log("Error in retrieveCameraInfo: " + error);
      });
  }

  const columns = [
    {
      title: "CameraId",
      dataIndex: "camera_id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.camera_id - b.camera_id,
    },
    {
      title: "Area",
      dataIndex: "location",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.location.localeCompare(b.location),
      filters: filters,
      onFilter: (value, record) => record.location === value,
    },
    {
      title: "Image Download",
      key: "image-url",
      render: (record) => (
        <div className="space-align-container">
          <Space size="middle">
            <Button icon={<DownloadOutlined />} href={record.image}>Click to download</Button>
          </Space>
        </div>
        
      )
    }
  ];

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <>
      <Divider>Locations</Divider>
      {loadedState ? null : <Spin indicator={antIcon} />}
      <Table
        className="components-table-demo-nested"
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <ImageComponent item={record} />,
        }}
        dataSource={cameraData}
      />
      <Divider></Divider>
    </>
  );
}
