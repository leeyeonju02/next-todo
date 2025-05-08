import {
  IconButton,
  ListItemText,
  Paper,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeleteIcon from "@mui/icons-material/Delete";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  // 날짜 포맷팅 (간결하게 표시)
  const formatDueDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        p: { xs: 0.5, sm: 1 }, // 모바일에서 패딩 줄임
        mb: 1,
        borderLeft: `4px solid ${todo.tag || "transparent"}`,
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden", // 가로 스크롤 방지
      }}
    >
      <IconButton
        onClick={onToggle}
        size="small" // 모바일 화면에서 아이콘 크기 줄임
        sx={{
          p: { xs: 0.5, sm: 1 },
          mr: { xs: 0, sm: 0.5 },
        }}
      >
        {todo.complete === 100 ? (
          <CheckCircleIcon color="success" fontSize="small" />
        ) : (
          <RadioButtonUncheckedIcon fontSize="small" />
        )}
      </IconButton>

      <Box
        flex="1 1 auto"
        minWidth={0} // 텍스트 오버플로우 제어를 위해 필요
        mr={1}
      >
        <ListItemText
          primary={
            <Typography
              sx={{
                textDecoration: todo.complete === 100 ? "line-through" : "none",
                color: todo.complete === 100 ? "gray" : "black",
                fontSize: { xs: "0.875rem", sm: "1rem" }, // 모바일에서 폰트 크기 줄임
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {todo.text}
            </Typography>
          }
          secondary={
            todo.dueDate && (
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" }, // 모바일에서 폰트 크기 줄임
                }}
              >
                {formatDueDate(todo.dueDate)}
              </Typography>
            )
          }
          sx={{ m: 0, p: 0 }} // 마진과 패딩 제거
        />
      </Box>

      <Box display="flex" alignItems="center" flexShrink={0}>
        {todo.complete > 0 && (
          <LinearProgress
            variant="determinate"
            value={todo.complete}
            sx={{
              width: { xs: 30, sm: 50 },
              height: 4,
              borderRadius: 3,
              mr: 0.5,
            }}
          />
        )}
        <IconButton
          onClick={onDelete}
          size="small"
          sx={{ p: { xs: 0.5, sm: 1 } }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
}
