import { Todo } from "@/app/todo/types/todo";

const BASE_URL = "https://todo-back-bawp.onrender.com/todos";

/**
 * 모든 Todo 가져오기
 */
export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`서버 오류: ${res.status}`);
  return res.json();
};

/**
 * 새로운 Todo 추가
 * @param newTodo - 추가할 todo (id 제외)
 */
export const createTodo = async (
  newTodo: Omit<Todo, "id" | "complete">
): Promise<Todo> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  if (!res.ok) throw new Error(`생성 실패: ${res.status}`);
  return res.json();
};

/**
 * Todo 수정 (complete, text, dueDate, tag 수정 가능)
 * @param id - 수정할 todo id
 * @param updates - 수정할 데이터
 */
export const updateTodo = async (
  id: number,
  updates: Partial<Omit<Todo, "id">>
): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error(`수정 실패: ${res.status}`);
  return res.json();
};

/**
 * Todo 삭제
 * @param id - 삭제할 todo id
 */
export const deleteTodo = async (id: number): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`삭제 실패: ${res.status}`);
};
