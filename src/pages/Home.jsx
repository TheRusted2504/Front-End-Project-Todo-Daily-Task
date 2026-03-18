import { useContext } from "react";
import DailyCard from "../components/DailyCard";
import { Badge, Card, CardTitle, Col, Container, Row } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { Outlet } from "react-router-dom";

export default function Home() {
    const { daily } = useContext(TodoContext);

    return (
        <Container>
            <h1 className='my-3'>Your Daily Task</h1>
            <Row>
                <CardGroup daily={daily} />
            </Row>
            <Outlet />
        </Container>
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