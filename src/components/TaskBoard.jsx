import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './Column';
import TaskCard from './TaskCard';
import { useState } from 'react';

/**
 * TaskBoard Component
 * 
 * This is the main board that contains all three columns and manages:
 * - Drag and drop between columns
 * - Task state management (add, delete, toggle, move)
 * - Communication with parent App component for persistence
 * 
 * Props:
 * - tasks: Object with arrays for each energy level { morning: [], afternoon: [], evening: [] }
 * - setTasks: Function to update tasks in parent (App.jsx)
 * 
 * Technical details:
 * - DndContext provides drag and drop context for all children
 * - useSensors configures how drag interactions work (mouse, touch, etc.)
 * - DragOverlay shows a preview of the item being dragged
 * - We use the 'closestCorners' collision detection algorithm
 */
const TaskBoard = ({ tasks, setTasks }) => {
  const [activeId, setActiveId] = useState(null);

  // Configure drag sensors - how users can initiate dragging
  // PointerSensor works for both mouse and touch
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Drag must move 8px before activating (prevents accidental drags)
      },
    })
  );

  // Column configuration
  const columns = [
    { id: 'morning', title: 'Morning Energy'},
    { id: 'afternoon', title: 'Afternoon Energy'},
    { id: 'evening', title: 'Evening Peak'},
  ];

  /**
   * Find which column and index a task is in
   */
  const findTaskLocation = (id) => {
    for (const columnId of ['morning', 'afternoon', 'evening']) {
      const index = tasks[columnId].findIndex(task => task.id === id);
      if (index !== -1) {
        return { columnId, index };
      }
    }
    return null;
  };

  /**
   * Handle when drag starts
   */
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  /**
   * Handle when drag ends - move task to new location
   */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }

    const activeLocation = findTaskLocation(active.id);
    if (!activeLocation) {
      setActiveId(null);
      return;
    }

    const { columnId: activeColumn, index: activeIndex } = activeLocation;

    // Check if we're dropping over a column (not another task)
    const overColumn = ['morning', 'afternoon', 'evening'].includes(over.id) 
      ? over.id 
      : findTaskLocation(over.id)?.columnId;

    if (!overColumn) {
      setActiveId(null);
      return;
    }

    // If dragging within the same column
    if (activeColumn === overColumn) {
      const overIndex = tasks[overColumn].findIndex(task => task.id === over.id);
      if (overIndex !== -1 && activeIndex !== overIndex) {
        setTasks(prev => ({
          ...prev,
          [activeColumn]: arrayMove(prev[activeColumn], activeIndex, overIndex)
        }));
      }
    } else {
      // Moving to a different column
      const taskToMove = tasks[activeColumn][activeIndex];
      setTasks(prev => ({
        ...prev,
        [activeColumn]: prev[activeColumn].filter(task => task.id !== active.id),
        [overColumn]: [...prev[overColumn], taskToMove]
      }));
    }

    setActiveId(null);
  };

  /**
   * Add a new task to a specific column
   */
  const handleAddTask = (columnId, text) => {
    const newTask = {
      id: `task-${Date.now()}-${Math.random()}`, // Unique ID
      text,
      completed: false,
    };

    setTasks(prev => ({
      ...prev,
      [columnId]: [...prev[columnId], newTask]
    }));
  };

  /**
   * Toggle task completion status
   */
  const handleToggleTask = (taskId) => {
    setTasks(prev => {
      const newTasks = { ...prev };
      
      // Find and toggle the task
      for (const columnId of ['morning', 'afternoon', 'evening']) {
        const taskIndex = newTasks[columnId].findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          newTasks[columnId] = [...newTasks[columnId]];
          newTasks[columnId][taskIndex] = {
            ...newTasks[columnId][taskIndex],
            completed: !newTasks[columnId][taskIndex].completed
          };
          break;
        }
      }
      
      return newTasks;
    });
  };

  /**
   * Delete a task
   */
  const handleDeleteTask = (taskId) => {
    setTasks(prev => {
      const newTasks = { ...prev };
      
      // Find and remove the task
      for (const columnId of ['morning', 'afternoon', 'evening']) {
        newTasks[columnId] = newTasks[columnId].filter(t => t.id !== taskId);
      }
      
      return newTasks;
    });
  };

  // Get the active task for DragOverlay
  const activeTask = activeId ? findTaskLocation(activeId) : null;
  const activeTaskData = activeTask 
    ? tasks[activeTask.columnId][activeTask.index] 
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            emoji={column.emoji}
            tasks={tasks[column.id]}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>

      {/* DragOverlay shows a preview of the dragged item */}
      <DragOverlay>
        {activeTaskData ? (
          <div className="opacity-80 cursor-grabbing">
            <TaskCard
              task={activeTaskData}
              onToggle={() => {}}
              onDelete={() => {}}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskBoard;
