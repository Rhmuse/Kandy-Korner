import { EmployeeView } from './EmployeeView'
import { CustomerView } from './CustomerView'

export const ApplicationViews = () => {
	const user = JSON.parse(localStorage.getItem("kandy_user"))

	if (user.staff) {
		return <EmployeeView />
	} else {
		return <CustomerView />
	}
}

