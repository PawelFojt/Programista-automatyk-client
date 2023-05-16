import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../../api";
import { Context } from "../../../../context/Context";
import {
    LoginStart,
    LoginFailure,
    LoginSuccess,
} from "../../../../context/Actions";
import jwt_decode from "jwt-decode";
import styles from "./Login.module.css";

export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching, error } = useContext(Context);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(LoginStart());
        try {
            const res = await loginUser({
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            const accessToken = res.data.accessToken;
            const decodedData = jwt_decode(accessToken);
            dispatch(LoginSuccess({ ...decodedData, accessToken }));
            navigate("/settings");
        } catch (error) {
            setErrorMessage(error.response.data.msg);
            dispatch(LoginFailure());
        }
    };

    return (
        <div className={styles.login}>
            <h1 className={styles.header}>Logowanie</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="username">Nazwa użytkownika</label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="wpisz nazwę użytkownika"
                    ref={userRef}
                />
                <label htmlFor="password">Hasło</label>
                <input
                    id="password"
                    type="password"
                    name="current-password"
                    placeholder="wpisz hasło"
                    ref={passwordRef}
                />
                <button
                    className="button cursor__wait"
                    type="submit"
                    disabled={isFetching}
                >
                    Zaloguj
                </button>
                {error && <p className={styles.error}>{errorMessage}</p>}
            </form>
            <label htmlFor="register">Nie masz konta? Zarejestruj się!</label>
            <Link to="../register">
                <button id="register" className="button">
                    Rejestracja
                </button>
            </Link>
        </div>
    );
}
