import {useState, useEffect} from "react"
import {useForm} from "react-hook-form"
import axios from "axios"
import Swal from "sweetalert2"

import "./DonationCheckoutComponent.css"

const DonationCheckoutComponent = ():JSX.Element =>{

    const URL_IMAGE_ARGENTINA_FLAG : string = "https://res.cloudinary.com/protobot/image/upload/v1643051021/i-8154-cG.22202.1_cv8son.jpg";
    const URL_IMAGE_USA_FLAG : string = "https://res.cloudinary.com/protobot/image/upload/v1643051016/images_po1xdx.png";


    const CURRENCY_PESO_ARGENTINO : string = "ARS";
    const CURRENCY_DOLAR_AMERICANO : string = "USD";

    const {register, handleSubmit} = useForm()

    const [currencySelected, setCurrencySelected] = useState('');
    const [currencyNoSelected, setCurrencyNoSelected] = useState('');

    const [currency, setCurrency] = useState('');
    const [countryFlag, setCountryFlag] = useState('');
    
    const [checkoutLink, setCheckoutLink] = useState(null)
    //const [finishProcess, setFinishProcess] = useState(false);

    const onSubmitDonation = async(dataForm: any) =>{
        console.log(dataForm)
        if(!dataForm.cantidad){
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Es necesario colocar el monto a donar',
            
              })
        }
        const checkoutRequest = {
            value: dataForm.cantidad,
            currency,
            email: dataForm.email,
            name: dataForm.nombre,
            surname: dataForm.apellido
        }
        await axios.put("http://localhost:8080/api/v1/checkout/generate",checkoutRequest).then(
        async response =>{
            console.log(response)
            setCheckoutLink(response.data.body)
        }
        )
    }

    const getIpAddres = async(): Promise<String> =>{
        const ipAddressResponseService = await axios.get('https://geolocation-db.com/json/')
        const publicId : String = await ipAddressResponseService.data.IPv4;
        return publicId;
    }
    const ipAddressIsFromArgentina = async() =>{
        const ipAddress : String = await getIpAddres();
        await axios.put(`http://localhost:8080/api/v1/checkout/decide/country/${ipAddress}`).then(
            response=>{
                if(response.status === 500 || response.data.body !== "Argentina"){
                    setCountryFlagAndCurrencyInLocalStorage(URL_IMAGE_USA_FLAG, CURRENCY_DOLAR_AMERICANO);
                }
                if(response.status === 200 && response.data.body === "Argentina"){
                    setCountryFlagAndCurrencyInLocalStorage(URL_IMAGE_ARGENTINA_FLAG, CURRENCY_PESO_ARGENTINO);
                }
            }
        )
    }

    const setCountryFlagAndCurrencyInLocalStorage = (urlImageCountryFlag : string, currency :string) =>{
        setCountryFlag(urlImageCountryFlag);
        setCurrency(currency);
        localStorage.setItem("urlImageCountryFlag", urlImageCountryFlag);
        localStorage.setItem("currency", currency);
        if(!currencySelected || !currencyNoSelected){
            selectionCurrencyInOption(currency);
        }
        
    }

    const getCountryFlagAndCurrencyFromLocalStorage = () =>{
        const urlImageCountryFlag = localStorage.getItem("urlImageCountryFlag");
        const currency = localStorage.getItem("currency");
        if(urlImageCountryFlag && currency){
            setCountryFlag(urlImageCountryFlag);
            setCurrency(currency);
            if(!currencySelected || !currencyNoSelected){
                selectionCurrencyInOption(currency);
            }
        }
    }

    const selectionCurrencyInOption = (currency:string) =>{
        setCurrencySelected(currency);
        currency === CURRENCY_PESO_ARGENTINO ? 
        setCurrencyNoSelected(CURRENCY_DOLAR_AMERICANO) : 
        setCurrencyNoSelected(CURRENCY_PESO_ARGENTINO);
        
    }

    const changeCurrency = (selected:any) =>{
        console.log(selected.target.value)
        let newCurrency : string = selected.target.value;
        newCurrency === CURRENCY_PESO_ARGENTINO ? 
        setCountryFlagAndCurrencyInLocalStorage(URL_IMAGE_ARGENTINA_FLAG, CURRENCY_PESO_ARGENTINO):
        setCountryFlagAndCurrencyInLocalStorage(URL_IMAGE_USA_FLAG, CURRENCY_DOLAR_AMERICANO);
        //selectionCurrencyInOption(newCurrency);
    }

    useEffect(() =>{
        if(localStorage.getItem("urlImageCountryFlag") === null || localStorage.getItem("currency") === null){
            ipAddressIsFromArgentina();
        }
        if(localStorage.getItem("urlImageCountryFlag") !== null && localStorage.getItem("currency") !== null){
            getCountryFlagAndCurrencyFromLocalStorage();
        }
        if(currency){
            selectionCurrencyInOption(currency);
        }
    },[])

    return(
        checkoutLink?
        <>
            {window.open(checkoutLink, '_blank')}
            <h1 className="donate-checkout-component-redirect">Estás cerca de realizar tu apoyo</h1>
        </>:
        <form 
        className="donate-checkout-component-base"
        action="" onSubmit={handleSubmit(onSubmitDonation)}>
                <div className="donation-quantity-flag">
                    <input
                    {...register("cantidad")} 
                    className="donation-quantity"
                    placeholder="Cantidad"
                    type="number"
                    autoComplete="false"
                    />
                    <img 
                    className="donation-flag"
                    src={countryFlag} alt="" />
                    <select name="" id="" onChange={(e)=>changeCurrency(e)} >
                        <option 
                        value={currencySelected}>
                            {currencySelected} $
                        </option>
                        <option 
                        value={currencyNoSelected}>
                            {currencyNoSelected} $
                        </option>
                    </select>
                </div>
                <details className="donation-optional-info-base">
                    <summary>
                        Datos opcionales (mejora la experiencia)
                    </summary>
                    <div className="donation-optional-info">
                        <input 
                        {...register("email")}
                        type="email" 
                        placeholder="Email"/>
                        <input
                        {...register("nombre")} 
                        type="text" 
                        placeholder="Nombre"/>
                        <input 
                        {...register("apellido")}
                        type="text" 
                        placeholder="Apellido"/>
                    </div>
                </details>
                <button className="donate-checkout-component-button">apoyar</button>
        </form>
    )
}

export default DonationCheckoutComponent;