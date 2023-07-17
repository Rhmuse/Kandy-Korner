import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewProductForm = () => {
    const [productTypes, setProductTypes] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: "",
        typeId: 0,
        price: 0,
    })

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8088/productTypes')
            .then(res => res.json())
            .then((types => {
                setProductTypes(types)
            }))
    }, [])

    const handleClick = (e) => {
        e.preventDefault()
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        }
        fetch('http://localhost:8088/products', options)
            .then(response => response.json())
            .then(() => {
                navigate('/products')
            })
    }

    return (
        <>
            {
                productTypes.length > 0 ?
                    <form className="productForm">
                        <h2 className="newProductForm__title">New Product</h2>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="description">Name:</label>
                                <input
                                    id="description"
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="Name of Product"
                                    value={newProduct.name}
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
                                <select id="name" value={newProduct.typeId}
                                    onChange={
                                        (e) => {
                                            const copy = { ...newProduct }
                                            copy.typeId = e.target.value
                                            setNewProduct(copy);
                                        }
                                    }>
                                    <option value={0}>Select a type...</option>
                                    {
                                        productTypes.map(type => {
                                            return <option key={"typeOption-" + type.id} value={type.id}>{type.type}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="price">Price:</label>
                                <input
                                    id="price"
                                    required autoFocus
                                    type="number"
                                    className="form-control"
                                    value={newProduct.price}
                                    step=".01"
                                    onChange={
                                        (e) => {
                                            const copy = { ...newProduct }
                                            copy.price = parseFloat(e.target.value)
                                            setNewProduct(copy);
                                        }
                                    }></input>
                            </div>
                        </fieldset>
                        <button onClick={(e) => handleClick(e)} className="btn btn-primary">
                            Save Product
                        </button>
                    </form>
                    :
                    ''
            }
        </>
    )
}