import {COORD_MEASURE, STOP_COORDS_INDEX, STOP_ID_INDEX, STOP_INFO_LENGTH, STOP_NAME_INDEX} from "../constants";
import {splitData} from "./common";

export const getStopMarkerData = (stopsTxt) => {
    const splitStopsData = splitData(stopsTxt);

    return splitStopsData.map(stopInfo => {
        if (stopInfo.length === STOP_INFO_LENGTH) {
            const stopName = stopInfo[STOP_NAME_INDEX];
            if (stopName) {
                const stopCoords = {
                    lat: +stopInfo[STOP_COORDS_INDEX.lat] / COORD_MEASURE,
                    lng: +stopInfo[STOP_COORDS_INDEX.lng] / COORD_MEASURE
                }
                const stopId = stopInfo[STOP_ID_INDEX]

                return {
                    id: stopId,
                    name: stopName,
                    position: stopCoords
                }
            }
        }
    }).filter(item => !!item);
}