import Head from 'next/head';
import React from 'react';
import { ExperienceBar } from "../components/ExperienceBar";
import styles from '../styles/pages/Home.module.css';
import {AiOutlineHome} from 'react-icons/ai';
import Profile from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countedown } from '../components/Countedown';
import { ChallengeBox } from '../components/ChallengeBox';


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        {/**<link rel="shortcut icon" href={AiOutlineHome } type='image/x-icon'/> */}
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
  </div>
  )
}
