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
    // w-full과 max-w-full로 컨테이너가 부모 요소를 넘지 않도록 설정
    // box-border를 추가해 padding이 너비에 포함되도록 함
    <div className="p-2 sm:p-4 w-full max-w-full overflow-hidden box-border">
      <TodoTabs selectedNav={selectedNav} setSelectedNav={setSelectedNav} />
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
  );
}
