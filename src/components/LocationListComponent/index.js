import { List, Divider, Avatar } from "antd";
import LocationComponent from "../LocationComponent";
import moment from "moment";
import "moment-timezone";
import React from "react";
import { DownloadOutlined } from '@ant-design/icons'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


function mapArea(latitudeInput, longitudeInput, geoCodingData) {
  let area;
  let diff = Number.MAX_SAFE_INTEGER
  geoCodingData.forEach(element => {
    const { latitude, longitude } = element.label_location
    if ((Math.abs(latitudeInput-latitude) + Math.abs(longitudeInput-longitude)) < diff) {
      diff = Math.abs(latitudeInput-latitude) + Math.abs(longitudeInput-longitude)
      area = element.name
    }
  })
  
  return area
}

function mapWeather(area, weatherForecastData) {
  for (var i=0; i < weatherForecastData.length; i++) {
    if (weatherForecastData[i].area === area) {
      return weatherForecastData[i].forecast
    }
  }
}


export default function LocationListComponent(props) {
  moment.tz.setDefault("Asia/Singapore");
  console.log("In LocationListComponent");

  const [ cameraData, setCameraData ] = React.useState(null)
  const [ geoCodingData, setGeoCoding ] = React.useState(null)
  const [ weatherForecastData, setWeatherForecastData ] = React.useState(null)
  const [ loadedState, setLoadedState ] = React.useState(false)
  const [ data, setData ] = React.useState([])

  React.useEffect(() => {
      console.log("Preparing to retrieve info");
      async function fetchData() {
        const cam = await retrieveCameraInfo(moment(props.date).format("YYYY-MM-DD[T]HH:mm:ss"))
        setCameraData(cam)
        console.log(cam)
        const [meta, fc] = await retrieveGeocodingInfo(moment(props.date).format("YYYY-MM-DD[T]HH:mm:ss"))
        setGeoCoding(meta)
        setWeatherForecastData(fc)
        console.log(meta)
        console.log(fc)
        console.log("Info retrieved")
        setLoadedState(true)
      }
      fetchData()
    }, [loadedState]);

  const handleClick = (e, link) => {
    e.preventDefault();
    console.log(link);
  };

 async function retrieveCameraInfo(date) {
   return await fetch(
      `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${date}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("Camera results");
          console.log(result);
          return result.items[0].cameras
        },
        (error) => {
          console.log("Error in retrieveCameraInfo");
        }
      );
  }

 async function retrieveGeocodingInfo(date) {
     return await fetch(
      `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${date}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log("Geocoding results");
          // console.log(result);
          const metadata = result.area_metadata
          const forecast = result.items[0].forecasts
          setGeoCoding(metadata)
          setWeatherForecastData(forecast)
          return [metadata, forecast]
        },
        (error) => {
          console.log("Error in retrieveGeoCodingInfo");
        }
      );
  }

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <>
      <Divider>Locations</Divider>
        { loadedState ? null : <Spin indicator={antIcon} /> }
        { loadedState ? 
        <List
          className="LocationListComponent-List"
          itemLayout="horizontal"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={cameraData}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="/cctv.jpg" />}
                title={<a href={item.image}>Camera{item.camera_id}</a>}
                description={mapArea(item.location.latitude, item.location.longitude, geoCodingData)} 
              />
              <DownloadOutlined twoToneColor="#eb2f96"/>
            </List.Item>
          )}
        /> : null }
      <Divider></Divider>
    </>
  );
}
