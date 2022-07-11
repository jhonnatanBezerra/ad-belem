import { useContext, useEffect } from "react";
import {  Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "./Components/Header";
import { ListagemDeMembros } from "./pages/ListagemDeMembros";
import { NovoMembro } from "./pages/NovoMembro";
import { Login } from "./pages/Login";
import { EditarMembro } from "./pages/EditarMembro";
import { DetalhesMembro } from "./pages/DetalhesMembros";
import {AuthContext, AuthProvider} from './services/context';
import { Register } from "./pages/Register";

const routesNotHeader = ['/login', '/register'];

export const AppRoutes = () => {

  const {pathname} = useLocation(); 

  const Private = ({children}) => {
    const {autenticated, loading} = useContext(AuthContext);


    if(loading){
      return 
    }

    if(!autenticated){
      return <Navigate to="/login" />
    }

    return children;


  }

  console.log('pathname', pathname);



  return (
    <>

      <AuthProvider>

     
     {!routesNotHeader.includes(pathname) && <Header />  }
     
        <Routes>
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={ <Register/>} />
          <Route path="/" exact element={<Private><ListagemDeMembros /></Private>} />
          <Route path="/novo" exact element={<Private><NovoMembro /></Private>} />
          <Route path="/editar:id" exact element={<Private><EditarMembro /></Private>} />
          <Route path="/detalhes:id" exact element={<Private><DetalhesMembro /></Private>} />
          <Route path="*" element={  <h1>Pagina de erro!!!</h1>} />
        </Routes>
      </AuthProvider>
    
    </>
  )
}

