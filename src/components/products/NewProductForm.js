import { useEffect, useState } from "react";

export const NewProductForm = () => {
    const [productTypes, setProductTypes] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: "",
        typeId: null, 
    })

    useEffect(() => {
        fetch('http://localhost:8088/productTypes')
        .then(res => res.json())
        .then((types => {
            setProductTypes(types)
        }))
    },[])

    return (
        <form className="productForm">
            <h2 className="newProductForm__title">New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of Product"
                        value=''
                        onChange={
                            (e) => {
                                const copy = { ...newProduct }
                                copy.name = e.target.value
                                setNewProduct(copy); 
                            }
                        }></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Product Type</label><br />
                        <select onChange={
                            (e) => {
                                const copy = { ...newProduct }
                                copy.typeId = e.target.value
                                setNewProduct(copy); 
                            }
                        }>
                            <option value={null}>Select a type...</option>
                            {
                                productTypes.map(type => {
                                    return <option value={type.id}>{type.name}</option>
                                })
                            }
                        </select>
                </div>
            </fieldset>
            <button className="btn btn-primary">
                Save Product
            </button>
        </form>
    )
}