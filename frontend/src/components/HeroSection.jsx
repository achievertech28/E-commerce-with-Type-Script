import { motion } from "framer-motion";
import HeroImg from "../assets/heroimg.png";
import vector from "../assets/herovector.png";

const HeroSection = () => {
  return (
    <section className="bg-[#F2F0F1] py-10 md:py-7 lg:py-15 w-full h-full flex flex-col lg:flex-row items-center justify-around px-10 md:px-10 gap-10 overflow-hidden">
      {/* Text Section Animation */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <h1 className="text-black leading-10 font-extrabold text-4xl md:text-6xl md:leading-[4.5rem] mb-6 font-[Arial]">
          FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
        </h1>
        <p className="text-black font-light text-lg md:text-xl mb-6 md:mb-10">
          Browse through our diverse range of meticulously crafted garments,{" "}
          <br />
          designed to bring out your individuality and cater to your sense of{" "}
          <br />
          style.
        </p>

        {/* Button Animation */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black flex items-center justify-center text-white py-3 px-10 cursor-pointer rounded-full mb-10 hover:bg-gray-900 w-[80%] md:w-1/3"
        >
          Shop Now
        </motion.button>

        {/* Stats Section */}
        <motion.div
          className="flex flex-wrap md:flex-row items-center justify-center md:justify-between md:gap-1 gap-7"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <div>
            <h1 className="text-xl font-bold text-black">200+</h1>
            <p>International Brands</p>
          </div>
          <div>
            <h1 className="text-xl font-bold text-black">2,000+</h1>
            <p className="text-lg font-light text-black">
              High Quality Products
            </p>
          </div>
          <div>
            <h1 className="text-xl font-bold text-black">30,000+</h1>
            <p>Happy Customers</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Image Section Animation */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <img
          src={HeroImg}
          alt="hero-img"
          className="w-full h-auto max-w-sm md:max-w-lg lg:max-w-xl"
        />

        {/* Floating Vector Animations */}
        <motion.img
          className="absolute left-0 top-50 z-10 w-[50px]"
          src={vector}
          alt="vector"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          className="absolute right-0 top-20 md:right-50 md:top-30 lg:right-0 lg:top-10"
          src={vector}
          alt="vector"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
