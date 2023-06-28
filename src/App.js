import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Form from './components/Form';

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" Component={Form}/>
      </Routes>
    </>
  );
};

export default App;
