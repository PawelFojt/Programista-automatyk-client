import SideBar from './components/Layout/SideBar/SideBar';
import TopBar from './components/Layout/TopBar/TopBar';
import Layout from './components/Layout/Layout';
import Footer from './components/Layout/Footer/Footer';
import React, {useState} from 'react';
import Home from './components/pages/Home/Home';
import Post from './components/pages/Posts/Post/Post';
import Posts from './components/pages/Posts/Posts';
import SinglePost from './components/pages/SinglePost/SinglePost';
import NewPost from './components/pages/NewPost/NewPost';
import Settings from './components/pages/user/Settings/Settings';
import Login from './components/pages/user/Login/Login';
import Register from './components/pages/user/Register/Register';
import './vars.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


function App() {
  const [mode, setMode] = useState("dark-mode"); 
  function modeHandler() {
    mode === "dark-mode" ? setMode("") : setMode("dark-mode");
  }
  const user = false;
  const topBar = <TopBar mode = {mode} onSwitch = {() => {modeHandler()}}/>
  const content = (
      <Routes>
        <Route path="/post" element={<Post />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/newpost" element={user ? <NewPost /> : <Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
  );
  const sideBar = <SideBar />
  const footer = <Footer />
  


  return (
    <Router>
      <div className={mode}>
        <Layout
        topBar = {topBar}
        content = {content}
        sideBar = {sideBar}
        footer = {footer} 
        />
    </div>
  </Router>
  );
}

export default App;
