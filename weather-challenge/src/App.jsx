import { useEffect, useState } from 'react'

import axios from "axios"


import './App.css'

function App() {
  let [countryName, setCountryName] = useState("Baku")
  let [weatherArr, setWeatherArr] = useState({})
 function getData() {
   axios.get(`https://api.weatherapi.com/v1/current.json?key=7b1eaf6efd804a44b87101529222212&q=${countryName}&aqi=no`)
     .then(result=>{
      setWeatherArr(result.data);
     })
    
  }
  useEffect(() => {
    getData()
   
  },[])
  function handleChange(inputValue){
    setCountryName(inputValue)
  }
  function handleSubmit(e) {
    e.preventDefault()
    if(countryName.trim()!=""){
      getData()
  
    }else{
      alert("empty input")
    }
  }

  return (
    <>
      <div className='weather-wrapper'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input value={countryName} onChange={(e) => handleChange(e.target.value)} type="text" />
          <button type='submit'>Get ForeCast</button>
        </form>
        <div className="desc">
          <h3>{weatherArr.location?.name}</h3>
          <div className="icon"> <img src={weatherArr.current?.condition?.icon} alt="" /> </div>
          <span>{weatherArr.current?.condition?.text}</span>
          <span>{weatherArr.current?.temp_c}</span>
          <span>{weatherArr.current?.temp_f}</span>
          <div className="desc-foot">
            <span>Wind {weatherArr.current?.wind_mph} mph</span>
            <span>Visibility {weatherArr.current?.vis_miles} miles</span>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
