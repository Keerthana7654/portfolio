import React from 'react'
import "./CSS/Solar.css"
import java from "./assets/java.svg"
import sql from "./assets/sql.svg"
import react from "./assets/react.svg"
import js from "./assets/js.png"
import boot from "./assets/boot.svg"
import css from "./assets/css.svg"
import pic from "./assets/myPic.jpg"
const Solar = () => {
    return (
        <div>
            <main>
                <div className="solar-system" id='orbit1'>
                    <div id="java">
                        <img src={java} alt="" className='pics' />
                    </div>
                </div>
                <div className="solar-system" id='orbit2'>
                    <div id="sql">
                        <img src={sql} alt="" className='pics' />
                    </div>
                </div>
                <div className="solar-system" id='orbit3'>
                    <div id="react">
                        <img src={react} alt="" className='pics' />
                    </div>
                </div>
                <div className="solar-system" id='orbit4'>
                    <div id="js">
                        <img src={js} alt="" className='pics' />
                    </div>
                </div>
                <div id='pic'>
                    <img src={pic} alt="myPic" id='myPic' />
                </div>
                <div className="solar-system" id='orbit5'>
                    <div id="springboot">
                    <img src={boot} alt="" className='pics' />
                    </div>
                </div>
                <div className="solar-system" id='orbit6'>
                    <div id="css">
                    <img src={css} alt="" className='pics' />
                    </div>
                </div>

            </main>
        </div>
    )
}

export default Solar