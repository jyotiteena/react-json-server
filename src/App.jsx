import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from "react-toastify"
import ErrorPage from "./pages/ErrorPage"
import MainLayout from "./layout/MainLayout"
import ProductForm from "./pages/ProductForm"
import ProductList from "./pages/ProductList"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />} >
          <Route path="/" element={<ProductForm/>} />
          <Route path="/updateProduct/:productId" element={<ProductForm/>} />
          <Route path="/productList" element={<ProductList/>} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter >
  )
}

export default App