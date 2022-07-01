import {  Button, CircularProgress, FormControl, InputLabel, OutlinedInput, Stack, TextField, } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { AuthContext } from '../../services/context';
import Logo from '../../assets/logo.png';
import { Toast } from '../../Components/Toast';


export const Login = () => {

  const navigate = useNavigate();
  const {handleLogin, autenticated} = useContext(AuthContext);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [showToast, setShowToast] = React.useState(false);
  const [toastConfig, setToastConfig] = React.useState({
    title: '',
    message: '',
    type: '',
  });

  useEffect(() => {
    if(autenticated){
      navigate('/');
    }
  }, [autenticated]);


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await handleLogin(email, password);
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


  return (
    <div style={{width: '100%', height: '100vh',  display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'url(https://sisecf.com/img/intro-bg.webp)', backgroundRepeat: 'no-repeat', objectFit: 'contain'}}>
     
     <Toast initialState={showToast} updateState={setShowToast} message={toastConfig.message} typeMessage={toastConfig.type} title={toastConfig.title} />
      
      <div style={{width: '25%', minWidth: '350px', height: '70%', background: '#FFF', borderRadius: 8, display: 'flex', justifyContent: 'center',  flexDirection: 'column', boxShadow: '10px 0px 50px rgba(0, 0, 0, 0.5)'}}>
        
        <form onSubmit={handleSubmit}>
          <Stack justifyContent={'center'} alignItems={"center"} spacing={2} px={3}>
            <h4 style={{textAlign: 'center'}}>Assembléia de Deus  Ministerio de Belem</h4>
            <img src={Logo} style={{width: '70%',  objectFit: 'contain'}} alt="logo application"  />

            <TextField required fullWidth  label="E-mail" value={email} onChange={e=> setEmail(e.target.value)} variant="outlined" />
            <TextField required fullWidth  type={'password'} label="Senha" value={password} onChange={e=> setPassword(e.target.value)} variant="outlined" />
          
            <Button disabled={loading ? true : false}  size='large' type='submit' fullWidth variant="contained">{loading ? <CircularProgress size={28} color="inherit" /> : 'Entrar'}</Button> 
          
            <Button ><Link to={'/register'}>Esqueci minha senha</Link></Button>
            <Button><Link to={'/register'}>Registrar novo usuário</Link></Button>

          </Stack>
        </form>

      </div>

    </div>

  );
}

