import React, { useEffect, useState } from 'react';

export const Locations = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8088/locations')
            .then(res => res.json())
            .then((locations) => {
                setLocations(locations);
            })
    }, [])

    return (
        <>
            <h2>Our Locations</h2>
            <ul>
                {locations.map(location => {
                    return (
                        <li key={"location" + location.id}>
                            Name: {location.name}<br />
                            Size: {location.squareFootage}
                        </li>
                    )
                })}
            </ul>
        </>
    );
}