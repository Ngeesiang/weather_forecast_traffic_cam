import { Button, DatePicker, Space, message } from 'antd';

export default function DateInput(props) {

    let dateInput;

    function onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        dateInput = dateString;
      }
      
    function onOk(value) {
        console.log('onOk: ', value);
        console.log("dateInput: " + dateInput)
      }

    function loadLocationList() {
        if (dateInput == null) {
            message.info('Please enter a date!');
        }
        else {
            console.log(`Load location list at time: ${dateInput}`)
            props.value(dateInput)
            message.info('Location list loaded!');
        }
    }
    
    return (
        <Space direction="vertical" size={12}>  
            <DatePicker showTime onChange={onChange} onOk={onOk} />
            <Button onClick={loadLocationList}>Load locations</Button>
        </Space>
    )
    
}