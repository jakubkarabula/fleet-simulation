import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const tileLayer = {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  }

  const center = [ 52.5145, 13.3861 ];

const App = () => {
    const [markers, setMarkes] = useState([])

    useEffect(() => {
        setInterval(() => {
            fetch('http://localhost:8080/positions')
            .then(response => response.json())
            .then(response => {
                console.log(response)

                if (response) {
                    setMarkes(Object.entries(response))
                }
            })
        }, 1000)
    }, [])

    return(
        <MapContainer center={center} zoom={16} scrollWheelZoom={true}>
            <TileLayer {...tileLayer} />

            {markers.map(([vin, position]) => (
                <Marker position={position.map(l => (l / 10000))} key={vin}>
                    <Popup>{vin}</Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default App

/*
 
      */