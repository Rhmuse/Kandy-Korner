import { Routes, Route, Outlet } from 'react-router-dom'
import { Locations } from '../locations/Locations'
import { Products } from '../products/Products'
import { CustomerList } from '../customers/CustomerList'
import { CustomerDetails } from '../customers/CustomerDetails'
import { NewProductForm } from '../products/NewProductForm'

export const EmployeeView = () => {

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>
                    <h2>Get some candy here!</h2>

                    <Outlet />
                </>
            }>
                <Route path='/locations' element={
                    <Locations />
                } />
                <Route path='/products' element={
                    <Products />
                } />
                <Route path='/products/newProduct' element={
                    <NewProductForm />
                } />
                <Route path='/customers' element={
                    <CustomerList />
                } />
                <Route path='/customers/:customerId' element={
                    <CustomerDetails />
                } />

            </Route>
        </Routes>
    )
}