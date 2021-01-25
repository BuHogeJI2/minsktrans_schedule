import React, {useCallback, useEffect} from 'react'
import css from './Button.module.css'

const OpenSearchFormButton = () => {

    const handleClick = useCallback(event => {
        const modalForm = document.querySelector('#modal_form_wrapper');
        window.onclick = (event) => {
            if (event.target === modalForm) {
                modalForm.style.display = 'none';
            }
        }
    }, [])

    useEffect(() => {
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [handleClick])

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