import { Route, Routes } from "react-router-dom";
import { Home } from "../components/content/home";
import Landing from "../components/landing";

export const RouterList = () =>{
    return(
    <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Landing />} />
    </Routes>
    )
}