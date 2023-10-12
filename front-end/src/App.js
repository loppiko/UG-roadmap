// React Router
import {Route, Routes} from 'react-router-dom';

// Components
import Header from './components/header.js'
import MainSite from './containers/main-site/main.js'
import Semester from './containers/pick-semester/semester.js'
import Footer from './components/footer.js';


// Styles
import './styleSheet/main/app.css';
import './styleSheet/main/main-site/main-site.css'
import './styleSheet/main/components/header/header.css'
import './styleSheet/main/components/footer/footer.css'
import './styleSheet/main/components/nav-bar/nav-bar.css'


function App() {
  return (
    <div className="App" class="body">
    	<Header/>
		<Routes>
			<Route path="/" element={<MainSite/>} />
			<Route path="semester" element={<Semester/>} />
		</Routes>
		<Footer/>
    </div>
  );
}

export default App;
