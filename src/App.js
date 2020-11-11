import "./App.css";
import React from "react";

import DateInput from "./components/DateInput";
import LocationListComponent from "./components/LocationListComponent";

function App() {
  const [date, setDate] = React.useState(null);

  React.useEffect(() => {}, [date]);

  function handleClick(value) {
    setDate(value);
    console.log(value);
    console.log("App.date updated, Render LocationListComponent");
  }

  return (
    <div className="App">
      <header className="App-header">
        <DateInput value={handleClick} />
        {date ? (
          <LocationListComponent
            className="ListComponent"
            date={date}
            key={date}
          />
        ) : null}
      </header>
    </div>
  );
}

export default App;
