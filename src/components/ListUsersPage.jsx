import axios from "axios";
import React, {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

function ListUsersPage() {

    const [data, setData] = useState([])

    const fetchUsers = async () => {
        const res = await axios.get('http://localhost:8000/users');
        setData(res.data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const deleteUser = (user) => {
        axios.delete('http://localhost:8000/users/' + user.id).then(() => {
            alert(user.name + " Deleted!")
            fetchUsers()
        })
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody> {
                data.map((user, index) => (
                    <tr key={index}>
                        <td>{
                            user.id
                        }</td>
                        <td>{
                            user.name
                        }</td>
                        <td>
                            <Link to={
                                "/users/" + user.id
                            }>
                                <Button variant="primary" size="sm">View</Button>
                            </Link>
                            {" "}
                            <Link to={
                                `/users/${
                                    user.id
                                }/edit`
                            }>
                                <Button variant="info" size="sm">Edit</Button>
                            </Link>
                            {" "}
                            <Button variant="danger" size="sm"
                                onClick={
                                    () => deleteUser(user)
                            }>Delete</Button>
                        </td>
                    </tr>
                ))
            } </tbody>
        </Table>
    );
}

export default ListUsersPage;
