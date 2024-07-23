// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { MoonLoader } from 'react-spinners';
// import MainLayout from "../../layout/mainLayout";
// import PreviewModal from "../basic/uploadModal";
// import Dropzone from '../basic/dropZone';
// import { motion, AnimatePresence } from 'framer-motion';
// import { CheckCircleIcon, XCircleIcon, AcademicCapIcon, BeakerIcon, GlobeAltIcon, ArrowLeftIcon, ScaleIcon, BookOpenIcon, QuestionMarkCircleIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
// import Modal from 'react-modal';
// import { LocalImg } from "../basic/imgProvider";

// const subjects = ["Mathematics", "Physics", "Chemistry", "Biology"];
// const grades = [5, 6, 7, 8, 9, 10, 11, 12];
// const languages = ["English", "Russian", "Kazakh"];
// const uploadTypes = ["Homework", "СОР СОЧ"];

// const UploadImage = () => {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
//   const [selectedFiles, setSelectedFiles] = useState({ homework: null, sor_soch: [null, null] });
//   const [subject, setSubject] = useState(subjects[0]);
//   const [grade, setGrade] = useState(grades[0]);
//   const [kindness, setKindness] = useState(50);
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState(null);
//   const [language, setLanguage] = useState(i18n.language);
//   const [uploadCount, setUploadCount] = useState(0);
//   const [uploadType, setUploadType] = useState(uploadTypes[0]);
//   const [maxScore, setMaxScore] = useState(100);
//   const [uploadedFilesCount, setUploadedFilesCount] = useState(0);
//   const maxFiles = 5;
//   const [showAdditionalResources, setShowAdditionalResources] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showExampleModal, setShowExampleModal] = useState(false);
//   const [selectedExample, setSelectedExample] = useState(null);
//   const [showExampleNotification, setShowExampleNotification] = useState(false);
//   const [showExampleHint, setShowExampleHint] = useState(false);
//   const [activeExample, setActiveExample] = useState(null);

//   const getKindnessEmoji = (level) => {
//     if (level < 20) return '😠';
//     if (level < 40) return '🙁';
//     if (level < 60) return '😐';
//     if (level < 80) return '🙂';
//     return '😊';
//   };

//   const exampleImages = [
//     {
//       src: LocalImg.Physic,
//       description: 'Physic Homework',
//       downloadLink: LocalImg.Physic,
//     },
//     {
//       src: LocalImg.Math,
//       description: 'Mathematic Homework',
//       downloadLink: LocalImg.Math
//     },
//     {
//       src: LocalImg.Chemistry,
//       description: 'Chemistry Homework',
//       downloadLink: LocalImg.Chemistry
//     }
//   ];

//   useEffect(() => {
//     const fetchUploadCount = async () => {
//       try {
//         const response = await axios.get('https://aisun-production.up.railway.app/api/upload-count');
//         setUploadCount(response.data.uploadCount);
//       } catch (error) {
//         console.error('Error fetching upload count:', error);
//       }
//     };
//     fetchUploadCount();
//   }, []);

//   const handleUseExample = (example) => {
//     setSelectedFiles({ homework: [new File([], example.description)], sor_soch: [null, null] });
//     setUploadedFilesCount(1);
//     setSubject(example.description.split(' ')[0]);
//     setShowExampleModal(false);
//     setShowExampleNotification(true);
//     setTimeout(() => setShowExampleNotification(false), 5000);
//   };

//   const handleExampleHover = (example) => {
//     setActiveExample(example);
//     setShowExampleHint(true);
//   };

//   const handleExampleLeave = () => {
//     setActiveExample(null);
//     setShowExampleHint(false);
//   };

//   const handleExampleDownload = (example) => {
//     const link = document.createElement('a');
//     link.href = example.downloadLink;
//     link.download = 'example_image.png';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     setShowExampleNotification(true);
//     setTimeout(() => setShowExampleNotification(false), 5000);
//   };

//   const handleFileChange = (event, index) => {
//     const files = event.target.files;
//     setSelectedFiles(prevState => {
//       if (uploadType === "Homework") {
//         setUploadedFilesCount(files ? files.length : 0);
//         return { ...prevState, homework: files };
//       } else {
//         const sorSochFiles = [...prevState.sor_soch];
//         const totalFiles = sorSochFiles.reduce((total, fileList) => total + (fileList ? fileList.length : 0), 0);
//         setUploadedFilesCount(totalFiles);
//         sorSochFiles[index] = files;
//         return { ...prevState, sor_soch: sorSochFiles };
//       }
//     });
//   };

//   const handleUpload = async () => {
//     if (!selectedFiles.homework && !selectedFiles.sor_soch[0] && !selectedFiles.sor_soch[1]) {
//       alert('Please select at least one file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     if (uploadType === "Homework") {
//       if (selectedFiles.homework) {
//         for (let i = 0; i < selectedFiles.homework.length; i++) {
//           formData.append('files', selectedFiles.homework[i]);
//         }
//       }
//     } else {
//       selectedFiles.sor_soch.forEach((files, index) => {
//         if (files) {
//           for (let i = 0; i < files.length; i++) {
//             formData.append(`files_sor_soch_${index}`, files[i]);
//           }
//         }
//       });
//     }

//     formData.append("subject", subject);
//     formData.append("grade", grade);
//     formData.append("kindness", kindness);
//     formData.append("language", language);
//     formData.append("uploadType", uploadType);
//     formData.append("maxScore", maxScore);

//     setLoading(true);
//     try {
//       const response = await axios.post('https://aisun-production.up.railway.app/api/v1/marks', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setResults(response.data);
//       await axios.post('https://aisun-production.up.railway.app/api/increment-upload-count');

//       const uploadCountResponse = await axios.get('https://aisun-production.up.railway.app/api/upload-count');
//       setUploadCount(uploadCountResponse.data.uploadCount);
//     } catch (error) {
//       console.error('Error uploading files:', error);
//       alert('Error uploading files.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackClick = () => {
//     navigate('/');
//   };

//   const toggleAdditionalResources = () => {
//     setShowAdditionalResources(!showAdditionalResources);
//   };

//   return (
//     <MainLayout>
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="min-h-screen p-4 sm:p-6 lg:p-8"
//       >
//         <div className="max-w-4xl mx-auto bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
//           <div className="p-8">
//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               onClick={handleBackClick}
//               className="mb-6 flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200"
//             >
//               <ArrowLeftIcon className="w-6 h-6 mr-2" />
//               <span className="font-semibold">{t('back')}</span>
//             </motion.button>
//             <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
//               {t('uploadYourHomework')}
//             </h1>
//             <p className="text-gray-600 text-center mb-10">{t('uploadHandwrittenHomework')}</p>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
//               <motion.div transition={{ type: "spring", stiffness: 300 }}>
//                 <label className="block text-gray-700 font-semibold mb-2">{t('selectSubject')}</label>
//                 <div className="relative">
//                   <select
//                     value={subject}
//                     onChange={(e) => setSubject(e.target.value)}
//                     className="w-full bg-gray-100 border border-gray-300 rounded-full py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600"
//                   >
//                     {subjects.map((subject, index) => (
//                       <option key={index} value={subject}>{subject}</option>
//                     ))}
//                   </select>
//                   <BeakerIcon className="absolute right-3 top-3 w-6 h-6 text-gray-400" />
//                 </div>
//               </motion.div>
//               <motion.div transition={{ type: "spring", stiffness: 300 }}>
//                 <label className="block text-gray-700 font-semibold mb-2">{t('maxScore')}</label>
//                 <div className="relative">
//                   <input
//                     type="number"
//                     value={maxScore}
//                     onChange={(e) => setMaxScore(e.target.value)}
//                     className="w-full bg-gray-100 border border-gray-300 rounded-full py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 pl-12"
//                     min="0"
//                   />
//                   <ScaleIcon className="absolute left-3 top-3 w-6 h-6 text-gray-400" />
//                 </div>
//               </motion.div>
//               <motion.div transition={{ type: "spring", stiffness: 300 }}>
//                 <label className="block text-gray-700 font-semibold mb-2">{t('selectGrade')}</label>
//                 <div className="relative">
//                   <select
//                     value={grade}
//                     onChange={(e) => setGrade(e.target.value)}
//                     className="w-full bg-gray-100 border border-gray-300 rounded-full py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600"
//                   >
//                     {grades.map((grade, index) => (
//                       <option key={index} value={grade}>{grade}</option>
//                     ))}
//                   </select>
//                   <AcademicCapIcon className="absolute right-3 top-3 w-6 h-6 text-gray-400" />
//                 </div>
//               </motion.div>
//               <motion.div transition={{ type: "spring", stiffness: 300 }}>
//                 <label className="block text-gray-700 font-semibold mb-2">{t('selectLanguage')}</label>
//                 <div className="relative">
//                   <select
//                     value={language}
//                     onChange={(e) => setLanguage(e.target.value)}
//                     className="w-full bg-gray-100 border border-gray-300 rounded-full py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600"
//                   >
//                     {languages.map((lang, index) => (
//                       <option key={index} value={lang}>{lang}</option>
//                     ))}
//                   </select>
//                   <GlobeAltIcon className="absolute right-3 top-3 w-6 h-6 text-gray-400" />
//                 </div>
//               </motion.div>
//               <motion.div transition={{ type: "spring", stiffness: 300 }}>
//                 <label className="block text-gray-700 font-semibold mb-2">{t('type')}</label>
//                 <div className="flex space-x-4">
//                   {uploadTypes.map((type, index) => (
//                     <label key={index} className="inline-flex items-center">
//                       <input
//                         type="radio"
//                         name="uploadType"
//                         value={type}
//                         checked={uploadType === type}
//                         onChange={() => setUploadType(type)}
//                         className="form-radio text-pink-600"
//                       />
//                       <span className="ml-2">{t(type)}</span>
//                     </label>
//                   ))}
//                 </div>
//               </motion.div>
//               <motion.div transition={{ type: "spring", stiffness: 300 }} className="mb-10">
//                 <label className="block text-gray-700 font-semibold mb-2">{t('kindnessLevel')}</label>
//                 <input
//                   type="range"
//                   min="0"
//                   max="100"
//                   value={kindness}
//                   onChange={(e) => setKindness(e.target.value)}
//                   className="w-[400px] appearance-none h-3 rounded-full bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
//                 />
//                 <div className="text-center mt-2 text-gray-600">
//                   <span className="text-2xl mr-2">{getKindnessEmoji(kindness)}</span>
//                   {kindness}%    
//                 </div>
//               </motion.div>
//             </div>

//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="mb-6"
//             >
//               <div className="flex justify-center items-center space-x-2">
//                 {[...Array(maxFiles)].map((_, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ scale: 0 }}
//                     animate={{ scale: index < uploadedFilesCount ? 1 : 0.5 }}
//                     transition={{ duration: 0.2 }}
//                     className={`w-6 h-6 rounded-full ${
//                       index < uploadedFilesCount ? 'bg-purple-600' : 'bg-gray-300'
//                     }`}
//                   />
//                 ))}
//               </div>
//               <p className="text-center mt-2 text-purple-600 font-bold">
//                 {uploadedFilesCount} / {maxFiles}
//               </p>
//             </motion.div>

//             {loading ? (
//               <div className="flex justify-center items-center py-12">
//                 <MoonLoader size={60} color="#8B5CF6" />
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {uploadType === "Homework" ? (
//                   <Dropzone onFileChange={handleFileChange} />
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <Dropzone onFileChange={(e) => handleFileChange(e, 0)} />
//                     <Dropzone onFileChange={(e) => handleFileChange(e, 1)} />
//                   </div>
//                 )}
//                 <motion.button
//                   whileTap={{ scale: 0.95 }}
//                   className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-full shadow-lg transition duration-300 flex items-center justify-center"
//                   onClick={handleUpload}
//                 >
//                   {t('upload')}
//                 </motion.button>
//               </div>
//             )}
//           </div>
//         </div>

//         {results && (
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="max-w-4xl mx-auto mt-8 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden"
//           >
//             <div className="p-8">
//               <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6">{t('results')}</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <p className="mb-2"><strong>{t('mark')}:</strong> {results.mark}</p>
//                   <p className="mb-2"><strong>{t('correctProblems')}:</strong> {results.correct_problems}</p>
//                   <p className="mb-2"><strong>{t('wrongTasks')}:</strong> {results.wrong_tasks}</p>
//                 </div>
//                 <div>
//                   <p className="mb-2"><strong>{t('feedback')}:</strong> {results.feedback}</p>
//                   <p className="mb-2"><strong>{t("image")}:</strong> {results.annotatedImageUrl}</p>
//                   <p className="mb-2"><strong>{t('mistakes')}:</strong> {results.mistakes}</p>
//                 </div>
//               </div>
//               <div className="mt-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-2xl font-bold text-purple-600">{t('additionalResources')}</h3>
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={toggleAdditionalResources}
//                     className="text-purple-600 hover:text-purple-800 transition-colors duration-200"
//                   >
//                     <BookOpenIcon className="w-6 h-6" />
//                   </motion.button>
//                 </div>
//                 {showAdditionalResources && (
//                   <ul className="list-disc list-inside space-y-2 mt-4">
//                     {results.searchLinks && results.searchLinks.map((link, index) => (
//                       <li key={index}>
//                         <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{link}</a>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//               <div className="flex justify-between items-center mt-8">
//                 <motion.div whileHover={{ scale: 1.1 }} className="flex items-center text-green-600">
//                   <CheckCircleIcon className="w-8 h-8 mr-2" />
//                   <span className="font-semibold">{t('goodJob')}</span>
//                 </motion.div>
//                 <motion.div whileHover={{ scale: 1.1 }} className="flex items-center text-red-600">
//                   <XCircleIcon className="w-8 h-8 mr-2" />
//                   <span className="font-semibold">{t('needImprovement')}</span>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="mt-12 mb-8 py-8 bg-purple-100 rounded-3xl"
//         >
//           <h2 className="text-4xl font-extrabold text-center text-purple-600 mb-4">
//             {t('Нет своего ДЗ? Попробуйте наши примеры!')}
//           </h2>
//           <p className="text-center text-gray-600 mb-6">
//             {t('Загрузите эти примеры, чтобы протестировать работу приложения без использования собственных фотографий.')}
//           </p>
//           <div className="flex items-center justify-center mb-6">
//             <QuestionMarkCircleIcon className="w-6 h-6 text-purple-600 mr-2" />
//             <span className="text-sm text-gray-600">
//               {t('Наведите на пример, чтобы узнать больше о его использовании')}
//             </span>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
//             {exampleImages.map((example, index) => (
//               <motion.div 
//                 key={index} 
//                 whileHover={{ scale: 1.05, rotate: 2 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="overflow-hidden rounded-2xl shadow-2xl cursor-pointer relative"
//                 onClick={() => setSelectedExample(example)}
//                 onMouseEnter={() => handleExampleHover(example)}
//                 onMouseLeave={handleExampleLeave}
//               >
//                 <img src={example.src} alt={`Example ${index + 1}`} className="w-full h-60 object-cover" />
//                 <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
//                   <button 
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleExampleDownload(example);
//                     }}
//                     className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold"
//                   >
//                     {t('Скачать и использовать')}
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//           <AnimatePresence>
//             {showExampleHint && activeExample && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg"
//               >
//                 <p>{t('Это пример')} {activeExample.description}. {t('Нажмите, чтобы использовать его в приложении.')}</p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//           <div className="flex justify-center mt-6">
//             <ArrowDownIcon className="w-8 h-8 text-purple-600 animate-bounce" />
//           </div>
//         </motion.div>
//         {/* <motion.div> */}

//         <div className="bg-gray-100 p-6 rounded-2xl mb-8">
//           <h3 className="text-2xl font-bold text-purple-600 mb-4">{t('Как использовать примеры:')}</h3>
//           <ol className="list-decimal list-inside space-y-2">
//             <li>{t('Скачайте пример')}</li>
//             <li>{t('Загрузите его в форму выше')}</li>
//             <li>{t('Нажмите "Загрузить" для анализа')}</li>
//           </ol>
//         </div>
//         </motion.div>

//         <Modal
//           isOpen={!!selectedExample}
//           onRequestClose={() => setSelectedExample(null)}
//           className="bg-white rounded-lg p-6 max-w-lg w-full mx-auto mt-20"
//           overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//         >
//           {selectedExample && (
//             <>
//               <img src={selectedExample.src} alt="Example" className="w-full mb-4 rounded-lg" />
//               <p className="text-gray-700 mb-4">{selectedExample.description}</p>
//               <div className="flex justify-between">
//                 <button 
//                   onClick={() => handleExampleDownload(selectedExample)}
//                   className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
//                 >
//                   {t('Скачать пример')}
//                 </button>
//                 <button 
//                   onClick={() => handleUseExample(selectedExample)}
//                   className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
//                 >
//                   {t('Использовать пример')}
//                 </button>
//               </div>
//             </>
//           )}
//         </Modal>

//         <AnimatePresence>
//           {showExampleNotification && (
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 50 }}
//               className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg"
//             >
//               {t('Вы используете пример ДЗ. Хотите загрузить свое собственное?')}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           className="fixed bottom-4 left-4 bg-purple-600 text-white p-4 rounded-full shadow-lg"
//           onClick={() => setShowExampleModal(true)}
//         >
//           {t('Попробовать на примере')}
//         </motion.button>
        

//         <PreviewModal />
//         {/* </motion.div> */}
//     </MainLayout>
//   );
// };

// export default UploadImage;
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MoonLoader } from 'react-spinners';
import MainLayout from "../../layout/mainLayout";
import PreviewModal from "../basic/uploadModal";
import Dropzone from '../basic/dropZone';
import {motion, AnimatePresence} from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, AcademicCapIcon, BeakerIcon, GlobeAltIcon, ArrowLeftIcon, ScaleIcon, BookOpenIcon, QuestionMarkCircleIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import Modal from 'react-modal';
import { LocalImg } from "../basic/imgProvider";

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
  const [maxScore, setMaxScore] = useState(100); // Новое состояние для максимального балла
  const [uploadedFilesCount, setUploadedFilesCount] = useState(0);
  const maxFiles = 5;
  const [showAdditionalResources, setShowAdditionalResources] = useState(false);
  // const [showExampleModal, setShowExampleModal] = useState(false);
  const [selectedExample, setSelectedExample] = useState(null);
  const [showExampleNotification, setShowExampleNotification] = useState(false);
  const [showExampleHint, setShowExampleHint] = useState(false);
  const [activeExample, setActiveExample] = useState(null);

  const getKindnessEmoji = (level) => {
    if (level < 20) return '😠';
    if (level < 40) return '🙁';
    if (level < 60) return '😐';
    if (level < 80) return '🙂';
    return '😊';
  };

  const exampleImages = [
    {
      src: LocalImg.Physic,
      description: 'Physic Homework',
      downloadLink: LocalImg.Physic,
    },
    {
      src: LocalImg.Math,
      description: 'Mathematic Homework',
      downloadLink: LocalImg.Math
    },
    {
      src: LocalImg.Chemistry,
      description: 'Chemistry Homework',
      downloadLink: LocalImg.Chemistry
    }
  ];

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

  const handleUseExample = (example) => {
    setSelectedFiles({ homework: [new File([], example.description)], sor_soch: [null, null] });
    setUploadedFilesCount(1);
    setSubject(example.description.split(' ')[0]);
    // setShowExampleModal(false);
    setShowExampleNotification(true);
    setTimeout(() => setShowExampleNotification(false), 5000);
  };

  const handleExampleHover = (example) => {
    setActiveExample(example);
    setShowExampleHint(true);
  };

  const handleExampleLeave = () => {
    setActiveExample(null);
    setShowExampleHint(false);
  };

  const handleExampleDownload = (example) => {
    const link = document.createElement('a');
    link.href = example.downloadLink;
    link.download = 'example_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExampleNotification(true);
    setTimeout(() => setShowExampleNotification(false), 5000);
  };

  const handleFileChange = (event, index) => {
    const files = event.target.files;
    setSelectedFiles(prevState => {
      if (uploadType === "Homework") {
        setUploadedFilesCount(files ? files.length : 0);
        return { ...prevState, homework: files };
      } else {
        const sorSochFiles = [...prevState.sor_soch];
        const totalFiles = sorSochFiles.reduce((total, fileList) => total + (fileList ? fileList.length : 0), 0);
        setUploadedFilesCount(totalFiles);
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
          console.log(selectedFiles.homework[i]);
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
    formData.append("maxScore", maxScore);

    setLoading(true);
    try {
      const response = await axios.post('https://aisun-production.up.railway.app/api/v1/marks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
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

  const handleBackClick = () => {
    navigate('/');  // Assuming '/' is the path to your main page
  };

  const toggleAdditionalResources = () => {
    setShowAdditionalResources(!showAdditionalResources);
  };

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen p-4 sm:p-6 lg:p-8"
      >
        <div className="max-w-4xl mx-auto bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleBackClick}
              className="mb-6 flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-6 h-6 mr-2" />
              <span className="font-semibold">{t('back')}</span>
            </motion.button>
            <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
              {t('uploadYourHomework')}
            </h1>
            <p className="text-gray-600 text-center mb-10">{t('uploadHandwrittenHomework')}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <motion.div transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-gray-700 font-semibold mb-2">{t('selectSubject')}</label>
                <div className="relative">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-300 rounded-full py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                  <BeakerIcon className="absolute right-3 top-3 w-6 h-6 text-gray-400" />
                </div>
              </motion.div>
              <motion.div transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-gray-700 font-semibold mb-2">{t('maxScore')}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={maxScore}
                    onChange={(e) => setMaxScore(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-300 rounded-full py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 pl-12"
                    min="0"
                  />
                  <ScaleIcon className="absolute left-3 top-3 w-6 h-6 text-gray-400" />
                </div>
              </motion.div>
              <motion.div transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-gray-700 font-semibold mb-2">{t('selectGrade')}</label>
                <div className="relative">
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-300 rounded-full py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    {grades.map((grade, index) => (
                      <option key={index} value={grade}>{grade}</option>
                    ))}
                  </select>
                  <AcademicCapIcon className="absolute right-3 top-3 w-6 h-6 text-gray-400" />
                </div>
              </motion.div>
              <motion.div transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-gray-700 font-semibold mb-2">{t('selectLanguage')}</label>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-300 rounded-full py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    {languages.map((lang, index) => (
                      <option key={index} value={lang}>{lang}</option>
                    ))}
                  </select>
                  <GlobeAltIcon className="absolute right-3 top-3 w-6 h-6 text-gray-400" />
                </div>
              </motion.div>
              <motion.div transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-gray-700 font-semibold mb-2">{t('type')}</label>
                <div className="flex space-x-4">
                  {uploadTypes.map((type, index) => (
                    <label key={index} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="uploadType"
                        value={type}
                        checked={uploadType === type}
                        onChange={() => setUploadType(type)}
                        className="form-radio text-pink-600"
                      />
                      <span className="ml-2">{t(type)}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
              <motion.div 
                transition={{ type: "spring", stiffness: 300 }}
                className="mb-10"
              >
                <label className="block text-gray-700 font-semibold mb-2">{t('kindnessLevel')}</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={kindness}
                  onChange={(e) => setKindness(e.target.value)}
                  className="w-[400px] appearance-none h-3 rounded-full bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <div className="text-center mt-2 text-gray-600">
                  <span className="text-2xl mr-2">{getKindnessEmoji(kindness)}</span>
                  {kindness}%    
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="flex justify-center items-center space-x-2">
                {[...Array(maxFiles)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: index < uploadedFilesCount ? 1 : 0.5 }}
                    transition={{ duration: 0.2 }}
                    className={`w-6 h-6 rounded-full ${
                      index < uploadedFilesCount ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-center mt-2 text-purple-600 font-bold">
                {uploadedFilesCount} / {maxFiles}
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <MoonLoader size={60} color="#8B5CF6" />
              </div>
            ) : (
              <div className="space-y-6">
                {uploadType === "Homework" ? (
                  <Dropzone onFileChange={handleFileChange} />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Dropzone onFileChange={(e) => handleFileChange(e, 0)} />
                    <Dropzone onFileChange={(e) => handleFileChange(e, 1)} />
                  </div>
                )}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-full shadow-lg transition duration-300 flex items-center justify-center"
                  onClick={handleUpload}
                >
                  {t('upload')}
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {results && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mt-8 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6">{t('results')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-2"><strong>{t('mark')}:</strong> {results.mark}</p>
                  <p className="mb-2"><strong>{t('correctProblems')}:</strong> {results.correct_problems}</p>
                  <p className="mb-2"><strong>{t('wrongTasks')}:</strong> {results.wrong_tasks}</p>
                </div>
                <div>
                  <p className="mb-2"><strong>{t('feedback')}:</strong> {results.feedback}</p>
                  <p className="mb-2"><strong>{t("image")}:</strong> {results.annotatedImageUrl}</p>
                  <p className="mb-2"><strong>{t('mistakes')}:</strong> {results.mistakes}</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-purple-600">{t('additionalResources')}</h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleAdditionalResources}
                    className="text-purple-600 hover:text-purple-800 transition-colors duration-200"
                  >
                    <BookOpenIcon className="w-6 h-6" />
                  </motion.button>
                </div>
                {showAdditionalResources && (
                  <ul className="list-disc list-inside space-y-2 mt-4">
                    {results.searchLinks && results.searchLinks.map((link, index) => (
                      <li key={index}>
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{link}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex justify-between items-center mt-8">
                <motion.div whileHover={{ scale: 1.1 }} className="flex items-center text-green-600">
                  <CheckCircleIcon className="w-8 h-8 mr-2" />
                  <span className="font-semibold">{t('goodJob')}</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} className="flex items-center text-red-600">
                  <XCircleIcon className="w-8 h-8 mr-2" />
                  <span className="font-semibold">{t('needImprovement')}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 mb-8 py-8 bg-purple-100 rounded-3xl"
        >
          <h2 className="text-4xl font-extrabold text-center text-purple-600 mb-4">
            {t('Нет своего ДЗ? Попробуйте наши примеры!')}
          </h2>
          <p className="text-center text-gray-600 mb-6">
            {t('Загрузите эти примеры, чтобы протестировать работу приложения без использования собственных фотографий.')}
          </p>
          <div className="flex items-center justify-center mb-6">
            <QuestionMarkCircleIcon className="w-6 h-6 text-purple-600 mr-2" />
            <span className="text-sm text-gray-600">
              {t('Наведите на пример, чтобы узнать больше о его использовании')}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {exampleImages.map((example, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="overflow-hidden rounded-2xl shadow-2xl cursor-pointer relative"
                onClick={() => setSelectedExample(example)}
                onMouseEnter={() => handleExampleHover(example)}
                onMouseLeave={handleExampleLeave}
              >
                <img src={example.src} alt={`Example ${index + 1}`} className="w-full h-60 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUseExample(example);
                    }}
                    className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold"
                  >
                    {t('Использовать')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <AnimatePresence>
            {showExampleHint && activeExample && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg"
              >
                <p>{t('Это пример')} {activeExample.description}. {t('Нажмите, чтобы использовать его в приложении.')}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex justify-center mt-6">
            <ArrowDownIcon className="w-8 h-8 text-purple-600 animate-bounce" />
          </div>
        </motion.div>

        <div className="bg-gray-100 p-6 rounded-2xl mb-8">
          <h3 className="text-2xl font-bold text-purple-600 mb-4">{t('Как использовать примеры:')}</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>{t('Нажмите на Использовать')}</li>
            <li>{t('Нажмите "Загрузить" для анализа')}</li>
          </ol>
        </div>

        <Modal
          isOpen={!!selectedExample}
          onRequestClose={() => setSelectedExample(null)}
          className="bg-white rounded-lg p-6 max-w-lg w-full mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          {selectedExample && (
            <>
              <img src={selectedExample.src} alt="Example" className="w-[356px] h-[360px] mb-4 rounded-lg" />
              <p className="text-gray-700 mb-4">{selectedExample.description}</p>
              <div className="flex justify-between">
                <button 
                  onClick={() => handleExampleDownload(selectedExample)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  {t('Скачать пример')}
                </button>
                <button 
                  onClick={() => handleUseExample(selectedExample)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  {t('Использовать пример')}
                </button>
              </div>
            </>
          )}
        </Modal>

        <AnimatePresence>
          {showExampleNotification && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg"
            >
              {t('Вы используете пример ДЗ. Хотите загрузить свое собственное?')}
            </motion.div>
          )}
        </AnimatePresence>

        <PreviewModal />
      </motion.div>
    </MainLayout>
  );
};

export default UploadImage;
