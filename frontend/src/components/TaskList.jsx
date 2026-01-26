'use client';

import API from '@/lib/api';

export default function TaskList({ tasks, onEdit, onDeleted }) {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await API.delete(`/task/${id}`);
        onDeleted();
      } catch (err) {
        alert(err.message || 'Failed to delete task');
      }
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-xl font-semibold text-gray-900">No tasks yet</h3>
        <p className="mt-1 text-gray-500">Get started by creating your first task!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Your Tasks ({tasks.length})
      </h3>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-semibold text-gray-800">{task.title}</h4>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                  task.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {task.status}
              </span>
            </div>

            {task.description && (
              <p className="text-gray-600 mb-3">{task.description}</p>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(task)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}