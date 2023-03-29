import { useState } from "react";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    onChange(newValue);
    setInputValue(event.target.value);
  };

  const handleBlur = () => {
    const newValue = parseFloat(inputValue);
    if (!isNaN(newValue)) {
      onChange(newValue);
      setInputValue(newValue.toString());
    }
  };

  return (
    <div>
      <input type="range" min={0} max={100} step={1} value={value} onChange={handleChange} />
      <input type="text" value={inputValue} onChange={event => setInputValue(event.target.value)} onBlur={handleBlur} />
      <span>%</span>
    </div>
  );
};

export default Slider;
