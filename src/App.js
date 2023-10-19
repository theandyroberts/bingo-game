import React from 'react';
import BingoBoard from './BingoBoard'; // import your BingoBoard component

function App() {
  return (
    <div className="App">
      <h1 className='bingo-headline'>Caregiver Bingo - Fall 2023</h1>
      <BingoBoard /> {/* use your BingoBoard component */}
    </div>
  );
}

export default App;
