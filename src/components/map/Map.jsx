import React, {useEffect, useState} from 'react'
import {GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

const MINSK_COORDS = {lat: 53.904541, lng: 27.561523}

const Map = withScriptjs(withGoogleMap((props) => {

    let [stopsTxt, setStopsTxt] = useState('');
    let [currentStop, setCurrentStop] = useState(null);

    const getStopsData = (data) => {
        const result = []
        const dataArray = data.split('\n');

        dataArray.forEach(data => {
            result.push(data.split(';'))
        })

        return result;
    }

    const returnMarker = (data) => {
        if (data.length === 10) {
            const stopName = data[4];
            const stopCoords = {
                lat: +data[7] / 100000,
                lng: +data[6] / 100000
            }

            return <Marker position={stopCoords}
                           onClick={ () => setCurrentStopData(stopName, stopCoords) }
            />
        }
    }

    const setCurrentStopData = (stopName, stopCoords) => {
        const stopData = {stopCoords, stopName};
        setCurrentStop(stopData);
    }

    useEffect(() => {
        fetch('stops.txt')
            .then(response => response.text())
            .then(result => setStopsTxt(result))
    }, [])

    return (
        <GoogleMap defaultZoom={5} defaultCenter={MINSK_COORDS}>
            <MarkerClusterer averageCenter
                             maxZoom={18}
                             minimumClusterSize={4}
                             enableRetinaIcons
                             gridSize={60} >
                {getStopsData(stopsTxt).map(data => returnMarker(data))}
            </MarkerClusterer>
            {currentStop &&
                <InfoWindow position={ currentStop.stopCoords }
                            onCloseClick={ ()=> setCurrentStop(null) }
                            defaultZIndex={1}>
                    <h3>{currentStop.stopName ? currentStop.stopName : 'Без названия'}</h3>
                </InfoWindow>
            }
        </GoogleMap>
    )
}))

export default Map;