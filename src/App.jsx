import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState(null);

  const fetchLocation = async () => {
    const API_KEY = "d647b9ff3d67ee810ab7f58f80382a27"; // Replace with your ipstack API key

    try {
      // Fetch the user's IP
      const ipResponse = await axios.get("https://api64.ipify.org?format=json");
      const ip = ipResponse.data.ip;

      // Fetch location details using ipstack
      const locationResponse = await axios.get(
        `http://api.ipstack.com/${ip}?access_key=${API_KEY}`
      );

      setLocationData(locationResponse.data);
    } catch (err) {
      setError("Failed to fetch location data.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>IP Location Tracker</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {locationData ? (
        <div>
          <h2>Your Location Details:</h2>
          <p>
            <strong>IP Address:</strong> {locationData.ip}
          </p>
          <p>
            <strong>City:</strong> {locationData.city}
          </p>
          <p>
            <strong>Region:</strong> {locationData.region_name}
          </p>
          <p>
            <strong>Country:</strong> {locationData.country_name}
          </p>
          <p>
            <strong>Latitude:</strong> {locationData.latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {locationData.longitude}
          </p>
        </div>
      ) : (
        <p>Loading location data...</p>
      )}
    </div>
  );
};

export default App;
