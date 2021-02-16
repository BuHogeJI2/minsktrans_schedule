const SET_MARKERS_DATA = 'staticData/SET_MARKERS_DATA';
const SET_TIMES_DATA = 'staticData/SET_TIMES_DATA';

export type TimeDataType = {
    direction_id: string
    tag: string
    times: Array<number>
    valid_from: Array<number>
    valid_to: Array<number>
    workdays: Array<string>

}

export type PositionType = {
    lat: number
    lng: number
}

export type MarkerType = {
    id: number
    name: string
    position: PositionType
}

type staticDataStateType = {
    markersData: Array<string>
    timesData: Array<TimeDataType>
}

let staticDataInitialState = {
    markersData: [],
    timesData: [],
}

const staticData = (state: staticDataStateType = staticDataInitialState, action: any) => {

    switch (action.type) {
        case SET_MARKERS_DATA: {
            return {
                ...state,
                markersData: action.markersData
            }
        }

        case SET_TIMES_DATA: {
            return {
                ...state,
                timesData: action.timesData
            }
        }


        default: {
            return state;
        }
    }
}

export const setMarkersData = (markersData: Array<MarkerType>) => ({type: SET_MARKERS_DATA, markersData})
export const setTimesData = (timesData: Array<TimeDataType>) => ({type: SET_TIMES_DATA, timesData})


export default staticData;