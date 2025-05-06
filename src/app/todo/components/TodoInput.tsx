import { TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface TodoInputProps {
  input: string;
  setInput: (value: string) => void;
  onAdd: () => void;
}

export default function TodoInput({ input, setInput, onAdd }: TodoInputProps) {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
        size="small"
        placeholder="할 일을 입력하세요"
      />
      <IconButton onClick={onAdd}>
        <AddIcon />
      </IconButton>
    </div>
  );
}
