import { CloudSunIcon, MoonIcon, SunIcon } from '../assets/icons'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import Header from './Header'
import TaskItem from './TaskItem'
import TasksSeparator from './TasksSeparator'

const Tasks = () => {
  const { data: tasks } = useGetTasks()

  const morningTasks = tasks?.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks?.filter((task) => task.time === 'evening')

  // const onDeleteTaskSuccess = async (taskId) => {
  //   queryClient.setQueryData('tasks', (currentTasks) => {
  //     return currentTasks.filter((task) => task.id != taskId)
  //   })
  //   toast.success('Task Deleted Successfully!')
  // }

  // const handleTaskCheckBoxClick = (taskId) => {
  //   updateTask({ taskId })
  //   const newTasks = tasks.map((task) => {
  //     if (task.id != taskId) {
  //       return task
  //     }

  //     if (task.status === 'not_started') {
  //       toast.success('Task Started Successfully!')
  //       return { ...task, status: 'in_progress' }
  //     }
  //     if (task.status === 'in_progress') {
  //       toast.success('Task Completed Successfully!')
  //       return { ...task, status: 'done' }
  //     }
  //     if (task.status === 'done') {
  //       toast.success('Task Restarted Successfully!')
  //       return { ...task, status: 'not_started' }
  //     }

  //     return task
  //   })
  //   queryClient.setQueryData(taskQueryKeys.getAll(), newTasks)
  // }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header subtitle="My Tasks" title="My Tasks" />
      {/* Tasks List */}
      <div className="rounded-xl bg-white p-6">
        {/* Morning */}
        <div className="space-y-3">
          <TasksSeparator title="Morning" icon={<SunIcon />} />
          {morningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              No tasks added to Morning
            </p>
          )}
          {/* List Morning Tasks */}
          {morningTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
        {/* Afternoon */}
        <div className="my-6 space-y-3">
          <TasksSeparator title="Afternoon" icon={<CloudSunIcon />} />
          {afternoonTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              No tasks added to Afternoon
            </p>
          )}
          {/* List Afternoon Tasks */}
          {afternoonTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
        {/* Night */}
        <div className="space-y-3">
          <TasksSeparator title="Evening" icon={<MoonIcon />} />
          {eveningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              No tasks added to Evening
            </p>
          )}
          {/* List Night Tasks */}
          {eveningTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Tasks
