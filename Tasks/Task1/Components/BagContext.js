import React, { createContext, useContext, useState } from 'react';
const BagContext = createContext();

export function useBag() {
  return useContext(BagContext);
}

export function useBagActions() {
  const { addToBag, removeFromBag, increaseQuantity, decreaseQuantity } = useContext(BagContext);

  const handleRemoveFromBag = (itemId) => {
    removeFromBag(itemId);
  };

  const handleIncreaseQuantity = (itemId) => {
    increaseQuantity(itemId);
  };

  const handleDecreaseQuantity = (itemId) => {
    decreaseQuantity(itemId);
  };

  return { handleRemoveFromBag, handleIncreaseQuantity, handleDecreaseQuantity };
}

export function BagProvider({ children }) {
  const [bagItems, setBagItems] = useState([]);

  const addToBag = (item, quantity) => {
    const existingItem = bagItems.find((bagItem) => bagItem.item.id === item.id);

    if (existingItem) {
      const updatedBagItems = bagItems.map((bagItem) =>
        bagItem.item.id === existingItem.item.id ? { ...bagItem, quantity: bagItem.quantity + quantity } : bagItem
      );
      setBagItems(updatedBagItems);
    } else {
      setBagItems([...bagItems, { item, quantity }]);
    }
  };

  const removeFromBag = (itemId) => {
    const updatedBagItems = bagItems.filter((bagItem) => bagItem.item.id !== itemId);
    setBagItems(updatedBagItems);
  };


  const increaseQuantity = (itemId) => {
    const updatedBagItems = bagItems.map((bagItem) =>
      bagItem.item.id === itemId ? { ...bagItem, quantity: bagItem.quantity + 1 } : bagItem
    );
    setBagItems(updatedBagItems);
  };

  const decreaseQuantity = (itemId) => {
    const updatedBagItems = bagItems.map((bagItem) =>
      bagItem.item.id === itemId ? { ...bagItem, quantity: Math.max(bagItem.quantity - 1, 1) } : bagItem
    );
    setBagItems(updatedBagItems);
  };

  return (
    <BagContext.Provider value={{ bagItems, addToBag, removeFromBag, increaseQuantity, decreaseQuantity }}>
      {children}
    </BagContext.Provider>
  );
}

