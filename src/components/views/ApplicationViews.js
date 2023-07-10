import { Routes, Route, Outlet } from 'react-router-dom'
import { Locations } from '../locations/Locations'

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>
					<h3>Get some candy here!</h3>

					<Outlet />
				</>
			}>
				<Route path='/locations' element={
					<Locations />
				} />

			</Route>
		</Routes>
	)
}

