import Header from "./components/Header/Header"
import Home from "./pages/Home/Home"
import Buscar from "./pages/Buscar/Buscar"
import Watchlist from "./pages/Watchlist/Watchlist"

import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscar" element={<Buscar />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </>
  )
}

export default App