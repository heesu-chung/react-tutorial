import React from 'react';
import logo from './logo.svg';

import Hello from './Hello';
import './App.css';
import Wrapper from './Wrapper';

function App() {

  return (
    <>
      <Wrapper>
        <Hello name="achess" color="red" isSpecial={true}/>
        <Hello color="coral" />
      </Wrapper>
    </> 
  );
}

export default App;
