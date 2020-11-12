import "./App.css";
import React from "react";

import DateInput from "./components/DateInput";
import LocationListComponent from "./components/LocationListComponent";
import Layout, { Content } from "antd/lib/layout/layout";

function App(props) {
  const [date, setDate] = React.useState(null);
  const [appWidth, setAppWidth] = React.useState(props.width);

  React.useEffect(() => {}, [date]);

  const width = props.width;

  function handleClick(value) {
    setDate(value);
  }

  return (
    <div className="App">
      <Layout>
        <Content className="App-content">
          <DateInput value={handleClick} />
          {date ? (
            <LocationListComponent
              className="ListComponent"
              date={date}
              width={width}
              key={date}
            />
          ) : null}
        </Content>
      </Layout>
    </div>
  );
}

export default App;
