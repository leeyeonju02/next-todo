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
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1,
        p: 1,
        mb: 1,
        borderLeft: `4px solid ${todo.tag || "transparent"}`,
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <IconButton onClick={onToggle}>
        {todo.complete === 100 ? (
          <CheckCircleIcon color="success" />
        ) : (
          <RadioButtonUncheckedIcon />
        )}
      </IconButton>

      <Box flex="1 1 0" minWidth={0}>
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
          secondary={
            todo.dueDate && (
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "150px",
                }}
              >
                마감일: {todo.dueDate}
              </Typography>
            )
          }
        />
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        {todo.complete > 0 && (
          <LinearProgress
            variant="determinate"
            value={todo.complete}
            sx={{ width: { xs: 40, sm: 50 }, height: 6, borderRadius: 3 }}
          />
        )}
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}
