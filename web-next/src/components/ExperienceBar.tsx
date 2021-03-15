import { useContext, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar(){
    const {currentExperience, experienceNextLevel} = useContext(ChallengesContext);

    const percentExperienceNextLevel = Math.round(currentExperience*100 ) / experienceNextLevel;
    return (            
        <header className={styles.experienceBar}>
                    
            <span>0 xp</span>
            <div>
                <div  style={{width: `${percentExperienceNextLevel}%`}}/>
                <span className={styles.currentExperience} style={{left: `${percentExperienceNextLevel}%`}}>{currentExperience} xp</span>
            </div>
            <span>{experienceNextLevel} xp</span>
        </header>
    );
}