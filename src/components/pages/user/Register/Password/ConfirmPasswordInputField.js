import styles from "./Password.module.css";

function ConfirmPasswordInputField({
    handleValidation,
    handlePasswordChange,
    confirmPasswordValue,
    confirmPasswordError,
}) {
    return (
        <>
            <div className={styles.password}>
                <input
                    type="password"
                    value={confirmPasswordValue}
                    onChange={handlePasswordChange}
                    onKeyUp={handleValidation}
                    name="confirmPassword"
                    autoComplete="new-password"
                    placeholder="powtórz hasło"
                    className="form-control"
                />
                <p className={styles.warning}>{confirmPasswordError}</p>
            </div>
        </>
    );
}
export default ConfirmPasswordInputField;
