import React, { useState, useEffect } from "react";
import Task from "./exp1/Task";
import DropWrapper from './DropWrapper'
import Col from "./exp1/Col";
import { statusColor } from "./types";


const TaskDashboard = () => {

  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("CC_Token");
  
  useEffect(() => {
      axios
      .get("/api/tasks", { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
          const list = res.data.data.tasks;
          setTasks(list);
        console.log(list)
      })
      .catch((err) => {
        console.log(err);
      });
    },);

    const onDrop = (task, monitor, status) => {
        
        setTasks(prevState => {
            const newTasks = prevState
                .filter(i => i._id !== task._id)
                .concat({ ...task, status })
            return [ ...newTasks ];
        });

    }
    const moveTask = (dragIndex, hoverIndex) => {
        const task = tasks[dragIndex];
        setTasks(prevState => {
            const newTasks = prevState.filter((i, idx) => idx !== dragIndex);
            newTasks.splice(hoverIndex, 0, task);
            return [ ...newTasks];
        })
        
    }
    

  return (
    <div className={"rowtask"}>
        {statusColor.map(s => {
            return (
                <div key={s.status} className={"col-wrapper"}>
                    <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
                    {/* <DropWrapper onDrop={onDrop} status={s.status}>
                        <Col>
                            {tasks
                                .filter(t => t.status === s.status)
                                .map((t, idx) => <Task key={t._id} task={t} index={idx} moveTask={moveTask} status={s} />)}
                        </Col>
                    </DropWrapper> */}
                </div>
            )
        })}
    </div>
  );
};

export default TaskDashboard;
