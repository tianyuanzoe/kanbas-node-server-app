function Lab5(app) {
    const hello = (req, res) => {
        res.send('Hello web!');
    };
   app.get('/a5/welcome', hello);
   app.get("/a5/hello/:name", (req, res) => {
         res.send(`Hello ${req.params.name}!`);
    })
   
    app.get("/a5/add/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
      });
      app.get("/a5/subtract/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) - parseInt(b);
        res.send(sum.toString());
      });
      app.get("/a5/calculator", (req, res) => {
        const { a, b, operation } = req.query;
        let result = 0;
        switch (operation) {
          case "add":
            result = parseInt(a) + parseInt(b);
            break;
          case "subtract":
            result = parseInt(a) - parseInt(b);
            break;
          default:
            result = "Invalid operation";
        }
        res.send(result.toString());
      });
      const assignment = {
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10",
        completed: false,
        score: 0,
      };
        app.get("/a5/assignment", (req, res) => {
            res.send(assignment);
        });
        app.get("/a5/assignment/title", (req, res) => {
            res.json(assignment.title);
          });
          app.get("/a5/assignment/title/:newTitle", (req, res) => {
            const { newTitle } = req.params;
            assignment.title = newTitle;
            res.json(assignment);
          });
          const todos = [
            { id: 1, title: "Task 1", completed: true },
            { id: 2, title: "Task 2", completed: true },
            { id: 3, title: "Task 3", completed: false },
            { id: 4, title: "Task 4", completed: false },
            { id: 5, title: "Task 5", completed: false },

          ];
         
        // app.get("/a5/todos", (req, res) => {
        //       res.json(todos);
        //       console.log("completed");

        //     });
        app.post("/a5/todos", (req, res) => {
            const newTodo = {
              ...req.body,
              id: new Date().getTime(),
            };
            todos.push(newTodo);
            res.json(newTodo);
          });
        
        app.get("/a5/todos/create", (req, res) => {
            const newTodo = {
              id: new Date().getTime(),
              title: "New Task",
              completed: false,
            };
            todos.push(newTodo);
            res.json(todos);
          });
        
          app.get("/a5/todos/:id", (req, res) => {
            const { id } = req.params;
            const todo = todos.find((t) => t.id === parseInt(id));
            res.json(todo);
          });
        
          app.get("/a5/todos", (req, res) => {
            const { completed } = req.query;
            const isCompleted = completed === "true";
            if (completed !== undefined) {
              const completedTodos = todos.filter(
                (t) => t.completed === isCompleted);
              res.json(completedTodos);
              console.log(completedTodos)
              return;
            }else{
                res.json(todos);
            }
          });
          app.delete("/a5/todos/:id", (req, res) => {
            const { id } = req.params;
            const todo = todos.find((t) => t.id === parseInt(id));
            if (!todo) {
                res.res
                  .status(404)
                  .json({ message:
                    `Unable to delete Todo with ID ${id}` });
                return;
              }
          
            todos.splice(todos.indexOf(todo), 1);
            res.sendStatus(200);
          });
        
          app.get("/a5/todos/:id/delete", (req, res) => {
            const { id } = req.params;
            const todo = todos.find((t) => t.id === parseInt(id));
            todos.splice(todos.indexOf(todo), 1);
            res.json(todos);
          });
          app.get("/a5/todos/:id/title/:title", (req, res) => {
            const { id, title } = req.params;
            const todo = todos.find((t) => t.id === parseInt(id));
            todo.title = title;
            res.json(todos);
          });
          app.put("/a5/todos/:id", (req, res) => {
            const { id } = req.params;
            const todo = todos.find((t) => t.id === parseInt(id));
            if (!todo) {
                res.res
                  .status(404)
                  .json({ message:
                    `Unable to update Todo with ID ${id}` });
                return;
              }
          
            todo.title = req.body.title;
            todo.description = req.body.description;
            todo.due = req.body.due;
            todo.completed = req.body.completed;
            res.sendStatus(200);
          });
        
            
          
        
        
    
    
}
export default Lab5;