import React, { useState } from 'react';
import "./index.css"
const api = {
	key: "fc1c0f82a8346069c4e4714365c412e6",
	base : "https://api.openweathermap.org/data/2.5/"
}
function App() {
	const [inputValue, setInputValue] = useState('')
	const [weather, setWeather] = useState({})
	const search = e =>{
		if(e.key === "Enter"){
		fetch(`${api.base}weather?q=${inputValue}&units=metric&APPID=${api.key}`)
		.then(res => res.json())
		.then(data =>{
			setWeather(data)
			setInputValue('')
			console.log(data)
		})
	}
}
	const getTime = ()=>{
		let date = String(new window.Date())
		date = date.slice(3,15)
		return date
	}
	const cels = (cel)=>{
		return Math.floor(cel)
	}
	const farenhite = (cel)=>{
		return Math.floor((cel * 1.8) + 32)
	}
	
	return (
		<div>
		<div className = "weather">Weather Status</div>
		<div className = "city">Enter City or Country Name</div>
			<input type = "text" className = "input" value = {inputValue} onChange = {e=>setInputValue(e.target.value)} onKeyPress= {search}/>
			<button onClick = {search}>Search</button>
			{(typeof weather.main != "undefined") ? (
			<div className = "container">
				<div className = "city">
					<div className = "cityname">{weather.name}, {weather.sys.country}</div>
					<div className = "time">{getTime()}</div>
				</div>
				<div className = "cityStatus">

					{(weather.main.temp > 15) ? (
						<div className = "temp">
						<div className = "tem">{cels(weather.main.temp)} °C</div>
						<div className = "fer">{farenhite(weather.main.temp)} °F</div>
						</div>
					)
					: (
					<div className = "tempC">
						<div className = "tem">{cels(weather.main.temp)} °C</div>
						<div className = "fer">{farenhite(weather.main.temp)} °F</div>
					</div>
					)}

					
					<div className = "status">{weather.weather[0].description}</div>
				</div>
			</div>
		): (
			<div>
				<h3>Try full name e.g. united states or united kingdom (not US or UK)</h3>
				<h4>Search key is not Case Sensitive</h4>
			</div>
		)}
		</div>
	)
}
export default App
