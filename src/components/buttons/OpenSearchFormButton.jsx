import React from 'react'
import css from './Button.module.css'

const OpenSearchFormButton = (props) => {

    const showModalForm = () => {
        const modalForm = document.querySelector('#modal_form_wrapper');
        modalForm.style.display = 'block';
    }

    return (
        <div className={css.search_route_btn_wrapper}>
            <button className={css.btn} onClick={showModalForm}>Поиск маршрута</button>
        </div>
    )
}

export default OpenSearchFormButton