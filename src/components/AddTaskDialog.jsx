import './AddTaskDialog.css'

import PropTypes from 'prop-types'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 } from 'uuid'

import { LoaderIcon } from '../assets/icons'
import { useAddTask } from '../hooks/data/use-add-tasks'
import Button from './Button'
import Input from './Input'
import TimeSelect from './TimeSelect'

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const { mutate } = useAddTask()
  const {
    register,
    formState: { errors, isSubmitting: isLoading },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      time: 'morning',
      description: '',
    },
  })

  const nodeRef = useRef()

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: 'not_started',
    }

    // if (!title.trim() || !description.trim()) {
    //   return alert('Please fill all fields')
    // }

    mutate(task, {
      onSuccess: () => {
        handleClose()
        reset({
          title: '',
          time: 'morning',
          description: '',
        })
      },
      onError: () => toast.error('Something went wrong while adding task.'),
    })
  }

  const handleCancelClick = () => {
    reset({
      title: '',
      time: 'morning',
      description: '',
    })
    handleClose()
  }
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                New Task
              </h2>
              <p className="my-1 text-sm text-brand-text-gray">
                Insert info below
              </p>
              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[336px] flex-col space-y-4"
              >
                <Input
                  id="title"
                  label="Title"
                  placeholder="Enter Title"
                  // value={title}
                  // onChange={(event) => {
                  //   setTitle(event.target.value)
                  // }}
                  errorMessage={errors?.title?.message}
                  {...register('title', {
                    required: 'Title is required',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'Title cannot be empty'
                      }
                      return true
                    },
                  })}
                  disabled={isLoading}
                />

                <TimeSelect
                  disabled={isLoading}
                  {...register('time', { required: true })}
                />

                <Input
                  id="description"
                  label="Description"
                  placeholder="Describe Task"
                  errorMessage={errors?.description?.message}
                  // ref={descriptionRef}
                  disabled={isLoading}
                  {...register('description', {
                    required: 'Description is required',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'Description cannot be empty'
                      }
                      return true
                    },
                  })}
                />

                <div className="flex gap-3">
                  <Button
                    size="medium"
                    className="w-full"
                    color="secondary"
                    onClick={handleCancelClick}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="medium"
                    className="w-full"
                    onClick={handleSaveClick}
                    disabled={isLoading}
                    type="submit"
                  >
                    {isLoading && <LoaderIcon className="animate-spin" />}
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAddTaskSubmit: PropTypes.func.isRequired,
}

export default AddTaskDialog
