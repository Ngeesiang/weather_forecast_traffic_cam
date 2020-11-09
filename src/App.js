import './App.css';

import DateInput from './components/DateInput';
import LocationComponent from './components/LocationComponent';

function App() {
  return (
  <div className="App">
     <header className="App-header">
      <DateInput/>
      <LocationComponent/>
    </header>
  </div>
  );
}

export default App;
