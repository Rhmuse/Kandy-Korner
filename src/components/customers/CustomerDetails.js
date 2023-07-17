import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const CustomerDetails = () => {
    const params = useParams();

    const [customer, setCustomer] = useState();

    useEffect(() => {
        fetch(`http://localhost:8088/customers/${params.customerId}?_expand=user`)
            .then(res => res.json())
            .then(data => {
                setCustomer(data)
            })

    }, [])


    return (
        <section key={`customer--${customer?.userId}`}>
            <h1 as="h1" to={`/customers/${customer?.user?.id}`}>{customer?.user.name}</h1>
            <p>Email: {customer?.user.email}</p>
            <p>Loyalty: {customer?.loyaltyNumber}</p>
        </section>
    )
}