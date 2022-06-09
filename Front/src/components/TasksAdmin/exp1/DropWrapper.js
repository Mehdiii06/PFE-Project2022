import React from 'react'
import { useDrop } from 'react-dnd'
import {TASK_TYPE, statusColor} from './types'

const DropWrapper = ({ onDrop, children, status}) => {

    const [{ isOver }, drop] = useDrop({
        accept: TASK_TYPE,
        canDrop: (task, monitor) => {
            const taskIndex = statusColor.findIndex(st => st.status === task.status);
            const statusIndex = statusColor.findIndex(st => st.status === status);
            return [taskIndex + 1, taskIndex - 1, taskIndex].includes(statusIndex);
        },
        drop: (task, monitor) => {
            onDrop(task, monitor, status);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    })

  return (
    <div ref={drop} className={"drop-wrapper"}>
        {React.cloneElement(children, { isOver })}
    </div>
  );
};

export default DropWrapper