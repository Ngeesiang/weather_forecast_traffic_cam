import { List, Divider, Anchor } from 'antd';
import LocationComponent from '../LocationComponent'
import moment from 'moment';
import 'moment-timezone';
import React, { useEffect, useState } from 'react';


export default function LocationListComponent(props) {

    moment.tz.setDefault("Asia/Singapore");
    console.log("In LocationListComponent");

    const [ cameraData, setData] = useState(null)
    const [ geoCodingData, setGeoCodeData ] = useState(null)
    const [ isLoaded, setLoaded ] = useState(false)

    useEffect(() => {
        console.log("Use effect")
        if (isLoaded === false) {
            const dateInput = moment(props.date.date).format('YYYY-MM-DD[T]HH:mm:ss')
            console.log(dateInput)
            console.log("Preparing to retrieve info")
            await retrieveInfo(dateInput)
            await retrieveGeocodingInfo(dateInput)

            console.log("Retrieving Info")
        } else {
            console.log("Info retrieved")
            console.log("data: ")
            console.log(data.data)
        }
    })

    const handleClick = (e, link) => {
        e.preventDefault();
        console.log(link);
      };

    function retrieveCameraInfo (date) {
        fetch(`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${dateInput}`, {
            method: "GET",
        })
          .then(res => res.json())
          .then(result => {
                console.log("Results")
                console.log(result)
                setData({
                data: result.items[0].cameras
                });
                setLoaded({
                isLoaded: true
                })
            },
            (error) => {
                console.log("Error in retrieveInfo")
            }
          )
      }

      function retrieveGeocodingInfo (date) {
        fetch(`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${dateInput}`, {
            method: "GET",
        })
          .then(res => res.json())
          .then(result => {
                console.log("Results")
                console.log(result)
                setData({
                data: result.items[0].cameras
                });
                setLoaded({
                isLoaded: true
                })
            },
            (error) => {
                console.log("Error in retrieveInfo")
            }
          )
      }
    
    return (
        <>
        <Divider></Divider>
        <Divider orientation="center">List of Locations</Divider>
        <Anchor affix={false} onClick={handleClick}>
            { data ? <List
                size="large"
                bordered
                dataSource={data.data}
                renderItem={item => 
                <List.Item>
                    <LocationComponent location={item.location}/>
                </List.Item>}
            /> : null
            }
            
        </Anchor>
            
        </>
    ) 
}