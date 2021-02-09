### This is react application with google map which shows public transport's stops in Minsk

##### Link on web page: [Click here](https://minsktrans-schedule-qeocf.ondigitalocean.app) 

##### Hotkeys:
    - Shift+f - open modal search window;

##### Features:
    - grouping markers when zooming;
    - show stop's info when clicking on it (stop name, routes with stop); 
    - show route by clicking on it name in stop's info window;
    - show schedule at the stop with specific route;
    - searching route by route and stop name;
    - show finded route on map;
    - changed map style;

###### Bugs:
    - don't hide old route after draw new;
    - bad optimization in Markers component; 
    - broken UI at InfoWindow;
    - when clicking on new stop, not reset to null current route;