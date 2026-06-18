import React, { useState } from 'react'
import "./CSS/Contact.css"
import mail from "./Pics/mail.svg"
import linkedin from "./Pics/linkedin.svg"
import call from "./Pics/call.svg"
import location from "./Pics/location.svg"

const Contact = () => {
    const [yourName, setName] = useState("");
    const [message, setMessage] = useState("");
    const [fromEmail, setFromEmail] = useState("");
    const openGmail = () => {
        window.open(
            "https://mail.google.com/mail/?view=cm&fs=1&to=keerthi9643@gmail.com",
            "_blank"
        );
    };
    const openGmails = () => {
        const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=keerthi9643@gmail.com&su=${encodeURIComponent(fromEmail)}?&body=${encodeURIComponent("Hey this is "+yourName+" "+message)}`;
        window.open(gmailURL, "_blank");
    };
    return (
        <div id='contact'>
            <footer>
                <div id='head'>
                    <p id='me'>Get <span style={{
                        "border-bottom": "3px solid red",
                        paddingBottom: "6px",
                        marginBottom: "6px"
                    }}>in </span>Touch</p>
                </div>
                <aside id='firstAside'>
                    <p>Let's collaborate! I’d love to connect and explore opportunities.</p>
                    <div>
                        <img src={mail} alt="" />
                        <a href="" onClick={openGmail} id='anchorTag'>keerthi9643@gmail.com</a>
                    </div>
                    <div>
                        <img src={call} alt="" />
                        <p>90362242</p>
                    </div>
                    <div>
                        <img src={location} alt="" />
                        <p>Bangalore</p>
                    </div>
                </aside>

                <aside id='secondAside'>
                    <input type="text" className='dabba' name="name" id="" placeholder='Your Name' value={yourName}
        onChange={(e) => setName(e.target.value)}/>
                    <input type="text" className='dabba' name="mail" id="" placeholder='Your Email'   value={fromEmail}
        onChange={(e) => setFromEmail(e.target.value)} />
                    <textarea className='dabba' name="" id="" placeholder='Your Message' rows={10} cols={50} value={message}
                        onChange={(e) => setMessage(e.target.value)}></textarea>
                    <button onClick={openGmails}>Send Message</button>
                </aside>
            </footer>
        </div>
    )
}

export default Contact