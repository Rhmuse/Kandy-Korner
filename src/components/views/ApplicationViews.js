import { Routes, Route, Outlet } from 'react-router-dom'
import { Locations } from '../locations/Locations'
import { Products } from '../products/Products'

export const ApplicationViews = () => {
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

			</Route>
		</Routes>
	)
}

