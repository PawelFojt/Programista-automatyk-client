import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./SinglePost.module.css";
import { Context } from "../../../context/Context";
import ReactQuill from "react-quill";
import EditorToolbar, {
    modules,
    formats,
} from "../../EditorToolbar/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { v4 as uuid } from "uuid";
import {
    deletePost,
    singlePost,
    updatePost,
    updatePostPhoto,
    urlImg,
} from "../../../api";
import ConfirmationPopup from "../../UI/ConfirmationPopup/ConfirmationPopup";
import Loading from "../../UI/Loading/Loading";
import { errorMessage } from "../../../utils/errorMessage";

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [isPopupDisplayed, setIsPopupDisplayed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isNotCorrect, setIsNotCorrect] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getPost = async () => {
            const res = await singlePost(path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setIsLoading(false);
        };
        getPost();
    }, [path, isUpdateMode]);

    useEffect(() => {
        title && desc ? setIsNotCorrect(false) : setIsNotCorrect(true);
        setErrorMsg(null);
        setIsLoading(false);
    }, [title, desc]);

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            const token = user.accessToken;
            await deletePost(path, token);
            setIsPopupDisplayed(false);
            navigate("/posts");
        } catch (error) {
            console.error(error);
        }
    };

    //update post
    const handleUpdate = async () => {
        setIsLoading(true);
        const updatedPost = {
            username: user.username,
            title,
            desc,
        };
        if (file) {
            const data = new FormData();
            const filename = `${uuid()}-${file.name}`;
            data.append("name", filename);
            data.append("file", file);
            updatedPost.photo = filename;
            try {
                await updatePostPhoto(data);
            } catch (error) {
                console.error(error);
            }
        }
        try {
            await updatePost(path, updatedPost);
            setIsUpdateMode(false);
        } catch (error) {
            console.log(error);
            setErrorMsg(errorMessage(error.response.status));
        }
    };

    //handle desc change from quill text editor
    const handleDescChange = (value) => {
        setDesc(value);
    };

    return (
        <>
            {isLoading && !errorMsg ? (
                <Loading />
            ) : (
                <article className={styles.singlePost}>
                    <label htmlFor="fileInput" className={styles.imgContainer}>
                        {file ? (
                            <img
                                className={styles.img}
                                src={URL.createObjectURL(file)}
                                alt="Post"
                            />
                        ) : (
                            <>
                                {post.photo ? (
                                    <img
                                        className={styles.img}
                                        src={`${urlImg}${post.photo}`}
                                        alt="Post"
                                    />
                                ) : (
                                    <>
                                        {isUpdateMode ? (
                                            <i
                                                className={`${styles.imgIcon} fa-solid fa-image`}
                                            />
                                        ) : null}
                                    </>
                                )}
                            </>
                        )}
                    </label>

                    {isUpdateMode ? (
                        <>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                accept="image/png, image/jpeg"
                                id="fileInput"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <input
                                autoFocus
                                type="text"
                                value={title}
                                className={styles.title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </>
                    ) : (
                        <div className={styles.flexContainer}>
                            <h1 className={styles.title}>{title}</h1>
                            {user && post.username === user.username && (
                                <>
                                    <i
                                        className={`${styles.icon} fa-solid fa-pencil`}
                                        onClick={() => setIsUpdateMode(true)}
                                    ></i>
                                    <i
                                        className={`${styles.icon} fa-solid fa-trash-can`}
                                        onClick={() =>
                                            setIsPopupDisplayed(true)
                                        }
                                    ></i>
                                    {isPopupDisplayed && (
                                        <ConfirmationPopup
                                            yes={handleDelete}
                                            no={() =>
                                                setIsPopupDisplayed(false)
                                            }
                                            message="Czy na pewno chcesz usunąć ten post?"
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    )}
                    <div className={styles.info}>
                        <span className={styles.author}>
                            Autor:
                            <Link
                                to={`/posts/?user=${post.username}`}
                                className={styles.link}
                            >
                                {` ${post.username}`}
                            </Link>
                        </span>
                        <span className={styles.cat}>
                            Kategoria:
                            <Link
                                to={`/posts/?cat=${post.categories}`}
                                className={styles.link}
                            >
                                {` ${post.categories}`}
                            </Link>
                        </span>
                        <span className={styles.date}>
                            {new Date(post.createdAt).toDateString()}
                        </span>
                    </div>

                    {isUpdateMode ? (
                        <div className={styles.editor}>
                            <EditorToolbar toolbarId={"t1"} />
                            <ReactQuill
                                theme="snow"
                                value={desc}
                                onChange={handleDescChange}
                                placeholder={"Napisz coś..."}
                                modules={modules("t1")}
                                formats={formats}
                            />
                        </div>
                    ) : (
                        <div
                            className={`ql-editor ${styles.editor}`}
                            dangerouslySetInnerHTML={{ __html: post.desc }}
                        ></div>
                    )}
                    {isUpdateMode && (
                        <button
                            className="button"
                            disabled={isNotCorrect}
                            onClick={handleUpdate}
                        >
                            Aktualizuj!
                        </button>
                    )}
                    {errorMsg && <p className="error">{errorMsg}</p>}
                </article>
            )}
        </>
    );
}
