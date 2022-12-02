import React, { useContext } from 'react'
import styles from './MainMenu.module.css';
import {Link} from 'react-router-dom';
import { Context } from '../../../context/Context';
import { useLocation } from 'react-router-dom';

export default function MainMenu({menuButton, onClick}) {
  const {user, dispatch} = useContext(Context);
  const handleLogout = () => {
    dispatch({type:"LOGOUT"})
  }
  let {pathname} = useLocation();
  const links = {
    activeObject: pathname,
    objects: [
      {linkTo: "/", id: 0, text: "STRONA GŁÓWNA"},
      {linkTo: "/posts", id: 1, text: "BAZA WIEDZY"},
      {linkTo: "/contact", id: 2, text: "KONTAKT"},
      {linkTo: "/newPost", id: 3, text: "NOWY WPIS"},
    ]
  }

  function toggleActiveStyles(index) {
    if (links.objects[index].linkTo === links.activeObject) {
      return `${styles.item} ${styles.active}`; 
    }
    return `${styles.item} ${styles.inActive}`;
  }
  return (
    <div onClick={() => {onClick()}} className={`${styles.mainMenu} ${menuButton ? styles.menuButton : null}`}>
        <ul className={styles.list}>
          {links.objects.map((element, index) => (
            <Link 
              to={element.linkTo} 
              key={index} 
              className={toggleActiveStyles(index)}
              >
                {element.text}
            </Link>
          ))}
          <Link to="/login" className={styles.item} onClick={handleLogout}>{user ? "WYLOGUJ" : "ZALOGUJ"}</Link >
        </ul>
      </div>
  )
}
