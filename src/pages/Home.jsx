import { useContext } from "react";
import DailyCard from "../components/DailyCard";
import { Badge, Card, CardTitle, Col, Container, Row } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { Outlet } from "react-router-dom";
import kazuha from '../assets/kazuha.jpg';

export default function Home() {
    const { daily } = useContext(TodoContext);

    return (
        <div className="bg-image"
            style={{
                backgroundImage: `url(${kazuha})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '93vh',

            }}
        >

            <Container>
                <h1
                    style={{
                        backgroundColor: 'white',
                        border: '2px solid black',
                        padding: '8px',
                        width: '300px',
                        borderRadius: '10px',
                        opacity: 0.5,


                    }}
                >Your Daily Task</h1>
                <Row>
                    <CardGroup daily={daily} />
                </Row>
                <Outlet />
            </Container>

        </div>
    );
}

function CardGroup({ daily }) {
    return daily.map((daily) => {
        return (
            <Col md={4} key={daily.id}>
                <DailyCard daily={daily} />
            </Col>
        )
    })
}