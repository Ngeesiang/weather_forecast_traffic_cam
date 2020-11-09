import { Button, DatePicker, Space } from 'antd';

export default function DateInput() {

    let date;

    function onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        date = dateString;
      }
      
    function onOk(value) {
        console.log('onOk: ', value);
      }

    function loadLocationList() {
        console.log(`Load location list at time ${date}`)
    }
    
    return (
        <Space direction="vertical" size={12}>  
            <DatePicker showTime onChange={onChange} onOk={onOk} />
            <Button onClick={loadLocationList}>Load locations</Button>
        </Space>
    )
    
}