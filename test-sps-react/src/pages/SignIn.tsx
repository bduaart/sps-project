import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth.ts";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(4, "Senha obrigatória"),
});

type FormData = z.infer<typeof schema>;

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post("/auth/login", data);
      const { token } = response.data;

      setToken(token);
      navigate("/users");
    } catch (e) {
      console.error(e);
      alert("Login inválido");
    }
  };


  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            type="password"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Box mt={3}>
            <Button variant="contained" fullWidth type="submit">
              Entrar
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
