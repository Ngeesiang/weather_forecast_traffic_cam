import './App.css';

import DateInput from './components/DateInput';
import LocationListComponent from './components/LocationListComponent';

function App() {

  const state = { dateInput: false, date: '' }

  function setState(props) {
    const key = props.key
    const value = props.value
    state[key] = value
  }

  function handleClick(value) {
    setState({dateInput: value});
    console.log("Parent block updated")
  }

  function updateDate(date) {
    setState({datetime: date});
    console.log("Date in parent block updated")
  }

  return (
  <div className="App">
     <header className="App-header">
      <DateInput value={handleClick} date={updateDate}/>
      <LocationListComponent/>
    </header>
  </div>
  );
}

export default App;
