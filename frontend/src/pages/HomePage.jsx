import React, { useEffect } from "react"
import DateTimeFilter from "@/components/DateTimeFilter"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import StatsAndFilters from "@/components/StatsAndFilters"
import TaskListPagination from "@/components/TaskListPagination"
import TaskList from "@/components/TaskList"
import AddTask from "@/components/AddTask"
import { toast } from "sonner"
import api from "@/lib/axios"
import { visibleTaskLimit } from "@/lib/data"

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = React.useState([]);
    const [activeTaskCount, setActiveTaskCount] = React.useState(0);
    const [completedTaskCount, setCompletedTaskCount] = React.useState(0);
    const [filter, setFilter] = React.useState('all');
    const [dateQuery, setDateQuery] = React.useState(null);
    const [page, setPage] = React.useState(1);

    const fetchTasks = async () => {
        try {
            const response = await api.get(`/tasks?filter=${filter}`);
            setTaskBuffer(response.data.tasks);
            setActiveTaskCount(response.data.activeCount);
            setCompletedTaskCount(response.data.completedCount);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            toast.error('Failed to fetch tasks. Please try again later.');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [dateQuery]);

    const filterTasks = taskBuffer.filter(task =>
        filter === 'all' || task.status === filter
    );

    const handleTaskChange = () => {
        fetchTasks();
    };

    const visibleTasks = filterTasks.slice(
        (page - 1) * visibleTaskLimit,
        page * visibleTaskLimit
    );

    const totalPages = Math.ceil(filterTasks.length / visibleTaskLimit); // Đưa lên đây

    const handleNext = () => {
        if (page < totalPages) setPage(prev => prev + 1);
    };
    const handlePrev = () => {
        if (page > 1) setPage(prev => prev - 1);
    };
    const handlePageSelect = (pageNumber) => {
        setPage(pageNumber);
    };



    return (
        <div className="min-h-screen w-full bg-[#fefcff] relative">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
                }}
            />
            <div className="container pt-8 mx-auto relative z-10 px-4">
                <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
                    <Header />
                    <AddTask handleNewTaskAdded={handleTaskChange} />
                    <StatsAndFilters
                        filter={filter}
                        setFilter={setFilter}
                        activeTasksCount={activeTaskCount}
                        completedTasksCount={completedTaskCount}
                    />
                    <TaskList
                        filteredTasks={visibleTasks}
                        filter={filter}
                        handleTaskChange={handleTaskChange}
                    />
                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <TaskListPagination
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            handlePageSelect={handlePageSelect}
                            page={page}
                            totalPages={totalPages}
                        />
                        <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
                    </div>
                    <Footer
                        activeTasksCount={activeTaskCount}
                        completedTasksCount={completedTaskCount}
                    />
                </div>
            </div>
        </div>
    )
};

export default HomePage;
