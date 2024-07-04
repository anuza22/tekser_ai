import { Fragment, useEffect, useState } from "react";
import {
  Bars3Icon,
  // BellIcon,
  Cog8ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { LocalImg } from "../components/basic/imgProvider";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { handleSignOut } from "../redux/user/user";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [authState, setAuthState] = useState(false);

  const store = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(store.userData).length) {
      setAuthState(true);
    } else {
      setAuthState(false);
    }
  }, [store.userData, dispatch]);

  const navigate = useNavigate();
  const LoginHandle = () => {
    navigate("/login");
  };

  const createAvatar = () => {
    navigate("/payment");
  };

  const handleSetting = () => {
    navigate("/setting");
  };

  const myHomework = () => {
    navigate("/homeworks");
    setNavbarOpen(false);
  };

  const settingClick = () => {
    setNavbarOpen(false);
    navigate("/setting");
  };

  const onSignOut = () => {
    dispatch(handleSignOut());
  };

  return (
    <>
      <nav className="border-gray-200 px-3 md:px-10 lg:px-20 rounded w-full">
        <div className="flex items-center justify-between">
          <div className="relative flex justify-between md:w-auto md:static md:block">
            <div className="flex items-center">
              <Link
                className="text-sm font-bold leading-relaxed contents mr-7 py-2 whitespace-nowrap"
                to="/"
              >
                <span className="font-poppins pl-4 2xl:text-[88px] 3xl:text-3xl sm:text-3xl text-xl 2xl:leading-[90px] text-gray-710 lg:mb-0 mb-0 lg:mt-0 sm:mt-0 mt-0">TekserAi</span>
              </Link>
            </div>
          </div>
          <div className={"flex items-center justify-between w-auto"} id="mobile menu">
            <ul className="flex justify-center items-center p-4 border-gray-100 rounded-lg w-full flex-row md:space-x-8 space-x-3 xs:space-x-6 mt-0 text-sm font-medium border-0">
              {authState ? (
                <>
                  <li className="md:flex text-base font-poppinsSemiBold hidden ml-2 text-gray-700 active:text-gray-900 hover:text-gray-900 active:bg-primary-100 rounded-lg px-3 py-2">
                    <Link to="/homeworks" className="pr-2">
                      Homeworks
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={createAvatar}
                      className="block w-full text-sm bg-primary-600 hover:bg-primary-700 py-2.5 px-7 rounded-lg text-white font-poppinsSemiBold"
                    >
                      Create
                    </button>
                  </li>
                  <li className="md:flex hidden">
                    <button className="block" onClick={handleSetting}>
                      <Cog8ToothIcon className="w-5 h-5 text-gray-700 hover:text-primary-600" />
                    </button>
                  </li>
                  <li className="flex">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="block h-10 w-10">
                          {store.userData.avatarImageUrl ? (
                            <img
                              alt="avatar"
                              src={store.userData.avatarImageUrl}
                              className="rounded-full w-10 h-10"
                            />
                          ) : (
                            <div className="relative">
                              <span className="absolute text-white uppercase font-poppinsBold text-lg top-1.5 left-3.5">{store.userData?.name?.[0]}</span>
                              <img
                                alt="avatar"
                                src={LocalImg.avatarPlaceholder}
                                className="rounded-full w-10 h-10"
                              />
                            </div>
                          )}
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/contact"
                                  className={classNames(
                                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  Contact
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                    "block w-full px-4 py-2 text-left text-sm"
                                  )}
                                  onClick={onSignOut}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    className="block w-full text-sm bg-primary-600 hover:bg-primary-700 py-2.5 px-7 rounded-lg text-white font-poppinsSemiBold"
                    onClick={LoginHandle}
                  >
                    Log In
                  </button>
                </li>
              )}
              <li>
                <button
                  className="cursor-pointer text-xl leading-none py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
                  type="button"
                  onClick={() => setNavbarOpen(navbarOpen)}
                >
                  {navbarOpen ? (
                    <XMarkIcon className="text-xl h-6 w-6 stroke-[2.5px]" />
                  ) : (
                    <Bars3Icon className="text-xl h-6 w-6 stroke-[2.5px]" />
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={
            "flex-col justify-center px-4 font-poppinsSemiBold " +
            (navbarOpen ? "flex" : "hidden")
          }
          id="menu"
        >
          <div
            className="py-9 border-b cursor-pointer hover:text-primary-600"
            onClick={myHomework}
          >
            Homeworks
          </div>
          <div
            className="py-9 flex items-center cursor-pointer hover:text-primary-600"
            onClick={settingClick}
          >
            <Cog8ToothIcon className="w-5 h-5 stroke-2 mr-2" />
            Settings
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
