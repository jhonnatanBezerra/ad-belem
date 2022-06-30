import { AppBar, Avatar, Box, Button,  IconButton,  Menu, MenuItem, Stack,  Toolbar, Tooltip, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../../services/context';


 export const Header = React.memo(function Header() {

  const {handleLogout} = useContext(AuthContext)

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleExit = () => {
    handleLogout();
    handleCloseUserMenu();
  }

  return (
    <AppBar position="sticky">
      <Container  >
        
        <Toolbar disableGutters>
          <Box
            noWrap
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontWeight: 700, color: 'inherit', textDecoration: 'none', padding: '10px'
            }}>
            <Link to={'/'} style={{color: 'inherit', fontWeight: 700, textDecoration: 'none'}} >
              <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} sx={{}} >
                  <img src="http://ad.org.br/wp-content/uploads/2022/06/Logo_AD-Belem_Banner_Site.png" style={{objectFit: 'contain', width: '70px', height: '70px'}}  />
                  <p>Assembleia de Deus</p>
              </Stack>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

               <Link to={'/'} style={{}} >
                  <MenuItem  onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Lista de membros</Typography>
                  </MenuItem>
                </Link>

                <Link to={'/novo'} style={{}} >
                  <MenuItem  onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Adicionar novo membro</Typography>
                  </MenuItem>
                </Link>
            </Menu>
          </Box>
  
          <Box
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              padding: '10px'
            }}
          > 
            <Link to={'/'}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} sx={{}} >
                  <img src="http://ad.org.br/wp-content/uploads/2022/06/Logo_AD-Belem_Banner_Site.png" style={{objectFit: 'contain', width: '70px', height: '70px'}}  />
              </Stack>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

              <Button sx={{ my: 2, color: 'white', display: 'block' }} >
                <Link to={'/'} style={{marginLeft: '8px', color: '#fff', display: 'block', textDecoration: 'none'}}>Lista de membros</Link>
              </Button>

              <Button sx={{ my: 2, color: 'white', display: 'block' }} >
                <Link to={'/novo'} style={{marginLeft: '8px', color: '#fff', display: 'block', textDecoration: 'none'}}>Adicionar novo membro</Link>
              </Button>

          

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Usúario">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp"  style={{objectFit: 'contain'}}  src="data:image/jpeg;base64,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"  />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu} >
            

               
                  <MenuItem  onClick={handleExit}>
                    <Typography textAlign="center">Sair</Typography>
                  </MenuItem>
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
});

