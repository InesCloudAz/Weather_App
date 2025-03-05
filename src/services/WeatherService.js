
const API_KEY = "c9f5d00eb280e5c6317c743c8fcfec26"; 

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm&units=metric&appid=${API_KEY}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error("Error fetching data:", error));
