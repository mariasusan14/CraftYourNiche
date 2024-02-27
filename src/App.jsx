import { useEffect, useState } from "react";
import Background from "./components/Background/Background";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero"; // Add this import statement
import { Routes,Route } from "react-router-dom";

const App = () => {
  let herodata = [
    { text1: "Dive Into ", text2: "What you Love" },
    { text1: "Indulge", text2: "your passion" },
    { text1: "Give in to", text2: "your passion" },
  ];

  const [heroCount, setHeroCount] = useState(2);
  const [playStatus, setPlayStatus] = useState(false);

  useEffect(()=>{
    setInterval(() => {
      setHeroCount((count)=>{return count==2?0:count+1})
    }, 3000);
  },[])
  
  return (
    <div>
      <Background playStatus={playStatus} heroCount={heroCount} />
      <Navbar />
      <Hero
        setPlayStatus={setPlayStatus}
        herodata={herodata[heroCount]}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        playStatus={playStatus}
      />
    </div>
    <Routes></Routes>
  );
};

export default App;
