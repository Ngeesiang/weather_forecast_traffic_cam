import "./App.css";
import React, { useState, useEffect } from "react";

import DateInput from "./components/DateInput";
import LocationListComponent from "./components/LocationListComponent";

function App() {
  const [date, setDate] = useState(null);

  useEffect(() => {});

  function handleClick(value) {
    setDate(value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <DateInput value={handleClick} />
        {date ? <LocationListComponent date={date} /> : null}
      </header>
    </div>
  );
}

export default App;
