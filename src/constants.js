export const MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&callback=initMap`
export const MINSK_COORDS = {lat: 53.904541, lng: 27.561523};
export const STOP_ID_INDEX = 0;
export const STOP_NAME_INDEX = 4;
export const STOP_COORDS_INDEX = {
    lat: 7,
    lng: 6
}
export const ROUTE_STOPS_ID_INDEX = 14;
export const ROUTE_NAME_INDEX = 10;
export const STOP_ICON_WIDTH = 15;
export const STOP_ICON_HEIGHT = 15;
export const COORD_MEASURE = 100000;
export const MAP_ZOOM = 5;
export const CLUSTER = {
    maxZoom: 18,
    minimumSize: 4,
    gridSize: 60
}
export const INFO_WINDOW_Z_INDEX = 1;
export const STOP_INFO_LENGTH = 10;

export const STOPS_FILE_NAME = 'stops.txt';
export const ROUTES_FILE_NAME = 'routes.txt';

