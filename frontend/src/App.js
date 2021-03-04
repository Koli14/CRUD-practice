import React from 'react'
import logo from './logo.png'
import PartnerList from './features/partners/PartnerList'
import './App.css'

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <div>
          Partner nyilvántartó rendszer
        </div>
      </header>
      <main>
        <PartnerList />
      </main>
    </div>
  )
}

export default App
