import './Footer.css'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {

    return (
        <div className="footer" id='form-footer'>
            <div className='links-display'>
            <div className="links">
                <p>Syed</p>
                <hr />
                <div className='link-icons'>
                    <a href="https://github.com/withdrw" target='_blank' rel="noreferrer"><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/syedzaidii/" target='_blank' rel="noreferrer"><FaLinkedin /></a>
                </div>
            </div>
            <div className="group-links">
                <p>Drew</p>
                <hr />
                <div className='link-icons'>
                    <a href="https://github.com/dfout" target='_blank' rel="noreferrer"><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/drew-fout/" target='_blank' rel="noreferrer"><FaLinkedin /></a>
                </div>
            </div>
            <div className="group-links">
                <p>Zach</p>
                <hr />
                <div className='link-icons'>
                    <a href="https://github.com/Zach-gold" target='_blank' rel="noreferrer"><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/zacharyryangold/" target='_blank' rel="noreferrer"><FaLinkedin /></a>
                </div>
            </div>
            <div className="group-links">
                <p>Kyle</p>
                <hr />
                <div className='link-icons'>
                    <a href="https://github.com/PR55" target='_blank' rel="noreferrer"><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/kyle-joel-flores/" target='_blank' rel="noreferrer"><FaLinkedin /></a>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Footer;
