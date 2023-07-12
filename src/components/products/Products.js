import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Products = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [productTypes, setProductTypes] = useState([])

    const navigate = useNavigate; 

    const user = JSON.parse(localStorage.getItem("kandy_user"))

    useEffect(() => {
        fetch('http://localhost:8088/products')
            .then(res => res.json())
            .then((products) => {
                setProducts(products)
                let sortedAlphabeticallyProducts = sortProductsAlphabetically(products)
                setFilteredProducts(sortedAlphabeticallyProducts);
            })
    }, [])

    useEffect(() => {
        fetch('http://localhost:8088/productTypes')
            .then(res => res.json())
            .then((types => {
                setProductTypes(types)
                products.forEach(product => {
                    let foundType = productTypes.find(type => product.typeId === type.id)
                    product.type = foundType.type; 
                })
            }))
    })

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
                        <button
                            onClick={() => { (navigate('/products/newProduct') )}}
                        >New Product</button>
                        <ul>
                            {
                                filteredProducts.map(product => {
                                    return <li key={"product--" + product.id}>
                                        {product.name} --- {product.type} --- ${product.price}
                                    </li>
                                })
                            }
                        </ul>
                    </>
                    :
                    ""
            }
        </>
    )
}