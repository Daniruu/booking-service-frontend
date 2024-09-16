import React from 'react';
import './ProgressSidebar.css';

const ProgressSidebar = ({ currentStep, steps }) => {
    return (
        <div className='progress-sidebar'>
            <ul>
                {steps.map((step, index) => (
                    <li
                        key={index}
                        className={`progress-step ${currentStep === index + 1 ? 'active' : ''}`}
                        data-index={index + 1}
                    >
                        {step}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProgressSidebar;