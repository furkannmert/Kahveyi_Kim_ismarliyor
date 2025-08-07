
import React, { useState, useEffect } from 'react';
import Wheel from './Wheel';
import Confetti from './Confetti';

const App = () => {
  const [numPeople, setNumPeople] = useState(2);
  const [names, setNames] = useState(['', '']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const newNames = Array(numPeople).fill('').map((_, i) => names[i] || '');
    setNames(newNames);
  }, [numPeople]);

  const handleNameChange = (index, value) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const allNamesFilled = names.every(name => name.trim() !== '');

  const spinWheel = () => {
    if (!allNamesFilled || isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    // 1. Determine the winner randomly.
    const randomStopIndex = Math.floor(Math.random() * names.length);

    // 2. Calculate the target angle for that winner.
    const segmentDegrees = 360 / names.length;
    const targetAngle = 360 - (randomStopIndex * segmentDegrees) - (segmentDegrees / 2);

    // 3. Add a random number of full spins for visual effect.
    const randomCycles = Math.floor(Math.random() * 5) + 5; // Spins between 5 and 9 times
    const totalSpins = randomCycles * 360;

    // 4. Calculate the new rotation value.
    // This ensures the wheel always moves forward from its current position.
    const currentVisualRotation = rotation % 360;
    const newRotation = rotation - currentVisualRotation + totalSpins + targetAngle;

    setRotation(newRotation);

    // 5. Set the winner after the animation.
    setTimeout(() => {
      setWinner(names[randomStopIndex]);
      setIsSpinning(false);
    }, 4100); // Corresponds to CSS transition time + a small buffer.
  };

  const reset = () => {
    setWinner(null);
  }

  return (
    <div className="app-container">
      <h1 className="title">☕ Kahveyi Kim Ismarlıyor? ☕</h1>

      <div className="main-content">
        <div className="settings-card">
          <div className="input-group">
            <label htmlFor="num-people" className="label">Kaç Kişi?</label>
            <input
              id="num-people"
              type="number"
              className="number-input"
              value={numPeople}
              min="2"
              max="10"
              onChange={(e) => setNumPeople(Math.max(2, Math.min(10, parseInt(e.target.value, 10) || 2)))}
            />
          </div>

          <div className="input-group">
            <label className="label">İsimler</label>
            <div className="names-container">
              {names.map((name, index) => (
                <input
                  key={index}
                  type="text"
                  className="input"
                  placeholder={`Kişi ${index + 1}`}
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                />
              ))}
            </div>
          </div>

          <button className="button" onClick={spinWheel} disabled={!allNamesFilled || isSpinning}>
            {isSpinning ? 'Dönüyor...' : '🚀 Çarkı Çevir'}
          </button>
        </div>

        <div className="wheel-display">
          <div className="wheel-pointer"></div>
          <Wheel names={names} rotation={rotation} />
        </div>
      </div>

      {winner && (
        <div className="winner-overlay">
          <div className="winner-card">
            <Confetti />
            <h2 className="winner-title">Tebrikler!</h2>
            <p className="winner-name">{winner}</p>
            <p className="winner-title">bugün kahveleri ısmarlıyor!</p>
            <button className="button" onClick={reset} style={{marginTop: '20px'}}>Harika!</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
