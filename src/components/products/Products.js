import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Products = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const user = JSON.parse(localStorage.getItem("kandy_user"))

    useEffect(() => {
        fetch('http://localhost:8088/products?_expand=productType')
            .then(res => res.json())
            .then((products) => {
                setProducts(products)
                setFilteredProducts(products)
            })
    }, [])

    useEffect(() => {
        let filteredList = products.filter(p => p.name.includes(searchTerm))
        setFilteredProducts(filteredList)
    }, [searchTerm])

    const handleTopPrice = () => {
        const topPricedItems = products.filter(product => product.price >= 2)
        setFilteredProducts(topPricedItems)
    }

    const handleAllProducts = () => {
        setFilteredProducts(products)
    }

    return (
        <>
            <h3>Our Products</h3>
            {
                user.staff ?
                    <>
                        <button
                            onClick={() => { (handleAllProducts()) }}
                        >All Products</button>
                        <button
                            onClick={() => { (handleTopPrice()) }}
                        >Top Price</button>
                        <NavLink to='/products/newProduct'><button>New Product</button></NavLink>
                        <ul>
                            {
                                filteredProducts.map(product => {
                                    return <li key={"product--" + product.id}>
                                        {product.name} --- ${product.price} --- {product?.productType?.type}
                                    </li>
                                })
                            }
                        </ul>
                    </>
                    :
                    <>
                        <input id='candySearchBar' type='text' placeholder='What candy are you looking for?' onChange={(e) => setSearchTerm(e.target.value)}></input>
                        <ul>
                            {
                                filteredProducts.map(product => {
                                    return <li key={"product--" + product.id}>
                                        {product.name} --- ${product.price}
                                    </li>
                                })
                            }
                        </ul>
                    </>
            }
        </>
    )
}