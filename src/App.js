import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Context } from "./context/Context";
import TopBar from "./components/Layout/TopBar/TopBar";
import Layout from "./components/Layout/Layout";
import Footer from "./components/Layout/Footer/Footer";
import Home from "./components/pages/Home/Home";
import Posts from "./components/pages/Posts/Posts";
import SinglePost from "./components/pages/SinglePost/SinglePost";
import NewPost from "./components/pages/NewPost/NewPost";
import Settings from "./components/pages/user/Settings/Settings";
import Login from "./components/pages/user/Login/Login";
import Register from "./components/pages/user/Register/Register";
import Contact from "./components/pages/Contact/Contact";
import "./globalStyles.css";

function App() {
    //mode change
    const [mode, setMode] = useState(
        JSON.parse(window.localStorage.getItem("mode"))
    );
    const [searchByTitle, setSearchByTitle] = useState("");

    useEffect(() => {
        window.localStorage.setItem("mode", JSON.stringify(mode));
    }, [mode]);

    function modeHandler() {
        mode === "dark-mode" ? setMode("") : setMode("dark-mode");
    }

    const onSearch = (e) => {
        setSearchByTitle(e);
    };
    //get user info
    const { user } = useContext(Context);
    //mode change
    const topBar = (
        <TopBar
            mode={mode}
            onSearch={onSearch}
            onSwitch={() => {
                modeHandler();
            }}
        />
    );
    const content = (
        <Routes>
            <Route path="/contact" element={<Contact />} />
            <Route
                path="/posts"
                element={<Posts searchByTitle={searchByTitle} />}
            />
            <Route path="/post/:postId" element={<SinglePost />} />
            <Route path="/newpost" element={user ? <NewPost /> : <Login />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route path="/register" element={user ? <Home /> : <Register />} />
            <Route path="/" element={<Home />} />
        </Routes>
    );

    const footer = <Footer />;

    return (
        <Router>
            <div className={mode}>
                <Layout topBar={topBar} content={content} footer={footer} />
            </div>
        </Router>
    );
}

export default App;
