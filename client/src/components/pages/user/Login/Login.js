import styles from './Login.module.css';

export default function Login() {
  return (
    <div className={styles.login}>
      <h1 className={styles.header}>Logowanie</h1>
      <form className={styles.form}>
        <label>Adres email</label>
        <input type='text' placeholder='wpisz adres email' />
        <label>Hasło</label>
        <input type='password' placeholder='wpisz hasło' />
        <button className={styles.button}>Zaloguj</button>
      </form>
      <label>Nie masz konta? Zarejestruj się!</label>
      <button className={styles.button}>Rejestracja</button>
    </div>
  )
}
