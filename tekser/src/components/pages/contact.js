import { useEffect, useState } from "react";
import MainLayout from "../../layout/mainLayout";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [error, setError] = useState({
    email: "",
    firstName: "",
    lastName: "",
    message: ""
  });

  const SendMessage = async (e) => {
    e.preventDefault();
    const isValid = handleValidate();

    if (isValid) {
      const response = await fetch('https://aisun-production.up.railway.app/send-email', {
        method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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

      if (response.ok) {
        setMessage(""); // Очистить сообщение
        alert(t('messageSentSuccess'));
      } else {
        alert(t('messageSentFail'));
      }
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
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
