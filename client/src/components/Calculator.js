import React, { useState } from 'react';

const Calculator = () => {
  const [BasePrice, setBasePrice] = useState(0);
  const [PricePerCreditLine, setPricePerCreditLine] = useState(0);
  const [PricePerCreditScorePoint, setPricePerCreditScorePoint] = useState(0);
  const [CreditScore, setCreditScore] = useState(0);
  const [CreditLines, setCreditLines] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const computeTotalCost = () => {
    const SubscriptionPrice = BasePrice + (PricePerCreditLine * CreditLines) + (PricePerCreditScorePoint * CreditScore)
    setTotalCost(SubscriptionPrice);
  };

  return (
    <div>
      <input type="number" placeholder="Base Cost"onChange={(e) => setBasePrice(Number(e.target.value))} />
      <input type="number"placeholder="Cost per Credit Line"onChange={(e) => setPricePerCreditLine(Number(e.target.value))} />
      <input type="number" placeholder="Cost per Credit Score Point" onChange={(e) => setPricePerCreditScorePoint(Number(e.target.value))} />
      <input type="number" placeholder="Credit Score" onChange={(e) => setCreditScore(Number(e.target.value))} />
      <input type="number" placeholder="Credit Lines" onChange={(e) => setCreditLines(Number(e.target.value))} />
      <button onClick={computeTotalCost}>Compute</button>
      <p>SubscriptionPrice Cost: {totalCost}</p>
    </div>
  );
};

export default Calculator;