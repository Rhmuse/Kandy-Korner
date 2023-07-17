import { Link } from "react-router-dom"

export const Customer = ({ c }) => {
    return (
        <section key={`customer--${c.id}`}>
            <Link as="h1" to={`/customers/${c.id}`}>{c?.user.name}</Link>
            <p>Email: {c?.user.email}</p>
        </section>
    )
}