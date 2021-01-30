import React, { useState, useEffect, useRef } from 'react';


export default function Timer (props){
    const [time, setTime] = useState(0);
    const interval = useRef(null);


    const resetTimer = () => {
        setTime(0);
    }
    const stopTimer = () => {
        clearInterval(interval.current);
    }

    useEffect(() => {
        if (!interval.current){
            interval.current = setInterval(() => {
                setTime(time => time + 1);
            }, 1000);
            resetTimer();
        }
        if (props.stop){
            stopTimer();
        }
    }, [props]);

    return <div>
        <label>{Math.floor(time / 3600)} : {Math.floor(time % 3600 / 60)} : {time % 60}</label>
    </div>
}