import React from 'react';

import {Button} from 'antd';

export default function DateInput(){
    // const n
    // for (var i)

    const [count, setCount] = React.useState(0)
    const clickButton = ()=>{
        setCount(count + 1)
    }


    return (
        <div> 
            `I am the date input`, {count}
            <Button onClick={clickButton} type='primary'>Click me </Button>
        </div>
    )
}