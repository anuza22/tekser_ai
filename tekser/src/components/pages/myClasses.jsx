import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout/mainLayout";
import Dropzone from '../basic/dropZone';
import Modal from 'react-modal';

const MyClasses = () => {
  const [classes, setClasses] = useState([
    { id: 1, name: 'Class 5A' },
    { id: 2, name: 'Class 5B' },
    { id: 3, name: 'Class 6A' },
    { id: 4, name: 'Class 6B' },
    { id: 5, name: 'Class 7A' },
    { id: 6, name: 'Class 7B' },
  ]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Johnson" },
    { id: 4, name: "Emily Davis" },
    { id: 5, name: "Chris Wilson" },
  ]);
  const [uploadStatus, setUploadStatus] = useState({});
  const [homeworks, setHomeworks] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentHomework, setCurrentHomework] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchStudents(selectedClass);
    }
  }, [selectedClass]);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('/api/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchStudents = async (classId) => {
    try {
      const response = await axios.get(`/api/students/${classId}`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleUpload = async (studentId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUploadStatus(prev => ({ ...prev, [studentId]: 'uploaded' }));
    } catch (error) {
      console.error('Error uploading homework:', error);
    }
  };

  const addHomework = (classId) => {
    setHomeworks(prev => ({
      ...prev,
      [classId]: [
        ...(prev[classId] || []),
        { id: Date.now(), students: students.map(s => ({ ...s, uploaded: false })) }
      ]
    }));
  };

  const openModal = (homeworkId) => {
    setCurrentHomework(homeworkId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <MainLayout>
      <div className="min-h-screen  w-full">
      <main className="w-full px-4 sm:px-8 py-16">

          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-4 pb-4">
              {classes.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClass(cls.id)}
                  className={`px-6 py-3 rounded-full transition duration-300 ease-in-out font-poppinsSemiBold ${
                    selectedClass === cls.id
                      ? 'bg-gradient-to-r from-[#842EE5] via-[#E1338A] to-[#FBA174] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cls.name}
                </button>
              ))}
            </div>
          </div>

          {selectedClass && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-[#842EE5] via-[#E1338A] to-[#FBA174] text-white flex justify-between items-center">
                <h2 className="font-poppinsBold text-2xl">{t('studentList')}</h2>
                <button
                  onClick={() => addHomework(selectedClass)}
                  className="px-4 py-2 bg-white text-[#842EE5] rounded-md font-poppinsSemiBold hover:bg-gray-100 transition duration-300"
                >
                  + {t('addHomework')}
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th className="py-3 px-4 text-left font-poppinsSemiBold">{t('name')}</th>
                    <th className="py-3 px-4 text-left font-poppinsSemiBold">{t('homeworks')}</th>
                    <th className="py-3 px-4 text-left font-poppinsSemiBold">{t('process')}</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b">
                      <td className="py-3 px-4 font-poppinsRegular">{student.name}</td>
                      <td className="py-3 px-4">
                        {homeworks[selectedClass]?.map((homework, index) => (
                          <div key={homework.id} className="mb-2">
                            <span className="font-poppinsSemiBold text-gray-700">
                              {t('homework')} {index + 1}:
                            </span>
                            {' '}
                            {homework.students.find(s => s.id === student.id)?.uploaded
                              ? <span className="text-green-500">{t('uploaded')}</span>
                              : <span className="text-red-500">{t('notUploaded')}</span>
                            }
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-4">
                          <input
                            type="file"
                            className="hidden"
                            id={`file-${student.id}`}
                            onChange={() => handleUpload(student.id)}
                          />
                          <label
                            htmlFor={`file-${student.id}`}
                            className={`cursor-pointer px-4 py-2 rounded-md font-poppinsSemiBold ${
                              uploadStatus[student.id] === 'uploaded'
                                ? 'bg-green-500 text-white'
                                : 'bg-gradient-to-r from-[#842EE5] via-[#E1338A] to-[#FBA174] text-white hover:opacity-90'
                            } transition duration-300 ease-in-out`}
                          >
                            {uploadStatus[student.id] === 'uploaded' ? t('seeResult') : t('upload')}
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Homework Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="font-poppinsBold text-2xl mb-4">{t('uploadHomework')}</h2>
        <Dropzone state={0} onFileChange={(event) => handleUpload(currentHomework)} />
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-[#842EE5] via-[#E1338A] to-[#FBA174] text-white rounded-md font-poppinsSemiBold hover:opacity-90 transition duration-300"
        >
          {t('close')}ы
        </button>
      </Modal>
    </MainLayout>
  );
};

export default MyClasses;
