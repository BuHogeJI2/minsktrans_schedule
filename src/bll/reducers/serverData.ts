import {fetchInfo} from "../../api";
import {ROUTES_FILE_NAME, STOPS_FILE_NAME, TIMES_FILE_NAME} from "../../constants";

const SET_STOPS_TXT = 'serverData/SET_STOPS_TXT';
const SET_ROUTES_TXT = 'serverData/SET_ROUTES_TXT';
const SET_TIMES_TXT = 'serverData/SET_TIMES_TXT';

type serverDataStateType = {
    stopsTxt: string | undefined
    routesTxt: string | undefined
    timesTxt: string | undefined
}

let initialState: serverDataStateType = {
    stopsTxt: '',
    routesTxt: '',
    timesTxt: '',
}

const serverData = (state: serverDataStateType = initialState, action: any) => {

    switch (action.type) {

        case SET_STOPS_TXT: {
            return {
                ...state,
                stopsTxt: action.stopsTxt
            }
        }

        case SET_ROUTES_TXT: {
            return {
                ...state,
                routesTxt: action.routesTxt
            }
        }

        case SET_TIMES_TXT: {
            return {
                ...state,
                timesTxt: action.timesTxt
            }
        }

        default:
            return state;
    }
}

const setStopsTxt = (stopsTxt: string | undefined) => ({type: SET_STOPS_TXT, stopsTxt})
const setRoutesTxt = (routesTxt: string | undefined) => ({type: SET_ROUTES_TXT, routesTxt})
const setTimesTxt = (timesTxt: string | undefined) => ({type: SET_TIMES_TXT, timesTxt})

export const fetchAllData = () => async (dispatch: any) => {
    let stops = await fetchInfo(STOPS_FILE_NAME);
    let routes = await fetchInfo(ROUTES_FILE_NAME);
    let times = await fetchInfo(TIMES_FILE_NAME);

    dispatch(setStopsTxt(stops));
    dispatch(setRoutesTxt(routes));
    dispatch(setTimesTxt(times));
}


export default  serverData;