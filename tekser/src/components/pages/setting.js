import { useCallback, useEffect, useState } from "react";
import MainLayout from "../../layout/mainLayout";
import Dropzone from "../basic/dropZone";
import Avatar from "../basic/avatar";
import { LocalImg } from "../basic/imgProvider";
import MyModal from "../basic/modal";
import { useDispatch, useSelector } from "react-redux";

const Setting = () => {
  const store = useSelector((state) => state.auth);

  const [notification, setNotification] = useState(
    // store.userData.receiveEmailNotificationEnabled
  );
  const [promotionalEmail, setPromotionalEmail] = useState(
    // store.userData.receivePromotionalEmailEnabled
  );
  const [image, setImage] = useState(null);
  const [avatarState, setAvatarState] = useState(null);
  const [userName, setUserName] = useState(null);
  const [error, setError] = useState(null);

  // const onDrop = useCallback((acceptedFiles) => {
  //   acceptedFiles.map((file) => {
  //     const reader = new FileReader();
  //     reader.onload = function (e) {
  //       setImage({ src: e.target.result, file: file });
  //       setAvatarState(true);
  //     };
  //     reader.readAsDataURL(file);
  //     return file;
  //   });
  // }, []);

  useEffect(() => {
    if (userName === "") {
      setError("Username field is required.");
    } else {
      setError(null);
    }
  }, [userName]);

  const SaveChange = (e) => {
    e.preventDefault();
    // if (!error) {
    //   dispatch(
    //     updateUserInfo({
    //       username: userName,
    //       avatar: image?.file ? image.file : null,
    //       emailNotificationState: notification,
    //       promotionalEmailState: promotionalEmail,
    //     })
    //   );
    // }
  };

  const CancelChange = () => {
    // dispatch(getUser());
  };

  return (
    <MainLayout>
      <div className="flex flex-1 flex-col mb-10 md:mb-40 md:px-10 lg:px-20 px-3 w-full">
        <div className="rounded-3xl flex md:flex-row flex-col md:items-center justify-center md:justify-start w-full h-60 relative">
          <img
            alt="background"
            src={LocalImg.settingHeader}
            className="absolute h-60 rounded-3xl w-full object-cover"
          />
          
            <img
              alt="current avatar"
              // src={store.userData.avatarImageUrl}
              className="rounded-full md:w-40 md:h-40 ml-6 z-10 w-20 h-20 border-white border-[3px]"
            />
            <img
              alt="current avatar"
              src={LocalImg.avatarPlaceholder_1}
              className="rounded-full md:w-40 md:h-40 ml-6 z-10 w-20 h-20"
            />

          <div className="flex flex-col ml-6 z-10">
            {/* <p className="text-2xl sm:text-3xl text-white">{store.userData.name}</p> */}
            {/* <span className="text-sm sm:text-base text-white">{store.userData.email}</span> */}
          </div>
        </div>
        <div
          className="my-12 flex flex-col md:px-8"
          id="settingSection"
          onSubmit={SaveChange}
        >
          <form className=" flex flex-col md:flex-row pb-5 border-b">
            <div className="md:w-1/5 w-full text-sm md:mr-8">
              <p className="font-poppinsMedium">Profile Information</p>
              <span className="text-gray-400">
                Update your photo, username and preferences.
              </span>
            </div>
            <div className="md:w-4/5 w-full md:px-6 px-3 md:mt-0 mt-8">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-1.5 text-sm font-poppinsMedium text-gray-900"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="border border-gray-300 focus:shadow-primary focus:border-primary-600 focus:ring-1 focus:ring-primary-600 focus:outline-none text-base rounded-lg mt-1 block w-full py-2.5 px-3.5"
                  placeholder="User Name"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                />
                {error && (
                  <div className="font-poppinsMedium mt-2 text-red-500">
                    {error}
                  </div>
                )}
              </div>
              <div className="mt-6 flex flex-col md:flex-row" id="upload">
                <Avatar image={image?.src} size="64px" state={avatarState} />
                <Dropzone state={0} />
              </div>
              <div className="mt-6 flex flex-col" id="setNotification">
                <label className="inline-flex relative items-center mr-5 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notification}
                    readOnly
                  />
                  <div
                    onClick={() => {
                      setNotification(!notification);
                    }}
                    className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-primary-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"
                  ></div>
                  <span className="ml-2 font-poppinsMedium text-gray-700">
                    Receive email notifications
                  </span>
                </label>
                <span className="ml-[52px] mt-1 text-gray-400 text-sm">
                  We will send you emails when you’re avatars and packs are
                  ready.
                </span>
              </div>
              <div className="mt-6 flex flex-col" id="setPromotionalEmail">
                <label className="inline-flex relative items-center mr-5 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={promotionalEmail}
                    readOnly
                  />
                  <div
                    onClick={() => {
                      setPromotionalEmail(!promotionalEmail);
                    }}
                    className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-primary-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"
                  ></div>
                  <span className="ml-2 font-poppinsMedium text-gray-700">
                    Receive promotional emails
                  </span>
                </label>
                <span className="ml-[52px] mt-1 text-gray-400 text-sm">
                  We will send you personal offers and promotions and discounts.
                </span>
              </div>
              <div className="mt-6 mb-4 font-poppinsSemiBold" id="confirm">
                <button
                  className="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2.5 mt-6 mr-3 text-white text-sm"
                  type="submit"
                >
                  Save changes
                </button>
                <button
                  type="button"
                  onClick={CancelChange}
                  className="border border-gray-300 hover:bg-gray-100 rounded-lg px-4 py-2.5 mt-6 text-gray-900 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
          <div className="flex flex-col md:flex-row mt-6">
            <div className="md:w-1/5 text-sm md:mr-8">
              <p className="font-poppinsMedium">Account Control</p>
              <span className="text-gray-400">
                Delete your images or terminate your account.
              </span>
            </div>
            <div className="md:w-4/5 px-3 md:px-6 mt-8 md:mt-0">
              <div className="flex flex-col" id="delete_image">
                <p className="font-poppinsMedium">Delete generated images</p>
                <span className="text-gray-400">
                  We will delete all of your generated images.
                </span>
                <MyModal obj="image" />
              </div>
              <div className="flex flex-col mt-6" id="delete_account">
                <p className="font-poppinsMedium">Delete account</p>
                <span className="text-gray-400">
                  We will delete your account and delete all data.
                </span>
                <MyModal obj="account" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Setting;
