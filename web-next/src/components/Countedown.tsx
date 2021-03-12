import { useState ,useEffect} from 'react';
import styles from '../styles/components/Countedown.module.css';

export function Countedown(){
    const [time, setTime] = useState(25*60);
    const[active, setActive] = useState(false);

    const minutes = Math.floor(time/60);
    const seconds = time%60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split(' ');
    const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split(' ');

    function startCountedown(){
        setActive(true);
    }
    useEffect(() =>{
        if(active && time>0){
            setTimeout(()=>{
                setTime(time - 1);
            },1000);
        } 
    },[active,time]);
    return (
        <div>
            <div className={styles.countedownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            <button 
                className={styles.countedownButton}
                onClick={startCountedown}
            >
            Click para iniciar um ciclo
            </button>
        </div>
    );
}