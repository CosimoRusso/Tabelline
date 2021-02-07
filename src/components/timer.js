import React, { useEffect, useRef } from 'react';


export default function Timer (props){
    const [time, setTime] = props.time;
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
    });

    return <div>
        <label>{Math.floor(time / 3600)} : {Math.floor(time % 3600 / 60)} : {time % 60}</label>
    </div>
}