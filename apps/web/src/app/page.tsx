"use client"

import { AnimatePresence, motion } from 'framer-motion';
import Loader from "@/components/Loader/Loader";
import OnBoarding from "@/components/OnBoarding/OnBoarding";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Search from '@/components/Search/Search';
import CategoryHome from '@/components/Category/CategoryHome';
import RestaurantHome from '@/components/Restaurant/RestaurantHome';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showOnBoarding, setShowOnBoarding] = useState(false);
  const [inputLength, setInputLength] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text: string) => {
    setInputLength(text.length);
    setInputValue(text);
  }

  const handleCloseSearch = () => {
    setInputLength(0);
    setInputValue('');
  }

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
        <div className='h-screen'>
          <div className="py-6">
            <Header isSearchActive={inputLength > 0 ? true : false} closeSearch={handleCloseSearch} />
            {inputLength === 0 && (
              <div className='mt-6 px-6'>
                <span className='text-[#1E1D1D] capitalize'>hey halal, <span className='font-bold'>good afternoon!</span></span>
              </div>
            )}
            <div className={`mt-4 pl-6 ${inputLength > 0 ? 'mt-6' : ''}`}>
              <Search onInputChange={handleInputChange} inputValue={inputValue} />
            </div>
            {inputLength === 0 && (
              <>
                <div className='mt-8 pl-6'>
                  <CategoryHome />
                </div>
                <div className='mt-8 px-6'>
                  <RestaurantHome />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
