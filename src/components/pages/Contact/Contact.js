import React from "react";
import styles from "./Contact.module.css";

function findMinOddMaxEven(array) {
    if (!Array.isArray(array)) {
      return "Argumentem funkcji musi być tablica";
    }
    
    let minOdd = Infinity;
    let maxEven = -Infinity;
    
    for (let i = 0; i < array.length; i++) {
      if (typeof array[i] !== "number") {
        return "Wszystkie elementy tablicy muszą być liczbami";
      }
      
      if (array[i] % 2 === 0) {
        if (array[i] > maxEven) {
          maxEven = array[i];
        }
      } else {
        if (array[i] < minOdd) {
          minOdd = array[i];
        }
      }
    }
    
    if (minOdd === Infinity) {
      return `W tablicy nie ma elementów nieparzystych`;
    }
    
    if (maxEven === -Infinity) {
      return `W tablicy nie ma elementów parzystych`;
    }
    
    return `Nieparzysty minimalny element tablicy to ${minOdd}, a parzysty maksymalny element tablicy to ${maxEven}`;
  }
  
  console.log(findMinOddMaxEven([2, 6, 0, 1, 8, 2, 1, 9, 1, 6])); // Nieparzysty minimalny element tablicy to 1, a parzysty maksymalny element tablicy to 8
  console.log(findMinOddMaxEven("test")); // Argumentem funkcji musi być tablica
  console.log(findMinOddMaxEven(2)); // Argumentem funkcji musi być tablica
  console.log(findMinOddMaxEven([2, 6, 0, 4, 8])); // W tablicy nie ma elementów nieparzystych
  console.log(findMinOddMaxEven([1, 3, 5])); // W tablicy nie ma elementów parzystych

export default function Contact() {
    return (
        <div className={styles.contact}>
            <h1>Kontakt</h1>
            <div className={styles.box}>
                <i className="fa-solid fa-envelope"></i>
                <p className={styles.info}>Email: pwfojt@gmail.com</p>
            </div>
            <div className={styles.box}>
                <i className="fa-solid fa-square-phone"></i>
                <p className={styles.info}>Telefon: 794 367 015</p>
            </div>
        </div>
    );
}
