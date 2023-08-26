import React, { useState } from 'react';
import Form from './Form';

function Navbar() {
  const [openForm, setOpenForm] = useState(false);

  const handleToggleForm = () => {
    setOpenForm(prevOpenForm => !prevOpenForm);
  };

  return (
    <div>
      <nav className="navbar navbar-light shadow mb-5 bg-light">
        <span className="navbar-brand mb-0">Navbar</span>
        <button onClick={handleToggleForm} className='btn btn-primary'>
         Buy Now
        </button>
      </nav>
      {openForm && <Form />}
    </div>
  );
}

export default Navbar;
