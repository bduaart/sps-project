import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Paper,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserSchema,
  CreateUserForm,
} from "../validators/createUserSchema";
import Header from "../components/Header.tsx";
type User = {
  id: string;
  name: string;
  email: string;
  type: string;
};

type PaginatedUserResponse = {
  items: User[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
  });

  const handleOpenDelete = (user: User) => {
    setUserToDelete(user);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/user/${userToDelete?.id}`);
      setSnackbar({
        open: true,
        message: "Usuário removido com sucesso!",
        severity: "success",
      });
      setUserToDelete(null);
      fetchUsers(page);
    } catch (e: any) {
      const status = e?.response?.status;

      let message = "Erro ao remover usuário";

      if (status === 400 ) {
        message = e.response.data.message;
      }
      if (status === 403) {
        message =
          "Você não tem permissão para remover usuários. Apenas admnistradores podem remover usuários.";
      } else if (status === 401) {
        message = "Sessão expirada. Faça login novamente.";
      }

      setSnackbar({
        open: true,
        message,
        severity: "error",
      });
    }
  };

  const fetchUsers = async (page: number) => {
    try {
      setLoading(true);
      const res = await api.get<PaginatedUserResponse>(
        `/user?page=${page}&pageSize=${pageSize}`,
      );

      setUsers(res.data.items);
      setTotal(res.data.pagination.total);
    } catch (error) {
      console.log(error);
      alert("Erro ao buscar usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Paper sx={{ p: 3, mt: 4 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Button variant="contained" onClick={() => setOpen(true)}>
              + Novo Usuário
            </Button>
          </Box>

          <Typography variant="h5" gutterBottom>
            Usuários
          </Typography>

          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <List>
                {users.map((user) => (
                  <ListItem
                    key={user.id}
                    secondaryAction={
                      <Box display="flex" gap={1}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate(`/users/${user.id}`)}
                        >
                          Ver
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleOpenDelete(user)}
                        >
                          Excluir
                        </Button>
                      </Box>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user.name} (${user.type})`}
                      secondary={user.email}
                    />
                  </ListItem>
                ))}
              </List>

              <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                />
                <Box mt={1} textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    Exibindo {users.length} de {total} usuários
                  </Typography>
                </Box>
              </Box>
            </>
          )}
          <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
            <DialogTitle>Novo Usuário</DialogTitle>
            <form
              onSubmit={handleSubmit(async (data) => {
                try {
                  await api.post("/user", data);
                  setSnackbar({
                    open: true,
                    message: "Usuário criado com sucesso!",
                    severity: "success",
                  });
                  setOpen(false);
                  reset();
                  fetchUsers(page);
                } catch(e: any) {
                  console.log(e);
                  const status = e?.response?.status;

                  let message = "Erro ao criar usuário";

                  if (status === 400 ) {
                    message = e.response.data.message;
                  }
                  setSnackbar({
                    open: true,
                    message: message,
                    severity: "error",
                  });
                }
              })}
            >
              <DialogContent>
                <TextField
                  fullWidth
                  label="Nome"
                  margin="normal"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  fullWidth
                  label="Senha"
                  margin="normal"
                  type="password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="type-label">Tipo</InputLabel>
                  <Select
                    labelId="type-label"
                    label="Tipo"
                    defaultValue=""
                    {...register("type")}
                    error={!!errors.type}
                  >
                    <MenuItem value="user">Usuário</MenuItem>
                    <MenuItem value="admin">Administrador</MenuItem>
                  </Select>
                  {errors.type && (
                    <Typography variant="caption" color="error">
                      {errors.type.message}
                    </Typography>
                  )}
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancelar</Button>
                <Button type="submit" variant="contained">
                  Salvar
                </Button>
              </DialogActions>
            </form>
          </Dialog>
          <Dialog open={!!userToDelete} onClose={() => setUserToDelete(null)}>
            <DialogTitle>Remover usuário</DialogTitle>
            <DialogContent>
              <Typography>
                Tem certeza que deseja excluir o usuário{" "}
                <strong>{userToDelete?.name}</strong>?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setUserToDelete(null)}>Cancelar</Button>
              <Button
                onClick={handleConfirmDelete}
                variant="contained"
                color="error"
              >
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
          </Snackbar>
        </Paper>
      </Container>
    </>
  );
}
