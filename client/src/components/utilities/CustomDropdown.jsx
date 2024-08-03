import React, { useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const CustomDropdown = ({ data, mainText, navigateHandler, setMenuOpen, menuOpen }) => {
  const [selected, setSelected] = useState('all');
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    setSelected(value);
    navigateHandler({ target: { value } });
    setMenuOpen(false);
    setOpen(false);
  };

  return (
    <div className="relative px-3 lg:text-center w-48"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className=" bg-transparent text-gray-600 cursor-pointer py-2 px-1 lg:px-2">
        {selected === 'all' ? <span className='flex justify-between gap-1 items-center'>{mainText } {open? <FaArrowUp className=' text-sm'  />: <FaArrowDown className=' text-sm' />}</span> : data.find(c => c.slug === selected)?.name}
      </div>
      {open && (
        <ul className={`absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg`}>
          <li
            onClick={() => handleSelect('all')}
            className="py-2 px-1 lg:px-5 hover:bg-gray-100 cursor-pointer"
          >
            {mainText}
          </li>
          {data && data.map((category, index) => (
            <li
              key={index}
              onClick={() => handleSelect(category.slug)}
              className="py-2 px-1 lg:px-5 hover:bg-gray-100 cursor-pointer"
            >
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CustomDropdown;
