import React, {useContext, useState} from 'react'
import Markers from "./Markers";

const StopsInfoContext = React.createContext({});

export const useContextConsumer = () => {
    const {currentStop, currentRoute} = useContext(StopsInfoContext);
    return {currentStop, currentRoute};
}

const MarkersContainer = (props) => {

    const [currentStop, setCurrentStop] = useState(null);
    const [currentRoute, setCurrentRoute] = useState(null);

    return (
        <StopsInfoContext.Provider value={{currentStop, currentRoute}}>
            <Markers stopsMarkerData={props.stopsMarkerData}
                     stopsTxt={props.stopsTxt}
                     routesTxt={props.routesTxt}
                     times={props.times}
                     setDirections={props.setDirections}
                     setCurrentStop={setCurrentStop}
                     setCurrentRoute={setCurrentRoute} />
        </StopsInfoContext.Provider>
    )
}

export default MarkersContainer;