import globalImage from './assets/globalImage.png';
import './App.css';
import Map from './Map';

function App() {

  return (
    <>
      
      <h1>Hello world</h1>
      <img src={globalImage} alt="Global" className="global-image" />
      
      <Map />
    </>
  );
}

export default App;
