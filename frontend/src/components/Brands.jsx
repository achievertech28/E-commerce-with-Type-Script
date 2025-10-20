import { motion } from "framer-motion";
import calvin from "../assets/calvin.png";
import gucci from "../assets/gucci.png";
import prada from "../assets/prada.png";
import zara from "../assets/zara.png";
import versace from "../assets/versace.png";

const Brands = () => {
  // Parent container animation (slide-up + fade)
  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.25,
        ease: "easeOut",
      },
    },
  };

  // Child logo animation
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="w-full py-6 px-4 md:px-10 lg:px-20 flex flex-wrap lg:justify-between justify-center items-center gap-8 bg-black"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Trigger when 30% visible
    >
      {[calvin, gucci, prada, zara, versace].map((brand, index) => (
        <motion.img
          key={index}
          src={brand}
          alt={`brand-${index}`}
          variants={logoVariants}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="w-[120px] md:w-[140px] object-contain cursor-pointer"
        />
      ))}
    </motion.div>
  );
};

export default Brands;
