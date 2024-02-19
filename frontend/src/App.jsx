import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CreateBooks, DeleteBook, Home, EditBook, ShowBooks } from './pages/Index.js'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={< Home />} />
      <Route path='/books/create' element={< CreateBooks />} />
      <Route path='/books/detail/:id' element={< ShowBooks />} />
      <Route path='/books/edit/:id' element={< EditBook />} />
      <Route path='/books/delete/:id' element={< DeleteBook />} />
    </Routes>
  )
}

export default App