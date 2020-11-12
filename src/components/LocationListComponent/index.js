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

  const [cameraData, setCameraData] = React.useState(null);
  const [geoCodingData, setGeoCoding] = React.useState(null);
  const [weatherForecastData, setWeatherForecastData] = React.useState(null);
  const [loadedState, setLoadedState] = React.useState(false);
  const [filters, setFilters] = React.useState([]);
  const width = props.width;

  React.useEffect(() => {
    async function fetchData() {
      const cam = await retrieveCameraInfo(
        moment(props.date).format("YYYY-MM-DD[T]HH:mm:ss")
      );
      const [meta, fc] = await retrieveGeocodingInfo(
        moment(props.date).format("YYYY-MM-DD[T]HH:mm:ss")
      );
      cam.map((e, index) => {
        const area = mapArea(e.location.latitude, e.location.longitude, meta);
        e.timestamp = moment(e.timestamp).format(
          "dddd, MMMM Do YYYY, h:mm:ss a"
        );
        e.location = area;
        e.weather = mapWeather(area, fc);
        e.key = index + 1;
      });
      setCameraData(cam);
      setGeoCoding(meta);
      setWeatherForecastData(fc);
      setLoadedState(true);
    }
    fetchData();
    if (
      loadedState &&
      (cameraData.length === 0 ||
        geoCodingData.length === 0 ||
        weatherForecastData.length === 0)
    ) {
      message.error("Time period chosen has no data available");
    } else if (loadedState) {
      let filter = [];
      geoCodingData.forEach((element) => {
        const filterValue = {
          text: element.name,
          value: element.name,
        };
        filter.push(filterValue);
      });
      setFilters(filter);
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
      .then(({ items }) => {
        if (items[0].cameras === undefined) return [];
        return items[0].cameras;
      })
      .catch((error) => {
        throw new Error("Error in retrieveCameraInfo");
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
        if (result.area_metadata === 0) return [[], []];
        const metadata = result.area_metadata;
        const forecast = result.items[0].forecasts;
        setGeoCoding(metadata);
        setWeatherForecastData(forecast);
        return [metadata, forecast];
      })
      .catch((error) => {
        throw new Error("Error in retrieveGeocodingInfo");
      });
  }

  const columns = [
    {
      title: "CameraId",
      dataIndex: "camera_id",
      defaultSortOrder: "ascend",
      align: "center",
      sorter: (a, b) => a.camera_id - b.camera_id,
    },
    {
      title: "Area",
      dataIndex: "location",
      defaultSortOrder: "ascend",
      align: "center",
      sorter: (a, b) => a.location.localeCompare(b.location),
      filters: filters,
      onFilter: (value, record) => record.location === value,
    },
    {
      title: "Download",
      key: "image-url",
      align: "center",
      justify: "space-around",
      render: (record) => (
        <Space className="space-align-container">
          <Button
            align="center"
            icon={<DownloadOutlined />}
            href={record.image}
          />
        </Space>
      ),
    },
  ];

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <>
      <Divider>Locations</Divider>
      {loadedState ? null : <Spin indicator={antIcon} />}
      <Table
        justify="space-around"
        align="middle"
        className="components-table-demo-nested"
        width={width}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <ImageComponent
              className="Location-ImageComponent"
              item={record}
              width={width}
            />
          ),
        }}
        dataSource={cameraData}
      />
      <Divider></Divider>
    </>
  );
}
