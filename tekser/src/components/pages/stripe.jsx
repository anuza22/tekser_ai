import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import MainLayout from "../../layout/mainLayout";
import Dropzone from "../basic/dropZone";

const MyClasses = () => {
  const { t } = useTranslation();
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
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("Upload");

  useEffect(() => {
    // Fetch classes from the server
    const fetchClasses = async () => {
      try {
        const response = await axios.get('/api/classes');
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };
    fetchClasses();
  }, []);

  const handleClassClick = async (classId) => {
    setLoading(true);
    setSelectedClass(classId);
    try {
      const response = await axios.get(`/api/classes/${classId}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e, index) => {
    // Handle file changes
    console.log(`Files uploaded for state ${index}:`, e.target.files);
  };

  const handleUpload = () => {
    // Handle the upload logic here
    setUploadStatus("See Result");
  };

  return (
    <MainLayout>
    <div className="flex flex-col flex-1 justify-center items-center px-4 sm:px-10">
      <div className="w-full flex flex-col items-center mt-6">
        <div className="w-full overflow-x-auto custom-scrollbar">
          <ul className="flex space-x-4 pb-2">
            {classes.map((classItem) => (
              <li
                key={classItem.id}
                onClick={() => handleClassClick(classItem.id)}
                className={`cursor-pointer px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedClass === classItem.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {classItem.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 w-full max-w-4xl">
          {loading ? (
            <p className="text-center text-lg">{t('Loading...')}</p>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="font-poppinsSemiBold text-2xl mb-4 text-primary-600">{t('List of Students')}</h2>
                  <ul className="space-y-2">
                    {students.map((student) => (
                      <li key={student.id} className="border border-gray-200 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        {student.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-poppinsSemiBold text-2xl text-primary-600">{t('Upload Homework')}</h2>
                    <button className="bg-primary-600 text-white py-2 px-4 rounded-full hover:bg-primary-700 transition-colors duration-200">
                      + {t('Homework')}
                    </button>
                  </div>
                  <div className="mt-4">
                    <Dropzone onFileChange={handleFileChange} state={1} />
                    <button
                      className="bg-primary-600 w-full rounded-lg px-11 py-3 mt-6 text-white font-poppinsSemiBold text-sm hover:bg-primary-700 transition-all duration-300"
                      onClick={handleUpload}
                    >
                      {uploadStatus}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </MainLayout>
);
};
export default MyClasses;
