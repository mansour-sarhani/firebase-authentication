import {useRef, useState} from "react";
import {useAuth} from "../context/AuthProvider";
import {Link, useNavigate} from "react-router-dom";
import {Alert, Button, Card, Form} from "react-bootstrap";

function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {updateEmail, updatePassword, currentUser} = useAuth()
    const redirect = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        const promises = []
        setLoading(true)
        setError('')

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            redirect('/')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div>
            <Card className="p-4">
                <h2 className="text-center mb-4">Update Profile</h2>
                {error && <Alert variant="danger">{error}</Alert> }
                {currentUser && currentUser.email}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control defaultValue={currentUser.email} type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group className="mb-3" id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control placeholder="Leave blank to keep the same" type="password" ref={passwordRef} />
                    </Form.Group>
                    <Form.Group className="mb-3" id="password-confirmation">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control placeholder="Leave blank to keep the same" type="password" ref={passwordConfirmRef} />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Update</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password">Forgot Password</Link>
                </div>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/dashboard">Cancel</Link>
            </div>
        </div>
    );
}

export default UpdateProfile;