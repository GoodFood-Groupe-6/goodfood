"use client"

import { AnimatePresence, motion } from 'framer-motion';
import Loader from "@/components/Loader/Loader";
import OnBoarding from "@/components/OnBoarding/OnBoarding";
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showOnBoarding, setShowOnBoarding] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const onBoardingDone = localStorage.getItem('onBoardingDone');
    setShowOnBoarding(!onBoardingDone);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onBoardingDone', 'true');
    setShowOnBoarding(false);
  };

  return (
    <div>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>
      {showOnBoarding ? (
        <OnBoarding onBoardingComplete={handleOnboardingComplete} />
      ) : (
        <>
          <h1>Home</h1>
          <Link href="/login">Login</Link>
        </>
      )}
    </div>
  );
}
