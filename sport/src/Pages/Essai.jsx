import { motion } from 'framer-motion';
import React from 'react';
import "../css/essai.css"
import image1 from "../Assets/imagedec1.png"
import image2 from "../Assets/imagedec2.png"
import image3 from "../Assets/imagedec3.png"
import image4 from "../Assets/imagedec4.png"
import image5 from "../Assets/imagedec5.png"
import image6 from "../Assets/imagedec6.png"

const containerVariants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export const Essai = () => {
  return (
    <div className='essai'>
      <div className='in-essai'>
        <div className='essai-left'>left</div>
        <div className='essai-right'>
          <motion.div
            className='essai-images'
            variants={containerVariants}
            initial='hidden'
            animate='visible'
          >
            <motion.img
              className='image1'
              src={image1}
              alt=''
              variants={itemVariants}
            />
            <motion.img
              className='image2'
              src={image2}
              alt=''
              variants={itemVariants}
            />
            <motion.img
              className='image3'
              src={image3}
              alt=''
              variants={itemVariants}
            />
            <motion.img
              className='image4'
              src={image4}
              alt=''
              variants={itemVariants}
            />
            <motion.img
              className='image5'
              src={image5}
              alt=''
              variants={itemVariants}
            />
            <motion.img
              className='image6'
              src={image6}
              alt=''
              variants={itemVariants}
            />
          </motion.div>
        </div>
      </div>
      <div className='mask'></div>
    </div>
  );
};
