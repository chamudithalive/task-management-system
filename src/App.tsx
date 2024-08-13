import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TopNavBar from "./components/TopNavBar";
import SideNavBar from "./components/SideNavBar";
import SectionTab from "./components/SectionTab";
import PrimBtn from "./components/PrimBtn";
import TaskCard from "./components/TaskCard";
import TaskSidePanel from "./components/TaskSidePanel";
import AddNewTask from "./components/AddNewTask";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import ConfirmDeletePopup from "./components/ConfirmDeletePopup";
import { deleteTask, updateTaskStatus } from "./redux/taskSlice";

type TaskStatus = "Todo" | "In Progress" | "Completed";

const App: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [isAddTaskVisible, setAddTaskVisible] = useState(false);
  const [status, setStatus] = useState<TaskStatus | null>(null);
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
  const dispatch = useDispatch();

  const handleOpenPanel = (taskId: number) => {
    setSelectedTaskId(taskId);
    setPanelOpen(true);
  };

  const handleClosePanel = () => {
    setPanelOpen(false);
    setSelectedTaskId(null);
  };

  const handleAddTaskClick = (status: TaskStatus) => {
    setStatus(status);
    setAddTaskVisible(true);
  };

  const handleCloseAddTask = () => {
    setAddTaskVisible(false);
  };

  const handleDeleteRequest = (taskId: number) => {
    setSelectedTaskId(taskId);
    setDeletePopupVisible(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTaskId !== null) {
      dispatch(deleteTask(selectedTaskId));
      setDeletePopupVisible(false);
    }
  };

  const handleCancelDelete = () => {
    setDeletePopupVisible(false);
  };

  const handleDragEnd = (result: any) => {
    const { destination } = result;

    if (!destination) {
      return;
    }

    const taskId = parseInt(result.draggableId);
    const newStatus = destination.droppableId as TaskStatus;

    dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
  };

  const sections: TaskStatus[] = ["Todo", "In Progress", "Completed"];

  return (
    <div className="font-body-b1-regular">
      <TopNavBar />
      <div className="flex">
        <SideNavBar />
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-3 w-full h-screen bg-generic-white-bg px-2 py-4 gap-2">
            {sections.map((section) => (
              <Droppable key={section} droppableId={section}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="border border-gray-300 border-dashed rounded-xl p-2"
                  >
                    <SectionTab text={section} />
                    {tasks
                      .filter((task) => task.status === section)
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => handleOpenPanel(task.id)}
                            >
                              <TaskCard task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {!isAddTaskVisible && (
                      <PrimBtn
                        onClick={() =>
                          handleAddTaskClick(section as TaskStatus)
                        }
                      />
                    )}
                    {isAddTaskVisible && status === section && (
                      <AddNewTask
                        onClose={handleCloseAddTask}
                        status={status}
                      />
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
      {selectedTaskId !== null && (
        <TaskSidePanel
          onClose={handleClosePanel}
          isVisible={isPanelOpen}
          taskId={selectedTaskId}
          onRequestDelete={handleDeleteRequest}
        />
      )}
      <ConfirmDeletePopup
        isVisible={isDeletePopupVisible}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default App;
