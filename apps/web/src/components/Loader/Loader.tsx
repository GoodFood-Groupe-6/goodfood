import { motion } from 'framer-motion';
import Image from 'next/image';
import logo from '../../assets/svg/logo.svg';
import LoaderTopLeft from '../../assets/svg/loader-top-left.svg';
import LoaderBottomRight from '../../assets/svg/loader-bottom-right.svg';

const Loader = () => {
    // Variants pour les animations fade-in des éléments de bordure
    const cornerVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
    };

    // Variants pour l'animation "impact" du logo
    const logoVariants = {
        initial: { scale: 0 },
        animate: { scale: 1 },
    };

    return (
        <div className="bg-white w-screen h-screen absolute top-0 left-0">
            <motion.div
                className="absolute top-0 left-0"
                variants={cornerVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, delay: 0 }}
            >
                <Image src={LoaderTopLeft} alt='loader top left' />
            </motion.div>
            <motion.div
                className="absolute bottom-0 right-0"
                variants={cornerVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, delay: 0 }}
            >
                <Image src={LoaderBottomRight} alt='loader bottom right' />
            </motion.div>

            <div className="flex justify-center items-center w-full h-full">
                <motion.div
                    variants={logoVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                >
                    <Image src={logo} alt='logo' className='w-40' />
                </motion.div>
            </div>
        </div>
    );
};

export default Loader;
