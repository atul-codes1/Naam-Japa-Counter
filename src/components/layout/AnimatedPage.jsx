import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1], // Spring-like ease
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.3,
            ease: 'easeIn',
        },
    },
};

const AnimatedPage = ({ children }) => {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"

            className="w-full"
        >
            {children}
        </motion.div>
    );
};

export default AnimatedPage;
