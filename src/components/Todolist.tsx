"use client"
import { FormButton } from './FormButton';
import { create, deleteTodo, edit, todoStatus } from '@/utils/action';

interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

interface Props {
    todos: Todo[] | null;
}

const TodoList: React.FC<Props> = ({ todos }) => {

    return (
        <div>

            <div className="h-100 w-full flex items-center justify-center  font-sans">
                <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                    <div className="mb-4">
                        <h1 className="text-grey-darkest">Todo List / CRUD </h1>
                        <form action={create} className="flex mt-4">
                            <input required name='input' className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
                            <FormButton classNames="flex-no-shrink p-2 border-2 rounded  border-green-500 hover:text-white text-green-500 hover:bg-green-500">Add</FormButton>
                        </form>
                    </div>
                    <div>

                        {todos?.map(({ id, task, completed }) => (
                            <div key={id} className={`flex mb-4 items-center`} >
                                {completed && <p className={`w-full text-grey-darkest line-through`}>{task}</p>}

                                {!completed && (<>
                                    <form action={edit} className="flex mt-4">
                                        <input name='inputId' value={id} hidden />
                                        <input className={`w-full text-grey-darkest ${completed && 'line-through'}`} name='newTitle'  defaultValue={task} />
                                        <FormButton classNames="flex-no-shrink p-2 ml-2 border-2 rounded text-yellow-500 border-yellow-500 hover:text-white hover:bg-yellow-500">Edit</FormButton>
                                    </form>
                                    <form action={todoStatus} className="flex mt-4">
                                        <input name='inputId' value={id} hidden />
                                        <FormButton classNames="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-500">Done</FormButton>
                                    </form>
                                </>)}
                                <form action={deleteTodo} className="flex mt-4">
                                    <input name='inputId' value={id} hidden />
                                    <FormButton classNames="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500">Remove</FormButton>
                                </form>
                            </div>
                        ))}



                    </div>
                </div>
            </div>
        </div>

    );
};

export default TodoList;
