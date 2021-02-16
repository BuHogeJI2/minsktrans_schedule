import React, {useEffect, useState} from 'react';
import css from './Clock.module.css'

const Clock = (props) => {

    const [time, setTime] = useState('');

    useEffect(() => {
        let timer = setInterval(() => {
            const today = new Date();
            const currentTime = `${today.getHours()} : ${today.getMinutes()} : ${today.getSeconds()}`
            setTime(currentTime);
        }, 1000);

        return () => clearInterval(timer);
    }, [])

    return (
        <div className={css.clock_wrapper}>
            <div className={css.clock}>{time}</div>
        </div>
    )
}

export default Clock;