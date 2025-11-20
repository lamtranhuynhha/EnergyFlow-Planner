import { motion } from 'framer-motion';
import { Trash2, Check } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/**
 * TaskCard Component - Premium Dark Mode Edition
 * 
 * This is a single task item with:
 * - Minimal, clean design following Apple × Linear aesthetic
 * - Subtle hover states with scale animations (0.98 → 1)
 * - Refined glassmorphism with dark mode colors
 * - Thin stroke icons for premium feel
 * 
 * Props:
 * - task: The task object with { id, text, completed }
 * - onToggle: Function to toggle task completion
 * - onDelete: Function to delete the task
 * 
 * Technical details:
 * - useSortable hook from dnd-kit provides drag & drop functionality
 * - Framer Motion provides micro-interactions
 * - Custom color palette from Tailwind config
 */
const TaskCard = ({ task, onToggle, onDelete }) => {
  // Set up drag and drop using dnd-kit
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  // Convert transform object to CSS transform string
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      layout
      initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 0.995 }}
      className={`
        glass rounded-xl p-5 mb-3 cursor-grab active:cursor-grabbing
        hover:bg-white/[0.08] transition-all duration-300
        border border-white/[0.08]
        ${task.completed ? 'opacity-50' : ''}
      `}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Task text - classy serif typography */}
        <div 
          className={`
            flex-1 text-text-primary font-normal tracking-wide text-base leading-relaxed
            ${task.completed ? 'line-through text-text-tertiary' : ''}
          `}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {task.text}
        </div>

        {/* Action buttons - minimal with subtle borders */}
        <div className="flex gap-1.5">
          {/* Toggle complete button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(task.id);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              p-2 rounded-lg transition-all duration-200
              border
              ${task.completed 
                ? 'bg-accent-blue/10 border-accent-blue/30 text-accent-blue' 
                : 'bg-white/[0.03] border-white/[0.08] text-text-secondary hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-text-primary'
              }
            `}
            aria-label="Toggle complete"
          >
            <Check size={14} strokeWidth={2} />
          </motion.button>

          {/* Delete button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              p-2 rounded-lg 
              bg-white/[0.03] border border-white/[0.08] text-text-tertiary
              hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400
              transition-all duration-200
            "
            aria-label="Delete task"
          >
            <Trash2 size={14} strokeWidth={2} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
