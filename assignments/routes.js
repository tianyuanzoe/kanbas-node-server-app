import db from "../Database/index.js";
function AssignmentRoutes(app){

    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignments = db.assignments
          .filter((a) => a.course === courseId);
        if (!assignments) {
          res.status(404).send("Assignments not found");
          return;
        }
        res.send(assignments);
      });
      app.post("/api/courses/:courseId/assignments", (req, res) => {
        const {courseId} = req.params;
        const assignment = { ...req.body,
          _id: new Date().getTime().toString(),
          course: courseId
        };
        db.assignments.push(assignment);
        res.send(assignment);
      });
      app.delete("/api/assignments/:assignmentID", (req, res) => {
        const { assignmentID } = req.params;   
            db.assignments = db.assignments.filter((a) => a._id !== assignmentID);
            res.sendStatus(200);
      }
        );
        app.put("/api/assignments/:assignmentID", (req, res) => {
            const { assignmentID } = req.params;
            db.assignments = db.assignments.map((a) =>
              a._id === assignmentID ? req.body : a
            );  
            res.sendStatus(204);
        });

     
}
export default AssignmentRoutes;