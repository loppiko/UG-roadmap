// Components
import Header from './components/header.js'
import MainSite from './components/main-site/main.js'


// Styles
import './styleSheet/main/app.css';
import './styleSheet/main/main-site/main-site.css'
import './styleSheet/main/header/header.css'


function App() {
  return (
    <div className="App" class="body">
    	<Header/>
		<MainSite/>
    </div>
  );
}

export default App;
