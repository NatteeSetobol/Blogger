import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Navibar from './Components/Navibar';
import { store } from './store';

function App() {
  return (
    <div>
      <Provider store={store}>
      <BrowserRouter>
      <header>
        <meta charSet="utf-8" />
        <Navibar></Navibar>
      </header>
        <AppRoutes />
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
