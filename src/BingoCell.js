import React, { useState } from 'react';

const BingoCell = ({ content }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    console.log('Cell clicked!'); // For debugging
    setIsClicked(true);
  };

  return (
    <div className="bingo-cell" onClick={handleClick}>
  {isClicked ? (
    <div className="icons">
      <div className="checkmark">
      <img className="checkmark-icon" src={process.env.PUBLIC_URL + '/assets/happy-stars.svg'} alt="gold stars for you!" />

      </div>
    </div>
    ) : (
      content
    )}
    </div>
  );
}

export default BingoCell;