import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../../styles/custom-calendar.css";
import { Todo } from "../types/todo";
import { Box, Typography } from "@mui/material";

interface CalendarViewProps {
  todos: Todo[];
}

export default function CalendarView({ todos }: CalendarViewProps) {
  // 날짜별 통계 계산
  const getTodosByDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    const todosForDate = todos.filter((todo) => todo.dueDate === dateString);
    return todosForDate;
  };

  const renderTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const todosForDate = getTodosByDate(date);
      const count = todosForDate.length;
      const completedCount = todosForDate.filter(
        (todo) => todo.complete === 100
      ).length;
      const completeRate =
        count > 0 ? Math.round((completedCount / count) * 100) : 0;

      return (
        <Box sx={{ mt: 1, textAlign: "center" }}>
          {count > 0 && (
            <>
              <Typography variant="caption">{count}개</Typography>
              <Typography
                variant="caption"
                color={completeRate === 100 ? "green" : "orange"}
              >
                {completeRate}%
              </Typography>
            </>
          )}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "100%" }}>
      <Calendar
        tileContent={renderTileContent}
        onClickDay={(value) => {
          const clickedDate = value.toISOString().split("T")[0];
          const todosForDate = todos.filter(
            (todo) => todo.dueDate === clickedDate
          );
          alert(
            `✅ ${clickedDate}\n할 일: ${todosForDate.length}개\n완료: ${
              todosForDate.filter((todo) => todo.complete === 100).length
            }개`
          );
        }}
        className="custom-calendar" // ✅ 클래스네임 추가
      />
    </Box>
  );
}
