"use client"
import React from 'react';
import { user_options, user_settings, menu_options } from '@/constants/constants';
import Image from 'next/image';
import { useTheme } from "../../context/ThemeContext";
import './menu.css';

const Menu = () => {
  const { theme } = useTheme(); 
  const selected: string = 'Discover';

  return (
    <div className={`left-panel flex flex-col fixed ${theme === 'dark' ? 'left-panel-dark' : 'left-panel-light'}`}>
      <div className={`user-info p-4 flex flex-col items-center justify-center gap-4 ${theme === 'dark' ? 'dark-text' : 'light-text'}`}>
        <Image src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg" className='rounded-full user-image' height={50} width={50} alt='Sahil' />
        <h1 className='text-2xl'>Eric Hoffman</h1>
      </div>
      <hr />
      <div className='menu-options border-t-1 py-6 flex flex-col gap-4'>
        {menu_options.map((curr, index) => (
          <div key={index} className={`flex items-center gap-4 pl-16 cursor-pointer ${selected === curr.option ? 'border-r-4 border-r-lightblue-500 selected-option' : ''}`}>
            <curr.icon size={18} />
            {curr.option}
          </div>
        ))}
      </div>
      <hr />
      <div className='user-options border-t-1 py-6 flex flex-col gap-4'>
        {user_options.map((curr, index) => (
          <div key={index} className={`flex items-center gap-4 pl-16 cursor-pointer font ${selected === curr.option ? 'border-r-4 border-r-lightblue-500 selected-option' : ''}`}>
            <curr.icon size={18} />
            {curr.option}
          </div>
        ))}
      </div>
      <hr />
      <div className='user-settings border-t-1 py-6 flex flex-col gap-4'>
        {user_settings.map((curr, index) => (
          <div key={index} className={`flex items-center gap-4 pl-16 cursor-pointer font ${selected === curr.option ? 'border-r-4 border-r-lightblue-500 selected-option' : ''}`}>
            <curr.icon size={18} />
            {curr.option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
