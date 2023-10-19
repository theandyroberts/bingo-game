import React from 'react';
import BingoCell from './BingoCell';
import './BingoBoard.css'; // Import your CSS file here


const activities = [
    'Provide a Reflection','Participate in a Lunch & Learn','Attend a happy hour','Attend a Caregiver Connections','Receive a Shoutout','Coffee chat with new (to you) Caregiver','Submit a Shoutout for another team','Post whitepaper for Soundbites','Present at a Lunch & Learn','Attend DEI Discussion','Tour a Providence ministry','Lead a secret shopper, bug bash, or walk the journey session','Volunteer','Take a Walking 1:1','Read a Story from Our Sisters','Explore learning via Rise or Guild','Update Goal Status in Genesis','Participate in a secret shopper, bug bash, or walk the journey session','Take 10 Minutes to Meditate','Talk to a mentor','Take a PTO Day','Attend a training, webinar, or read an article to learn something new','Coordinate a regional social or learning event','Become a mentor'
  ];
  
  function createBingoGrid() {
    const bingoGrid = new Array(5).fill(null).map(() => new Array(5).fill(null));
  
    let index = 0;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (row === 2 && col === 2) {
          bingoGrid[row][col] = 'FREE SPACE';
        } else {
          bingoGrid[row][col] = activities[index];
          index++;
        }
      }
    }
    return bingoGrid;
  }
  

function BingoBoard() {
  const bingoGrid = createBingoGrid();

  return (
    <div className="bingo-board">
      {bingoGrid.map((row, rowIndex) => (
        <div key={rowIndex} className="bingo-row">
          {row.map((activity, colIndex) => (
              <BingoCell  key={colIndex} content={activity}>
              </BingoCell>
          ))}
        </div>
      ))}
    </div>
  );

}

export default BingoBoard;