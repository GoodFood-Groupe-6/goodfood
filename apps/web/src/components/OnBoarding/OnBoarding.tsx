import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button/Button';

type Step = {
    title: string;
    description: string;
};

const steps: Step[] = [
    { title: 'All your favorites', description: 'Get all your loved foods in one once place, you just place the order we do the rest' },
    { title: 'All your favorites', description: 'Get all your loved foods in one once place, you just place the order we do the rest' },
    { title: 'Order from choosen chef', description: 'Get all your loved foods in one once place, you just place the order we do the rest' },
    { title: 'Free delivery offers', description: 'Get all your loved foods in one once place, you just place the order we do the rest' },
];

type OnBoardingProps = {
    onBoardingComplete: () => void;
};

const OnBoarding: React.FC<OnBoardingProps> = ({ onBoardingComplete }) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [animDirection, setAnimDirection] = useState<string>('left');

    const nextStep = (): void => {
        if (isLastStep) {
            onBoardingComplete()
        } else {
            if (currentStep < steps.length - 1) {
                setAnimDirection('left');
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const goToStep = (stepIndex: number): void => {
        setAnimDirection(stepIndex > currentStep ? 'left' : 'right');
        setCurrentStep(stepIndex);
    };

    const isLastStep = currentStep === steps.length - 1;

    const textVariants = {
        left: { x: -100, opacity: 0 },
        center: { x: 0, opacity: 1 },
        right: { x: 100, opacity: 0 },
    };

    return (
        <div className="bg-white h-screen w-screen absolute top-0 left-0 flex flex-col items-center justify-between px-6 pt-40 pb-5 overflow-hidden">
            <div className="flex flex-col items-center">
                <motion.div
                    key={currentStep}
                    variants={textVariants}
                    initial={animDirection}
                    animate="center"
                    exit={animDirection}
                    className="flex flex-col items-center"
                >
                    <div className="h-[290px] w-60 bg-[#98a8b8] rounded-xl"></div>
                    <span className="text-[#31343d] text-2xl font-extrabold mt-16">{steps[currentStep].title}</span>
                    <p className="text-[#646982] text-base font-normal mt-4 text-center leading-6">{steps[currentStep].description}</p>
                </motion.div>
                <div className="flex gap-3 mt-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`h-2.5 w-2.5 bg-[#FFE1CE] rounded-full cursor-pointer ${index === currentStep ? 'bg-[#ff7621]' : ''}`}
                            onClick={() => goToStep(index)}
                        ></div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col w-full">
                <Button onClick={nextStep}>
                    {isLastStep ? 'Get started' : 'Next'}
                </Button>
                <button className={`capitalize text-[#646982] mt-4 text-base ${isLastStep ? 'invisible' : 'visible'}`} onClick={onBoardingComplete}>
                    Skip
                </button>
            </div>
        </div>
    );
};

export default OnBoarding;
