import { Router } from 'express'
import { API_FRAGMENTS } from 'common';
import { TodoAPIs } from '../../app-server-apis/todo-apis';
import { Todo } from 'common/model';

export function todoRoutes(router: Router, todoAPIs: TodoAPIs) {

    router.post(`/${API_FRAGMENTS["CREATE_TODO"]}`, async (req, res) => {
        let todo = req.body.todo;
        try {
            if (todo) {
                todo = Todo.fromJSON(todo)
                const response = await todoAPIs.createTodoNew(todo);
                if (response) {
                    res.status(200).send(response);
                } else {
                    res.status(403).send("DB error");
                }
            } else {
                res.status(400).send("Missing Parameters");
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
        }
    )


router.get(`/${API_FRAGMENTS["GET_TODOS"]}`, async (req, res) => {
    console.log("Incoming GET Request");
    try {
        const todos = await todoAPIs.readTodos();
        console.log(todos);
        if (todos.length) {
            res.status(200).send(JSON.stringify(todos));
        } else {
            res.status(401).send("Something went wrong")
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.put(`/${API_FRAGMENTS["UPDATE_TODO"]}/:id`, async (req, res) => {
    let todo = req.body.todo;

    console.log("Incoming PUT Request");
    try {
        if (todo) {
            todo = Todo.fromJSON(todo)
            const response = await todoAPIs.updateTodo(req.params.id, todo);
            if (response) {
                res.status(200).send(response);
            } else {
                res.status(403).send("DB error");
            }
        } else {
            res.status(400).send("Missing Parameters");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete(`/${API_FRAGMENTS["DELETE_TODO"]}/:id`, async (req, res) => {
    try {
        // const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        const response = await todoAPIs.deleteTodo(req.params.id);
        if (response) {
            res.status(200).send(response);
        } else {
            res.status(403).send("DB error");
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



}