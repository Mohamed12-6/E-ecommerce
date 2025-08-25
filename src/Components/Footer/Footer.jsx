import { Link } from 'react-router-dom'
import amazon from "../../assets/images/amazon-pay.png"
import mastercard from "../../assets/images/mastercard.webp"
import paypal from "../../assets/images/paypal.png"
import appGoogle from "../../assets/images/get-apple-store.png"


function ShareApp () {
    window.open(location.origin)
}

export default function Footer() {
  return <>
  
   <footer className='py-10'>
    <div className="container mx-auto mt-10 px-1">
        <h2 className="text-3xl font-bold text-gray-800">Get Fresh cart App</h2>
        <p className="opacity-65 text-gray-600 text-lg mb-5">we will send to you download link , open it and download App</p>
        <div className="flex gap-5">
            <input type="email" className="inputs flex-grow " />
            <button className="addBtn" onClick={ShareApp}>Share App Link</button>
        </div>
        <div className='mt-5 flex justify-between sm:px-0 px-5'>
            <div className='flex flex-col sm:flex-row gap-3 items-center flex-wrap'>
                <span className='font-semibold text-gray-700'>Payment Methods :</span>
                <img src={mastercard} className='w-16' alt="" />
                <img src={paypal} className='w-16' alt="" />
                <img src={amazon}  className='w-16'alt="" />
            </div>
            <div className='flex flex-col sm:flex-row gap-3 items-center'>
                <span className='font-semibold text-gray-700'>Get App Now On</span>
                <Link to={`https://play.google.com/store/games?hl=en&pli=1`} target='_blank'><img src={appGoogle} className='w-20 object-contain' alt="" /></Link>
            </div>
        </div>
 
    </div>

   </footer>
  
  </>
}
