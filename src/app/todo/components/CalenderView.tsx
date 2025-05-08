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
    const todosForDate = todos.filter((todo) =>
      todo.dueDate?.includes(dateString)
    );
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
        <Box sx={{ mt: 0.5, textAlign: "center" }}>
          {count > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.7rem" },
                  lineHeight: 1,
                }}
              >
                {count}개
              </Typography>
              <Typography
                variant="caption"
                color={completeRate === 100 ? "green" : "orange"}
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.7rem" },
                  lineHeight: 1,
                }}
              >
                {completeRate}%
              </Typography>
            </Box>
          )}
        </Box>
      );
    }
    return null;
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
        p: { xs: 0, sm: 1 },
      }}
    >
      <Calendar
        tileContent={renderTileContent}
        onClickDay={(value) => {
          const clickedDate = value.toISOString().split("T")[0];
          const todosForDate = todos.filter((todo) =>
            todo.dueDate?.includes(clickedDate)
          );
          alert(
            `✅ ${formatDate(clickedDate)}\n할 일: ${
              todosForDate.length
            }개\n완료: ${
              todosForDate.filter((todo) => todo.complete === 100).length
            }개`
          );
        }}
        className="custom-calendar"
        prevLabel="◀"
        nextLabel="▶"
        prev2Label={null} // 년도 이동 버튼 숨김
        next2Label={null} // 년도 이동 버튼 숨김
      />
    </Box>
  );
}
