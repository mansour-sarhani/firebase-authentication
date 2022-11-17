import {Alert, Button, Card, Form} from "react-bootstrap";
import {useRef, useState} from "react";
import {useAuth} from "../context/AuthProvider";
import {Link, useNavigate} from "react-router-dom";

function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {signup, currentUser} = useAuth()
    const redirect = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            redirect('/')
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }

    return (
        <div>
            <Card className="p-4">
                <h2 className="text-center mb-4">Sign Up</h2>
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
                    <Form.Group className="mb-3" id="password-confirmation">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password">Forgot Password</Link>
                </div>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account ? <Link to="/login">Login</Link>
            </div>
        </div>
    );
}

export default Signup;