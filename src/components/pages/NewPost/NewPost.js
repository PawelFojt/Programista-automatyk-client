import React, { useContext, useState, useEffect } from "react";
import { useCategoryList } from "../../../Hooks/useCategoryList";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../context/Context";
import { v4 as uuid } from "uuid";
import { createNewPost, createPostPhoto } from "../../../api";
import styles from "./NewPost.module.css";
import ReactQuill from "react-quill";
import EditorToolbar, {
    modules,
    formats,
} from "../../EditorToolbar/EditorToolbar";
import Loading from "../../UI/Loading/Loading";
import "react-quill/dist/quill.snow.css";
import { errorMessage } from "../../../utils/errorMessage";

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState(["Automatyka"]);
    const { user } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [notCorrect, setNotCorrect] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const { cats } = useCategoryList();

    const navigate = useNavigate();

    useEffect(() => {
        title && desc ? setNotCorrect(false) : setNotCorrect(true);
        setErrorMsg("");
        setIsLoading(false);
    }, [title, desc]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newPost = {
            username: user.username,
            title,
            desc,
            categories,
        };
        if (file) {
            const data = new FormData();
            const filename = `${uuid()}-${file.name}`;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await createPostPhoto(data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            const token = user.accessToken;
            const res = await createNewPost(newPost, token);
            navigate(`/post/${res.data._id}`);
        } catch (error) {
            console.log(error);
            setErrorMsg(errorMessage(error.response.status));
        }
    };

    const onDescChange = (value) => {
        setDesc(value);
    };

    const options =
        cats && cats?.map((c) => ({ label: c.name, value: c.name }));

    return (
        <div className={styles.newPost}>
            {isLoading && !errorMsg ? (
                <Loading />
            ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formContainer}>
                        <label
                            htmlFor="fileInput"
                            className={styles.imgContainer}
                        >
                            {file ? (
                                <img
                                    className={styles.img}
                                    src={URL.createObjectURL(file)}
                                    alt="Post"
                                />
                            ) : (
                                <i
                                    className={`${styles.icon} fa-solid fa-image`}
                                />
                            )}
                        </label>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            accept="image/png, image/jpeg"
                            id="fileInput"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor="catSelect">Wybierz kategorie:</label>
                        <select
                            name="catSelect"
                            className={styles.catSelect}
                            onChange={(e) => setCategories([e.target.value])}
                        >
                            {options?.map((option, index) => (
                                <option
                                    className={styles.catOption}
                                    key={index}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <input
                            className={styles.title}
                            type="text"
                            placeholder="Tytuł"
                            id="titleInput"
                            required="true"
                            autoFocus={true}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className={styles.editor}>
                        <EditorToolbar toolbarId={"t1"} />
                        <ReactQuill
                            theme="snow"
                            value={desc}
                            onChange={onDescChange}
                            placeholder={"Napisz coś..."}
                            modules={modules("t1")}
                            formats={formats}
                        />
                    </div>
                    <button
                        className="button cursor__not-allowed"
                        type="submit"
                        disabled={notCorrect}
                    >
                        Opublikuj
                    </button>
                    {errorMsg && <p className="error">{errorMsg}</p>}
                </form>
            )}
        </div>
    );
}
