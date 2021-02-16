const SET_DIRECTIONS = 'dynamicData/SET_DIRECTIONS';

export type DirectionType = {
    geocoded_waypoints: Array<any>
    request: any
    routes: Array<any>
    status: string
}

export type dynamicDataType = {
    directions: DirectionType
}

let dynamicDataInitialState = {
    directions: null
}

const dynamicData = (state = dynamicDataInitialState, action: any) => {
    switch (action.type) {

        case SET_DIRECTIONS: {
            return {
                ...state,
                directions: action.direction
            }
        }

        default: {
            return state;
        }
    }
}

export const setDirections = (direction: DirectionType) => ({type: SET_DIRECTIONS, direction})


export default dynamicData;