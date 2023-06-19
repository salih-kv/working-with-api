import axios from "axios";
import React, {useEffect, useState} from "react";
import {Button, Card, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";

function ViewUsersPage() {

    const {userId} = useParams()

    const [user, setUser] = useState(undefined)

    const fetchUser = async () => {
        const res = await axios.get('http://localhost:8000/users/' + userId)
        setUser(res.data)
    }

    useEffect(() => {
        fetchUser()
    }, [userId])

    if (user === undefined) {
        return <div>Loading...</div>
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <Link to="/">
                    <Button variant="secondary" className="mb-4">Go Back</Button>
                </Link>
                <Card>
                    <Table>
                        <tbody>
                            <tr>
                                <td>ID</td>
                                <td>{userId}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{
                                    user.name
                                }</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{
                                    user.email
                                }</td>
                            </tr>
                            <tr>
                                <td>Age</td>
                                <td>{
                                    user.age
                                }</td>
                            </tr>
                            <tr>
                                <td>Premium User</td>
                                <td>{
                                    user.premiumMember ? 'Yes' : 'No'
                                }</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </div>
        </div>

    );
}

export default ViewUsersPage;
