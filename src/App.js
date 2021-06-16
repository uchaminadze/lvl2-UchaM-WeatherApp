
import './App.css';
import FetchWeather from './current-day/currentDay';
import EightDay from './eight-day/eightDay';
import Form from './form/form';


function App() {
  return (
    <div className="App">
      <Form />
        <div className="content">
        <FetchWeather/>
        <EightDay/>
      </div>
    </div>
  );
}

export default App;
