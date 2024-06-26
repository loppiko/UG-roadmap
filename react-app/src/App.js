// React Router
import {Route, Routes} from 'react-router-dom';

// Keycloak
import { ReactKeycloakProvider } from '@react-keycloak/web'
import authInstance from './Keycloak.js'
import PrivateRoute from './containers/secured/privateRoute.js';


// Containers
import MainSite from './containers/main-site/main.js'
import Semester from './containers/pick-semester/semester.js'
import Subjects from './containers/subjects/subjects.js';
import Login from './containers/login/login.js'
import Admin from './containers/secured/admin.js';


// Components
import Header from './components/header.js'
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
			<ReactKeycloakProvider authClient={authInstance}>
				<Header/>
				<Routes>
					<Route path="/" element={<MainSite/>} />
					<Route path="roadmap-enter" element={<Semester/>} />
					<Route path="roadmap-enter/:semesterId" element={<Subjects/>} />
					<Route path="roadmap-enter/:semesterId/:subjectName" element={<Subjects/>} />
					<Route path="roadmap-enter/:semesterId/:subjectName/:skillId" element={<Subjects/>} />
					<Route path="/login" element={<Login/>} />
					<Route path="/admin" element={<PrivateRoute><Admin/></PrivateRoute>} />
				</Routes>
				<Footer/>
			</ReactKeycloakProvider>
		</div>
	);
}


export default App;
