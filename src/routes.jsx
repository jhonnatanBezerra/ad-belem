import { useContext, useEffect } from "react";
import {  Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "./Components/Header";
import { ListagemDeMembros } from "./pages/ListagemDeMembros";
import { NovoMembro } from "./pages/NovoMembro";
import { Login } from "./pages/Login";
import { EditarMembro } from "./pages/EditarMembro";
import {AuthContext, AuthProvider} from './services/context';

const routesNotHeader = ['/login'];

export const AppRoutes = () => {

  const { autenticated } = useContext(AuthContext);
  const {pathname} = useLocation(); 

  const Private = ({children}) => {
    const {autenticated, loading} = useContext(AuthContext);


    if(loading){
      return <div>Você não tem acesso a essa página...</div>
    }

    if(!autenticated){
      return <Navigate to="/login" />
    }

    return children;


  }




  return (
    <>

     <AuthProvider>

     
     {!routesNotHeader.includes(pathname) && <Header />  }
     
        <Routes>
          <Route path="/login" element={ <Login />} />
          <Route path="/" exact element={<Private><ListagemDeMembros /></Private>} />
          <Route path="/novo" exact element={<Private><NovoMembro /></Private>} />
          <Route path="/editar:id" exact element={<Private><EditarMembro /></Private>} />
        </Routes>
      </AuthProvider>
    
    </>
  )
}

