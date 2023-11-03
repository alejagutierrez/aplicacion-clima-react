import { useState } from "react"


export const WeatherApp = () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'bd47b3c79ad0ca777552bc4ea0d18345'
    const difKelvin = 273.15
    const [ciudad, setCiudad] = useState('')

    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) =>{
        setCiudad(e.target.value)
    }

    const handleOnsubmit = (e)=>{
        e.preventDefault()
        console.log(ciudad)
        if(ciudad.length > 0) fetchClima()
    }

    const fetchClima = async() =>{
        try {
           
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()  
            setDataClima(data)
            console.log(dataClima)
           
        } catch(error) {
            console.error('Ocurrió el siguiente problema; ', error)
        }
    }

  return (
    <>
    <div className="container">
        <h1>Aplicación de Clima</h1>
        <form onSubmit={handleOnsubmit}>
            <input 
                type="text"
                name="input-buscar"
                value={ciudad}
                onChange={handleCambioCiudad}
            />
            <button type="submit">Buscar</button>
        </form>

        {
            dataClima && (
                <div>
                    <h2>{dataClima.name}</h2>
                    <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)} °C</p>
                    <p>Condición Meteorológica: {dataClima.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="" />
                </div>
            )
        }
    </div>
    </>
  )
}
