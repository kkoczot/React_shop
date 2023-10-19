import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route} from 'react-router-dom'

import ScrollToTop from './assets/ScrollToTop'

import Layout from "./Components/Layout"
import LayoutCollection from "./Components/LayoutCollection"
import Cart from "./Pages/Cart"
import Home from "./Pages/Home"
import K from "./Pages/K"
import M from "./Pages/M"
import SpecificItem from "./Pages/SpecificItem"
import NotFound from "./Pages/NotFound"

export default function App() {

  return (
    <BrowserRouter>
        <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route element={<LayoutCollection />} >
            <Route path="K" element={<K />} />
            <Route path="M" element={<M />} />
          </Route>
          <Route path=":id" element={<SpecificItem />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)