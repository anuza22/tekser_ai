import React from 'react';
import { LocalImg } from "../basic/imgProvider";


const UploadGrid = ({ onFileChange, index }) => {
  const text = index === 1 ? "Загрузите работу ученика" : index === 0 ? "Загрузите сам листок СОР СОЧ" : "Загрузите файл";

  return (
    <label className="w-full text-center cursor-pointer border-dashed border-2 border-purple-500 py-10 block">
      <input
        type="file"
        className="hidden"
        multiple
        onChange={(e) => onFileChange(e, index)}
      />
      <div className="flex flex-col items-center">
        <img src={LocalImg.UploadIcon} alt="UploadIcon" />
      <span className="text-purple-500 mt-2">{text}</span>
        <span className="text-gray-500">PNG, JPG</span>
      </div>
    </label>
  );
};

export default UploadGrid;


