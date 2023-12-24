import { useState, useEffect, useRef } from "react";

function App(){
const [place, setPlace] = useState('London')
 const[data, setData] = useState();
  const[loading, setLoading] = useState(true);
    const[cityNotFound, setCityNotoFound] = useState(false);
   const location = useRef(null);  

const key = '8e024bb739704c6281d182243232312'
 const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${place}&aqi=no`
  
useEffect(() => {
 setLoading(true);
  setCityNotoFound(false);

  fetch(url)
  .then(data => data.json())
  .then(res => {
    if (res.error) {
      setCityNotoFound(true);
    } else {
      setData(res);
    }
    setLoading(false);
  })
  .catch(err => {
    console.error(err);
    setCityNotoFound(true); 
    setLoading(false);
  });

}, [place, url]);

function searchCity(e) {
  e.preventDefault();
    setPlace(location.current.value);
}

  return(
    <>
     <h1 className="title">Weather</h1>

       <form onSubmit={searchCity}>
     <input type="text" placeholder="enter city" ref={location} autoComplete="on" />
        </form>
      
      <main className="cart">
           {
            loading ? (
              <div className="spinner" />
            ) : cityNotFound ? (
              <h1>City not found</h1>
            ) : (
               <>
                  <h1> {data.location.name}, <small> {data.location.country} </small> </h1>
                <h2>temperature: {data.current.temp_c.toFixed(1)}°</h2>
                  
                  <h3>Weather: {data.current.condition.text}</h3>
              <h3>Wind speed: {(data.current.wind_mph / 10).toFixed(2)}km/h</h3>
               <img src={data.current.condition.icon} alt="weather" className="weather-icon" />  
                   
              </>
            )
           } 
         </main>
     </>
  )
}

export default App;