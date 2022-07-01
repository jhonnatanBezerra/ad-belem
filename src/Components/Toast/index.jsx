import { Alert, AlertTitle, Snackbar } from '@mui/material';
import React from 'react';


export const Toast = ({initialState, updateState, message, typeMessage = "success", title = ''}) => {

  const handleClick = () => {
    updateState(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    updateState(false);
  };

    

  return (
    <Snackbar sx={{ width: '90%', background: typeMessage === 'success' ? 'rgba(46,125,50 ,1)' : 'rgba(211,47,47,1)', borderRadius: 2, margin: '0 auto'}} 
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={initialState}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={typeMessage} sx={{ width: "100%" , background:  typeMessage === 'success' ? 'rgba(46,125,50 ,0.5)' : 'rgba(211,47,47,0.5)', color: '#fff', minWidth: '50%', borderRadius: 2}}>
        <AlertTitle>{title}</AlertTitle>
         {message}
        </Alert>
      </Snackbar>

  );
}