import DonationCheckoutComponent from "../../components/donationCheckoutComponent/DonationCheckoutComponent"
import SocialMediaComponent from "../../components/socialMediaComponent/SocialMediaComponent"
import "./Welcome.css"

const Welcome = (): JSX.Element =>{
    return(
        <div>
            <div className="welcome-text">
                <h1>Bienvenido a Julioperez.dev</h1>
                <h3>Estamos en proceso de desarrollo de la plataforma de educación web</h3>
                <SocialMediaComponent/>
            </div>
            
            <div className="welcome-media">
                <img src="https://res.cloudinary.com/protobot/image/upload/v1643042291/JP_500X500_heamdu.png" alt="" />
                <iframe width="560" height="315" src="https://www.youtube.com/embed/JXowSZqEGHw" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
            </div>
            <DonationCheckoutComponent/>
        </div>
    )
}

export default Welcome;