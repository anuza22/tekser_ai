// import { Link } from "react-router-dom";
// import { LocalImg } from "../components/basic/imgProvider";

// const LeftSide = () => {
//   return (
//     <div className="overflow-hidden min-h-screen py-10 md:flex flex-col w-1/2 bg-gradient-to-br from-[#2B0656] via-[#3A0773] to-[#842EE5] i justify-center hidden">
//       <Link to="/" className="mt-8 ml-8 lg:ml-16 mb-20 lg:mb-28 4xl:mb-48 w-fit">
//       <span className="text-4xl font-bold text-white">TekserAi</span>
//       </Link>
//       <div className="scale-[1.25] mb-8">
//         {/* <img src={LocalImg.sign} alt="sign" className="" /> */}
//       </div>
//     </div>
//   );
// };

// export default LeftSide;
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const LeftSide = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const tekserAiFeatures = [
    "Персонализированное обучение с ИИ",
    "Интерактивные уроки в реальном времени",
    "Адаптивная система оценки знаний",
    "Виртуальные лаборатории и симуляции",
    "Мультиязычная поддержка обучения",
    "Геймификация образовательного процесса"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % tekserAiFeatures.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden min-h-screen py-10 md:flex flex-col w-1/2 bg-gradient-to-br from-[#2B0656] via-[#3A0773] to-[#842EE5] justify-between hidden">
      <Link to="/" className="mt-8 ml-8 lg:ml-16 w-fit">
        <span className="text-4xl font-bold text-white">TekserAi</span>
      </Link>

      
      
      <div className="flex flex-col items-center justify-center flex-grow px-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Добро пожаловать в будущее образования</h2>
        
        <div className="tekserai-cube mb-12">
          <div className="cube-face front">T</div>
          <div className="cube-face back">E</div>
          <div className="cube-face right">K</div>
          <div className="cube-face left">S</div>
          <div className="cube-face top">E</div>
          <div className="cube-face bottom">R</div>
        </div>
        
        <div className="feature-container text-white text-center">
          <p className="text-xl font-semibold mb-4 feature-text">
            {tekserAiFeatures[currentFeature]}
          </p>
        </div>
      </div>
      
      <div className="text-white text-center px-8 mb-8">
        <h3 className="text-2xl font-semibold mb-4">Почему TekserAi?</h3>
        <ul className="text-lg list-disc list-inside text-left">
          <li>Инновационные методы обучения с использованием ИИ</li>
          <li>Индивидуальный подход к каждому ученику</li>
          <li>Доступ к обширной базе знаний 24/7</li>
          <li>Сертификаты международного образца</li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSide;