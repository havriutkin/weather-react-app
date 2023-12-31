import { useState } from 'react';

const Toggle = ({name, leftIcon, rightIcon, iconScale, onChange}) => {
    const [isCheked, setIsChecked] = useState(false);

    const handleChange = () => {
        if (onChange) onChange();
        setIsChecked(!isCheked);
    }

    return (
        <>
            <label htmlFor={name} className="relative m-1 bg-gray-100 dark:bg-gray-300 border border-black dark:border-white w-20 h-10 rounded-full cursor-pointer" >
                <input type="checkbox" id={name} className="sr-only peer" onChange={handleChange}/>
                <span className="w-2/5 h-4/5 absolute rounded-full left-1 top-1 peer-checked:left-11 transition-all duration-500 p-1">
                    {isCheked ? (
                        <img src={rightIcon} alt="Right Icon" className="scale-80"/>
                    ) : (
                        <img src={leftIcon} alt="Left Icon" className="scale-80"/>
                    )}
                </span>
            </label>
        </>
    )
}

export default Toggle