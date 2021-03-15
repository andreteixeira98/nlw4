import { useState ,useEffect, useContext } from 'react';
import styles from '../styles/components/Countedown.module.css';
import {ChallengesContext} from '../contexts/ChallengesContext';
import { countedownContext } from '../contexts/CountedownContext';

{/**let countedownTimeout = NodeJS.Timeout; */}


export function Countedown(){
    const {
        seconds,
         minutes,
         hasFinished, 
         isActive,
         startCountedown, 
         resetCountedown 
    } = useContext(countedownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split(' ');
    const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split(' ');

    
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