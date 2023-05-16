import { useEffect, useState } from "react";
import styles from "./Register.module.css";
import PasswordAndConfirmPasswordValidation from "./Password/PasswordAndConfirmPasswordValidation";
import { registerUser } from "../../../../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [usernameErr, setUsernameErr] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [passwordInput, setPasswordInput] = useState({
        password: "",
        confirmPassword: "",
    });
    const handlePasswordChange = (e) => {
        const passwordInputValue = e.target.value.trim();
        const passwordInputFieldName = e.target.name;
        const NewPasswordInput = {
            ...passwordInput,
            [passwordInputFieldName]: passwordInputValue,
        };
        setPasswordInput(NewPasswordInput);
        setPassword(NewPasswordInput.password);
    };

    useEffect(() => {
        const usernameRegExp = /(?=.*?[#?!@$%^&*-\s])/;
        usernameRegExp.test(username)
            ? setUsernameErr(true)
            : setUsernameErr(false);
        const emailRegExp =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        !emailRegExp.test(email) ? setEmailErr(true) : setEmailErr(false);
    }, [username, email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await registerUser({
                username,
                email,
                password,
            });
            res.data && navigate("/login");
            alert(res.data.msg);
        } catch (error) {
            setError(true);
        }
    };
    return (
        <div className={styles.register}>
            <h1 className={styles.header}>Rejestracja</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>Nazwa użytkownika</label>
                <input
                    type="text"
                    placeholder="wpisz nazwę użytkownika"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                {usernameErr && (
                    <p className={styles.error}>
                        Nazwa użytkownika może składać się tylko z liter i cyfr
                    </p>
                )}
                <label>Adres email</label>
                <input
                    type="text"
                    placeholder="wpisz adres email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailErr && (
                    <p className={styles.error}>Niepoprawny adres email</p>
                )}
                <PasswordAndConfirmPasswordValidation
                    passwordInput={passwordInput}
                    handlePasswordChange={handlePasswordChange}
                    formErr={usernameErr || emailErr || username.length === 0}
                    buttonText={"Zarejestruj"}
                />
            </form>
            {error && (
                <span className={styles.error}>
                    Nazwa użytkownika lub adres e-mail jest już zajęta
                </span>
            )}
        </div>
    );
}
