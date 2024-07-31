import React from "react";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import useRegister from "../hooks/useRegister";

const RegisterPage: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    onSubmit,
    formState: { errors },
    registrationError,
  } = useRegister();

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
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="dense"
                  type="text"
                  label="Name"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="dense"
                  type="text"
                  label="Email"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="dense"
                  type="password"
                  label="Password"
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="dense"
                  type="text"
                  label="Phone Number"
                  variant="outlined"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "16px" }}
            >
              Register
            </Button>
          </form>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Already registered? <Link to="/login">Click here</Link>
          </Typography>
          {registrationError && (
            <Typography color="error" sx={{ marginTop: 1 }}>
              {registrationError}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
