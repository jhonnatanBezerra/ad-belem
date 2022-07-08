import {  Backdrop, Button, CircularProgress, DialogActions, Fade, Box,  Modal,  Stack, TextField, Typography, } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { AuthContext } from '../../services/context';
import Logo from '../../assets/logo.png';
import { Toast } from '../../Components/Toast';
import {CaretLeft} from 'phosphor-react'
import { api } from '../../services/api';



export const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [showToast, setShowToast] = React.useState(false);
  const [toastConfig, setToastConfig] = React.useState({
    title: '',
    message: '',
    type: '',
  });

  const [open, setOpen] = useState(false);

 

  const handleSubmit = async (e) => {
    try {

      e.preventDefault();
      setLoading(true);
      const user ={
        name,
        email,
        password
      }


      const {data, status} = await api.post('/register', user);

      if(status === 201){
        console.log(data)
        setToastConfig({ title: data.status,  message: data.message, type: 'success', });
        setOpen(true);
        setShowToast(true)
       
      }
      
    } catch (error) {
      
      if(error.response.status === 401){
        setToastConfig({ title: 'Error',  message: 'E-mail ou senha incorreto', type: 'error', });
      }else{
        setToastConfig({title: 'Error', message: error.message, type: 'error'});
       
      }

      setShowToast(true)

    }finally{
      setLoading(false);
    }
  }

  const handleBack = () => {
    navigate('/login');
  }


  return (
    <div style={{width: '100%', height: '100vh',  display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'url(https://sisecf.com/img/intro-bg.webp)', backgroundRepeat: 'no-repeat', objectFit: 'contain'}}>
    
     <ModalAlert showToast={showToast} setShowToast={setShowToast} toastConfig={toastConfig}  open={open} handleClose={handleBack}  />
     
      
      <div style={{width: '25%', minWidth: '350px', height: '75%', background: '#FFF', borderRadius: 8, display: 'flex', justifyContent: 'center',  flexDirection: 'column', boxShadow: '10px 0px 50px rgba(0, 0, 0, 0.5)'}}>
        
        <form onSubmit={handleSubmit}>
          <Stack justifyContent={'center'} alignItems={"center"} spacing={2} px={3}>
            <h4 style={{textAlign: 'center'}}>Assembléia de Deus  Ministerio de Belem</h4>
            <img src={Logo} style={{width: '70%',  objectFit: 'contain'}} alt="logo application"  />

            <TextField  fullWidth  label="Nome de usúario" value={name} onChange={e=> setName(e.target.value)} variant="outlined" />
            <TextField  fullWidth  label="E-mail" value={email} onChange={e=> setEmail(e.target.value)} variant="outlined" />
            <TextField  fullWidth  label="Senha" value={password} onChange={e=> setPassword(e.target.value)} variant="outlined" />
          
            <Button disabled={loading ? true : false}  size='large' type='submit' fullWidth variant="contained">{loading ? <CircularProgress size={28} color="inherit" /> : 'Registrar'}</Button> 
          
            <Button sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Link to={'/login'}>Fazer login</Link>
            </Button>
            

          </Stack>
        </form>

      </div>

    </div>

  );
}

const ModalAlert = ({open, handleClose, showToast, setShowToast, toastConfig }) =>{
  return(
    <>
      {/* <Toast initialState={showToast} updateState={setShowToast} message={toastConfig.message} typeMessage={toastConfig.type} title={toastConfig.title} /> */}
   
      <Modal
      open={open}
      // onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{timeout: 500, }} >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Sucesso !
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Novo usuario cadastrado com sucesso !!!
            </Typography>

            <DialogActions sx={{ justifyContent: 'end', flex: 1, height: '100%'}}>
              <Button variant='contained' size='large' sx={{px: 5}} onClick={handleClose}>Login</Button>
          </DialogActions>
          </Box>
        </Fade>
      </Modal> 
    </>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderradious: 10,
  boxShadow: 24,
  px: 4 ,
  py: 2
};


