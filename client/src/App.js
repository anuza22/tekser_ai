import './App.css';
import {BrowserRouter} from 'react-router-dom'
import { RouterList } from './routes';
import Header from './components/content/header';


export const App = () => {
  return (
    <BrowserRouter>
      <RouterList/>
      {/* <p>Hello</p> */}
    </BrowserRouter>
    
  );
};
