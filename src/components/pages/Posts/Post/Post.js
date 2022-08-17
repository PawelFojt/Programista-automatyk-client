import React from 'react';
import styles from './Post.module.css';

export default function Post() {
  return (
    <div className={styles.post}>
      <img 
        className={styles.img}
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt=""
      />
      <div className={styles.info}>
        <div className={styles.categories}>
          <span className={styles.category}>Automatyka</span>
          <span className={styles.category}>Hydraulika</span>
        </div>
        <span className={styles.title}>
          Zawór proporcjonalny
        </span>
        <hr/>
        <span className={styles.date}> 17.08.2022</span>
      </div>
      <p className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus faucibus, velit et varius consectetur,
         nisl quam porttitor urna, ut feugiat orci velit vehicula ante. Fusce eu malesuada erat. Donec quis blandit sem.
          Vivamus eu tortor nec elit vestibulum volutpat. Curabitur vel quam facilisis, blandit sapien ut, rhoncus diam.
           Vestibulum hendrerit odio quam, et eleifend mi tristique at. Phasellus sit amet magna at ante blandit lobortis nec non quam.
            Nam pulvinar elit sit amet odio tempor molestie. Ut pellentesque fermentum augue, eget luctus quam porttitor sed.
             Suspendisse interdum massa sed justo malesuada, eu tempus tortor aliquam. Pellentesque quam augue, elementum et ipsum non,
              molestie cursus metus. Fusce nunc ante, rutrum et cursus maximus, volutpat sed metus. In iaculis quis est vitae molestie.
               Nam faucibus tempus mollis. Duis non placerat erat, vitae eleifend massa.</p>
    </div>
  )
}
