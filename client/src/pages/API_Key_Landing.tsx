import React, { useRef, useState } from 'react';
import './API_Key_Landing.scss'

const API_Key_Landing: React.FC = () => {
    const [value, setValue] = useState('');
    const [display, setDisplay] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Prevent copying from the input
    const handleCopy = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
    };

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        // Only allow input or paste
        if (newValue.length > value.length) {
            // New char(s) added
            const added = newValue.slice(value.length);
            const updatedValue = value + added;
            setValue(updatedValue);
            // Hide all but last char
            if (updatedValue.length === 1) {
                setDisplay(added);
            } else {
                setDisplay('*'.repeat(updatedValue.length - 1) + added);
            }
        } else {
            // Char(s) removed
            setValue(newValue);
            setDisplay('*'.repeat(newValue.length));
        }
    };

    // Hide previous char after next input
    const handleKeyUp = (_e: React.KeyboardEvent<HTMLInputElement>) => {
        if (value.length > 1) {
            setDisplay('*'.repeat(value.length - 1) + value[value.length - 1]);
        }
    };

    return (
        <div className="api-key-landing">
            <div className="card">
                <div className="title">Canvas classes</div>
                <div className="textbox-container">
                    <input
                        ref={inputRef}
                        className="textbox"
                        type="text"
                        value={display}
                        onChange={handleChange}
                        onCopy={handleCopy}
                        onKeyUp={handleKeyUp}
                        autoComplete="off"
                        spellCheck={false}
                        placeholder="Enter your API key"
                    />
                </div>
            </div>
        </div>
    );
};

export default API_Key_Landing;
