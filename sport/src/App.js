import logo from './logo.svg';
import './css/App.css';
import  Navbar  from './component/Navbar'
import { Way } from './Route/Way';
import Up from './component/Up';
import Footer from './component/footer';
import { Link, Element } from 'react-scroll';

function App() {
  
  return (
    <div className="App">
      <Element name="fleche" className="element"></Element>
      <Navbar/>
      <Up/>
      <Way/>
      <Footer/>
    </div>
  );
}

export default App;
