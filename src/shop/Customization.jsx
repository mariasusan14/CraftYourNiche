import React, { useState } from 'react';
import './styles/Customization.css'
const initialCustomizationOptions = [
  { id: 1, name: 'Color', options: ['Red', 'Blue', 'Green'] },
  { id: 2, name: 'Size', options: ['Small', 'Medium', 'Large'] },
  { id: 3, name: 'Material', options: ['Cotton', 'Leather', 'Polyester'] },
];

const CustomizationShop = () => {
  const [customizationOptions, setCustomizationOptions] = useState(initialCustomizationOptions);
  
  const handleAddOption = () => {
    const newOptionId = customizationOptions.length + 1;
    setCustomizationOptions([
      ...customizationOptions,
      { id: newOptionId, name: 'New Option', options: [] }
    ]);
  };

  const handleDeleteOption = (id) => {
    setCustomizationOptions(customizationOptions.filter(option => option.id !== id));
  };

  const handleOptionNameChange = (id, newName) => {
    setCustomizationOptions(customizationOptions.map(option => {
      if (option.id === id) {
        return { ...option, name: newName };
      }
      return option;
    }));
  };

  const handleAddSubOption = (id) => {
    setCustomizationOptions(customizationOptions.map(option => {
      if (option.id === id) {
        const newSubOptionId = option.options.length + 1;
        return { ...option, options: [...option.options, `Sub Option ${newSubOptionId}`] };
      }
      return option;
    }));
  };

  const handleDeleteSubOption = (optionId, subOptionIndex) => {
    setCustomizationOptions(customizationOptions.map(option => {
      if (option.id === optionId) {
        const updatedOptions = [...option.options];
        updatedOptions.splice(subOptionIndex, 1);
        return { ...option, options: updatedOptions };
      }
      return option;
    }));
  };

  return (
    <div>
      {customizationOptions.map(option => (
        <div key={option.id}>
          <input
            type="text"
            value={option.name}
            onChange={(e) => handleOptionNameChange(option.id, e.target.value)}
          />
          <button onClick={() => handleDeleteOption(option.id)}>Delete</button>
          <ul>
            {option.options.map((subOption, index) => (
              <li key={index}>
                {subOption}
                <button onClick={() => handleDeleteSubOption(option.id, index)}>Delete</button>
              </li>
            ))}
            <button onClick={() => handleAddSubOption(option.id)}>Add Sub Option</button>
          </ul>
        </div>
      ))}
      <button onClick={handleAddOption}>Add Option</button>
    </div>
  );
};

export default CustomizationShop;




