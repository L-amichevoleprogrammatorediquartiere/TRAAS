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
  const [view, setView] = useState('profilo');

  const renderView = () => {
    switch (view) {
      
      case 'login':
        return <LoginPage />;
      
      case 'registration':
        return <RegistrationPage />;
      
      case 'home':
        return <HomePage />;
      
      case 'sedute':
        return <SedutePage />;

      case 'esercizi':
        return <EserciziPage />;

      case 'profilo':
        return <ProfiloPage />;

      case 'pazienti':
        return <PazientiPage />;

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