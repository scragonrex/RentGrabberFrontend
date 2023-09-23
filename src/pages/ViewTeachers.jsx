import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css"
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Map = (defaultCategory) => {
  const url = useSelector((state) => state.auth.url);
  const token = useSelector((state) => state.auth.token);
  const teachersList = useSelector((state)=>state.auth.teachers);
  const [filteredlocation, setFilteredlocation] = useState();
  const [filteredCategory, setfilteredCategory] = useState(defaultCategory)
  const [pos, setPos] = useState();
  const [locationList, setLocationList] = useState([])
  const [draggable, setDraggable] = useState(false)
  const markerRef = useRef(null)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPos(marker.getLatLng())
        }
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])


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
      setPos({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    }

    function error() {
      console.log("Unable to retrieve your location");
    }
    filter();
  }, [])

  console.log(pos);

  return (
    <div>
      {pos && <MapContainer center={pos} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        />
        <Marker
          draggable={draggable}
          eventHandlers={eventHandlers}
          position={pos}
          ref={markerRef}
          icon={customIcon}>
          <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
              {draggable
                ? 'Marker is draggable'
                : 'Click here to make marker draggable'}
            </span>
          </Popup>
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
          
      </MapContainer>}
    </div>
  )
}

export default Map
