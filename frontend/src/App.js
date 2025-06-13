import { useState } from 'react';
import LoginPage from './components/pages/login';
import RegistrationPage from './components/pages/registration';
import HomePage from './components/pages/home';
import SedutePage from './components/pages/sedute';
import EserciziPage from './components/pages/esercizi';
import ProfiloPage from './components/pages/profilo';
import PazientiPage from './components/pages/pazienti';
import './App.css';


function App() {
  
  const [view, setView] = useState('home');

  const renderView = () => {
    switch (view) {
      
      case 'login':
        return <LoginPage setView={setView} view={view} />;
      
      case 'registration':
        return <RegistrationPage setView={setView} view={view} />;
      
      case 'home':
        return <HomePage setView={setView} view={view} />;
      
      case 'sedute':
        return <SedutePage setView={setView} view={view} />;

      case 'esercizi':
        return <EserciziPage setView={setView} view={view} />;

      case 'profilo':
        return <ProfiloPage setView={setView} view={view} />;

      case 'pazienti':
        return <PazientiPage setView={setView} view={view} />;

      default:
        return <div>Pagina non trovata</div>;
    }
  };

  return (
    <div className="app-background">
      <div className="content">
        {renderView()}
      </div>
    </div>
  );
}

export default App;