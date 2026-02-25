/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios"
import { useEffect, useState } from "react"
import { FaPen, FaTrash } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import { SuccessMsg } from "../layout/Message"

const ProductList = () => {
    const [products, setProduct] = useState([])
    const showApi = async () => {
        // console.log(import.meta.env.VITE_API_URL)
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`)
        // console.log(res.data)
        setProduct(res.data)

    }
    useEffect(() => {
        showApi()
    }, [])

    async function trash(id) {
        if (confirm("do you want to delete this product?")) {
            
            await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`)
            SuccessMsg("product has been deleted")
            showApi()
        }
    }
    return (
        <>
            <div className="table-responsive container my-5">
                <table className="table table-striped table-hover table-success text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>category</th>
                            <th>name</th>
                            <th>price</th>
                            <th>desc</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product.p_category}</td>
                                    <td>{product.p_name}</td>
                                    <td>{product.p_price}</td>
                                    <td>{product.p_desc}</td>
                                    <td>
                                        <div className="btn-group">
                                            <button onClick={() => trash(product.id)} className="btn btn-danger">
                                                <FaTrash />
                                            </button>
                                            <NavLink to={`/updateProduct/${product.id}`} className="btn btn-warning">
                                                <FaPen />
                                            </NavLink>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProductList