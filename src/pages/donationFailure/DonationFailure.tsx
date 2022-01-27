import DonationCheckoutComponent from "../../components/donationCheckoutComponent/DonationCheckoutComponent";

import "./DonationFailure.css"

const DonationFailure = () =>{
    return(
        <div>
            <div className="donation-failure-base">
                <h1>UUUUUPS...</h1>
                <img src="https://res.cloudinary.com/protobot/image/upload/v1643042291/JP_500X500_heamdu.png" alt="" />
                <h1>Si no pudiste terminarlo puedes volver a intentarlo</h1>
            </div>
            <DonationCheckoutComponent/>
        </div>
    )
}

export default DonationFailure;