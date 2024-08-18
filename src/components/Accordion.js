import React, { useState } from 'react';

const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border-b">
            <button
                className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
                onClick={toggleAccordion}
            >
                <span className="text-lg font-medium">{title}</span>
                <span>{isOpen ? '-' : '+'}</span>
            </button>
            {isOpen && (
                <div className="p-4">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;
