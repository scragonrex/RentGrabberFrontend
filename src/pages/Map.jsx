import { MapContainer, TileLayer,Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css"
import { useState } from "react";



const Map = () => {
  const [latitude,setLatitude]=useState(21.1458);
  const [longitude,setLongitude]=useState(79.0882);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }
  
  function success(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }
  
  function error() {
    console.log("Unable to retrieve your location");
  } 
  
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    // iconUrl: require("./icons/placeholder.png"),
    iconSize: [38, 38] // size of the icon
  });
  
  return (
    <div>
      <MapContainer center={[latitude,longitude]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
          <Marker position={[latitude,longitude]} icon={customIcon}>
            <Popup>Current Location</Popup>
          </Marker>
      </MapContainer>
    </div>
  )
}

export default Map
