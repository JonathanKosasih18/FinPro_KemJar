import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AttackConsole from './pages/AttackConsole'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attack" element={<AttackConsole />} />
      </Routes>
    </Router>
  )
}

export default App
