import { useContext, useEffect, useState } from 'react'
import { Button, Card, Image } from "react-bootstrap";
import { DailyContext } from '../contexts/DailyContext';
import despair from '../assets/despair.webp';

export default function DailyCard({ daily }) {
    const completed = daily.completed
    const border = completed ? 'success' : 'danger'
    const [timer, setTimer] = useState(0)
    const [timerInterval, setTimerInterval] = useState(null)
    const setDaily = useContext(DailyContext).setDaily;

    const startTimer = () => {
        if (timerInterval === null) {
            const intervalID = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
            setTimerInterval(intervalID);
        }
    };

    const pauseTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
    };

    const resetTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
        setTimer(0);
    };

    const deleteTodo = () => {
        setDaily((prevTodos) =>
            prevTodos.filter((prevTodo) => prevTodo.id !== daily.id)
        );
    };

    useEffect(() => {
        return () => {
            clearInterval(timerInterval);
        };
    }, [timerInterval]);

    return (
        <>
            <Card border={border} className="my-3">
                <Card.Header style={{ backgroundColor: completed ? 'lightblue' : '#ef5350' }} className='d-flex justify-content-between'>
                    <div className='mr-auto p-2'>
                        {!completed && 'Not '}Done
                    </div>

                    <div className="ml-auto p-2">
                        Timer: {timer} seconds
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{daily.title}</Card.Title>
                    <Card.Text style={{ whiteSpace: 'pre-line' }}>{daily.description}</Card.Text >
                    <Image src={despair} style={{ width: '50px', height: '50px' }} />
                    <p></p>
                    <Button
                        style={{ padding: "10px 20px", fontSize: "16px" }}
                        variant='success' onClick={startTimer}>
                        <i className="bi bi-play"></i>
                    </Button>
                    <Button
                        style={{ padding: "10px 20px", fontSize: "16px" }}
                        variant='danger' onClick={pauseTimer} className="ms-2">
                        <i className="bi bi-pause-fill"></i>
                    </Button>
                    <Button
                        style={{ padding: "10px 20px", fontSize: "16px" }}
                        onClick={resetTimer} className="ms-2">
                        <i className="bi bi-arrow-clockwise"></i>
                    </Button>
                    <Button
                        style={{ padding: "10px 20px", fontSize: "16px" }}
                        variant="secondary"
                        href={`/daily/${daily.id}`}
                        className="ms-2"
                    >
                        <i className="bi bi-pencil"></i>
                    </Button>
                    <Button
                        style={{ padding: "10px 20px", fontSize: "16px" }}
                        variant="danger" onClick={deleteTodo} className="ms-2">
                        <i className="bi bi-trash3"></i>
                    </Button>


                </Card.Body>
            </Card>
        </>
    )
}