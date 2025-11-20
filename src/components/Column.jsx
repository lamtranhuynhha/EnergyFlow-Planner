import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

/**
 * Column Component - Premium Dark Mode Edition
 * 
 * Represents one energy zone column with:
 * - Spacious padding (24-32px) for airy feel
 * - Refined glassmorphism with dark mode colors
 * - Minimal borders and subtle shadows
 * - Clean input styling with light borders
 * - Smooth micro-interactions
 * 
 * Props:
 * - id: Unique identifier for the column ('morning', 'afternoon', 'evening')
 * - title: Display title for the column
 * - emoji: Icon/emoji for the column
 * - tasks: Array of task objects for this column
 * - onAddTask: Function to add a new task
 * - onToggleTask: Function to toggle task completion
 * - onDeleteTask: Function to delete a task
 * 
 * Design follows: Apple × Linear × Notion aesthetic
 */
const Column = ({ id, title, emoji, tasks, onAddTask, onToggleTask, onDeleteTask }) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Make this column a droppable area
  const { setNodeRef, isOver } = useDroppable({ id });

  // Handle adding a new task
  const handleAddTask = () => {
    if (newTaskText.trim()) {
      onAddTask(id, newTaskText.trim());
      setNewTaskText('');
      setIsAdding(false);
    }
  };

  // Handle Enter key in input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewTaskText('');
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={`
        glass rounded-2xl p-8 flex flex-col
        transition-all duration-300
        ${isOver ? 'ring-1 ring-accent-blue/40 bg-white/[0.08]' : ''}
      `}
      style={{ minHeight: '520px' }}
    >
      {/* Column Header - minimal and spacious */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl opacity-80">{emoji}</span>
          <h2 className="text-2xl font-display font-semibold text-text-primary tracking-wide">
            {title}
          </h2>
        </div>
        <div className="text-text-tertiary text-base font-normal tracking-wide">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </div>
      </div>

      {/* Tasks List - Sortable area with custom scrollbar */}
      <div className="flex-1 overflow-y-auto mb-6 -mr-2 pr-2">
        <SortableContext
          items={tasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
              />
            ))}
          </AnimatePresence>
        </SortableContext>

        {/* Empty state - minimal and clean */}
        {tasks.length === 0 && !isAdding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-text-tertiary text-center py-12 text-base font-normal tracking-wide italic"
          >
            No tasks yet
          </motion.div>
        )}
      </div>

      {/* Add Task Section - clean minimal input */}
      {isAdding ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Task name..."
            className="w-full px-4 py-3 rounded-xl 
                     bg-white/[0.03] text-text-primary placeholder-text-tertiary 
                     border border-white/[0.08] 
                     focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.05]
                     transition-all duration-200
                     font-normal text-base tracking-wide"
            autoFocus
          />
          <div className="flex gap-2">
            <motion.button
              onClick={handleAddTask}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-4 py-2.5 rounded-lg 
                       bg-accent-blue text-white font-semibold text-base tracking-wide
                       hover:bg-accent-blue/90 transition-all duration-200"
            >
              Add Task
            </motion.button>
            <motion.button
              onClick={() => {
                setIsAdding(false);
                setNewTaskText('');
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2.5 rounded-lg 
                       bg-white/[0.03] text-text-secondary border border-white/[0.08]
                       hover:bg-white/[0.08] hover:text-text-primary transition-all duration-200
                       font-normal text-base tracking-wide"
            >
              <X size={16} strokeWidth={2} />
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.button
          onClick={() => setIsAdding(true)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-lg 
                   bg-white/[0.03] text-text-secondary border border-white/[0.08]
                   hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-text-primary
                   transition-all duration-200 
                   flex items-center justify-center gap-2 group
                   font-normal text-base tracking-wide"
        >
          <Plus size={16} strokeWidth={2} className="group-hover:rotate-90 transition-transform duration-300" />
          Add Task
        </motion.button>
      )}
    </motion.div>
  );
};

export default Column;
