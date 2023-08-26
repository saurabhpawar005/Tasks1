import React from 'react';
import { useBag, useBagActions } from './BagContext'; // Assuming you have a way to manage bag actions

function ShoppingCart() {
  const { bagItems } = useBag();
  const { handleRemoveFromBag, handleIncreaseQuantity, handleDecreaseQuantity } = useBagActions(); // Assuming you have removeFromBag, handleIncreaseQuantity, and handleDecreaseQuantity actions

  // Calculate the total order amount
  const totalOrderAmount = bagItems.reduce((total, bagItem) => {
    return total + bagItem.item.price * bagItem.quantity;
  }, 0);

  return (
    <div className='col-md-12 my-4'>
      <h2>Your Shopping Bag</h2>
      <div className='table-responsive-md'>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price Detail</th>
              <th>Order Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bagItems.map((bagItem) => (
              <tr key={bagItem.item.id}>
                <td>{bagItem.item.name}</td>
                <td>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => handleDecreaseQuantity(bagItem.item.id)}>−</button>
                  <span className="mx-2">{bagItem.quantity}</span>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => handleIncreaseQuantity(bagItem.item.id)}>+</button>
                </td>
                <td>${bagItem.item.price}</td>
                <td>${bagItem.item.price * bagItem.quantity}</td>
                <td>
                  <button className='btn btn-danger rounded' onClick={() => handleRemoveFromBag(bagItem.item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2"></td>
              <td><strong>Total:</strong></td>
              <td>${totalOrderAmount}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default ShoppingCart;
