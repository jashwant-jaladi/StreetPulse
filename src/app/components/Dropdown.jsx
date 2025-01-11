import React from 'react';
import { Select } from '@chakra-ui/react';

const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <div>
      <label className="text-yellow-400 font-medium">{label}:</label>
      <Select
        placeholder={`Select ${label}`}
        value={value}
        onChange={onChange}
        bg="gray.700"
        color="yellow.700"
        fontWeight="bold"
        _hover={{ bg: "gray.600" }}
        _focus={{ borderColor: "yellow.400" }}
        mt={2}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;
