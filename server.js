const express = require('express');
const app = express();

// Body parser
app.use(express.json());

// 1. Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// 2. Content-Type validation for POST/PUT
app.use((req, res, next) => {
  if (['POST', 'PUT'].includes(req.method) && !req.is('application/json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json' });
  }
  next();
});

// In-memory task storage
let tasks = [];
let nextId = 1;

// 3. Task ID validation middleware
const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid task ID format' });
  req.taskId = id;
  next();
};

// GET /tasks - get all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// POST /tasks - create a task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const task = { id: nextId++, title, completed: false };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /tasks/:id - update a task
app.put('/tasks/:id', validateId, (req, res) => {
  const task = tasks.find(t => t.id === req.taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  res.status(200).json(task);
});

// DELETE /tasks/:id - delete a task
app.delete('/tasks/:id', validateId, (req, res) => {
  const index = tasks.findIndex(t => t.id === req.taskId);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  tasks.splice(index, 1);
  res.status(200).json({ message: 'Task deleted successfully' });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
});

// Global error handler (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
