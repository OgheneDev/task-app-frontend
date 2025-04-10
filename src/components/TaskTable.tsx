import { Task } from '@/types/types'
import { Trash2, Edit2, Clock, Tag, AlertCircle } from 'lucide-react'

interface TaskTableProps {
  tasks: Task[]
  onDelete: (id: string) => void
  onEdit: (task: Task) => void
}

const TaskTable = ({ tasks, onDelete, onEdit }: TaskTableProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-orange-100 text-orange-800'
      case 'low': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden  rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-4 text-left text-sm font-semibold text-gray-900">Title & Description</th>
                  <th className="px-3 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-3 py-4 text-left text-sm font-semibold text-gray-900">Priority</th>
                  <th className="px-3 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-3 py-4 text-left text-sm font-semibold text-gray-900">Due Date</th>
                  <th className="px-3 py-4 text-left text-sm font-semibold text-gray-900">Tags</th>
                  <th className="px-3 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {tasks.map((task) => (
                  <tr key={task._id} className="">
                    <td className="px-3 py-4">
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                    </td>
                    <td className="px-3 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        task.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        <div className="h-1.5 w-1.5 rounded-full mr-1.5 ${
                          task.status === 'completed' ? 'bg-green-600' : 
                          task.status === 'in-progress' ? 'bg-yellow-600' : 
                          'bg-gray-600'
                        }" />
                        {task.status}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">{task.category}</td>
                    <td className="px-3 py-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1.5" />
                        {new Date(task.dueDate).toLocaleDateString()}
                        <span className="ml-1.5">{task.dueTime}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex flex-wrap gap-1">
                        {task.tags.map((tag, index) => (
                          <span key={index} className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => onEdit(task)}
                          className="text-blue-600 hover:text-blue-900 cursor-pointer"
                          title="Edit task"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => onDelete(task._id)}
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                          title="Delete task"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskTable
