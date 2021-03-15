import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { ChallengesContext } from './ChallengesContext';

let countedownTimeout:any;

interface CountedownContextData{
    seconds:number;
    minutes:number;
    hasFinished:boolean;
    isActive:boolean;
    startCountedown: ()=>void;
    resetCountedown: ()=>void;
}
interface CountedownProviderProps{
    children:ReactNode;
}
export const countedownContext = createContext({} as CountedownContextData);

export function CountedownProvider({children}:CountedownProviderProps){
    const {startNewChallenge} = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1*60);
    const[isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time/60);
    const seconds = time%60;

    function startCountedown(){
        setIsActive(true);
    }
    function resetCountedown(){
        clearTimeout(countedownTimeout);
        setIsActive(false);
        setHasFinished(false);
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
    return(
        <countedownContext.Provider 
            value={{
                seconds,
                minutes,
                hasFinished,
                isActive,
                startCountedown,
                resetCountedown
            }}
        >
            {children}
        </countedownContext.Provider>
    );
}