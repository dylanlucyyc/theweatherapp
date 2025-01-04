function WeatherDisplay({ children, displayData, error, loading }) {
  return (
    <>
      {children}
      {loading ? (
        "Loading..."
      ) : displayData ? (
        <div>
          <h2>{displayData.name}</h2>
          <p>Feel like: {displayData.main.feels_like}°C</p>
          <p>Temperature: {displayData.main.temp}°C</p>
          <p>Max Temperature: {displayData.main.temp_max}°C</p>
          <p>Min Temperature: {displayData.main.temp_min}°C</p>
        </div>
      ) : (
        <p className="text-red-700">{error}</p>
      )}
    </>
  );
}

export default WeatherDisplay;
