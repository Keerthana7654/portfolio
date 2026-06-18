import React, { useEffect, useState } from 'react'
import "./CSS/Home.css"
import Solar from "./Solar"
import instagram from "./Pics/instagram.svg"
import linkedin from "./Pics/linkedin.svg"

const Home = () => {
  let downloadCV = () => {
    open("/src/Resume.pdf");
  }
  let insta = ()=>{
    open("https://www.instagram.com/ll__keerthana__ll?utm_source=qr&igsh=MXZ6ZjB6ZXZuZXZ5bQ==")
  }
  let linkedIn = ()=>{
    open("https://www.linkedin.com/in/keerthana-r-8a19a3340")
  }
  const texts = [
    "Proficient in Java",
    "React UI developer",
    "SpringBoot developer",
    "Skilled in SQL"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleAnimationEnd = () => {
    setIndex((prev) => (prev + 1) % texts.length);
  };


  return (
    <div id='homeDiv'>
      <aside id='aside1'>
        <div>
          <li className='text'>Hello I'm  Keerthana 👋</li>
        </div>

        <div id='change'>
          <li id='names' key={index} onAnimationEnd={handleAnimationEnd}>{texts[index]}</li>
        </div>

        <div>
          <li className='text'>Expanding skills and aspiring to gain knowledge from various source</li>
        </div>

        <div>
          <button id='CVbtn' onClick={downloadCV}>
            Download CV
          </button>
        </div>

        <div id='icons'>
          <img src={instagram} alt="" className='icon' onClick={insta} />
          <img src={linkedin} alt="" className='icon' onClick={linkedIn} />
        </div>

      </aside>

      <aside id='aside2'>
        <Solar></Solar>
      </aside>
    </div>
  )
}

export default Home