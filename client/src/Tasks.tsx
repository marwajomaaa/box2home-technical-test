import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tasks.css'; // Assuming you have a separate CSS file
import { SocketIO_Client } from './socket';

// Define the Task interface
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string; // Adjust if necessary based on your backend response
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // Specify Task type
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const socketClient = SocketIO_Client.getInstance();
  useEffect(() => {
    socketClient.connect('http://localhost:4200');

    fetchTasks();
  }, []);
  socketClient.on('taskStatusUpdated', (data:any) => {
    console.log('Received data:', data);
    fetchTasks()
});
  const fetchTasks = async () => {
    try {
      const Token = localStorage.getItem('Token')
      const response = await axios.get<Task[]>('http://localhost:4200/tasks',{
        headers: {
          'Authorization': `Bearer ${Token}`
        }
      }); // Specify Task type
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const handleAddOrUpdateTask = async (event: React.FormEvent) => {
    const Token = localStorage.getItem('Token')

    event.preventDefault();
    const taskData = { title, description, status, dueDate };

    if (editingTaskId) {
      // Update task
      await axios.put(`http://localhost:4200/tasks/${editingTaskId}`, taskData,{
         headers: {
          'Authorization': `Bearer ${Token}`
        }
      });
    } else {
      // Create new task
      await axios.post('http://localhost:4200/tasks', taskData,{
         headers: {
          'Authorization': `Bearer ${Token}`
        }
      });
    }

    resetForm();
    fetchTasks();
  };

  const handleEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setDueDate(task.dueDate);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:4200/tasks/${id}`);
    fetchTasks();
  };

  const resetForm = () => {
    setEditingTaskId(null);
    setTitle('');
    setDescription('');
    setStatus('');
    setDueDate('');
  };

  return (
    <div className="tasks-container">
      <h1>Task Management</h1>
      <form onSubmit={handleAddOrUpdateTask}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button type="submit">{editingTaskId ? 'Update Task' : 'Add Task'}</button>
        {editingTaskId && <button onClick={resetForm}>Cancel</button>}
      </form>
      <div className="tasks-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
