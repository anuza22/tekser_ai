import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout/mainLayout";
import { LocalImg } from "../basic/imgProvider";
import Video from "../../assets/video/Photomath.mp4";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Landing = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [uploadCount, setUploadCount] = useState(1);

  const getstarted = () => {
    navigate("/upload");
  };
  
  useEffect(() => {
    const fetchUploadCount = async () => {
      try {
        const response = await axios.get('https://aisun-production.up.railway.app/api/upload-count');
        // const response = await axios.get('http://localhost:6161/api/upload-count');

        setUploadCount(response.data.uploadCount);
      } catch (error) {
        console.error('Error fetching upload count:', error);
      }
    };
    fetchUploadCount();
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center w-full 2xl:px-64 lg:px-32 px-8 pt-16 xl:pb-60 pb-20 relative">
        <div
          className="px-8 2xl:pb-64 xl:pb-48 pb-32 flex flex-col-reverse lg:flex-row justify-center items-center w-full"
          id="start"
        >
          <div
            className="flex-1 lg:mr-20 flex flex-col items-center lg:items-start"
            id="hero"
          >
            <h1 className="font-poppinsBold 2xl:text-[88px] xl:text-7xl sm:text-5xl text-3xl 2xl:leading-[90px] text-gray-900 lg:mb-6 mb-4 lg:mt-0 sm:mt-8 mt-4">
              {/* TekserAI{" "} */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#842EE5] via-[#E1338A] to-[#FBA174]">
              {t('title')}
              </span>
            </h1>
            <p className="font-poppinsRegular text-gray-600 sm:text-xl mb-8">
            {t('description')}            </p>
            <button
              onClick={getstarted}
              className="block lg:text-lg sm:text-base text-sm bg-gradient-to-r from-[#842EE5] via-[#E1338A] to-[#FBA174] py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-white font-poppinsSemiBold"
            >
              {t('getStarted')}
            </button>
          </div>
          <div className="flex-1" id="image_group">
            <img src={LocalImg.Group} alt="Group" />
          </div>
        </div>
        <div
          className="flex flex-col px-8 2xl:pb-64 xl:pb-48 pb-32 w-full"
          id="offer"
        >
          <h2 className="text-center mt-8 lg:mt-0 font-poppinsBold xl:text-6xl md:text-4xl text-3xl text-gray-900 mb-6">
          {t('whyChoose')}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#842EE5] via-[#E1338A] to-[#FBA174]">
              TekserAI?
            </span>
          </h2>
          <div className="w-full flex flex-col sm:flex-row justify-between items-center shadow-3xl xl:px-16 px-4 py-8 xl:gap-4 gap-2 rounded-2xl">
            <div className="flex flex-col text-center sm:w-1/3 w-2/3">
              <span className="xl:text-5xl lg:text-3xl text-2xl font-poppinsBold text-primary-600 mb-1">
                85%
              </span>
              <span className="sm:text-xl font-poppinsRegular text-primary-900">
              {t('accuracy')}
              </span>
            </div>
            <div className="sm:h-32 h-1 sm:w-1 w-full bg-primary-100"></div>
            <div className="flex flex-col text-center sm:w-1/3 w-2/3">
              <span className="xl:text-5xl lg:text-3xl text-2xl font-poppinsBold text-primary-600 mb-1">
                90%
              </span>
              <span className="sm:text-xl font-poppinsRegular text-primary-900">
              {t('timeSaved')}
              </span>
            </div>
            <div className="sm:h-32 h-1 sm:w-1 w-full bg-primary-100"></div>
            <div className="flex flex-col text-center sm:w-1/3 w-2/3">
              <span className="xl:text-5xl lg:text-3xl text-2xl font-poppinsBold text-primary-600 mb-1">
                {uploadCount+30}+
              </span>
              <span className="sm:text-xl font-poppinsRegular text-primary-900">
              {t('happyTeachers')}
              </span>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col md:flex-row w-full items-center px-6 md:px-0 2xl:pb-64 xl:pb-48 pb-32"
          id="metrics"
        >
          <div className="flex flex-1 flex-col mr-6">
            <div className="flex flex-col mb-6">
              <h2 className="2xl:w-2/3 text-center md:text-start mt-6 md:mt-0 flex flex-col font-poppinsBold xl:text-6xl md:text-4xl xl:leading-[76px] text-3xl text-gray-900">
              {t('efficient')}{" "}                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#842EE5] via-[#E1338A] to-[#FBA174]">
              {t('Time-Saving')}
                </span>
              </h2>
            </div>
            <div className="font-poppinsRegular sm:text-xl text-gray-600">
            {t('solution')}            </div>
          </div>
          <div className="flex-1 py-14 flex justify-center">
            <video
              className="rounded-lg md:rounded-[30px] shadow-3xl"
              autoPlay
              loop
              muted
            >
              <source src={Video} type="video/mp4" />
            </video>
          </div>
        </div>
        <div
          className="w-full flex flex-col 2xl:pb-64 xl:pb-48 pb-32"
          id="example"
        >
          <h2 className="text-center font-poppinsBold xl:text-6xl md:text-4xl text-3xl text-gray-900 mb-8">
          {t('exploreFeatures')}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#842EE5] via-[#E1338A] to-[#FBA174]">
            {t('Features')}
            </span>
          </h2>
          <div className="flex justify-center flex-wrap gap-4 md:gap-8 mb-8">
            <div className="relative">
              <img
                // src={LocalImg.Wizzard}
                src={"https://images.prismic.io/quizlet-prod/3a92729c-f212-4ac0-8dad-b2c875c57358_20210814_QZ_Home_StudyJam.png?auto=compress,format&rect=0,2,3072,2395&w=1026&h=800"}

                alt="demo"
                className="rounded-lg md:rounded-[30px] 3xl:w-64 2xl:w-56 xl:w-48 md:w-40 sm:w-32 w-24 3xl:h-64 2xl:h-56 xl:h-48 md:h-40 sm:h-32 h-24"
              />
              <span className="font-poppinsBold text-sm sm:text-xl md:text-2xl text-white absolute md:left-6 sm:left-5 left-4 md:bottom-[18px] sm:bottom-3 bottom-2">
              {t('instantFeedback')}
              </span>
            </div>
            <div className="relative">
              <img
                // src={LocalImg.Cartoon3D}
                src={"https://images.prismic.io/quizlet-prod/6b2ff704-ccbf-441e-9b49-dbd3b7d7d530_20210814_QZ_Home_MobileApp.png?auto=compress,format&rect=0,2,3072,2395&w=1026&h=800"}
                alt="demo"
                className="rounded-lg md:rounded-[30px] 3xl:w-64 2xl:w-56 xl:w-48 md:w-40 sm:w-32 w-24 3xl:h-64 2xl:h-56 xl:h-48 md:h-40 sm:h-32 h-24"
              />
              <span className="font-poppinsBold text-sm sm:text-xl md:text-2xl text-white absolute md:left-6 sm:left-5 left-4 md:bottom-[18px] sm:bottom-3 bottom-2">
              {t('detailedAnalytics')}
              </span>
            </div>
            <div className="relative">
              <img
                // src={LocalImg.SuperheroMale}
                src={"https://images.prismic.io/quizlet-prod/3a92729c-f212-4ac0-8dad-b2c875c57358_20210814_QZ_Home_StudyJam.png?auto=compress,format&rect=0,2,3072,2395&w=1026&h=800"}
                alt="demo"
                className="rounded-lg md:rounded-[30px] 3xl:w-64 2xl:w-56 xl:w-48 md:w-40 sm:w-32 w-24 3xl:h-64 2xl:h-56 xl:h-48 md:h-40 sm:h-32 h-24"
              />
              <span className="font-poppinsBold text-sm sm:text-xl md:text-2xl text-white absolute md:left-6 sm:left-5 left-4 md:bottom-[18px] sm:bottom-3 bottom-2">
              {t('aiPowered')}
              </span>
            </div>
          </div>
          <div className="text-center font-poppinsBold text-gray-900 xl:text-4xl md:text-2xl text-lg">
          {t('andMuchMore')}
          </div>
        </div>
        <div
          className="w-full flex flex-col justify-center items-center"
          id="bottom_hero"
        >
          <div className="w-full pb-8 flex flex-col text-center">
            <h2 className="font-poppinsBold xl:text-6xl md:text-4xl text-3xl text-gray-900 mb-6">
            {t('getStartedToday')}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#842EE5] via-[#E1338A] to-[#FBA174]">
                TekserAI!
              </span>
            </h2>
            <p className="font-poppinsRegular sm:text-xl text-gray-600">
            {t('uploadHomework')}            </p>
          </div>
          <button
            onClick={getstarted}
            className="block lg:text-lg lg:w-64 w-48 bg-gradient-to-r from-[#842EE5] via-[#E1338A] to-[#FBA174] py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-white font-poppinsSemiBold"
          >
            {t('tryForFree')}
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Landing;
