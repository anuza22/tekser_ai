import ReactGA from 'react-ga';

const initializeAnalytics = () => {
  ReactGA.initialize('G-R503BVLTP8'); // Замените на ваш Tracking ID
};

const logPageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export { initializeAnalytics, logPageView };
