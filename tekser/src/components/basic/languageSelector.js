import React, { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { LocalImg } from "../basic/imgProvider"; // Adjust the import path accordingly

const languages = [
  { code: 'en', name: 'English', flag: LocalImg.EnglishFlag },
  { code: 'ru', name: 'Russian', flag: LocalImg.RussianFlag },
  { code: 'kz', name: 'Kazakh', flag: LocalImg.KazakhFlag },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          <img
            src={languages.find((lng) => lng.code === language)?.flag}
            alt={language}
            className="w-5 h-5 mr-2"
          />
          {languages.find((lng) => lng.code === language)?.name}
          <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {languages.map((lng) => (
              <Menu.Item key={lng.code}>
                {({ active }) => (
                  <button
                    onClick={() => changeLanguage(lng.code)}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <img
                      src={lng.flag}
                      alt={lng.name}
                      className="w-5 h-5 mr-2"
                    />
                    {lng.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LanguageSelector;
