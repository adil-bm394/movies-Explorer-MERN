import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CommentFormInputs } from "../../utils/interface/types";

interface CommentInputProps {
  movieId: string;
  isLoggedIn: boolean;
  onSubmit: (comment: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  isLoggedIn,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormInputs>();

  const handleFormSubmit = (data: CommentFormInputs) => {
    if (isLoggedIn) {
      console.log("data.comment",data.comment);
      onSubmit(data.comment);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <TextField
        label="Add Comment"
        {...register("comment", { required: "Comment is required" })}
        error={!!errors.comment}
        helperText={errors.comment ? errors.comment.message : ""}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default CommentInput;
