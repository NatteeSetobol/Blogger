import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Index from './Components/Index';
import Navibar from './Components/Navibar';


function App() {
  return (
    <div>
      <BrowserRouter>
      <header>
        <Navibar></Navibar>
      </header>

        <AppRoutes />
      </BrowserRouter>
      <Index />
    </div>
  );
}

export default App;
