import React, {useState} from 'react'
import css from "./Form.module.css";
import {getSearchingRoutes} from "../../functions";

const  SearchForm = ({routesTxt}) => {

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
        console.log(route)
    }

    return (
        <div className={css.form_wrapper} id='modal_form_wrapper'>
            <form className={css.search_form} onSubmit={handleSubmit}>
                <input type="text" autoFocus={true} value={inputValue} onChange={handleChange}/>
                <button>Поиск</button>
                {routes &&
                    routes.map(route => {
                        return <div className={css.route} onClick={() => handleRouteClick(route)}>{route[10]}</div>
                    })
                }
            </form>
        </div>
    )
}

export default SearchForm;