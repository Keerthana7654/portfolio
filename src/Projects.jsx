import React from 'react'
import "./CSS/Projects.css"
import boot from "./Pics/boot.svg"
import react from "./Pics/react.svg"
// import react from "./Pics/react.svg"
const Projects = () => {
    let gitJava = ()=>{
        open("https://github.com/Keerthana7654/Intrusion-Detection-and-Prevention")
    }
    let gitAI = ()=>{
        open("https://github.com/Keerthana7654/AI-Emotion-Adaptive-UI-Dynamic-Frontend-that-changes-based-on-user-mood-")
    }
    return (
        <div>
            <section id='gridSec'>
                <div className="projectsGrids" id="prjGrid1">
                    <p>My <span style={{
                        borderBottom: "3px solid #D53836",
                        paddingBottom: "6px"
                    }}>Proj</span>ects</p>
                </div>
                <div className="projectsGrid" id="prjGrid2">
                    <img src={boot} alt="" height="150px" width="300px" />
                    <h3>Intrusion Detection and Prevention</h3>
                    <p>It is a website to pervent and catch the cyber criminals who enter the website.</p>
                    <div>
                        <button className='roundBtn'>Java</button>
                        <button className='roundBtn'>Sping Boot</button>
                        <button className='roundBtn'>Servlets</button>
                    </div>
                    <button className='gitBtn' onClick={gitJava}>GitHub</button>
                </div>
                <div className="projectsGrid" id="prjGrid3">
                <img src={react} alt="" height="150px" width="300px" />
                    <h3>AI Driven Emotion Adaptive Gaming UI</h3>
                    <p>A gaming website which changes based on the user's mood to give an effective gameplay for the user.</p>
                    <div>
                        <button className='roundBtn'>React JS</button>
                        <button className='roundBtn'>Face API.js</button>
                        <button className='roundBtn'>JavaScript</button>
                    </div>
                    <button className='gitBtn' onClick={gitAI}>GitHub</button>
                </div>
                <div className="projectsGrid" id="prjGrid4">
                <img src={react} alt="" height="150px" width="300px" />
                    <h3>Protfolio</h3>
                    <p>Introducing a person in the form of website is nothing but a portfolio.</p>
                    <div>
                        <button className='roundBtn'>React JS</button>
                        <button className='roundBtn'>HTML,CSS</button>
                        <button className='roundBtn'>Java Script</button>
                    </div>
                    <button className='gitBtn'>GitHub</button>
                </div>
                {/* <div className="projectsGrid" id="prjGrid5">
                    <p>Intrusion Detection and Prevention</p>
                    <p>About it</p>
                    <div>
                        <button className='roundBtn'>Java</button>
                        <button className='roundBtn'>Sping Boot</button>
                        <button className='roundBtn'>Servlets</button>
                    </div>
                    <button className='gitBtn'>GitHub</button>
                </div>
                <div className="projectsGrid" id="prjGrid6">
                    <p>Intrusion Detection and Prevention</p>
                    <p>About it</p>
                    <div>
                        <button className='roundBtn'>Java</button>
                        <button className='roundBtn'>Sping Boot</button>
                        <button className='roundBtn'>Servlets</button>
                    </div>
                    <button className='gitBtn'>GitHub</button>
                </div> */}
            </section>
        </div>
    )
}

export default Projects