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
  ) => {
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
       data-testid="the-snackbar"
        sx={{
          backgroundColor: "grey",
          "& .MuiSnackbarContent-root": {
            backgroundColor: "secondary !important",
          },
        }}
        open={open}
        autoHideDuration={6000}
        onClick={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
};

export default TheSnackbar;
