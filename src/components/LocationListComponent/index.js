import { List, Divider, Anchor } from "antd";
import LocationComponent from "../LocationComponent";
import moment from "moment";
import "moment-timezone";
import React, { useEffect, useState } from "react";

export default function LocationListComponent(props) {
  moment.tz.setDefault("Asia/Singapore");
  console.log("In LocationListComponent");

  let data = [];

  const [cameraData, setCameraData] = useState(null);
  const [geoCodingData, setGeoCodeData] = useState(null);
  const [weatherForecastData, setWeatherForecastData] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("Use effect");
    if (isLoaded === false) {
      const dateInput = moment(props.date).format("YYYY-MM-DD[T]HH:mm:ss");
      console.log(dateInput);
      console.log("Preparing to retrieve info");
      Promise.all([
        retrieveCameraInfo(dateInput),
        retrieveGeocodingInfo(dateInput),
      ]).then(() => {
        setLoaded({
          isLoaded: true,
        });
        console.log("Retrieving Info");
      });
    } else {
      console.log("Info retrieved");
      console.log("cameraData: ");
      console.log(cameraData);
      console.log("geoCodingData: ");
      console.log(geoCodingData);
      console.log("weatherForeCastData: ");
      console.log(weatherForecastData);
    }
  });

  const handleClick = (e, link) => {
    e.preventDefault();
    console.log(link);
  };

  function retrieveCameraInfo(date) {
    fetch(
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
          setCameraData(result.items[0].cameras);
        },
        (error) => {
          console.log("Error in retrieveCameraInfo");
        }
      );
  }

  function retrieveGeocodingInfo(date) {
    fetch(
      `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${date}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("Geocoding results");
          console.log(result);
          setGeoCodeData(result.area_metadata);
          setWeatherForecastData(result.items[0].forecasts);
        },
        (error) => {
          console.log("Error in retrieveGeoCodingInfo");
        }
      );
  }

  function mapArea(latitudeInput, longitudeInput) {
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

  function reverseGeoCoding() {

    for (var i = 0; i < cameraData.length; i++) {
      let lat = cameraData[i].location.latitude;
      let long = cameraData[i].location.longitude;
      for (var j = 0; j < geoCodingData.length; j++) {
        let label_location_lat = geoCodingData[j].label_location.latitude;
        let label_location_long = geoCodingData[j].label_location.longitude;
      }
      data.append({
        'area': mapArea(latitudeInput, longitudeInput),

      });
    }
  }

  return (
    <>
      <Divider></Divider>
      <Divider orientation="center">List of Locations</Divider>
      <Anchor affix={false} onClick={handleClick}>
        {data ? (
          <List
            size="large"
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <LocationComponent location={item.location} />
              </List.Item>
            )}
          />
        ) : null}
      </Anchor>
    </>
  );
}
