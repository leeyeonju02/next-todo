import {
  IconButton,
  ListItemText,
  Paper,
  Typography,
  Box,
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
  return (
    <Paper sx={{ display: "flex", alignItems: "center", p: 1, mb: 1 }}>
      <IconButton onClick={onToggle}>
        {todo.complete === 100 ? (
          <CheckCircleIcon color="success" />
        ) : (
          <RadioButtonUncheckedIcon />
        )}
      </IconButton>
      <Box flex="1">
        <ListItemText
          primary={
            <Typography
              sx={{
                textDecoration: todo.complete === 100 ? "line-through" : "none",
                color: todo.complete === 100 ? "gray" : "black",
              }}
            >
              {todo.text}
            </Typography>
          }
          secondary={`완료도: ${todo.complete}% / 마감일: ${
            todo.dueDate ?? "마감일 없음"
          } / 태그: ${todo.tag ?? "태그 없음"}`}
        />
      </Box>
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
}
