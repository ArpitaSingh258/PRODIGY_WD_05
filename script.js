const apiKey = "634a67f3de0a1d62d92f82ac4b4f08da";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherBox = document.getElementById("weatherBox");

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message || "City not found");
    }

    document.getElementById("city").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temp").textContent = `🌡️ ${data.main.temp} °C`;
    document.getElementById("desc").textContent = `📝 ${data.weather[0].description}`;
    document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherBox.style.display = "block";
  } catch (error) {
    alert("Error: " + error.message);
    weatherBox.style.display = "none";
  }
}