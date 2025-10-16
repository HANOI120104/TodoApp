import Task from '../models/Task.js';

const getAllTasks = async (req, res) => {
    const { filter = 'today' } = req.query;
    const now = new Date();
    let startDate;

    switch (filter) {
        case 'today':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        case 'week':
            const mondayDate =
                now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
            break;
        case 'month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'all':
        default:
            startDate = null;
            break;
    }

    const query = startDate ? { createdAt: { $gte: startDate } } : {};

    try {
        const result = await Task.aggregate([
            { $match: query },
            {
                $facet: {
                    tasks: [{ $sort: { createdAt: -1 } }],
                    activeCount: [{ $match: { status: 'active' } }, { $count: 'count' }],
                    completedCount: [{ $match: { status: 'complete' } }, { $count: 'count' }]
                }
            }
        ]);

        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0] ? result[0].activeCount[0].count : 0;
        const completedCount = result[0].completedCount[0] ? result[0].completedCount[0].count : 0;
        console.log(result);
        res.status(200).json({ tasks, activeCount, completedCount });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Error fetching tasks" });
    }
};


const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title });
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Error creating task" });
    }
}

const updateTask = async (req, res) => {
    try {
        const { title, status, completedAt } = req.body;
        const updateTask = await Task.findByIdAndUpdate(req.params.id, { title, status, completedAt }, { new: true });
        if (!updateTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updateTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Error updating task" });
    }

}

const deleteTask = async (req, res) => {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
        return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
}

export { getAllTasks, createTask, updateTask, deleteTask };