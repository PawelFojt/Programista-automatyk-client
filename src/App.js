import SideBar from "./components/Layout/SideBar/SideBar";
import TopBar from "./components/Layout/TopBar/TopBar";
import Home from "./components/pages/Home/Home";
import {useState} from 'react';
import Layout from "./components/Layout/Layout";
import Footer from "./components/Layout/Footer/Footer";
import './vars.css';


function App() {
  const [mode, setMode] = useState("dark-mode"); 
  function modeHandler() {
    mode === "dark-mode" ? setMode("") : setMode("dark-mode");
  }
  
  const topBar = <TopBar mode = {mode} onSwitch = {() => {modeHandler()}}/>
  const content = <Home />
  const sideBar = <SideBar />
  const footer = <Footer />
  


  return (
    <div className={mode}>
      <Layout
        topBar = {topBar}
        content = {content}
        sideBar = {sideBar}
        footer = {footer} 
      />
    </div>
  );
}

export default App;
