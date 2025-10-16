import React from 'react'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Calendar, CheckCircle2, Circle, SquarePen, Trash } from 'lucide-react'
import { Input } from './ui/input'
import api from '@/lib/axios'
import { toast } from 'sonner'

const TaskCard = ({ task, index, handleTaskChange }) => {
    const [isEditing, setIsEditing] = React.useState(false)
    const [editTitle, setEditTitle] = React.useState(task.title)

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`)
            toast.success("Task deleted successfully")
            handleTaskChange()
        } catch (error) {
            console.error("Error deleting task:", error)
            toast.error("Failed to delete task. Please try again.")
        }
    }

    const updateTask = async () => {
        if (!editTitle.trim()) {
            toast.error("Task name cannot be empty")
            return
        }
        try {
            await api.put(`/tasks/${task._id}`, { title: editTitle })
            toast.success("Task updated successfully")
            handleTaskChange()
        } catch (error) {
            console.error("Error updating task:", error)
            toast.error("Failed to update task. Please try again.")
        }
    }

    const toggleStatus = async () => {
        try {
            await api.put(`/tasks/${task._id}`, {
                status: task.status === 'complete' ? 'active' : 'complete',
                completedAt: task.status === 'complete' ? null : new Date()
            })
            toast.success("Task status updated")
            handleTaskChange()
        } catch (error) {
            toast.error("Failed to update status")
        }
    }

    return (
        <Card
            className={cn(
                "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
                task.status === 'complete' && "opacity-50"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className='flex items-center gap-4'>
                <Button
                    variant='ghost'
                    size='icon'
                    className={cn(
                        "flex-shrink-0 size-8 rounded-full transition-all duration-200",
                        task.status === 'complete'
                            ? "text-success hover:text-success/80"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={toggleStatus}
                >
                    {task.status === 'complete' ? <CheckCircle2 className='size-5' /> : <Circle className='size-5' />}
                </Button>

                <div className='flex-1 min-w-0'>
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <Input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                onBlur={() => { updateTask(); setIsEditing(false) }}
                                onKeyDown={(e) => { if (e.key === 'Enter') { updateTask(); setIsEditing(false) } }}
                                autoFocus
                                className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20'
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => { setEditTitle(task.title); setIsEditing(false) }}
                            >
                                Hủy
                            </Button>
                        </div>
                    ) : (
                        <p
                            className={cn(
                                "text-base transition-all duration-200",
                                task.status === 'complete' ? "line-through text-muted-foreground" : "text-foreground"
                            )}
                        >
                            {task.title}
                        </p>
                    )}

                    <div className='flex items-center gap-2 mt-1'>
                        <Calendar className='size-3 text-muted-foreground' />
                        <span className='text-xs text-muted-foreground'>
                            {new Date(task.createdAt).toLocaleString()}
                        </span>
                        {task.completedAt && (
                            <>
                                <span className='mx-1 text-xs text-muted-foreground'>·</span>
                                <Calendar className='size-3 text-muted-foreground' />
                                <span className='text-xs text-muted-foreground'>
                                    {new Date(task.completedAt).toLocaleString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
                    <Button
                        variant='ghost'
                        size='icon'
                        className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info'
                        onClick={() => setIsEditing(true)}
                    >
                        <SquarePen className='size-4' />
                    </Button>

                    <Button
                        variant='ghost'
                        size='icon'
                        className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive'
                        onClick={() => deleteTask(task._id)}
                    >
                        <Trash className='size-4' />
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default TaskCard
