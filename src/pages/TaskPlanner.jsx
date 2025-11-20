import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Calendar, Zap, Clock, Home, ArrowRight } from 'lucide-react';
import { loadEnergyProfile } from '../utils/energyScoring';
import { scheduleTasks, convertToTaskBoard } from '../utils/taskScheduler';
import { saveTasks } from '../utils/localStorage';

/**
 * TaskPlanner Component
 * Nhập tasks và tự động sắp xếp dựa trên Energy Profile
 */
const TaskPlanner = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: '',
    energyConsumption: 'medium',
    duration: '1',
    priority: 'medium'
  });
  const [timeConstraints, setTimeConstraints] = useState({
    startHour: 6,
    endHour: 22,
    date: new Date().toISOString().split('T')[0]
  });
  const [scheduledTasks, setScheduledTasks] = useState(null);

  useEffect(() => {
    const savedProfile = loadEnergyProfile();
    if (!savedProfile) {
      navigate('/quiz');
      return;
    }
    setProfile(savedProfile);
  }, [navigate]);

  const handleAddTask = () => {
    if (!newTask.name.trim()) return;

    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({
      name: '',
      energyConsumption: 'medium',
      duration: '1',
      priority: 'medium'
    });
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleSchedule = () => {
    try {
      const scheduled = scheduleTasks(tasks, timeConstraints);
      setScheduledTasks(scheduled);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSaveToTaskBoard = () => {
    const taskBoardData = convertToTaskBoard(scheduledTasks);
    saveTasks(taskBoardData);
    navigate('/');
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        {/* Back to Home Button */}
        <motion.button
          onClick={() => navigate('/')}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-8 left-8 z-50 p-3 rounded-xl glass border border-white/[0.1]
                   hover:bg-white/[0.08] transition-all duration-200"
          aria-label="Back to home"
        >
          <Home className="text-accent-blue" size={20} strokeWidth={2} />
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading text-text-primary tracking-wide mb-4">
            Task Planner
          </h1>
          <p className="text-text-secondary text-lg tracking-wide">
            Add tasks and let AI schedule them optimally based on your energy profile
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Input Tasks */}
          <div>
            {/* Time Constraints */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 mb-6"
            >
              <h3 className="text-lg font-display font-semibold text-text-primary tracking-wide mb-4 flex items-center gap-2">
                <Calendar size={20} />
                Khung giờ làm việc
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm text-text-secondary tracking-wide block mb-2">
                    Bắt đầu
                  </label>
                  <select
                    value={timeConstraints.startHour}
                    onChange={(e) => setTimeConstraints({...timeConstraints, startHour: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-text-primary
                             focus:border-accent-blue focus:outline-none transition-all"
                  >
                    {[...Array(24)].map((_, i) => (
                      <option key={i} value={i}>{i}h</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm text-text-secondary tracking-wide block mb-2">
                    Kết thúc
                  </label>
                  <select
                    value={timeConstraints.endHour}
                    onChange={(e) => setTimeConstraints({...timeConstraints, endHour: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-text-primary
                             focus:border-accent-blue focus:outline-none transition-all"
                  >
                    {[...Array(24)].map((_, i) => (
                      <option key={i} value={i}>{i}h</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm text-text-secondary tracking-wide block mb-2">
                    Ngày
                  </label>
                  <input
                    type="date"
                    value={timeConstraints.date}
                    onChange={(e) => setTimeConstraints({...timeConstraints, date: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-text-primary
                             focus:border-accent-blue focus:outline-none transition-all"
                  />
                </div>
              </div>
            </motion.div>

            {/* Add Task Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6 mb-6"
            >
              <h3 className="text-lg font-display font-semibold text-text-primary tracking-wide mb-4">
                Thêm Task Mới
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-text-secondary tracking-wide block mb-2">
                    Tên task
                  </label>
                  <input
                    type="text"
                    value={newTask.name}
                    onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                    placeholder="Ví dụ: Viết báo cáo, Đọc sách..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-text-primary
                             placeholder-text-tertiary focus:border-accent-blue focus:outline-none transition-all
                             tracking-wide"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-sm text-text-secondary tracking-wide block mb-2 flex items-center gap-1">
                      <Zap size={14} />
                      Energy
                    </label>
                    <select
                      value={newTask.energyConsumption}
                      onChange={(e) => setNewTask({...newTask, energyConsumption: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-text-primary
                               focus:border-accent-blue focus:outline-none transition-all text-sm"
                    >
                      <option value="low">Thấp</option>
                      <option value="medium">Trung bình</option>
                      <option value="high">Cao</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-text-secondary tracking-wide block mb-2 flex items-center gap-1">
                      <Clock size={14} />
                      Giờ
                    </label>
                    <input
                      type="number"
                      value={newTask.duration}
                      onChange={(e) => setNewTask({...newTask, duration: e.target.value})}
                      min="0.25"
                      step="0.25"
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-text-primary
                               focus:border-accent-blue focus:outline-none transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-text-secondary tracking-wide block mb-2">
                      Ưu tiên
                    </label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-text-primary
                               focus:border-accent-blue focus:outline-none transition-all text-sm"
                    >
                      <option value="low">Thấp</option>
                      <option value="medium">Vừa</option>
                      <option value="high">Cao</option>
                    </select>
                  </div>
                </div>

                <motion.button
                  onClick={handleAddTask}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-3 rounded-xl bg-accent-blue text-white font-semibold tracking-wide
                           hover:bg-accent-blue/90 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={20} strokeWidth={2} />
                  Thêm Task
                </motion.button>
              </div>
            </motion.div>

            {/* Task List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-display font-semibold text-text-primary tracking-wide">
                  Tasks ({tasks.length})
                </h3>
                {tasks.length > 0 && (
                  <motion.button
                    onClick={handleSchedule}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg bg-accent-indigo/20 text-accent-indigo font-semibold text-sm
                             hover:bg-accent-indigo/30 transition-all"
                  >
                    Tự động sắp xếp
                  </motion.button>
                )}
              </div>

              {tasks.length === 0 ? (
                <p className="text-text-tertiary text-center py-8 italic tracking-wide">
                  Chưa có task nào. Thêm task đầu tiên!
                </p>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <p className="text-text-primary font-medium tracking-wide">{task.name}</p>
                        <div className="flex gap-3 mt-1 text-xs text-text-tertiary">
                          <span>⚡ {task.energyConsumption}</span>
                          <span>⏱️ {task.duration}h</span>
                          <span>🎯 {task.priority}</span>
                        </div>
                      </div>
                      <motion.button
                        onClick={() => handleDeleteTask(task.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-all"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right: Scheduled Result */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 sticky top-8"
            >
              <h3 className="text-lg font-display font-semibold text-text-primary tracking-wide mb-4">
                Lịch đã sắp xếp
              </h3>

              {!scheduledTasks ? (
                <div className="text-center py-12">
                  <Calendar className="mx-auto text-text-tertiary mb-4" size={48} />
                  <p className="text-text-tertiary italic tracking-wide">
                    Thêm tasks và nhấn "Tự động sắp xếp"
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-[500px] overflow-y-auto mb-4">
                    {scheduledTasks.map((task, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl ${
                          task.scheduled
                            ? 'bg-accent-blue/10 border border-accent-blue/30'
                            : 'bg-red-500/10 border border-red-500/30'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-text-primary font-semibold tracking-wide flex-1">
                            {task.name}
                          </p>
                          {task.scheduled && (
                            <span className="text-xs px-2 py-1 rounded-full bg-accent-blue/20 text-accent-blue">
                              {task.energyLevel}% energy
                            </span>
                          )}
                        </div>
                        
                        {task.scheduled ? (
                          <div className="text-sm text-text-secondary space-y-1">
                            <p>🕐 {task.startTime} - {task.endTime}</p>
                            <p>📅 {task.date}</p>
                          </div>
                        ) : (
                          <p className="text-sm text-red-400">{task.reason}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <motion.button
                      onClick={handleSaveToTaskBoard}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold tracking-wide
                               hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                    >
                      Save to TaskBoard
                      <ArrowRight size={18} strokeWidth={2} />
                    </motion.button>
                    
                    <motion.button
                      onClick={() => navigate('/dashboard')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-xl bg-accent-blue text-white font-semibold tracking-wide
                               hover:bg-accent-blue/90 transition-all flex items-center justify-center gap-2"
                    >
                      Go to Dashboard
                      <ArrowRight size={18} strokeWidth={2} />
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskPlanner;
