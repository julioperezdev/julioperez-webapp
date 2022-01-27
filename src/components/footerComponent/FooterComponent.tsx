import { Link } from 'react-router-dom'

import "./FooterComponent.css"

import SocialMediaComponent from "../socialMediaComponent/SocialMediaComponent"

const FooterComponent = () =>{
    return(
        <div className="footer-base">
            <SocialMediaComponent/>
            <br />
            <Link 
            className="footer-terms-and-condition" 
            to="/terminos-y-condiciones">Términos y Condiciones</Link>
            <br />
            <a href="https://www.linkedin.com/in/jperezviloria/">© 2022 Julio Perez</a>
        </div>
    )
}

export default FooterComponent