import Image from 'next/image';
import AuthTopLeft from '../../assets/svg/auth-top-left.svg';
import AuthTopRight from '../../assets/svg/auth-top-right.svg';
import Back from '../Button/Back';

const AuthContainer = ({
    pageTitle,
    pageDescription,
    pageEmail,
    children,
    allowBack = false,
}: {
    pageTitle: string,
    pageDescription: string,
    pageEmail?: string,
    children: React.ReactNode,
    allowBack?: boolean,
}) => {
    return (
        <div className="bg-white h-screen w-screen relative lg:bg-[#121223]">
            <div className="w-full bg-[#121223] h-60">
                <div className='relative'>
                    <Image src={AuthTopLeft} alt='loader top left' className='absolute top-0 left-0' />
                    <Image src={AuthTopRight} alt='auth top right' className='absolute top-0 right-0' />
                </div>
                <div className="relative w-full h-60 flex flex-col items-center text-white pt-28">
                    {allowBack ? (
                        <div className='absolute top-12 left-6'>
                            <Back href='/login' />
                        </div>
                    ) : null}
                    <h1 className="text-3xl font-bold lg:text-4xl">{pageTitle}</h1>
                    <span className='text-base lg:text-xl lg:mt-2'>{pageDescription}</span>
                    {pageEmail ? (
                        <span className='text-base font-bold'>{pageEmail}</span>
                    ) : null}
                </div>
            </div>
            <div className="relative bg-white -top-6 rounded-t-3xl lg:rounded-3xl h-auth-body lg:h-auto p-6 pb-8 lg:w-1/3 mx-auto">
                {children}
            </div>
        </div>
    );
}

export default AuthContainer;