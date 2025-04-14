import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function NotFound() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);


    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            navigate('/main');
        }, 10000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [navigate]);

    return (
        <Container className="text-center mt-5">
            <h3>404 Not Found</h3>
            <p>The page you are looking for does not exist.</p>
            <Card className="mt-4">
                <Card.Body>
                    <Card.Title>Redirecting in {countdown} seconds...</Card.Title>
                    <Link to="/main" className="btn btn-danger">Go to Home</Link>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default NotFound;
