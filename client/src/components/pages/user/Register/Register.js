import styles from './Register.module.css';

export default function Register() {
  return (
    <div className={styles.register}>
      <h1 className={styles.header}>Rejestracja</h1>
      <form className={styles.form}>
        <label>Nazwa użytkownika</label>
        <input type='text' placeholder='wpisz nazwę użytkownika' />
        <label>Adres email</label>
        <input type='text' placeholder='wpisz adres email' />
        <label>Hasło</label>
        <input type='password' placeholder='wpisz hasło' />
        <button className={styles.button}>Zarejestruj</button>
      </form>
    </div>
  )
}
