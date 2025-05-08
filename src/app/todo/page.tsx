"use client";
import { useTodo } from "./hooks/useTodo";
import TodoTabs from "./components/TodoTabs";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import CalendarView from "./components/CalenderView";

export default function TodoPage() {
  const {
    input,
    setInput,
    addTodo,
    toggleComplete,
    deleteTodo,
    selectedNav,
    setSelectedNav,
    filteredTodos,
  } = useTodo();

  return (
    <div className="w-full max-w-full box-border overflow-hidden flex flex-col">
      <div className="w-full">
        <TodoTabs selectedNav={selectedNav} setSelectedNav={setSelectedNav} />
      </div>
      <div className="w-full px-1 sm:px-4">
        <TodoInput input={input} setInput={setInput} addTodo={addTodo} />
        {selectedNav === 4 ? (
          <CalendarView todos={filteredTodos} />
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={toggleComplete}
            onDelete={deleteTodo}
          />
        )}
      </div>
    </div>
  );
}
