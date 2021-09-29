import TaskListItem from "../taskListItem/TaskListItem";
import { useState, useEffect } from "react";
import { TasklistStyled } from "./TaskListStyled";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSprintsTasks } from "../../../redux/task/task-operations";
import { useParams } from "react-router-dom";
import taskSelectors from "../../../redux/task/task-selectors";
import { taskInterface } from '../taskInterfaces/taskInterfaces'

interface Props {
  filter: string;
  targetDate: string;
}

const TaskList = ({ filter, targetDate }: Props) => {
  const tasks = useSelector(taskSelectors.getTasks);
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const [filtredTasks, setFiltredTasks] = useState([]);

  useEffect(() => {
    dispatch(getSprintsTasks(id));
  }, [dispatch, id]);
  useEffect(() => {
    const res = tasks.filter((task: taskInterface) => task.title?.includes(filter));
    setFiltredTasks(res);
  }, [filter, tasks]);

  return (
    <TasklistStyled>
      {filtredTasks.length === 0 &&
        filter.length === 0 &&
        tasks.map((item: taskInterface) => (
          <TaskListItem
            key={item._id ?? item.id}
            task={item}
            targetDate={targetDate}
          />
        ))}
      {filtredTasks.length > 0 &&
        filtredTasks.map((item: taskInterface) => (
          <TaskListItem
            key={item._id ?? item.id}
            task={item}
            targetDate={targetDate}
          />
        ))}
    </TasklistStyled>
  );
};

export default TaskList;