import './App.css';
import Header from './components/Header/Header';
import stackline_logo from './assets/stackline_logo.svg'
import HomePage from './page/ProductPage/ProductPage';

function App() {
  return (
    <div className="app-container">
      <Header image={{ src: stackline_logo, alt: "Stackline Logo" }} children={null} />
      <HomePage />
    </div>
  );
}

export default App;
