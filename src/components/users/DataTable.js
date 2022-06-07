import React from 'react'
import { useNavigate, Links } from 'react-router-dom'

const DataTable = ({ name, phone }) => {
    let navigate = useNavigate()
    return (
        <div>
            <table>
                <tbody>
                    {contact.map((user, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>
                                <Link
                                    className="btn btn-outline-primary mr-2"
                                    to={`/edit/${user._id}`}
                                >
                                    Edit
                                </Link>
                                <Link className="btn btn-danger" to=""
                                    onClick={() => deleteUser(user._id)}
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable