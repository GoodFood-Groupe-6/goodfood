type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    props?: any;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, className, type = "button", ...props }) => {
    const combinedClassName = `bg-[#ff7621] w-full rounded-xl uppercase py-5 text-white text-sm font-bold text-center ${className}`;
    return <button type={type} className={combinedClassName} onClick={onClick} {...props}>{children}</button>;
};

export default Button;
