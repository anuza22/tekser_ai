import { useEffect, useState } from "react";
import MainLayout from "../../layout/mainLayout";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState({
    email: "",
    firstName: "",
    lastName: "",
    message: ""
  });

  const SuccessMessagePopup = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 mt-2">{message}</h3>
          <div className="mt-2 px-7 py-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SendMessage = async (e) => {
    e.preventDefault();
    const isValid = handleValidate();

    if (isValid) {
      const response = await fetch('https://aisun-production.up.railway.app/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          message,
        }),
      });

      setShowSuccessMessage(true);

    
    }
  };

  const handleValidate = () => {
    let emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    const errors = {
      email: email.length
        ? emailValid
          ? ""
          : t('pleaseConfirmEmail')
        : t('pleaseEnterEmail'),
      message: message.length ? "" : t('pleaseLeaveMessage'),
      firstName: firstName.length ? "" : t('pleaseEnterFirstName'),
      lastName: lastName.length ? "" : t('pleaseEnterLastName'),
    };
    setError(errors);

    return !Object.values(errors).some((msg) => msg !== "");
  };

  return (
    <MainLayout>
      <div
        className="w-3/4 flex flex-1 flex-col justify-center items-center mb-40 md:px-10"
        id="contact"
      >
        <div className="text-center md:px-4 lg:px-16">
          <h1 className="font-poppinsSemiBold text-4xl sm:text-5xl mt-16">
            {t('contactUs')}
          </h1>
          <p className="mt-1 text-sm sm:text-lg text-gray-600">
            {t('weLoveToHear')}
          </p>
        </div>
        <div className="w-full sm:px-10 mt-16">
          <form className="flex flex-col items-center" onSubmit={SendMessage}>
            <div className="flex flex-col sm:flex-row w-full">
              <div className="w-full sm:w-1/2 sm:mr-8">
                <label
                  htmlFor="first_name"
                  className="block mb-1.5 text-sm font-poppinsMedium text-gray-900"
                >
                  {t('firstName')}
                </label>
                <input
                  type="text"
                  id="first_name"
                  value={firstName}
                  className="border border-gray-300 focus:shadow-primary focus:border-primary-600 focus:ring-1 focus:ring-primary-600 focus:outline-none text-base rounded-lg mt-1 block w-full py-2.5 px-3.5"
                  placeholder={t('firstName')}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {error.firstName && (
                  <div className="font-poppinsMedium mt-2 text-red-500">
                    {error.firstName}
                  </div>
                )}
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="last_name"
                  className="block mb-1.5 text-sm font-poppinsMedium text-gray-900"
                >
                  {t('lastName')}
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="border border-gray-300 focus:shadow-primary focus:border-primary-600 focus:ring-1 focus:ring-primary-600 focus:outline-none text-base rounded-lg mt-1 block w-full py-2.5 px-3.5"
                  placeholder={t('lastName')}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {error.lastName && (
                  <div className="font-poppinsMedium mt-2 text-red-500">
                    {error.lastName}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full mt-6">
              <label
                htmlFor="email"
                className="block mb-1.5 text-sm font-poppinsMedium text-gray-900"
              >
                {t('email')}
              </label>
              <input
                type="text"
                id="email"
                className="border border-gray-300 focus:shadow-primary focus:border-primary-600 focus:ring-1 focus:ring-primary-600 focus:outline-none text-base rounded-lg mt-1 block w-full py-2.5 px-3.5"
                placeholder={t('email')}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error.email && (
                <div className="font-poppinsMedium mt-2 text-red-500">
                  {error.email}
                </div>
              )}
            </div>
            <div className="w-full mt-6">
              <label
                htmlFor="message"
                className="block mb-1.5 text-sm font-poppinsMedium text-gray-900"
              >
                {t('message')}
              </label>
              <textarea
                rows={5}
                id="message"
                className="border border-gray-300 focus:shadow-primary focus:border-primary-600 focus:ring-1 focus:ring-primary-600 focus:outline-none text-base rounded-lg mt-1 block w-full py-2.5 px-3.5 resize-none"
                placeholder={t('leaveMessage')}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              {error.message && (
                <div className="font-poppinsMedium mt-2 text-red-500">
                  {error.message}
                </div>
              )}
            </div>
            <button
              className="bg-primary-600 rounded-lg w-full py-2.5 mt-8 text-white font-poppinsSemiBold text-sm"
              type="submit"
            >
              {t('sendMessage')}
            </button>
            {showSuccessMessage && (
      <SuccessMessagePopup
        message={t('messageSentSuccess')}
        onClose={() => setShowSuccessMessage(false)}
      />
    )}          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
