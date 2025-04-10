import { lazy, Suspense } from "react";
import Header from "./components/Header";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Loader from "./components/Loader";

//doing code splitting
const Home = lazy(() => import("./components/Home"));
const Learning = lazy(() => import("./components/Learning"));
const Quiz = lazy(() => import("./components/Quiz"));
const Result = lazy(() => import("./components/Result"));
const Login = lazy(() => import("./components/Login"));

//we are doing code spiltting here so we will wrap it in suspense over here

const App = () => {
  return (
    <Router>
      <Header/>
      <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/learn" element={<Learning/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/result" element={<Result/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </Suspense>
    </Router>
  )
}

export default App