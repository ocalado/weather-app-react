import React from 'react';
import {useState} from 'react';
import './App.css';


function App() {

  const [city, setCity] = useState(''); 
  const [weatherForecast, setWeatherForecast] = useState(null)

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  const handleSearch = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=793a6dd4624b414080f132430222006&q=${city}&lang=pt`)
    .then((response) => {
      if(response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      setWeatherForecast(data)
    });
    
  }
  return (
    <div className='app'>
      <nav className='navbar navbar-expand-md navbar-dark bg-dark mb-4'>
        <a href='#top' className='navbar-brand text-white'>
          Previsão do Tempo
        </a>
      </nav>
      <main className='container'>
        <div className='jumbotron'>
          
          <h1>Saiba como está o tempo em sua cidade!</h1>
          
          <p className='lead'>Digite o nome da sua cidade no campo abaixo e depois, clique em pesquisar.
          </p>

          <div className='row mb-4'>
            <div className='col-md-6'>
              <input onChange={handleChange} className='form-control' value={city}/>
            </div>
          </div>

          <button onClick={handleSearch} className='btn btn-primary btn-lg'>
            Pesquisar
          </button>
         { // ternário 
          weatherForecast ? (
            <div>
              <div className='mt-4 d-flex align-items-center'>
                <div>
                  <img src={weatherForecast.current.condition.icon} alt='current condition'/>
                </div>

                <div>
                  <h3>Hoje o clima dessa cidade é: {weatherForecast.current.condition.text}.</h3>
                  <p className='lead'>
                    Temperatura: {weatherForecast.current.temp_c}
                  </p>
                </div>

              </div>
            </div>
          ) : null } 
        </div> 
      </main>
    </div>
  );
}

export default App;
