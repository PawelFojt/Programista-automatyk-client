import React, { useContext, useState, useEffect } from "react";
import {
    deleteUser,
    getToken,
    updateUser,
    updateUserPhoto,
    urlImg,
} from "../../../../api";
import { Context } from "../../../../context/Context";
import {
    UpdateStart,
    UpdateFailure,
    UpdateSuccess,
    Logout,
} from "../../../../context/Actions";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import ConfirmationPopup from "../../../UI/ConfirmationPopup/ConfirmationPopup";
import PasswordAndConfirmPasswordValidation from "../Register/Password/PasswordAndConfirmPasswordValidation";
import jwt_decode from "jwt-decode";
import axios from "axios";
import styles from "./Settings.module.css";

export default function Settings() {
    const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [passwordInput, setPasswordInput] = useState({
        password: "",
        confirmPassword: "",
    });
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(null);
    const [displayPopup, setDisplayPopup] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [expire, setExpire] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
    });

    const refreshToken = async () => {
        try {
            const response = await getToken();
            setAccessToken(response.data.accessToken);
            console.log(accessToken)
            const decodedData = jwt_decode(accessToken);
            console.log(decodedData);
            dispatch(UpdateSuccess({ ...decodedData, accessToken }));
            setExpire(decodedData.exp);
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    };

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            if (expire * 1000 < currentDate.getTime()) {
                const response = await getToken();
                console.log(response);
                config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                setAccessToken(response.data.accessToken);
                const decoded = jwt_decode(response.data.accessToken);
                setExpire(decoded.exp);
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(UpdateStart());
        const updatedUser = {
            userId: user._id,
            username: user.username,
            email: user.email,
            password,
        };
        if (file) {
            const data = new FormData();
            const filename = `${uuid()}-${file.name}`;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await updateUserPhoto(data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            const res = await updateUser(user._id, updatedUser);
            const userInfo = res.data;
            setSuccess(true);
            dispatch(UpdateSuccess(userInfo));
        } catch (error) {
            console.log(error);
            setSuccess(false);
            dispatch(UpdateFailure());
        }
    };

    const handleDelete = async () => {
        try {
            await deleteUser(user._id);
            setDisplayPopup(false);
            dispatch(Logout());
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.settings}>
                <div className={styles.title}>
                    <span className={styles.updateTitle}>
                        Uaktualnij swoje konto
                    </span>
                    <span
                        onClick={() => setDisplayPopup(true)}
                        className={styles.deleteTitle}
                    >
                        <i
                            className={`${styles.userIcon} fa-solid fa-trash`}
                        ></i>
                    </span>
                </div>
                {displayPopup && (
                    <ConfirmationPopup
                        yes={handleDelete}
                        no={() => setDisplayPopup(false)}
                        message="Czy na pewno chcesz usunąć swoje konto?"
                    />
                )}
                <div className={styles.userInfo}>
                    <p>
                        Nazwa użytkownika: <span>{user?.username}</span>
                    </p>
                    <p>
                        Adres e-mail: <span>{user?.email}</span>
                    </p>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>Zdjęcie profilowe</label>
                    <div className={styles.img}>
                        {user?.profilePic && (
                            <img
                                src={
                                    file
                                        ? URL.createObjectURL(file)
                                        : urlImg + user.profilePic
                                }
                                alt="zdjęcie profilowe"
                            />
                        )}
                        <label htmlFor="fileInput">
                            <i
                                className={`${styles.userIcon} fa-solid fa-user`}
                            ></i>
                        </label>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            name="file"
                            id="fileInput"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <PasswordAndConfirmPasswordValidation
                        passwordInput={passwordInput}
                        handlePasswordChange={handlePasswordChange}
                        buttonText="Aktualizuj"
                    />
                    {success ? <span>Zaktualizowano pomyślnie!</span> : null}
                </form>
            </div>
        </div>
    );
}
