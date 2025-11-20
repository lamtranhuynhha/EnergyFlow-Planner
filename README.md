# ⚡ EnergyFlow Planner

> **Match your tasks to your energy, not your energy to your tasks.**

A beautiful, intelligent task management app that helps you work with your natural energy rhythm. Discover your energy profile, get AI-powered task scheduling, and boost productivity with built-in focus timers.

![EnergyFlow Planner](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat&logo=tailwind-css)

## ✨ Features

### 🧠 Energy Profile System
- **12-Question Quiz**: Discover your chronotype, peak energy hours, and recovery patterns
- **Energy Curve Visualization**: See your natural energy rhythm throughout the day
- **Profile Persistence**: Your energy profile saves locally for future sessions

### 🤖 Smart Task Scheduling
- **AI-Powered Scheduling**: Automatically assigns tasks to optimal time slots based on:
  - Your energy profile
  - Task energy consumption (high/medium/low)
  - Task priority and duration
  - Break time preferences
- **Time Constraints**: Customize your work hours and dates
- **Visual Schedule**: See your day planned out with energy levels

### 📋 Classic TaskBoard
- **Three Energy Zones**: Morning (Deep Work), Afternoon (Light Work), Evening (Flow State)
- **Drag & Drop**: Smoothly move tasks between zones
- **Real-time Energy Detection**: Shows current energy zone based on time
- **Motivational Quotes**: Get inspired with energy-themed quotes

### ⏰ Focus Timers
- **Pomodoro Timer**: 25-min work / 5-min break cycles with auto-switching
- **Countdown Timer**: Customizable duration (1-60 minutes)
- **Visual Progress**: Beautiful circular progress rings
- **Sound Notifications**: Get notified when timers finish

### 🎨 Design & UX
- **Dark/Light Mode**: Toggle between themes
- **Glassmorphism UI**: Premium frosted glass aesthetic
- **Smooth Animations**: Powered by Framer Motion
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Persistent Storage**: All data saved to localStorage

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   - Navigate to `http://localhost:5173` (Vite's default port)
   - Start organizing your tasks! 🎉

## 🏗️ Project Structure

```
src/
├── pages/
│   ├── LandingPage.jsx      # Home page with 3-step workflow
│   ├── EnergyQuiz.jsx       # 12-question energy profile quiz
│   ├── ProfileResult.jsx    # Energy profile results & visualization
│   ├── TaskPlanner.jsx      # Smart AI task scheduler
│   └── Dashboard.jsx        # Classic TaskBoard with timers
├── components/
│   ├── TaskCard.jsx         # Individual task with drag & actions
│   ├── Column.jsx           # Energy zone column
│   ├── TaskBoard.jsx        # Main board with drag & drop
│   ├── EnergyIndicator.jsx  # Current energy zone display
│   ├── PomodoroTimer.jsx    # 25/5 Pomodoro timer
│   └── CountdownTimer.jsx   # Customizable countdown
├── utils/
│   ├── energyQuizData.js    # Quiz questions & scoring mappings
│   ├── energyScoring.js     # Profile calculation algorithms
│   ├── taskScheduler.js     # AI scheduling logic
│   ├── localStorage.js      # Data persistence functions
│   └── quotes.js           # Motivational quotes
├── App.jsx                  # Root component with routing
├── main.jsx                # React entry point
└── index.css              # Global styles & themes
```

## 🛠️ Tech Stack

- **React 18** - UI library with hooks
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **DND Kit** - Drag & drop functionality
- **Lucide React** - Icon library
- **LocalStorage API** - Data persistence

## 🚶 User Journey

### Step 1: Discover Energy Profile
1. Take the 12-question quiz
2. Get your chronotype (Morning Lark / Neutral / Night Owl)
3. See your energy curve visualization
4. Profile saves to localStorage

### Step 2: Smart Task Planning
1. Input your tasks with:
   - Energy consumption level
   - Duration
   - Priority
2. Set work hours (e.g., 6am - 10pm)
3. AI schedules tasks optimally
4. Review schedule with energy levels
5. Save to TaskBoard

### Step 3: Execute & Track
1. Open Dashboard
2. See tasks organized by energy zones
3. Use Pomodoro/Countdown timers
4. Drag & drop to reorganize
5. Complete tasks as you go

## 🧠 How AI Scheduling Works

1. **Energy Calculation**: Algorithm calculates your energy level for each hour
2. **Task Matching**:
   - High-energy tasks → Peak hours
   - Medium tasks → Moderate hours
   - Low-energy tasks → Trough hours
3. **Priority Weighting**: High-priority tasks get better slots
4. **Break Insertion**: Automatically adds breaks based on recovery speed
5. **Conflict Resolution**: Prevents overlapping tasks

## 🎨 Customization

### Quiz Questions
Edit `src/utils/energyQuizData.js` to modify questions or weights

### Scheduling Algorithm
Tweak `src/utils/taskScheduler.js` to change:
- Energy calculation formulas
- Task matching logic
- Break time rules

### Pomodoro Duration
Edit `src/components/PomodoroTimer.jsx`:
```javascript
const [minutes, setMinutes] = useState(25); // Change work time
const [breakMinutes, setBreakMinutes] = useState(5); // Change break time
```

### Theme Colors
Edit `tailwind.config.js` or `src/index.css` for custom color schemes

### Quotes
Add motivational quotes in `src/utils/quotes.js`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🌟 Key Concepts to Learn

1. **Component-Based Architecture**: Each UI piece is a reusable component
2. **Props**: Data passed from parent to child components
3. **State Management**: How data flows and updates in React
4. **Side Effects**: Operations that interact with the outside world (localStorage)
5. **Event Handling**: Responding to user interactions (clicks, drags)
6. **Conditional Rendering**: Showing/hiding UI based on state

## 🐛 Troubleshooting

**Tasks not saving?**
- Check browser console for localStorage errors
- Make sure localStorage is enabled in your browser

**Drag & drop not working?**
- Ensure you're clicking and holding (not just clicking)
- Check that the `distance: 8` activation constraint is met

**Animations choppy?**
- Reduce the number of animations
- Check if hardware acceleration is enabled

## 🚀 Deployment

### Netlify Deployment
https://subtle-dasik-0efa42.netlify.app/

## 📝 Future Ideas

- [ ] Multi-day scheduling
- [ ] Calendar integration
- [ ] Team collaboration
- [ ] Task templates
- [ ] Weekly energy reports
- [ ] Export/import data
- [ ] Mobile app (React Native)
- [ ] Browser notifications
- [ ] Sync across devices

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Share your energy profile results

## To be updated

- Customize pomodoro time
- Customize break time
- Add background music
- Add sound notifications
## 📄 License

MIT License - feel free to use this project for learning or personal use


---

**Built with ❤️ and ☕ using React, Tailwind CSS, and Framer Motion**

*Match your tasks to your energy, not your energy to your tasks* ⚡
