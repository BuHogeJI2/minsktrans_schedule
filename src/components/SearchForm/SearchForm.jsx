import React, {useState} from 'react'
import css from "./Form.module.css";
import {
    getDirectionData,
    getSearchingRoutes,
    setDirectionsData
} from "../../functions";
import {ROUTE_NAME_INDEX} from "../../constants";

const  SearchForm = ({stopsTxt, routesTxt, setDirections}) => {

    const [inputValue, setInputValue] = useState('');
    const [routes, setRoutes] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const searchingRoutes = getSearchingRoutes(inputValue, routesTxt);
        setRoutes(searchingRoutes);
    }

    const handleChange = (event) => {
        setInputValue(event.currentTarget.value);
    }

    const handleRouteClick = (route) => {
        const directionData = getDirectionData(route, stopsTxt);
        setDirectionsData(directionData, setDirections);
        const modalForm = document.querySelector('#modal_form_wrapper');
        modalForm.style.display = 'none';
    }

    return (
        <div className={css.form_wrapper} id='modal_form_wrapper'>
            <form className={css.search_form} onSubmit={handleSubmit}>
                <input type="text" autoFocus={true} value={inputValue} onChange={handleChange}/>
                <button>Поиск</button>
                {routes &&
                    routes.map(route => {
                        return <div className={css.route}
                                    onClick={() => handleRouteClick(route)}>
                            {route[ROUTE_NAME_INDEX]}
                        </div>
                    })
                }
            </form>
        </div>
    )
}

export default SearchForm;