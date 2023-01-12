import React, { useContext, useState } from 'react';
import styles from './TopBar.module.css';
import MainMenu from '../../UI/MainMenu/MainMenu';
import SearchBar from '../../UI/SearchBar/SearchBar';
import Header from '../../UI/Header/Header';
import MenuButton from '../../UI/MenuButton/MenuButton';
import { Context } from '../../../context/Context';
import { Link } from 'react-router-dom';
import { urlImg } from '../../../api';

export default function TopBar(props) {
  const { user } = useContext(Context);
  const [menuButton, setMenuButton] = useState(false);
  function switchMenu() {
    setMenuButton(!menuButton);
  }

  return (
    <>
      <button className={styles.mode} onClick={() => { props.onSwitch() }}>
        {props.mode === 'dark-mode' ? (
          <i className='fa-solid fa-sun'></i>
        ) : (
          <i className='fa-solid fa-moon'></i>
        )}
      </button>
      <Link to='/'>
        <Header title='Programista-Automatyk' />
      </Link>
      <div className={styles.search}>
        <SearchBar />
      </div>
      <nav className={styles.nav}>
        <MainMenu menuButton={menuButton} onClick={() => setMenuButton(false)} />
      </nav>
      <div className={styles.profile}>
        {user && (
          <Link to='/settings'>
            {user.profilePic ? (
              <img
                className={styles.img}
                src={urlImg + user.profilePic}
                alt='profile'
              />
            ) : (
              <div className={styles.icon}>
                <i className='fa-regular fa-user'></i>
              </div>
            )}
          </Link>
        )}
      </div>
      <MenuButton onClick={() => switchMenu()} />
    </>
  );
}