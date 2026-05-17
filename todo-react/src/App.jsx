import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

class App extends Component {
    constructor(props) {
        super(props);

        // Setting up state
        this.state = {
            userInput: "",
            list: [],
        };
    }

    // Set a user input value
    updateInput(value) {
        this.setState({
            userInput: value,
        });
    }

    // Add item if user input in not empty
    addItem() {
        if (this.state.userInput !== "") {
            const userInput = {
                // Add a random id which is used to delete
                id: Math.random(),

                // Add a user value to list
                value: this.state.userInput,
            };

            // Update list
            const list = [...this.state.list];
            list.push(userInput);

            // reset state
            this.setState({
                list,
                userInput: "",
            });
        }
    }

    // Function to delete item from list use id to delete
    deleteItem(key) {
        const list = [...this.state.list];

        // Filter values and leave value which we need to delete
        const updateList = list.filter((item) => item.id !== key);

        // Update list in state
        this.setState({
            list: updateList,
        });
    }

    editItem = (index) => {
      const todos = [...this.state.list];
      const editedTodo = prompt('Edit the todo:');
      if (editedTodo !== null && editedTodo.trim() !== '') {
        let updatedTodos = [...todos]
        updatedTodos[index].value= editedTodo
        this.setState({
          list: updatedTodos,
      });
      }
    }

    render() {
        return (
            <Container className="todo-app">
                <Row className="todo-header">
                    My To-Do List
                </Row>

                <hr />
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>
                        <InputGroup className="todo-input-group mb-3">
                            <FormControl
                                placeholder="Add a new task..."
                                size="lg"
                                value={this.state.userInput}
                                onChange={(item) =>
                                    this.updateInput(item.target.value)
                                }
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        this.addItem();
                                    }
                                }}
                                aria-label="add something"
                                aria-describedby="basic-addon2"
                            />
                            <Button
                                variant="dark"
                                className="todo-add-btn"
                                onClick={() => this.addItem()}
                            >
                                ADD
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>
                        <ListGroup className="todo-list">
                            {this.state.list.length === 0 && (
                                <div className="todo-empty-state">
                                    Nothing here yet — add your first task.
                                </div>
                            )}

                            {this.state.list.map((item, index) => (
                                <ListGroup.Item
                                    key={item.id}
                                    className="todo-item"
                                >
                                    <span className="todo-item-text">
                                        {item.value}
                                    </span>
                                    <span className="todo-item-actions">
                                        <Button
                                            variant="light"
                                            className="todo-action-btn todo-delete-btn"
                                            onClick={() => this.deleteItem(item.id)}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="light"
                                            className="todo-action-btn todo-edit-btn"
                                            onClick={() => this.editItem(index)}
                                        >
                                            Edit
                                        </Button>
                                    </span>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;