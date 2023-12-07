import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../todo.css';

interface Task {
    taskId: number;
    name: string;
    date: Date;
    done: boolean;
}

const Todo: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [taskId, setTaskId] = useState<number>(0);
    const [tasks, setTasks] = useState<Task[]>([]);

    const sortTasks = (tasks: Task[]): Task[] => {
        return tasks.sort((a, b) => {
            if (a.done === b.done) {
                return a.date.getTime() - b.date.getTime();
            } else {
                return a.done ? 1 : -1;
            }
        });
    };

    const handleUpdate = async (): Promise<void> => {
        if (text.length > 0) {
            const task: Task = {
                taskId: taskId,
                name: text,
                date: date,
                done: false,
            };
            setTasks((prevTasks) => [...prevTasks, task]);
            setTaskId((prevTaskId) => prevTaskId + 1);
        }

        setTasks((prevTasks) => sortTasks(prevTasks));
        setText('');
    };

    const handleDone = (taskId: number): void => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map((task) =>
                task.taskId === taskId ? { ...task, done: true } : task
            );
            return sortTasks(updatedTasks);
        });
    };

    const remainTask: number = tasks.filter((task) => !task.done).length;

    const updateTaskList = tasks.map((task, index) => (
        <div key={index}>
            {task.done ? (
                <Alert variant="success">
                    <Alert.Heading>{task.date.toLocaleDateString()}</Alert.Heading>
                    <p className="task-name">{task.name}</p>
                    <hr />
                    <p>This task is done!</p>
                </Alert>
            ) : (
                <Alert variant="primary">
                    <Alert.Heading>{task.date.toLocaleDateString()}</Alert.Heading>
                    <p className="task-name">{task.name}</p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => handleDone(task.taskId)} variant="danger">
                            Mark as Done
                        </Button>
                    </div>
                </Alert>
            )}
        </div>
    ));

    return (
        <Container className="app-container">
            <h1>To Do List</h1>
            <Row className="prompt-container">
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="Tasks">Task</InputGroup.Text>
                        <Form.Control
                            as="textarea"
                            placeholder="Write a task here..."
                            aria-label="Tasks"
                            aria-describedby="basic-addon1"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="date">Deadline</InputGroup.Text>
                        <DatePicker selected={date} onChange={(date: Date | null) => setDate(date as Date)} className="form-control" />
                    </InputGroup>

                    <Button variant="primary" onClick={handleUpdate}>
                        Submit
                    </Button>
                </Col>
            </Row>
            <Row className="task-container">
                <p>
                    <b>Tasks remaining: {remainTask}</b>
                </p>

                <Col>{updateTaskList}</Col>
            </Row>
        </Container>
    );
};

export default Todo;
