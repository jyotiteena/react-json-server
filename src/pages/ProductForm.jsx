import axios from "axios"
import { useForm } from "react-hook-form"
import { SuccessMsg } from "../layout/Message"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"

const ProductForm = () => {
    const { register, handleSubmit, reset } = useForm()

    // const id = useParams()
    // console.log(id) // {productId: '08ff'}

    const redirect = useNavigate()

    const { productId } = useParams()
    console.log(productId)

    async function showApi() {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`)
        // console.log(res.data)
        reset(res.data)
    }
    useEffect(() => {
        showApi()
    }, [])

    async function Add(data) {
        if (productId == null) {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/products`, data)
            console.log(res.data)
            SuccessMsg("product added")
        } else {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/products/${productId}`, data)
            console.log(res.data)
            SuccessMsg("product updated")
        }
        redirect('/productList')
        reset()
    }
    return (
        <>
            <form action="" method="post" onSubmit={handleSubmit(Add)} className="col-lg-6 mx-auto my-5 p-5 shadow">
                <div className="mt-4">
                    <select className="form-select" {...register('p_category')}>
                        <option value="">select category</option>
                        <option value="Cloths">Cloths</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Wooden">Wooden</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mt-4">
                    <input type="text" {...register('p_name')} className="form-control" placeholder="Enter Product Name" />
                </div>
                <div className="mt-4">
                    <input type="number" {...register('p_price')} className="form-control" placeholder="Enter Product Price" />
                </div>
                <div className="mt-4">
                    <textarea {...register('p_desc')} className="form-control" placeholder="Enter product details"></textarea>
                </div>
                <div className="mt-4">
                    {
                        productId == null
                            ?
                            <button className="btn btn-success">submit</button>
                            :
                            <button className="btn btn-warning">update</button>
                    }
                </div>
            </form>
        </>
    )
}

export default ProductForm