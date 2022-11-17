import {useRef, useState} from "react";
import {useAuth} from "../context/AuthProvider";
import {Alert, Button, Card, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {login, currentUser} = useAuth()
    const redirect = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            redirect('/')
        } catch {
            setError('Failed to log in')
        }
        setLoading(false)
    }

    return (
        <div>
            <Card className="p-4">
                <h2 className="text-center mb-4">Login</h2>
                {error && <Alert variant="danger">{error}</Alert> }
                {currentUser && currentUser.email}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group className="mb-3" id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Login</Button>
                </Form>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to='/signup'>Sign Up</Link>
            </div>
        </div>
    );
}

export default Login;