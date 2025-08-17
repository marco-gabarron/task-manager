import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons'
import { useDeleteTask } from '../hooks/data/use-delete-tasks'
import { useUpdateTask } from '../hooks/data/use-update-task'
import Button from './Button'

const TaskItem = ({ task }) => {
  const { mutate, isPending } = useDeleteTask(task.id)

  const { mutate: updateTask } = useUpdateTask(task.id)

  const handleDeleteClick = async () => {
    mutate(undefined, {
      onSuccess: () => {
        toast.success('Task has been deleted successfully!')
      },
      onError: () => {
        toast.error('Task Deletion failed!')
      },
    })
  }

  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-brand-primary text-brand-primary'
    }
    if (task.status === 'in_progress') {
      return 'bg-brand-process text-brand-process'
    }
    if (task.status === 'not_started') {
      return 'bg-brand-dark-blue bg-opacity-5 text-brand-dark-blue'
    }
  }

  const getNewStatus = () => {
    if (task.status === 'not_started') {
      return 'in_progress'
    }
    if (task.status === 'in_progress') {
      return 'done'
    }
    return 'not_started'
  }

  const handleCheckBoxClick = () => {
    updateTask(
      {
        status: getNewStatus(),
      },
      {
        onSuccess: () => toast.success('Task status updated successfully!'),
        onError: () => 'Error while updating task status, please try again!',
      }
    )
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={handleCheckBoxClick}
          />
          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin text-brand-white" />
          )}
        </label>

        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button color="ghost" onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <LoaderIcon className="animate-spin text-brand-text-gray" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>

        <Link to={`/task/${task.id}`}>
          <DetailsIcon />
        </Link>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    time: PropTypes.oneOf(['morning', 'afternoon', 'evening']).isRequired,
    status: PropTypes.oneOf(['done', 'in_progress', 'not_started']).isRequired,
  }).isRequired,
  handleCheckBoxClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
}

export default TaskItem
