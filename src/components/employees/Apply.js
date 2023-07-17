import { useState, useEffect } from 'react'

export const Apply = () => {
    const [application, setApplication] = useState(
        {
            name: '',
            locationId: '',
            date: '',
            rate: 0
        }
    )
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8088/locations')
            .then(res => res.json())
            .then((locations) => {
                setLocations(locations);
            })
    }, [])

    const handleClick = () => {
        const newUser = {
            name: application.name,
            email: `${application.name}@email.com`,
            isStaff: true
        }

        fetch('http://localhost:8088/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                const userId = data.id
                const employeeObj = {
                    userId: userId,
                    payRate: application.rate,
                    startDate: application.date,
                    assignedStore: application.locationId
                }

                fetch('http://localhost:8088/employees', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employeeObj)
                })
                setApplication({
                    name: '',
                    locationId: '',
                    date: '',
                    rate: 0
                })
            })



    }

    return (
        <section style={{ display: 'flex', flexDirection: 'column', width: '40%', margin: "1rem" }}>
            <label htmlFor="nameInput">Name:</label>
            <input id='nameInput' type='text' onChange={(e) => {
                setApplication({
                    ...application,
                    name: e.target.value
                })
            }}></input>
            <label htmlFor="locationInput">Location:</label>
            <select id='locationInput' onChange={(e) => {
                setApplication({
                    ...application,
                    locationId: e.target.value
                })
            }}>
                <option>Select a Location</option>
                {
                    locations.map(l => {
                        return <option key={`location--${l.id}`} value={l.id}>{l.name}</option>
                    })
                }
            </select>
            <label htmlFor="dateInput">Date:</label>
            <input id="dateInput" type='date' onChange={(e) => {
                setApplication({
                    ...application,
                    date: e.target.value
                })
            }}></input>
            <label htmlFor="rateInput">Pay rate:</label>
            <input id='rateInput' type='number' onChange={(e) => {
                setApplication({
                    ...application,
                    rate: e.target.value
                })
            }}></input>
            <button onClick={() => handleClick()}>Apply</button>
        </section>
    )
}