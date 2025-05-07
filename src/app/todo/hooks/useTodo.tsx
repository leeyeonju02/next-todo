"use client";
import { useState, useEffect } from "react";
import { Todo } from "../types/todo";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo as deleteTodoApi,
} from "@/lib/api/todoApi";

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");
  const [selectedNav, setSelectedNav] = useState(0);

  const addTodo = async (
    text: string,
    dueDate: string | null,
    tag: string | null
  ) => {
    const newTodo: Omit<Todo, "id"> = {
      text,
      complete: 0,
      dueDate,
      tag,
    };

    try {
      const createdTodo = await createTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  const toggleComplete = (id: number): void => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, complete: todo.complete === 100 ? 0 : 100 }
          : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    deleteTodoApi(id).catch((error) =>
      console.error("Failed to delete todo:", error)
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (selectedNav === 0) return true; // All
    if (selectedNav === 1) return isToday(todo.dueDate); // Today
    if (selectedNav === 2) return todo.complete === 100; // Check
    if (selectedNav === 3) return todo.tag !== null; // Tag 있는 항목만
    return true;
  });

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosFromApi = await fetchTodos();
        setTodos(todosFromApi);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    loadTodos();
  }, []);

  return {
    todos,
    input,
    setInput,
    addTodo,
    toggleComplete,
    deleteTodo,
    selectedNav,
    setSelectedNav,
    filteredTodos,
  };
}

function isToday(date?: string | null) {
  if (!date) return false;
  const today = new Date().toISOString().split("T")[0];
  return date === today;
}
