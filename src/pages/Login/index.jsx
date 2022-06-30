import {  Button, FormControl, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { AuthContext } from '../../services/context';


export const Login = () => {

  const navigate = useNavigate();
  const {handleLogin, autenticated} = useContext(AuthContext);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(autenticated){
      navigate('/');
    }
  }, [autenticated]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
  }


  return (
    <div style={{width: '100%', height: '100vh',  display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'url(https://sisecf.com/img/intro-bg.webp)', backgroundRepeat: 'no-repeat', objectFit: 'contain'}}>

      <div style={{width: '25%', minWidth: '350px', height: '70%', background: '#FFF', borderRadius: 8, display: 'flex', justifyContent: 'center',  flexDirection: 'column', boxShadow: '10px 0px 50px rgba(0, 0, 0, 0.5)'}}>
        
        <form onSubmit={handleSubmit}>
          <Stack justifyContent={'center'} alignItems={"center"} spacing={2} px={3}>
            <h4 style={{textAlign: 'center'}}>Assembléia de Deus  Ministerio de Belem</h4>
            <img src="http://ad.org.br/wp-content/uploads/2022/06/Logo_AD-Belem_Banner_Site.png" style={{width: '70%',  objectFit: 'contain'}} alt="logo application"  />

            <TextField fullWidth label="Usuário" value={email} onChange={e=> setEmail(e.target.value)} variant="outlined" />
            <TextField fullWidth label="Senha" value={password} onChange={e=> setPassword(e.target.value)} variant="outlined" />
          
            <Button size='large' type='submit' fullWidth variant="contained">Entrar</Button> 
          
            <Button ><Link to={'/register'}>Esqueci minha senha</Link></Button>
            <Button><Link to={'/register'}>Registrar novo usuário</Link></Button>

          </Stack>
        </form>

      </div>

    </div>

  );
}

