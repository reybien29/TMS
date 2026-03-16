export default function HoopHubLogo({ 
    className = "", 
    iconClassName = "w-6 h-6", 
    textClassName = "text-xl font-bold tracking-tight text-white",
    hideText = false,
    size = "md"
}) {
    const sizes = {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
        xl: "w-16 h-16"
    };

    const containerSize = sizes[size] || size;

    return (
        <div className={`flex items-center gap-3 group ${className}`}>
            <div className={`${containerSize} rounded-full bg-blue-600 flex items-center justify-center group-hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20`}>
                <svg viewBox="0 0 24 24" fill="none" className={`${iconClassName} text-white`} xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM7 11H17V13H7V11Z" fill="currentColor" />
                </svg>
            </div>
            {!hideText && <span className={textClassName}>HoopHub</span>}
        </div>
    );
}
