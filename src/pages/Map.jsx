import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css"
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Map = () => {
  const url = useSelector((state) => state.auth.url);
  const token = useSelector((state) => state.auth.token);
  const [pos, setPos] = useState()
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

  const getTeacherLocation = async () => {
    const response = await fetch(`${url}/student/getLocation`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, "Content-type": "application/json" }
      });

    const data = await response.json();
    setLocationList(data.locations)
  }

  useEffect(() => {
    getTeacherLocation();
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
      </MapContainer>}
    </div>
  )
}

export default Map
