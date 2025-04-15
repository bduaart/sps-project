import {
  Avatar,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  Select, MenuItem, FormControl, InputLabel
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../components/Header.tsx";

type User = {
  id: string;
  name: string;
  email: string;
  type: "admin" | "user";
  password?: string;
};

export default function UserView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get(`/user/${id}`);
      setUser(res.data);
    } catch {
      alert("Erro ao buscar usuário");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (field: keyof User, value: string) => {
    if (!user) return;
    setUser({ ...user, [field]: value });
  };

  const handleSave = async () => {
    try {
      await api.put(`/user/${user?.id}`, user);
      alert("Usuário atualizado com sucesso!");
      setEditing(false);
    } catch {
      alert("Erro ao atualizar usuário");
    }
  };

  if (loading || !user) return <CircularProgress />;

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Paper sx={{ p: 3, mt: 4 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <IconButton onClick={() => navigate("/users")}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" ml={1}>
              Detalhes do Usuário
            </Typography>
            <Box flexGrow={1} />
            <IconButton
              onClick={() => (editing ? handleSave() : setEditing(true))}
            >
              {editing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </Box>

          <Box display="flex" justifyContent="center" mb={3}>
            <Avatar sx={{ width: 64, height: 64 }}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
          </Box>

          <TextField
            label="Nome"
            fullWidth
            value={user.name}
            margin="normal"
            disabled={!editing}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <TextField
            label="Email"
            fullWidth
            value={user.email}
            margin="normal"
            disabled={!editing}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <FormControl fullWidth margin="normal" disabled={!editing}>
            <InputLabel id="tipo-label">Tipo</InputLabel>
            <Select
                labelId="tipo-label"
                value={user.type}
                label="Tipo"
                onChange={(e) => handleChange("type", e.target.value as "admin" | "user")}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">Usuário</MenuItem>
            </Select>
          </FormControl>

        </Paper>
      </Container>
    </>
  );
}
