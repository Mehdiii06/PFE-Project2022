import React, { Fragment, useState, useRef, useEffect, useMemo } from 'react'
import { useDrag, useDrop} from 'react-dnd'
import Window from '../Window'
import { TASK_TYPE } from '../types'

const Task = ({ task, index, moveTask, status }) => {

  

    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: TASK_TYPE,
        hover(task, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = task.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex ) {
                return;
            }

            const hoveredRect = ref.current.getBoundClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            moveTask(dragIndex, hoverIndex);
            task.index = hoverIndex;

        }
    });

    const [{ isDragging }, drag] = useDrag({
        task: { type: TASK_TYPE, ...task, index},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const [show, setShow] = useState(false);
    const onOpen = () => setShow(true);
    const onClose = () => setShow(false);

    drag(drop(ref));

  return (
    <Fragment>
        <div
           ref={ref}
           style={{ opacity: isDragging ? 0: 1}}
           className={"task"}
           onClick={onOpen}
        >
            <div className={"color-bar"} style={{ backgroundcolor: status.color }} />
            <p className={"task-title"}>{task.content}</p>
            <p className={"task-status"}>{task.object}</p>
        </div>
        <Window
        
            task={task}
            onClose={onClose}
            show={show}
        />
    </Fragment>
  )
}

export default  React.memo(Task)