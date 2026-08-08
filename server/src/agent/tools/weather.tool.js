export async function  getWeather({ location }) {
  try {
    if (!location) {
      return {
        success: false,
        error: "Location is required.",
      };
    }

    // --------------------------------------------------
    // STEP 1: Convert city name → latitude/longitude
    // --------------------------------------------------

    const geoUrl =
      `https://geocoding-api.open-meteo.com/v1/search` +
      `?name=${encodeURIComponent(location)}` +
      `&count=1` +
      `&language=en` +
      `&format=json`;

    const geoResponse = await fetch(geoUrl);

    if (!geoResponse.ok) {
      throw new Error("Failed to find location.");
    }

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      return {
        success: false,
        error: `Could not find location: ${location}`,
      };
    }

    const place = geoData.results[0];

    // --------------------------------------------------
    // STEP 2: Get weather
    // --------------------------------------------------

    const weatherUrl =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${place.latitude}` +
      `&longitude=${place.longitude}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
      `&timezone=auto`;

    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data.");
    }

    const weatherData = await weatherResponse.json();

    const current = weatherData.current;

    return {
      success: true,

      location: {
        name: place.name,
        country: place.country,
        latitude: place.latitude,
        longitude: place.longitude,
      },

      weather: {
        temperature: current.temperature_2m,
        feelsLike: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        precipitation: current.precipitation,
        windSpeed: current.wind_speed_10m,
        weatherCode: current.weather_code,
        time: current.time,
      },

      units: {
        temperature: weatherData.current_units?.temperature_2m,
        humidity: weatherData.current_units?.relative_humidity_2m,
        windSpeed: weatherData.current_units?.wind_speed_10m,
      },
    };
  } catch (error) {
    console.error("Weather Tool Error:", error);

    return {
      success: false,
      error: "Unable to fetch weather information.",
    };
  }
}