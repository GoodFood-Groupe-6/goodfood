"use client"

import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';

const VerificationCode = ({
    value,
    onChange,
}: {
    value: any;
    onChange?: any;
}) => {
    const [timeLeft, setTimeLeft] = useState(50);

    useEffect(() => {
        if (timeLeft === 0) {
            return;
        }

        // Decrease timeLeft every second
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    return (
        <div>
            <div className="mb-6">
                <label htmlFor="code" className="text-sm font-normal text-[#32343E] uppercase flex justify-between">
                    code
                    <span className='normal-case'>
                        {timeLeft > 0 ? (
                            <>
                                <span className='underline font-bold'>Resend</span>
                                <span> in.{timeLeft}sec</span>
                            </>
                        ) : (
                            <button className='underline font-bold' onClick={() => setTimeLeft(50)}>Resend</button>
                        )}
                    </span>
                </label>
                <OtpInput
                    value={value}
                    onChange={onChange} // Use the wrapper function here
                    numInputs={4}
                    shouldAutoFocus={true}
                    renderInput={(inputProps) => <input {...inputProps} className='bg-[#F0F5FA] !w-16 !h-16 text-[#32343E] text-base font-bold px-5 py-6 rounded-xl' />}
                    containerStyle="justify-between gap-6 mt-2"
                />
            </div>
        </div>
    )
}

export default VerificationCode