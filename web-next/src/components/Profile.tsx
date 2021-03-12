import styles from '../styles/components/Profile.module.css';
export default function Profile(){
    return(
        <div className={styles.profileContainer}>
                <img src="https://www.github.com/andreteixeira98.png" alt=""/>
                <div>
                    <strong>Andre Teixeira</strong>
                    <p>
                        <img src="icons/level.svg" alt="level"/>
                        Level 2
                    </p>
                </div>
        </div>
    );
}