import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import useLogin from "../hooks/useLogin";

const LoginPage: React.FC = () => {
  const { register, handleSubmit, onSubmit, errors, loginError } = useLogin();

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: "16px", marginTop: "32px" }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ marginTop: "8px" }}
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              margin="dense"
              type="text"
              label="Email"
              variant="outlined"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
            <TextField
              fullWidth
              margin="dense"
              type="password"
              label="Password"
              variant="outlined"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "16px" }}
            >
              Login
            </Button>
          </form>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Not registered? <Link to="/register">Click here</Link>
          </Typography>
          {loginError && (
            <Typography color="error" sx={{ marginTop: 1 }}>
              {loginError}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
