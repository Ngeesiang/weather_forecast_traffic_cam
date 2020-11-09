import React from 'react'
import { Card , Button, message} from 'antd';

const { Meta } = Card;


export default function TimeInput({name1, name2}){
    const [count, setCount] = React.useState(0)

    React.useEffect(()=>{
        message.info("loaded")
    }, [])

    React.useEffect(()=>{
        message.info("this is a check")
    }, [count])

    const clickMe = ()=>{
        setCount(count+1)
    }

    return (
        <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
    <Button onClick={clickMe}>Click me {count}</Button>
  </Card>
        )
}