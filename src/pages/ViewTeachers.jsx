import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTeachers } from "../store/authSlice";



const ViewTeacher = ({defaultCategory}) => {
  const url = useSelector((state) => state.auth.url);
  const token = useSelector((state) => state.auth.token);
  const courses = useSelector((state) => state.auth.courses);
  const teachersList = useSelector((state) => state.auth.teachers);
  const dispatch = useDispatch();

  const [latitude, setLatitude] = useState(21.1458);
  const [longitude, setLongitude] = useState(79.0882);
  const [locationList, setLocationList] = useState([]);
  const [filteredlocation, setFilteredlocation] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState(defaultCategory);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [38, 38] // size of the icon
  });

  const filter = ()=>{
    console.log("all teachers", teachersList)
    let temp = teachersList.filter((item)=>(item.category===filteredCategory))
    temp = temp.map((item)=>{
      return {
        name:item.name,
        latitude:(Object?.values(item.latitude))[0],
        longitude:(Object?.values(item.longitude))[0]
      }
    })
    setFilteredlocation(temp);
  }
  useEffect(() => {
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
    filter();
  }, [])

  return (
    <div>
      <MapContainer center={[latitude, longitude]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={customIcon}>
          <Popup>Current Location</Popup>
        </Marker>
        {
          filteredlocation?.length > 0 && filteredlocation.map((item, key) => {
            // const lat = Object?.values(item.latitude);
            // const lon = Object?.values(item.longitude);
            // console.log("lattitute",lat)
            // console.log("longitude",lon)
            return(
            <Marker position={[item.latitude, item.longitude]} icon={customIcon}>
              <Popup>{item.name}</Popup>
            </Marker>)})
          }
          
      </MapContainer>
    </div>
  )
}

export default ViewTeacher;
