import styles from './Password.module.css';

function PasswordInputField({handleValidation, handlePasswordChange, passwordValue, passwordError}){
  return (
      <>
  <div className={styles.password}>
      <input 
        type="password"
        value={passwordValue}  
        onChange={handlePasswordChange} 
        onKeyUp={handleValidation} 
        name="password" 
        placeholder="wpisz hasło" 
        className="form-control" />
      <p className={styles.warning}>{passwordError}</p>
 </div>
        
      </>
  )
}
export default PasswordInputField;