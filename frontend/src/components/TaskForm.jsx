'use client';

import { useState, useEffect } from 'react';
import API from '@/lib/api';

export default function TaskForm({ editTask, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title,
        description: editTask.description || '',
        status: editTask.status,
      });
    }
  }, [editTask]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (editTask) {
        await API.put(`/task/${editTask._id}`, formData);
      } else {
        await API.post('/task', formData);
      }
      setFormData({ title: '', description: '', status: 'pending' });
      onSuccess();
    } catch (err) {
      setError(err.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {editTask ? 'Edit Task' : 'Create New Task'}
      </h3>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            placeholder="Enter task title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            placeholder="Enter task description"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
          >
            {loading ? 'Saving...' : editTask ? 'Update Task' : 'Create Task'}
          </button>

          {editTask && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 bg-gray-500 text-white py-2 rounded-lg font-semibold hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}