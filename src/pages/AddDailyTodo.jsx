import { useContext, useState } from "react";
import { Button, Container, Form } from 'react-bootstrap'
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";

export default function AddDailyTodo() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [completed, setCompleted] = useState(false)
    const setDaily = useContext(TodoContext).setDaily
    const daily = useContext(TodoContext).daily
    const navigate = useNavigate()

    return (
        <Container>
            <h1 className="my-3">Add Daily Task</h1>
            <Form
                onSubmit={event => {
                    event.preventDefault()
                    setDaily([
                        ...daily,
                        { id: Date.now(), title, description, completed },
                    ])
                    navigate('/')
                }}>
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
                        as='textarea'
                        rows={3}
                        placeholder={"Add your Todo"}
                        required
                    />
                </Form.Group>



                <Form.Check
                    type="checkbox"
                    id="completed"
                    label='Mark as completed'
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                    className="mb-3"
                />
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

