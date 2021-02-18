import React, {useState} from 'react'
import css from "./Form.module.css";
import {ROUTE_NAME_INDEX} from "../../constants";
import {getDirectionData, getSearchingRoutes, setDirectionsData} from "../../services/routes";
import {DirectionType} from "../../bll/reducers/dynamicData";

type SearchFormOwnPropsType = {
    stopsTxt: string
    routesTxt: string
    setDirections: (direction: DirectionType) => void
}

const  SearchForm: React.FC<SearchFormOwnPropsType> = ({stopsTxt, routesTxt, setDirections}) => {

    const [inputValue, setInputValue] = useState('');
    const [routes, setRoutes] = useState<Array<any>>([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const searchingRoutes = getSearchingRoutes(inputValue, routesTxt, stopsTxt);

        setRoutes(searchingRoutes);
    }

    const handleChange = (event) => {
        setInputValue(event.currentTarget.value);
    }

    const handleRouteClick = (route) => {
        const directionData = getDirectionData(route, stopsTxt);
        setDirectionsData(directionData, setDirections);

        const modalForm = document.querySelector('#modal_form_wrapper');
        //@ts-ignore
        modalForm.style.display = 'none';
    }

    return (
        <div className={css.form_wrapper} id='modal_form_wrapper'>
            <form className={css.search_form} onSubmit={handleSubmit}>
                <input type="text" autoFocus={true} value={inputValue} onChange={handleChange}/>
                <button>Поиск</button>
                {routes.length &&
                    routes.map(route => {
                        const routeName = route[ROUTE_NAME_INDEX];
                        return <div key={routeName} className={css.route}
                                    onClick={() => handleRouteClick(route)}>
                            {routeName}
                        </div>
                    })
                }
            </form>
        </div>
    )
}

export default SearchForm;