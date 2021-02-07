import React, {useState} from 'react';
import Timer from "./timer";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const style = {
    btnSelect: {marginLeft: "20px", marginRight: "20px", padding: "10px"},
    mb30: {marginBottom: "30px"},
    btnCheckboxSelected: { marginLeft: "20px", marginRight: "20px", padding: "10px", backgroundColor: "blue", color: "white" },
}

export default function Tabelline () {
    const [operations, setOperations] = useState([]);
    const [result, setResult] = useState("");
    const [errors, setErrors] = useState(0);
    const [successes, setSuccesses] = useState(0);
    const [total, setTotal] = useState(0);
    const arr10 = [1,2,3,4,5,6,7,8,9,10];
    const [selected, setSelected] = useState(arr10.map(i => {return {checked: false, val: i}}));
    const [shuffle, setShuffle] = useState(false);
    const [state, setState] = useState(0);
    const [time, setTime] = useState(0);
    const [finalTime, setFinalTime] = useState(0);

    const startApplication = () => {
        setState(state + 1);
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
        if (parseInt(result) === parseInt(operations[0][2])) {
            //result is correct
            if (operations.length === 1){
                setSuccesses(successes + 1);
                setState(state + 1);
                setFinalTime(time);
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

    const finishedTabelline = selected.filter(x => x.checked).map(x => x.val);
    return <div>
        {state===0 && <div>
            <div style={style.mb30}>
                <span>Quali tabelline?</span>
                <button style={style.btnSelect} onClick={selectAll()}>Seleziona Tutto</button>
                <button style={style.btnSelect} onClick={deselectAll()}>Deseleziona Tutto</button>
            </div>
            <div style={{marginBottom: '30px'}}>
                { selected.map(i => <div style={{display: "inline-block"}} key={i.val}>
                    <button style={i.checked ? style.btnCheckboxSelected : style.btnSelect} onClick={() => onCheckedChange(i.val)}>{i.val}</button>
                </div>) }
            </div>
            <div style={style.mb30}>
                <input type="checkbox" value={shuffle} onChange={() => setShuffle(!shuffle)}/>
                <label>Mescola le tabelline</label>
            </div>
            <button onClick={() => startApplication()}>Conferma</button></div>}
        {state===1 && <div>
            <form onSubmit={(e) => checkResult(e)}>
                <span>{operations[0][0]} × {operations[0][1]} =</span>
                <input type={"number"} value={result} onChange={e => setResult(e.target.value)}/>
                <button type={"submit"}>Conferma</button>
            </form>
            <p>Completati: {successes} / {total}</p>
            <p>Errori: {errors}</p>
            <Timer start={state===1} stop={state===2} time={[time, setTime]}/>
        </div>}
        {state===2 && <div>
            <h3>Finito!!!</h3>
            <p>Hai completato {finishedTabelline.length === 1 ? "la" : "le"} tabellin{finishedTabelline.length === 1 ? "a" : "e"} del{[1,8].includes(finishedTabelline[0]) && "l'"} {selected.filter(x => x.checked).map(x => x.val).join(", ")}</p>
            <p> {shuffle && "in ordine sparso"}</p>
            <p> con {errors} error{errors === 1 ? "e" : "i"}</p>
            <p>in {Math.floor(finalTime / 3600)} ore {Math.floor(finalTime % 3600 / 60)} minuti {finalTime % 60} secondi </p>
            <button onClick={() => window.location.reload()}>Ricomincia</button>
        </div>}
    </div>
}