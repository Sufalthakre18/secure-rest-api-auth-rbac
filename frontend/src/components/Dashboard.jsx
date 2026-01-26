'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Navbar from '@/components/Navbar';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import API from '@/lib/api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchTasks();
    }
  }, [router]);

  const fetchTasks = async () => {
    try {
      const response = await API.get('/task');
      setTasks(response);
    } catch (err) {
      if (err.message.includes('401') || err.message.includes('Unauthorized')) {
        Cookies.remove('token');
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTaskSuccess = () => {
    fetchTasks();
    setEditTask(null);
  };

  const handleEdit = (task) => {
    setEditTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditTask(null);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading tasks...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Task Dashboard</h1>

          <TaskForm
            editTask={editTask}
            onSuccess={handleTaskSuccess}
            onCancel={handleCancel}
          />

          <TaskList tasks={tasks} onEdit={handleEdit} onDeleted={fetchTasks} />
        </div>
      </div>
    </>
  );
}