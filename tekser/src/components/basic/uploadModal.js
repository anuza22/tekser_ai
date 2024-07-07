import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from 'react-i18next';
import { LocalImg } from "./imgProvider";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function PreviewModal() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(0);

  const modalRef = useRef(null);
  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSkip = () => {
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={modalRef}
        onClose={() => {}}
        open={true}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              ref={modalRef}
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative p-6 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-lg">
                <div className="bg-white pt-5 pb-4">
                  {images(step)}
                  <div className="flex items-start">{text(step, t)}</div>
                </div>
                <div className="flex justify-center items-center mt-4 h-3">
                  {step === 0 ? null : (
                    <div className="w-2/3 flex justify-between h-2">
                      <div
                        className={`${
                          step === 1 ? "bg-primary-700" : "bg-gray-300"
                        } h-2 rounded-full mr-1 w-1/2`}
                      ></div>
                      <div
                        className={`${
                          step === 2 ? "bg-primary-700" : "bg-gray-300"
                        } h-2 rounded-full w-1/2`}
                      ></div>
                    </div>
                  )}
                </div>
                <div className="py-3 flex justify-between items-center">
                  {step === 0 ? (
                    <button
                      type="button"
                      className="block w-full mr-3 border-gray-300 mt-6 py-2 rounded-lg text-gray-700 disabled:text-gray-300 border disabled:border-gray-200 font-poppinsSemiBold mb-2 text-sm sm:text-base"
                      onClick={() => handleSkip()}
                    >
                      {t('skipGuide')}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="block w-full mr-3 border-gray-300 mt-6 py-2 rounded-lg text-gray-700 disabled:text-gray-300 border disabled:border-gray-200 font-poppinsSemiBold mb-2 text-sm sm:text-base"
                      onClick={() => handleBack()}
                      disabled={step > 1 ? false : true}
                    >
                      {t('back')}
                    </button>
                  )}

                  <button
                    type="button"
                    className="block w-full bg-primary-600 hover:bg-primary-700 mt-6 py-2 rounded-lg text-white font-poppinsSemiBold mb-2 text-sm sm:text-base"
                    onClick={() => {
                      step > 1 ? setOpen(false) : handleNext();
                    }}
                  >
                    {step === 0 ? t('startGuide') : t('next')}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

const images = (step) => {
  switch (step) {
    case 0:
      return (
        <div className="flex justify-center items-center">
          <img src={LocalImg.party} alt="Success" />
        </div>
      );
    case 1:
      return (
        <div className="px-1 flex flex-wrap gap-3 justify-center items-center">
          <img src={"https://img.freepik.com/free-photo/schoolgirl-desk-with-laptop-memphis-style_23-2148203784.jpg?size=626&ext=jpg&ga=GA1.1.1738361224.1719930066&semt=ais_user"} alt="Bad" className="rounded-lg" />
        </div>
      );
    default:
      return (
        <div className="px-1 flex flex-wrap gap-3 justify-center items-center">
          <img src={"https://img.freepik.com/free-photo/serious-young-blonde-call-centre-girl-wearing-headset-glasses-sitting-desk-with-work-tools-doing-stop-gesture_141793-111948.jpg?t=st=1719930713~exp=1719934313~hmac=357f652dc47772bce79028fb71a8c97ae8b2c0c5e4f45032b7b74084f2e0f433&w=826"} alt="Bad" className="rounded-lg" />
        </div>
      );
  }
};

const text = (step, t) => {
  switch (step) {
    case 0:
      return (
        <div className="mt-16 text-center">
          <Dialog.Title
            as="h3"
            className="text-xl font-poppinsSemiBold leading-6 text-gray-900"
          >
            {t('makeLifeEasier')}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm font-poppinsRegular text-gray-500">
              {t('guideIntro')}
            </p>
          </div>
        </div>
      );
    case 1:
      return (
        <div className="mt-16 text-center">
          <Dialog.Title
            as="h3"
            className="text-xl font-poppinsSemiBold leading-6 text-gray-900"
          >
            {t('uploadGoodImages')}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm font-poppinsRegular text-gray-500">
              {t('qualityChecker')}
            </p>
          </div>
        </div>
      );
    default:
      return (
        <div className="mt-16 text-center">
          <Dialog.Title
            as="h3"
            className="text-xl font-poppinsSemiBold leading-6 text-gray-900"
          >
            {t('chooseOption')}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm font-poppinsRegular text-gray-500">
              {t('chooseDetails')}
            </p>
          </div>
        </div>
      );
  }
};
