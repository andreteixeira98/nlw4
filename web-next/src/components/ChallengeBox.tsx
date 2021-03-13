import styles from '../styles/components/ChallengeBox.module.css';
export function ChallengeBox(){
    const hasActiveChallenge = true;
    return(
        <div className={styles.challengeBoxContainer}>
            {hasActiveChallenge ? (
                <div className={styles.challengeActive}>
                    <header> Ganhe 400 xp</header>
                    <main>
                        <img src="icons/body.svg" alt=""/>
                        <strong>Novo Desafio</strong>
                        <p>Levante e faça  uma caminha de 3 minutos</p>
                        <footer>
                            <button 
                                className={styles.challengeFaliedButton}
                                type='button'
                            >
                                Falied
                            </button>
                            <button
                                className={styles.challengeSucceedButton}
                                type='button'
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