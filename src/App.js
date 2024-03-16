// React Router
import {Route, Routes} from 'react-router-dom';
// Axios
// import Axios from "axios";

// Components
import Header from './components/header.js'
import MainSite from './containers/main-site/main.js'
import Semester from './containers/pick-semester/semester.js'
import Subjects from './containers/subjects/subjects.js';
import Footer from './components/footer.js';


// Styles
import './styleSheet/main/app.css';
import './styleSheet/main/main-site/main-site.css'
import './styleSheet/main/components/header/header.css'
import './styleSheet/main/components/footer/footer.css'
import './styleSheet/main/components/nav-bar/nav-bar.css'
import './styleSheet/main/components/subject-descritpion/subject-description.css'
import './styleSheet/main/components/skill-description/skill-description.css'
import './styleSheet/main/pick-semester/pick-semester.css'
import './styleSheet/main/subjects/subjects.css'


function App() {
  return (
    <div className="App">
    	<Header/>
		<Routes>
			<Route path="/" element={<MainSite/>} />
			<Route path="roadmap-enter" element={<Semester/>} />
			<Route path="roadmap-enter/:semesterId" element={<Subjects/>} />
			<Route path="roadmap-enter/:semesterId/:subjectName" element={<Subjects/>} />
			<Route path="roadmap-enter/:semesterId/:subjectName/:skillId" element={<Subjects/>} />
		</Routes>
		<Footer/>
    </div>
  );
}


export default App;
