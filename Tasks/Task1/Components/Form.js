import React, { useState } from 'react';
import Card from './Card';
import { v4 as uuidv4 } from 'uuid';
import ShoppingCart from './MyShoppingBag';

function Form() {
  const [product, setProduct] = useState(() => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  });
  const [newProduct, setNewProduct] = useState({
    image: null,
    pName: '',
    price: ''
  });
  const [imageError, setImageError] = useState('');
  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files[0];
      if (file) {
        if (file.size > 100 * 1024) {
          setImageError('Image size should be less than 100 KB');
        } else {
          setImageError('');
          setNewProduct({ ...newProduct, image: URL.createObjectURL(file) });
        }
      } else {
        setImageError('');
        setNewProduct({ ...newProduct, image: null });
      }
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }

    // Clear validation errors when input changes
    if (name === 'pName') {
      setNameError('');
    } else if (name === 'price') {
      setPriceError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!newProduct.pName) {
      setNameError('Product Name is required');
      isValid = false;
    }

    if (!newProduct.price) {
      setPriceError('Price is required');
      isValid = false;
    }

    if (isValid) {
      const productItem = {
        id: uuidv4(), 
        image: newProduct.image,
        name: newProduct.pName,
        price: newProduct.price

      };

      setProduct(prev => [...prev, productItem]);
      setNewProduct({
        image: null,
        pName: '',
        price: ''
      });
      const updatedProducts = [...product, productItem];
      setProduct(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      setIsFormOpen(false);
    }
  };
  // const handleBuyNow=()=>{
  //   setIsFormOpen(true)
  // }

  return (
    <div>
      <div className="container col-md-6">
       
       {isFormOpen &&(<form className='border p-4 m-4 shadow-lg rounded' onSubmit={handleSubmit}>
          {/* Form inputs with validation */}
          <div className="form-group">
            <label htmlFor="productImage">Product Image</label>
            <input onChange={handleChange} type="file" name='image' className="form-control" id="productImage" />
            {imageError && <div className="text-danger">{imageError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input onChange={handleChange} name='pName' className="form-control" value={newProduct.pName} type="text" id="productName" />
            {nameError && <div className="text-danger">{nameError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input onChange={handleChange} name='price' className="form-control" value={newProduct.price} type="number" />
            {priceError && <div className="text-danger">{priceError}</div>}
          </div>
          <button className="btn btn-primary" type="submit">Add Product</button>
        </form>)} 
       
      </div>
        <div className='row m-0 auto'>
          {/* Display cards */}
          {product.map((item, index) => (
            <div className='col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 text-center my-3' key={index}>
              <Card item={item}/>
            </div>


          ))}
          <ShoppingCart/>
          </div>
    </div>
  );
}

export default Form;