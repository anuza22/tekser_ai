import React from 'react';
import Dropzone from './dropZone';
import { LocalImg } from "../basic/imgProvider";

const UploadGrid = ({ onFileChange, index }) => {
  const text = index === 1 ? "Загрузите работу ученика" : index === 0 ? "Загрузите сам листок СОР СОЧ" : "Загрузите файл";

  return (
    <div className="w-full text-center cursor-pointer border-dashed border-2 border-purple-500 py-10 block">
      <Dropzone state={index} onFileChange={onFileChange} />
      <div className="flex flex-col items-center mt-4">
        <img src={LocalImg.UploadIcon} alt="UploadIcon" className="w-10 h-10" />
        <span className="text-purple-500 mt-2">{text}</span>
        <span className="text-gray-500">PNG, JPG</span>
      </div>
    </div>
  );
};

export default UploadGrid;



