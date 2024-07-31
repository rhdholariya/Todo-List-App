import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";

export interface Todo {
  _id: string;
  task: string;
  isCompleted: boolean;
}

export interface ModalState {
  show: boolean;
  data: string | null;
}

interface TodoContextType {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  showRemoveModal: ModalState;
  setShowRemoveModal: Dispatch<SetStateAction<ModalState>>;
}

const defaultTodoContext: TodoContextType = {
  todos: [],
  setTodos: () => {},
  showRemoveModal: { show: false, data: null },
  setShowRemoveModal: () => {}
};

export const ModelContext = createContext<TodoContextType>(defaultTodoContext);

export function TodoContextProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showRemoveModal, setShowRemoveModal] = useState<ModalState>({
    show: false,
    data: null,
  });

  return (
    <ModelContext.Provider value={{ todos, setTodos, showRemoveModal, setShowRemoveModal }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useTodoContext() {
  return useContext(ModelContext);
}
