import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css';
export function LevelUpModal(){
    const {level, closeLevelUpModal } = useContext(ChallengesContext);
    return(
        <div className={styles.Overlay}>
            <div className={styles.container}>
            <header> {level}</header>

            <strong>Parabens</strong>
            <p>Você alcançou um novo nivel</p>

            <button type="button" onClick={closeLevelUpModal}>
                <img src="/icons/close.svg" alt="Fechar Modal"/>
            </button>
            </div>
        </div>
    );
}