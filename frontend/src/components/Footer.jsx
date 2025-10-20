import { FaFacebook, FaInstagram, FaGithub, FaTwitter } from "react-icons/fa6";
import visa from "../assets/visa.png";
import paypal from "../assets/paypal.png";
import master from "../assets/master.png";
import applepay from "../assets/applepay.png";
import googlePay from "../assets/google pay.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="bg-gray-50 w-full px-10 lg:px-20 py-5 lg:py-10">
        <div className="bg-black px-7 rounded-2xl py-10 flex  w-[100%] gap-7 flex-col md:gap-0 md:flex-row justify-between items-center">
          <h1 className="text-white text-2xl md:text-3xl font-bold ">
            STAY UPTO DATE ABOUT <br /> OUR LATEST OFFERS
          </h1>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              className="bg-white w-[250px] md:w-[300px] p-2 rounded-3xl outline-0 placeholder:text-center"
            />
            <button className="bg-white w-[250px] md:w-[300px] p-2 rounded-3xl text-md cursor-pointer">
              Subscribe to Newletter
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5 md:gap-0 flex-wrap pt-10">
          <div>
            <h1 className="font-bold text-3xl md:text-4xl cursor-pointer">
              SHOP.CO
            </h1>
            <p className="pt-2 font-light text-sm">
              We have clothes that suits your style <br /> and which you’re
              proud to wear. <br /> From women to men.
            </p>
            <div className="flex items-center justify-start gap-5 pt-4">
              <FaTwitter className="cursor-pointer text-2xl" />
              <FaFacebook className="cursor-pointer text-2xl" />
              <FaInstagram className="cursor-pointer text-2xl" />
              <FaGithub className="cursor-pointer text-2xl" />
            </div>
          </div>
          <div>
            <h1 className="font-medium text-xl">COMPANY</h1>
            <p className="pt-3 font-light text-sm">About</p>
            <p className="pt-3 font-light text-sm">Features</p>
            <p className="pt-3 font-light text-sm">Work</p>
            <p className="pt-3 font-light text-sm">Career</p>
          </div>
          <div>
            <h1 className="font-medium text-xl">HELP</h1>
            <p className="pt-3 font-light text-sm">About</p>
            <p className="pt-3 font-light text-sm">Features</p>
            <p className="pt-3 font-light text-sm">Work</p>
            <p className="pt-3 font-light text-sm">Career</p>
          </div>
          <div>
            <h1 className="font-medium text-xl">FAQ</h1>
            <p className="pt-3 font-light text-sm">About</p>
            <p className="pt-3 font-light text-sm">Features</p>
            <p className="pt-3 font-light text-sm">Work</p>
            <p className="pt-3 font-light text-sm">Career</p>
          </div>
          <div>
            <h1 className="font-medium text-xl">RESOURCE</h1>
            <p className="pt-3 font-light text-sm">About</p>
            <p className="pt-3 font-light text-sm">Features</p>
            <p className="pt-3 font-light text-sm">Work</p>
            <p className="pt-3 font-light text-sm">Career</p>
          </div>
        </div>
        <hr className="w-full h-[1px] bg-gray-400 border-0 mt-10 md:5" />
        <div className="flex justify-between pt-4 gap-3 md:gap-0 items-center flex-wrap">
          <p className="text-sm text-gray-800">
            Shop.co © {currentYear}, All Rights Reserved
          </p>
          <div className="flex gap-1 flex-wrap items-center justify-center">
            <img src={visa} alt="" />
            <img src={paypal} alt="" />
            <img src={master} alt="" />
            <img src={applepay} alt="" />
            <img src={googlePay} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
