import axios from "axios";
import {useEffect, useState} from "react";
import {Form, Button, Card} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

function EditUserPage() {
    const {userId} = useParams();
    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [premiumMember, setPremiumMember] = useState(false);

    const fetchUser = async () => {
        const response = await axios.get("http://localhost:8000/users/" + userId);
        const user = response.data;
        setName(user.name);
        setEmail(user.email);
        setAge(user.age);
        setPremiumMember(user.premiumMember);
    };

    useEffect(() => {
        fetchUser();
    }, [userId]);

    const updateUser = async (e) => {
        e.preventDefault();
        await axios.patch("http://localhost:8000/users/" + userId, {
            name: name,
            email: email,
            age: parseInt(age),
            premiumMember: premiumMember
        });
        navigate('/')
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-4">
                <Card className="p-4">
                    <Form onSubmit={updateUser}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name"
                                value={name}
                                onChange={
                                    (e) => setName(e.target.value)
                                }
                                required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com"
                                value={email}
                                onChange={
                                    (e) => setEmail(e.target.value)
                                }
                                required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" placeholder="Age"
                                value={age}
                                onChange={
                                    (e) => setAge(e.target.value)
                                }
                                required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Premium User"
                                value={premiumMember}
                                onChange={
                                    () => setPremiumMember(!premiumMember)
                                }/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update User
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>
    );
}

export default EditUserPage;
