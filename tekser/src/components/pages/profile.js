import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import MainLayout from "../../layout/mainLayout";
import { FaUser, FaSchool, FaUserGraduate, FaEdit, FaSave, FaTimes, FaBell, FaEnvelope, FaChalkboardTeacher, FaBook, FaCalendarAlt, FaTrophy, FaChartLine, FaCog } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Avatar from "../basic/avatar";
import Dropzone from "../basic/dropZone";
import MyModal from "../basic/modal";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [notification, setNotification] = useState(true);
  const [promotionalEmail, setPromotionalEmail] = useState(false);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfoResponse = await axios.get('http://localhost:6161/api/v1/userinfo', {
          headers: {
            'Access-Token': token,
          },
        });
        setUserData(userInfoResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleCancel = () => setIsEditing(false);

  const TabButton = ({ name, icon, label }) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`flex items-center px-4 py-2 rounded-lg transition duration-300 ${activeTab === name ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="bg-gray-100 min-h-screen">
        <div className="relative h-80 bg-gradient-to-r from-primary-600 to-primary-800">
          <img
            src="/path/to/background-pattern.svg"
            alt="Background pattern"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-30 text-white p-8">
            <div className="max-w-7xl mx-auto flex items-end">
              <Avatar image={userData.avatar} size="160px" className="border-4 border-white shadow-lg" />
              <div className="ml-8 mb-4">
                <h1 className="text-5xl font-bold">{userData.name}</h1>
                <p className="text-2xl mt-2">{userData.subject} Teacher</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-4">
              <TabButton name="overview" icon={<FaUser className="text-xl" />} label="Overview" />
              <TabButton name="classes" icon={<FaChalkboardTeacher className="text-xl" />} label="Classes" />
              <TabButton name="achievements" icon={<FaTrophy className="text-xl" />} label="Achievements" />
              <TabButton name="stats" icon={<FaChartLine className="text-xl" />} label="Statistics" />
              <TabButton name="settings" icon={<FaCog className="text-xl" />} label="Settings" />
            </div>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg flex items-center transition duration-300"
              >
                <FaEdit className="mr-2" /> Edit Profile
              </button>
            ) : (
              <div>
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center transition duration-300 mr-4"
                >
                  <FaSave className="mr-2" /> Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center transition duration-300"
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
              </div>
            )}
          </div>

          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <FaUser className="mr-2 text-primary-600" /> Teacher Information
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Subject:</strong> {userData.subject}</li>
                  <li><strong>Grade:</strong> {userData.grade}</li>
                  <li><strong>Experience:</strong> {userData.experience}</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <FaSchool className="mr-2 text-primary-600" /> School Information
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>School:</strong> {userData.school}</li>
                  <li><strong>Location:</strong> Almaty, Kazakhstan</li>
                  <li><strong>Type:</strong> Public</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <FaChartLine className="mr-2 text-primary-600" /> Quick Stats
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Total Students:</strong> {userData.students}</li>
                  <li><strong>Average Grade:</strong> {userData.averageGrade}/5.0</li>
                  <li><strong>Classes:</strong> 6</li>
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'classes' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                <FaBook className="mr-3 text-primary-600" /> Current Classes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Math 9A', 'Math 9B', 'Math 10A', 'Math 10B', 'Math 11A', 'Math 11B'].map((className) => (
                  <div key={className} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 text-lg">{className}</h4>
                    <p className="text-gray-600">30 students</p>
                    <button className="mt-2 text-primary-600 hover:text-primary-700 transition duration-300">View Details</button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                <FaTrophy className="mr-3 text-primary-600" /> Achievements
              </h3>
              <ul className="space-y-4">
                {userData.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-center">
                    <FaTrophy className="text-yellow-500 mr-3" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-6 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Add New Achievement
              </button>
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                <FaChartLine className="mr-3 text-primary-600" /> Statistics
              </h3>
              {/* Add charts or graphs here */}
              <p className="text-gray-600">Detailed statistics and performance metrics would be displayed here.</p>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">Notification Settings</h3>
              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={notification}
                      onChange={() => setNotification(!notification)}
                    />
                    <div className={`block w-14 h-8 rounded-full ${notification ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${notification ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                  <span className="font-medium text-gray-700">Receive email notifications</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={promotionalEmail}
                      onChange={() => setPromotionalEmail(!promotionalEmail)}
                    />
                    <div className={`block w-14 h-8 rounded-full ${promotionalEmail ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${promotionalEmail ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                  <span className="font-medium text-gray-700">Receive promotional emails</span>
                </label>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-6 text-gray-800">Account Control</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-700">Delete generated images</p>
                  <p className="text-gray-600 text-sm">We will delete all of your generated images.</p>
                  <MyModal obj="image" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Delete account</p>
                  <p className="text-gray-600 text-sm">We will delete your account and all associated data.</p>
                  <MyModal obj="account" />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;

