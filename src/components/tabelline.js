import React, { useState } from 'react';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export default function Tabelline () {
    const [maxNum, setMaxNum] = useState(10);
    const [started, setStarted] = useState(false);
    const [operations, setOperations] = useState([]);
    const [result, setResult] = useState("");
    const [errors, setErrors] = useState(0);
    const [successes, setSuccesses] = useState(0);
    const [total, setTotal] = useState(0);
    const [stop, setStop] = useState(false);

    const startApplication = () => {
        setStarted(true);
        let tmp = [];
        for (let i=1; i<=maxNum; i++){
            for (let j=0; j<=10; j++){
                tmp.push([i, j, i*j]);
            }
        }
        setTotal(tmp.length);
        shuffleArray(tmp);
        setOperations(tmp);

    }

    const checkResult = (e) => {
        e.preventDefault();
        if (stop) return false;
        if (parseInt(result) === parseInt(operations[0][2])) {
            //result is correct
            if (operations.length === 1){
                alert("Completato!");
                setSuccesses(successes + 1);
                setStop(true);
            }else{
                setSuccesses(successes + 1);
                setOperations(operations.slice(1));
                setResult("");
                setOperations(operations.slice(1));
            }
        }else{
            setErrors(errors + 1);
        }
        setResult("");
    }

    return <div>
        {!started && <div>
        <span>Fino alla tabellina del?</span>
        <input type={"number"} min={1} max={10} value={maxNum} onChange={e => setMaxNum(parseInt(e.target.value))}/>
            <button onClick={() => startApplication()}>Conferma</button></div>}
        {started && <div>
            <form onSubmit={(e) => checkResult(e)}>
                <span>{operations[0][0]} × {operations[0][1]} =</span>
                <input type={"number"} value={result} onChange={e => setResult(e.target.value)}/>
                <button type={"submit"}>Conferma</button>
            </form>
            <p>Completati: {successes} / {total}</p>
            <p>Errori: {errors}</p>
            <button onClick={() => window.location.reload()}>Ricomincia</button>

        </div>}
    </div>
}