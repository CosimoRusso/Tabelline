import React, { useState } from 'react';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const style = {
    btnSelect: {marginLeft: "20px", marginRight: "20px"},
    mb30: {marginBottom: "30px"}
}

export default function Tabelline () {
    const [started, setStarted] = useState(false);
    const [operations, setOperations] = useState([]);
    const [result, setResult] = useState("");
    const [errors, setErrors] = useState(0);
    const [successes, setSuccesses] = useState(0);
    const [total, setTotal] = useState(0);
    const [stop, setStop] = useState(false);
    const arr10 = [1,2,3,4,5,6,7,8,9,10];
    const [selected, setSelected] = useState(arr10.map(i => {return {checked: false, val: i}}));
    const [shuffle, setShuffle] = useState(false);

    const startApplication = () => {
        setStarted(true);
        let tmp = [];
        selected.filter(s => s.checked).forEach(s => {
            const i = parseInt(s.val);
            for (let j=0; j<=10; j++){
                tmp.push([i, j, i*j]);
            }
        });
        setTotal(tmp.length);
        if (shuffle)
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

    const onCheckedChange = (i) => {
        setSelected(selected.map(s => {
            if (s.val === i) return {checked: !s.checked, val: i}
            else return s;
        }));
    }
    const selectAll = () => () => {
        setSelected(selected.map(s => {
            s.checked = true;
            return s;
        }));
    }
    const deselectAll = () => () => {
        setSelected(selected.map(s => {
            s.checked = false;
            return s;
        }));
    }

    return <div>
        {!started && <div>
            <div style={style.mb30}>
                <span>Quali tabelline?</span>
                <button style={style.btnSelect} onClick={selectAll()}>Seleziona Tutto</button>
                <button style={style.btnSelect} onClick={deselectAll()}>Deseleziona Tutto</button>
            </div>
            <div style={{marginBottom: '30px'}}>
                { selected.map(i => <div style={{display: "inline-block"}} key={i.val}>
                    <input type="checkbox" checked={i.checked} onChange={() => onCheckedChange(i.val)} />
                    <label>{i.val}</label>
                </div>) }
            </div>
            <div style={style.mb30}>
                <input type="checkbox" value={shuffle} onChange={() => setShuffle(!shuffle)}/>
                <label>Mescola le tabelline</label>
            </div>
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