import Task from '../models/Task.js'


export async function createTask(req, res) {
    try {
        const { title, description } = req.body

        const task = await Task.create({
            title,
            description,
            user: req.user.id,
        })

        res.status(201).json({
            message: 'Task created successfully',
            task,
        })
    } catch (error) {
        console.error("Error",error)
        res.status(500).json({ message: 'Server error to create task' })
    }
}

export async function getTasks(req, res) {
    try {
        const tasks = await Task.find({ user: req.user.id })
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ message: 'Server error to get all tasks' })
    }
}


export async function getTaskById(req, res) {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id,
        })

        if (!task) return res.status(404).json({ message: 'Task not found' })
        

        res.json(task)
    } catch (error) {
        res.status(500).json({ message: 'Server error to get task ' })
    }
}

export async function updateTask(req, res) {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }
        )

        if (!task) {
            return res.status(404).json({ message: 'Task not found' })
        }

        res.json({
            message: 'Task updated successfully',
            task,
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error to update task' })
    }
}

export async function deleteTask(req, res) {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        })

        if (!task) {
            return res.status(404).json({ message: 'Task not found' })
        }

        res.json({ message: 'Task deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Server error to delete task' })
    }
}
