import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Form from './Components/Form'
import Card from './Components/Card'
import MyShoppingBag from './Components/MyShoppingBag'

function Task1Main() {


  return (
    <div>
      <Navbar />
        <Routes>
          <Route path='/form' element={<Form />} />
          <Route path='/card' element={<Card/>}/>
          <Route path='/myshoppingbag' element={<MyShoppingBag/>}/>
        </Routes>

    </div>
  )
}

export default Task1Main;