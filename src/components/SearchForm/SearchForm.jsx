import React, {useState} from 'react'
import css from "./Form.module.css";

const  SearchForm = ({setSearchRequest}) => {

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchRequest(inputValue);
    }

    const handleChange = (event) => {
        setInputValue(event.currentTarget.value);
    }

    return (
        <div className={css.form_wrapper} id='modal_form_wrapper'>
            <form className={css.search_form} onSubmit={handleSubmit}>
                <input type="text" autoFocus={true} value={inputValue} onChange={handleChange}/>
                <button>Search</button>
            </form>
        </div>
    )
}

export default SearchForm;