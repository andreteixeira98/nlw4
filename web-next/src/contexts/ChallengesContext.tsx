import {useState, createContext, ReactNode, useEffect} from 'react';

import Cookies from 'js-cookie';

import Challenges from '../data/challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

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
    completedChallenge: ()=>void;
    closeLevelUpModal: ()=>void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted:number;
}

export const  ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider(
    {
        children,
         ...res
    }:ChallengesProviderProps){
    const [level, setLevel] = useState(res.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(res.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(res.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceNextLevel = Math.pow((level + 1)*4, 2);

    useEffect(() => {
        Notification.requestPermission();
    },[])

    useEffect(()=>{
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    },[level, currentExperience, challengesCompleted]);
        

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }
    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }
    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * Challenges.length);
        const challenge = Challenges[randomChallengeIndex];
        setActiveChallenge(challenge as Challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission == 'granted'){
            new Notification('Novo Desafio', {
                body:`valendo ${challenge.amount} xp`
            })
        }
    }
    function resetChallenge(){
        setActiveChallenge(null);
    }
    function completedChallenge(){
        if(!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceNextLevel){
            
           finalExperience = finalExperience - experienceNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
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
                resetChallenge,
                completedChallenge,
                closeLevelUpModal
            }}>
        {children}
        {isLevelUpModalOpen && <LevelUpModal />}
        
        </ChallengesContext.Provider>
    );
}