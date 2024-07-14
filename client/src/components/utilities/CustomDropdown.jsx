import React, { useState } from 'react';

const CustomDropdown = ({ data, mainText, navigateHandler, setMenuOpen, menuOpen }) => {
  const [selected, setSelected] = useState('all');
  const [open, setOpen] = useState(false);

  console.log("menuOpen", menuOpen);
  console.log("open", open);

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
      <div className=" bg-transparent text-gray-600 cursor-pointer py-2 px-1 lg:px-4">
        {selected === 'all' ? mainText : data.find(c => c.slug === selected)?.name}
      </div>
      {open && (
        <ul className={`absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg`}>
          <li
            onClick={() => handleSelect('all')}
            className="py-2 px-1 lg:px-5 hover:bg-gray-100 cursor-pointer"
          >
            {mainText}
          </li>
          {data.map((category, index) => (
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
