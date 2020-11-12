import { Button, DatePicker, Space, message } from "antd";
import React from "react";

export default function DateInput(props) {
  const [dateInput, setDateInput] = React.useState(null);

  React.useEffect(() => {}, [dateInput]);

  function onChange(value, dateString) {
    setDateInput(dateString);
  }

  function onOk(value) {}

  function loadLocationList() {
    if (dateInput === null) {
      message.info("Please enter a date!");
    } else {
      props.value(dateInput);
    }
  }

  return (
    <Space direction="vertical" size={12}>
      <DatePicker
        className="DatePicker"
        showTime
        onChange={onChange}
        onOk={onOk}
        placeholderText="Choose a date"
      />
      <Button onClick={loadLocationList}>Load locations</Button>
    </Space>
  );
}
