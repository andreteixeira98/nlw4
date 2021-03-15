import {useContext} from 'react';

import styles from '../styles/components/ChallengeBox.module.css';
import {ChallengesContext} from '../contexts/ChallengesContext';
import { countedownContext } from '../contexts/CountedownContext';
export function ChallengeBox(){
    const {activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengesContext);
    const {resetCountedown} = useContext(countedownContext);

    function handleChallengeSucceed(){
        completedChallenge();
        resetCountedown();
    }

    function handleChallengeFalied(){
        resetChallenge();
        resetCountedown();
    }

    return(
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header> Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                        <footer>
                            <button 
                                className={styles.challengeFaliedButton}
                                type='button'
                                onClick={handleChallengeFalied}
                            >
                                Falied
                            </button>
                            <button
                                className={styles.challengeSucceedButton}
                                type='button'
                                onClick={handleChallengeSucceed}
                            >
                                Completed
                            </button>
                        </footer>
                    </main>
                </div>
            ):(
                <div className={styles.challengeBoxNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="level up"/>
                    Avance de level completando desafios.
                </p>
            </div>
            )}
        </div>
    );
}