import { useState ,useEffect, useContext } from 'react';
import styles from '../styles/components/Countedown.module.css';
import {ChallengesContext} from '../Contexts/ChallengesContext';

{/**let countedownTimeout = NodeJS.Timeout; */}
let countedownTimeout:any;

export function Countedown(){
    const {startNewChallenge} = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1*60);
    const[isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time/60);
    const seconds = time%60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split(' ');
    const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split(' ');

    function startCountedown(){
        setIsActive(true);
    }
    function resetCountedown(){
        clearTimeout(countedownTimeout);
        setIsActive(false);
        setTime(0.1*60);

    }
    useEffect(() =>{
        if(isActive && time>0){
            countedownTimeout = setTimeout(()=>{
                setTime(time - 1);
            },1000);
        }else if(isActive && time == 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    },[isActive,time]);
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
            {hasFinished ? (
                <button 
                    disabled
                    className={styles.countedownButton} 
                >
                 ciclo encerrado
                 </button>
            ):(
               <>
                    {isActive ? (
                    <button 
                    className={`${styles.countedownButton} ${styles.countedownButtonActive}`}
                    onClick={resetCountedown}
                >
                     Abandonar ciclo
                </button>
                ): (
                    <button 
                    className={styles.countedownButton}
                    onClick={startCountedown}
                >
                 Iniciar um ciclo
                </button>
                )}
               </>
            )}
           
        </div>
    );
}