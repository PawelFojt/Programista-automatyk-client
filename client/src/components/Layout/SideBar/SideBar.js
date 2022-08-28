import React from 'react';
import styles from './SideBar.module.css';

export default function SideBar() {
  return (
    <aside className={styles.sideBar}>
      <h2>O mnie:</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus faucibus, velit et varius consectetur,
         nisl quam porttitor urna, ut feugiat orci velit vehicula ante. Fusce eu malesuada erat. Donec quis blandit sem.
          Vivamus eu tortor nec elit vestibulum volutpat. Curabitur vel quam facilisis, blandit sapien ut, rhoncus diam.
           Vestibulum hendrerit odio quam, et eleifend mi tristique at. Phasellus sit amet magna at ante blandit lobortis nec non quam.
            Nam pulvinar elit sit amet odio tempor molestie. Ut pellentesque fermentum augue, eget luctus quam porttitor sed.
             Suspendisse interdum massa sed justo malesuada, eu tempus tortor aliquam. Pellentesque quam augue, elementum et ipsum non,
              molestie cursus metus. Fusce nunc ante, rutrum et cursus maximus, volutpat sed metus. In iaculis quis est vitae molestie.
               Nam faucibus tempus mollis. Duis non placerat erat, vitae eleifend massa.</p>
      <span>Kategorie:</span>
      <ul className={styles.categories}>
        <li className={styles.item}>Automatyka</li>
        <li className={styles.item}>Elektryka</li>
        <li className={styles.item}>Pneumatyka</li>
        <li className={styles.item}>Hydraulika</li>
      </ul>
    </aside>
  );
}
