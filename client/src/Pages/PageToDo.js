import React from 'react'
import Header from '../Components/Header'
import Rightpage from '../Components/Rightpage'
import Leftpage from '../Components/Leftpage'
const PageToDo = () => {
  return (
    
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <div class="col">
            <Leftpage />
        </div>
        <div class="col">
            <Rightpage />
        </div>
      </div>
  </div>
  )
}

export default PageToDo