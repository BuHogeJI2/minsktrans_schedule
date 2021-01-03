import React from 'react'
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps";

const Map = withScriptjs(withGoogleMap((props) => {
    return <GoogleMap defaultZoom={8}
               defaultCenter={ { lat: -34.397, lng: 150.644 } }>

    </GoogleMap>
}))

export default Map;