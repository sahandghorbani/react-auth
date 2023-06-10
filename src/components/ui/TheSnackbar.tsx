import { useState, useEffect, SyntheticEvent } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface TheSnackbarProps {
  message: string | null;
}

const TheSnackbar: React.FC<TheSnackbarProps> = ({ message }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message != null) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = (
    _event: SyntheticEvent<Element, Event>,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        sx={{
          backgroundColor: "grey",
          "& .MuiSnackbarContent-root": {
            backgroundColor: "secondary !important",
          },
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
};

export default TheSnackbar;
