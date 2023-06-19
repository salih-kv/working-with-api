import {useState} from 'react'
import {Card, Form, Button} from "react-bootstrap";
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

function AddUserPage() {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [premiumMember, setPremiumMember] = useState(false)

    const submitUser = async (e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:8000/users', {
            name: name,
            email: email,
            age: parseInt(age),
            premiumMember: premiumMember
        })


        const id = response.data.id;
        navigate('/users/' + id)

    }
    return (
        <div className="row justify-content-center">
            <div className="col-md-4">
                <Card className="p-4">
                    <Form onSubmit={submitUser}>
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
                            Add New User
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>


    );
}

export default AddUserPage;
