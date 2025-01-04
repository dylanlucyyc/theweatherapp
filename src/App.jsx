import Header from "./components/Header";
import Footer from "./components/Footer";
import WeatherDisplay from "./components/WeatherDisplay";
import InputForm from "./components/InputForm";
import { useEffect, useState } from "react";
export default function App() {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
  const apiUrl = import.meta.env.VITE_OPEN_WEATHER_MAP_API_URL;

  const [error, setError] = useState("");
  const [city, setCity] = useState("Calgary");
  const [displayData, setDisplayData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `${apiUrl}?q=${city}&APPID=${apiKey}&units=metric`
        );
        if (!res.ok) {
          throw Error("Something is wrong with fetching data");
        }
        const data = await res.json();
        setDisplayData(data);
      } catch (error) {
        setError(error.message || "An unknown error occurred");
        setDisplayData(); // Reset displayData on error
      } finally {
        setLoading(false); // Ensure loading is stopped
      }
    }

    fetchData();
  }, [city, apiUrl, apiKey]);

  return (
    <>
      <Header></Header>
      <WeatherDisplay displayData={displayData} error={error} loading={loading}>
        <InputForm setCity={setCity}></InputForm>
      </WeatherDisplay>
      <Footer></Footer>
    </>
  );
}
