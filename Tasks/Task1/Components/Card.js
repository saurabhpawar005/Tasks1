import React, { useState } from 'react';
import { useBag } from './BagContext';

function Card({ item, }) {
  const [num, setNum] = useState(1);
  const { addToBag } = useBag();

  const increase = () => {
    setNum(num + 1);
  };

  const decrease = () => {
    if (num > 1) {
      setNum(num - 1);
    }
  };

  const handleAddToBag = () => {
    addToBag(item, num);

  };

  if (!item) {
    return null;
  }

  return (
    <div className="card shadow " style={{ width: '100%', height: '100%' }}>
      <img src={item.image} alt="picture" style={{ width: '100%', height: '200px', objectFit: 'cover' }}/>
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{item.name}</h5>
          <h3 className='mb-3'>$ {item.price}</h3>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <button onClick={decrease} className="btn btn-secondary btn-sm">-</button>
          <h3 style={{ margin: '0 10px' }}>{num}</h3>
          <button onClick={increase} className="btn btn-secondary btn-sm">+</button>
        </div>
        <button onClick={handleAddToBag} className="btn btn-primary mt-2">Add to Bag</button>
      </div>
    </div>
  );
}

export default Card;
