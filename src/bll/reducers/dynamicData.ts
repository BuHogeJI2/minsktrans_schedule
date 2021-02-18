import {MarkerType} from "./staticData";

const SET_DIRECTIONS = 'dynamicData/SET_DIRECTIONS';
const SET_CURRENT_STOP = 'dynamicData/SET_CURRENT_STOP';
const SET_CURRENT_ROUTE = 'dynamicData/SET_CURRENT_ROUTE';

export type DirectionType = {
    geocoded_waypoints: Array<any>
    request: any
    routes: Array<any>
    status: string
}

export type dynamicDataType = {
    directions: DirectionType | null
    currentStop: MarkerType | null
    currentRoute: Array<string> | null
}

let dynamicDataInitialState = {
    directions: null,
    currentStop: null,
    currentRoute: null,
}

const dynamicData = (state: dynamicDataType = dynamicDataInitialState, action: any) => {
    switch (action.type) {

        case SET_DIRECTIONS: {
            return {
                ...state,
                directions: action.direction
            }
        }

        case SET_CURRENT_STOP: {
            return {
                ...state,
                currentStop: action.currentStop
            }
        }

        case SET_CURRENT_ROUTE: {
            return {
                ...state,
                currentRoute: action.currentRoute
            }
        }

        default: {
            return state;
        }
    }
}

export const setDirections = (direction: DirectionType) => ({type: SET_DIRECTIONS, direction});
export const setCurrentStop = (currentStop: MarkerType | null) => ({type: SET_CURRENT_STOP, currentStop});
export const setCurrentRoute = (currentRoute: Array<string> | null) => ({type: SET_CURRENT_ROUTE, currentRoute});


export default dynamicData;