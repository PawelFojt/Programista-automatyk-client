import React from 'react';
import styles from './SinglePost.module.css';

export default function singlePost() {
  return (
    <div className={styles.singlePost}>
      <div className={styles.container}>
        <img 
          className={styles.img}
          src="https://images.pexels.com/photos/4263057/pexels-photo-4263057.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Post img"
        />
        <div className={styles.flexContainer}>
          <h1 className={styles.title}>Czytanie schematów elektrycznych</h1>
          <i className={`${styles.icon} fa-solid fa-pencil`}></i>
          <i className={`${styles.icon} fa-solid fa-trash-can`}></i>
        </div>
        <div className={styles.info}>
          <span className={styles.author}>Autor: Paweł Fojt</span>
          <span className={styles.date}>1 godzina temu</span>
        </div>
        <hr/>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus faucibus, velit et varius consectetur,
          nisl quam porttitor urna, ut feugiat orci velit vehicula ante. Fusce eu malesuada erat. Donec quis blandit sem.
          Vivamus eu tortor nec elit vestibulum volutpat. Curabitur vel quam facilisis, blandit sapien ut, rhoncus diam.
          Vestibulum hendrerit odio quam, et eleifend mi tristique at. Phasellus sit amet magna at ante blandit lobortis nec non quam.
          Nam pulvinar elit sit amet odio tempor molestie. Ut pellentesque fermentum augue, eget luctus quam porttitor sed.
          Suspendisse interdum massa sed justo malesuada, eu tempus tortor aliquam. Pellentesque quam augue, elementum et ipsum non,
          molestie cursus metus. Fusce nunc ante, rutrum et cursus maximus, volutpat sed metus. In iaculis quis est vitae molestie.
          Nam faucibus tempus mollis. Duis non placerat erat, vitae eleifend massa.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus faucibus, velit et varius consectetur,
          nisl quam porttitor urna, ut feugiat orci velit vehicula ante. Fusce eu malesuada erat. Donec quis blandit sem.
          Vivamus eu tortor nec elit vestibulum volutpat. Curabitur vel quam facilisis, blandit sapien ut, rhoncus diam.
          Vestibulum hendrerit odio quam, et eleifend mi tristique at. Phasellus sit amet magna at ante blandit lobortis nec non quam.
          Nam pulvinar elit sit amet odio tempor molestie. Ut pellentesque fermentum augue, eget luctus quam porttitor sed.
          Suspendisse interdum massa sed justo malesuada, eu tempus tortor aliquam. Pellentesque quam augue, elementum et ipsum non,
          molestie cursus metus. Fusce nunc ante, rutrum et cursus maximus, volutpat sed metus. In iaculis quis est vitae molestie.
          Nam faucibus tempus mollis. Duis non placerat erat, vitae eleifend massa.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus faucibus, velit et varius consectetur,
          nisl quam porttitor urna, ut feugiat orci velit vehicula ante. Fusce eu malesuada erat. Donec quis blandit sem.
          Vivamus eu tortor nec elit vestibulum volutpat. Curabitur vel quam facilisis, blandit sapien ut, rhoncus diam.
          Vestibulum hendrerit odio quam, et eleifend mi tristique at. Phasellus sit amet magna at ante blandit lobortis nec non quam.
          Nam pulvinar elit sit amet odio tempor molestie. Ut pellentesque fermentum augue, eget luctus quam porttitor sed.
          Suspendisse interdum massa sed justo malesuada, eu tempus tortor aliquam. Pellentesque quam augue, elementum et ipsum non,
          molestie cursus metus. Fusce nunc ante, rutrum et cursus maximus, volutpat sed metus. In iaculis quis est vitae molestie.
          Nam faucibus tempus mollis. Duis non placerat erat, vitae eleifend massa.
        </p>
      </div>
    </div>
  )
}
