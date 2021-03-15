import Head from 'next/head';
import React from 'react';
import {GetServerSideProps} from 'next';
import { ExperienceBar } from "../components/ExperienceBar";
import styles from '../styles/pages/Home.module.css';
import {AiOutlineHome} from 'react-icons/ai';
import Profile from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import {CountedownProvider} from '../contexts/CountedownContext';
import { Countedown } from '../components/Countedown';
import { ChallengeBox } from '../components/ChallengeBox';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps{
  level:number;
  currentExperience:number;
  challengesCompleted:number;
}

export default function Home(props:HomeProps) {
  return (
    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
       <CountedownProvider>
        <main className={styles.container}>
          <Head>
            <title>Home | move.it</title>
          </Head>
          <ExperienceBar/>
        
            <section> 
            <div>
              <Profile/>
              <CompletedChallenges />
              <Countedown />
            </div>  
            <div>
              <ChallengeBox />
            </div>
          </section>
        </main>
      </CountedownProvider>
    </ChallengesProvider>
    
  )
}

export const getServerSideProps:GetServerSideProps = async ({req}) =>{

  const user ={
    level:1,
    currentExperience: 50,
    challengesCompleted:2,
  }

  const {level, currentExperience, challengesCompleted} = req.cookies;
  return{
    props:{
      level:Number(level),
      currentExperience:Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
