import React, { useRef } from 'react';

const OTPInput = ({ value, onChange }) => {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const input = e.target;
    const val = input.value.replace(/[^0-9]/g, '');
    
    let newValue = (value + val).slice(0, 6);
    if (val === '' && value.length > index) {
      newValue = value.slice(0, index) + value.slice(index + 1);
    } else if (val !== '') {
      newValue = value.slice(0, index) + val + value.slice(index + 1);
    }
    
    onChange(newValue);
    
    if (val !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="otp-inputs">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          className="otp-input"
          type="text"
          maxLength="1"
          value={value[i] || ''}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          placeholder="0"
        />
      ))}
    </div>
  );
};

export default OTPInput;
