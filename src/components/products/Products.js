import { useEffect, useState } from 'react';

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
                let sortedAlphabeticallyProducts = sortProductsAlphabetically(products)
                setFilteredProducts(sortedAlphabeticallyProducts);
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

    const sortProductsAlphabetically = (productArr) => {
        return productArr.sort((a, b) => {
            let nameA = a.name.toUpperCase()
            let nameB = b.name.toUpperCase()
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        })
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