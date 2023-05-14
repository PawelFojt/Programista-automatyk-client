import { useEffect, useState } from "react";
import PasswordInputField from "./PasswordInputField";
import ConfirmPasswordInputField from "./ConfirmPasswordInputField";
import styles from "./Password.module.css";

function PasswordAndConfirmPasswordValidation({
    passwordInput,
    handlePasswordChange,
    formErr,
    buttonText,
}) {
    const [passwordError, setPasswordErr] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordCorrect, setPasswordCorrect] = useState(false);

    useEffect(() => {
        if (
            !passwordError &&
            !confirmPasswordError &&
            !formErr &&
            passwordInput.confirmPassword.length > 0
        ) {
            setPasswordCorrect(true);
        } else {
            setPasswordCorrect(false);
        }
    }, [
        passwordError,
        confirmPasswordError,
        formErr,
        passwordInput.confirmPassword.length,
    ]);

    const handleValidation = (e) => {
        const passwordInputValue = e.target.value.trim();
        const passwordInputFieldName = e.target.name;
        //for password
        if (passwordInputFieldName === "password") {
            const uppercaseRegExp = /(?=.*?[A-Z])/;
            const lowercaseRegExp = /(?=.*?[a-z])/;
            const digitsRegExp = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
            const minLengthRegExp = /.{8,}/;
            const passwordLength = passwordInputValue.length;
            const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
            const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
            const digitsPassword = digitsRegExp.test(passwordInputValue);
            const specialCharPassword =
                specialCharRegExp.test(passwordInputValue);
            const minLengthPassword = minLengthRegExp.test(passwordInputValue);
            let errMsg = "";
            if (passwordLength === 0) {
                errMsg = "Pole nie może być puste";
            } else if (!uppercasePassword) {
                errMsg = "Musi zawierać co najmniej jedną dużą literę";
            } else if (!lowercasePassword) {
                errMsg = "Musi zawierać co najmniej jedną małą literę";
            } else if (!digitsPassword) {
                errMsg = "Musi zawierać co najmniej jedną cyfrę";
            } else if (!specialCharPassword) {
                errMsg = "Musi zawierać co najmniej jeden znak specjalny";
            } else if (!minLengthPassword) {
                errMsg = "Musi zawierać co najmniej 8 znaków";
            } else {
                errMsg = "";
            }
            setPasswordErr(errMsg);
        }
        // for confirm password
        if (
            passwordInputFieldName === "confirmPassword" ||
            (passwordInputFieldName === "password" &&
                passwordInput.confirmPassword.length > 0)
        ) {
            if (passwordInput.confirmPassword !== passwordInput.password) {
                setConfirmPasswordError("Hasło musi być takie same");
            } else {
                setConfirmPasswordError("");
            }
        }
    };
    return (
        <div className={styles.passwordWrapper}>
            <label>Hasło</label>
            <PasswordInputField
                handlePasswordChange={handlePasswordChange}
                handleValidation={handleValidation}
                passwordValue={passwordInput.password}
                passwordError={passwordError}
            />
            <label>Powtórz Hasło</label>
            <ConfirmPasswordInputField
                handlePasswordChange={handlePasswordChange}
                handleValidation={handleValidation}
                confirmPasswordValue={passwordInput.confirmPassword}
                confirmPasswordError={confirmPasswordError}
            />
            <button
                className="button cursor__not-allowed"
                type="submit"
                disabled={!passwordCorrect}
            >
                {buttonText}
            </button>
        </div>
    );
}
export default PasswordAndConfirmPasswordValidation;
