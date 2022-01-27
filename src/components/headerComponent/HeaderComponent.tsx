import {Link } from 'react-router-dom'

import "./HeaderComponent.css"
const HeaderComponent = () =>{
    return(
        <div className="header-component-base">
            <div className="header-component-logo">
                <img src="https://res.cloudinary.com/protobot/image/upload/v1643042291/JP_500X500_heamdu.png" alt="" />
            </div>
            <div className="header-component-links">
                <Link 
                className="header-component-links-particular" 
                to="/">Inicio</Link>
                <Link 
                className="header-component-links-particular"
                to="/apoyo">Apoyo</Link>
            </div>
      </div> 
    )
}

export default HeaderComponent;