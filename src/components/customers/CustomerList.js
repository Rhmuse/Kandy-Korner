import { useState, useEffect } from 'react'
import { Customer } from './Customer'

export const CustomerList = () => {
    const [customers, setCustomers] = useState()

    useEffect(() => {
        fetch('http://localhost:8088/customers?_expand=user')
            .then(res => res.json())
            .then((data) => {
                setCustomers(data);
            }
            )
    }, [])

    return (
        <>
            {
                customers?.map(c => {
                    return <Customer key={`customer--${c.id}`} c={c} />
                })
            }
        </>
    )
}