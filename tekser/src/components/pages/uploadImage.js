import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MoonLoader } from 'react-spinners';
import MainLayout from "../../layout/mainLayout";
import PreviewModal from "../basic/uploadModal";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import UploadGrid from '../basic/uploadGrid';

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology"];
const grades = [5, 6, 7, 8, 9, 10, 11, 12];
const languages = ["English", "Russian", "Kazakh"];
const uploadTypes = ["Homework", "СОР СОЧ"];

const UploadImage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState({ homework: null, sor_soch: [null, null] });
  const [subject, setSubject] = useState(subjects[0]);
  const [grade, setGrade] = useState(grades[0]);
  const [kindness, setKindness] = useState(50);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [language, setLanguage] = useState(i18n.language);
  const [uploadCount, setUploadCount] = useState(0);
  const [uploadType, setUploadType] = useState(uploadTypes[0]);

  useEffect(() => {
    const fetchUploadCount = async () => {
      try {
        const response = await axios.get('https://aisun-production.up.railway.app/api/upload-count');
        setUploadCount(response.data.uploadCount);
      } catch (error) {
        console.error('Error fetching upload count:', error);
      }
    };
    fetchUploadCount();
  }, []);

  const handleFileChange = (event, index) => {
    const files = event.target.files;
    setSelectedFiles(prevState => {
      if (uploadType === "Homework") {
        return { ...prevState, homework: files };
      } else {
        const sorSochFiles = [...prevState.sor_soch];
        sorSochFiles[index] = files;
        return { ...prevState, sor_soch: sorSochFiles };
      }
    });
  };

  const handleUpload = async () => {
    const formData = new FormData();
    if (uploadType === "Homework") {
      if (selectedFiles.homework) {
        for (let i = 0; i < selectedFiles.homework.length; i++) {
          formData.append('files', selectedFiles.homework[i]);
        }
      }
    } else {
      selectedFiles.sor_soch.forEach((files, index) => {
        if (files) {
          for (let i = 0; i < files.length; i++) {
            formData.append(`files_sor_soch_${index}`, files[i]);
          }
        }
      });
    }

    formData.append("subject", subject);
    formData.append("grade", grade);
    formData.append("kindness", kindness);
    formData.append("language", language);
    formData.append("uploadType", uploadType);

    setLoading(true);
    try {
      const response = await axios.post('https://aisun-production.up.railway.app/api/v1/marks/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResults(response.data);
      await axios.post('https://aisun-production.up.railway.app/api/increment-upload-count');
      const uploadCountResponse = await axios.get('https://aisun-production.up.railway.app/api/upload-count');
      setUploadCount(uploadCountResponse.data.uploadCount);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col flex-1 justify-center items-center px-4 sm:px-10" id="upload">
        <h1 className="font-poppinsSemiBold text-3xl mt-8 sm:mt-16 text-center">{t('uploadYourHomework')}</h1>
        <h2 className="mt-1 text-gray-600 text-center text-base">
          {t('uploadHandwrittenHomework')}
        </h2>
        <div className="mt-6 w-full max-w-xl">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uploadType">
            {t('selectUploadType')}
          </label>
          <div className="flex space-x-4">
            {uploadTypes.map((type, index) => (
              <label key={index} className="inline-flex items-center ">
                <input
                  type="radio"
                  name="uploadType"
                  value={type}
                  checked={uploadType === type}
                  onChange={() => setUploadType(type)}
                  className="form-radio text-purple-600"
                />
                <span className="ml-2 ">{t(type)}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mt-6 w-full max-w-xl">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
            {t('selectSubject')}
          </label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 w-full max-w-xl">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grade">
            {t('selectGrade')}
          </label>
          <select
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {grades.map((grade, index) => (
              <option key={index} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 w-full max-w-xl">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="language">
            {t('selectLanguage')}
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {languages.map((lang, index) => (
              <option key={index} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 w-full max-w-xl">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kindness">
            {t('kindnessLevel')}
          </label>
          <input
            id="kindness"
            type="range"
            min="0"
            max="100"
            value={kindness}
            onChange={(e) => setKindness(e.target.value)}
            className="w-full"
          />
          <div className="text-center mt-2 text-gray-600">{kindness}%</div>
        </div>
        {loading ? (
        <MoonLoader className="mt-40 mb-40" size={150} color="#7F56D9" loading={true} />
      ) : (
        <div className="flex flex-col justify-center items-center">
          {uploadType === "Homework" && (
            <div className="mt-6 w-full max-w-xl">
              <UploadGrid onFileChange={handleFileChange} />
            </div>
          )}
          {uploadType === "СОР СОЧ" && (
            <div className="mt-6 w-full max-w-xl space-y-4">
              <UploadGrid onFileChange={handleFileChange} index={0} />
              <UploadGrid onFileChange={handleFileChange} index={1} />
            </div>
          )}
          <div className="w-full max-w-xl mt-6">
            <button
              className="bg-primary-600 w-full rounded-lg px-11 py-2.5 mt-6 text-white font-poppinsSemiBold text-sm"
              onClick={handleUpload}
            >
              {t('upload')}
            </button>
          </div>
            <div className="mt-6 mb-20 text-center" id="examples">
              <span className="font-poppinsSemiBold text-3xl">
                {t('examples')}:{" "}
              </span>
              <div className="mt-6 flex flex-wrap justify-center items-center" id="upload_example_group">
                <div className="w-80 sm:w-60 mb-4 sm:mb-0 sm:mr-4">
                  <img alt="example" src={"https://images.prismic.io/quizlet-prod/3a92729c-f212-4ac0-8dad-b2c875c57358_20210814_QZ_Home_StudyJam.png?auto=compress,format&rect=0,2,3072,2395&w=1026&h=800"} />
                </div>
                <div className="w-80 sm:w-60 mb-4 sm:mb-0 sm:mr-4">
                  <img alt="example" src={"https://images.prismic.io/quizlet-prod/6b2ff704-ccbf-441e-9b49-dbd3b7d7d530_20210814_QZ_Home_MobileApp.png?auto=compress,format&rect=0,2,3072,2395&w=1026&h=800"} />
                </div>
                <div className="w-80 sm:w-60">
                  <img alt="example" src={"https://images.prismic.io/quizlet-prod/d4052d90-f71e-466a-86f5-080cf02de2da_20210814_QZ_Home_Flashcards.png?auto=compress,format&rect=0,2,3072,2395&w=1026&h=800"} />
                </div>
              </div>
            </div>
          </div>
        )}
        {results && (
          <div className="mt-10 w-full max-w-3xl p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('results')}</h2>
            <p className="mb-2"><strong>{t('mark')}:</strong> {results.mark}</p>
            <p className="mb-2"><strong>{t('correctProblems')}:</strong> {results.correct_problems}</p>
            <p className="mb-2"><strong>{t('wrongTasks')}:</strong> {results.wrong_tasks}</p>
            <p className="mb-2"><strong>{t('feedback')}:</strong> {results.feedback}</p>
            <p className="mb-2"><strong>{t('mistakes')}:</strong> {results.mistakes}</p>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('additionalResources')}</h3>
              <ul className="list-disc list-inside">
                {results.searchLinks && results.searchLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center text-green-700">
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                <span className="font-poppinsSemiBold">{t('goodJob')}</span>
              </div>
              <div className="flex items-center text-red-700">
                <XCircleIcon className="w-5 h-5 mr-2" />
                <span className="font-poppinsSemiBold">{t('needImprovement')}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <PreviewModal />
    </MainLayout>
  );
};

export default UploadImage;
