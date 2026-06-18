import React from 'react'
import "./CSS/About.css"
const About = () => {
  return (
    <div id='mainAbout'>
      <section id='secGrid'>
        <div className='subGridd'>
          <p id='me'>S<span style={{
            borderBottom: "3px solid #D53836",
            paddingBottom: "6px"
          }}>kil</span>ls</p>
        </div>
        <div className="subGrid" id="subGrid1">
          <p>HTML</p>
        </div>
        <div className="subGrid" id="subGrid2">
          <p>CSS</p>
        </div>
        <div className='subGrid' id='subGridJava'>
          <p>{`public class Keerthana {`}</p>
          <p style={{paddingLeft:"30px"}}>public static void main(String[] args){`{`}</p>
          <p style={{paddingLeft:"70px"}}>String[] frontEnd = {`{"HTML", "CSS", "JavaScript", "React JS"};`}</p>
          <p style={{paddingLeft:"70px"}}>String[] backEnd = {`{"Java", "SpringBoot", "JDBC", "Hibernate"}`};</p>
          <p style={{paddingLeft:"70px"}}>String[] database = {`{"SQL", "mySQL"}`};</p>
          <p style={{paddingLeft:"60px"}}>{`}`}</p>
          <p style={{paddingLeft:"10px"}}>{`}`}</p>

        </div>
        <div className="subGrid" id="subGrid3">
          <p>Java Script</p>
        </div>
        <div className="subGrid" id="subGrid4">
          <p>React JS</p>
        </div>
        <div className="subGrid" id="subGrid5">
          <p>Java</p>
        </div>
        <div className="subGrid" id="subGrid6">
          <p>Spring Boot</p>
        </div>
        <div className="subGrid" id="subGrid7">
          <p>JDBC</p>
        </div>
        <div className="subGrid" id="subGrid8">
          <p>Hibernate</p>
        </div>
      </section>
    </div>
  )
}

export default About