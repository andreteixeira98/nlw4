import {useState, createContext, ReactNode} from 'react';

import Challenges from '../data/challenges.json';

interface  Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData{
    level: number;
    currentExperience: number;
    experienceNextLevel:number;
    challengesCompleted:number;
    activeChallenge:Challenge;
    levelUp:()=>void;
    startNewChallenge:()=>void;
    resetChallenge: ()=> void;
}

interface ChallengesProviderProps{
    children: ReactNode;
}

export const  ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({children}:ChallengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceNextLevel = Math.pow((level + 1)*4, 2);

    function levelUp(){
        setLevel(level + 1);
    }
    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * Challenges.length);
        const challenge = Challenges[randomChallengeIndex];
        setActiveChallenge(challenge as Challenge);
    }
    function resetChallenge(){
        setActiveChallenge(null);
    }
    return(
        <ChallengesContext.Provider 
            value={{
                level, 
                currentExperience,
                experienceNextLevel,
                challengesCompleted, 
                activeChallenge,
                levelUp,
                startNewChallenge,
                resetChallenge
            }}>
        {children}
        </ChallengesContext.Provider>
    );
}