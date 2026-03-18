import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { TodoContext } from '../contexts/TodoContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditDailyTodo() {
    const setDaily = useContext(TodoContext).setDaily;
    const daily = useContext(TodoContext).daily;
    const navigate = useNavigate();
    const id = parseInt(useParams().id);
    const currentDaily = daily.filter((daily) => daily.id === id)[0];
    const [title, setTitle] = useState(currentDaily.title);
    const [description, setDescription] = useState(currentDaily.description);

    const [completed, setCompleted] = useState(currentDaily.completed);

    function updateTodo(event) {
        event.preventDefault();
        const updatedDaily = daily.map((daily) => {
            if (daily.id === id) {
                return { id, title, description, completed };
            }
            return daily;
        });
        setDaily(updatedDaily);
        navigate('/');
    }

    return (
        <Container>
            <h1 className="my-3">Add Daily Task</h1>
            <Form onSubmit={updateTodo}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Daily Title"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        as="textarea"
                        rows={3}
                        placeholder={`Add your daily`}
                        required
                    />
                </Form.Group>



                <Form.Check
                    type="checkbox"
                    id="completed"
                    label="Mark as completed"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                    className="mb-3"
                />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
