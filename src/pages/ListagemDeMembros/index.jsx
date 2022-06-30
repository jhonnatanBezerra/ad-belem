import {  Button, FormControl, Grid,  InputAdornment,  InputLabel,  MenuItem,  Select,  Stack, TextField,  } from '@mui/material';
import { Container } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {  MagnifyingGlass,  UserPlus } from 'phosphor-react';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CardMember } from '../../Components/CardMember';
import { api } from '../../services/api';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import brLocale from 'date-fns/locale/pt-BR';
import { AuthContext } from '../../services/context';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const filters = [
  {id: 1, name: 'Nome', value: 'nome', placeholder: 'Buscar por nome de membro'},
  {id: 2, name: 'Congregação', value: 'congregacao', placeholder: 'Buscar por congregação'},
  {id: 3, name: 'Tipo membro', value: 'tipo-membro', placeholder: 'Buscar por tipo de membro'},
  {id: 4, name: 'Data de nascimento', value: 'data-nascimento', placeholder: ''},


  
];

export const ListagemDeMembros = React.memo(function ListagemDeMembros() {

  const {autenticated} = useContext(AuthContext);

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [dataInicial, setDataInicial] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);

  

  const getMembers = async () => {

    let query = '';

    

    if(selectedFilter.value === 'nome' && search === '') {
      query = '';
    }

    if(selectedFilter.value === 'nome' && search !== '') {
      query = `?nome=${search}`;
    }

    if(selectedFilter.value === 'congregacao'){
      query = `?congregacao=${search}`;
    }

    if(selectedFilter.value === 'tipo-membro'){
      query = `?tipo-membro=${search}`;
    }

    console.log('membros', query);

    
    try {

      const {data} = await api.get(`membros${query}`);
      setMembers(data)

    } catch (error) {
      console.log('error', error);
    }
  }

  const onKeyPress = (e) => {
    if(e.key === 'Enter') {
      getMembers();
    }
  }

  return (
    <Container maxWidth="lg" sx={{marginBottom: '15px'}} >

       <Grid container spacing={2}>

        <Grid item xs={12} sm={12} md={12} sx={{mt: 2}} >
        
          <Stack direction={'row'} spacing={2}>

            {selectedFilter.value !== 'data-nascimento' ? 


              <TextField
              label={selectedFilter.placeholder}
              fullWidth
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={onKeyPress}
              InputProps={{
              endAdornment: (
                  <InputAdornment position="end">
                  <Stack direction={'row'} spacing={2}>
                  <MagnifyingGlass onClick={()=> getMembers()} size={28} style={{cursor: 'pointer'}} />
                  <Link to="/novo">
                    <UserPlus size={28} onClick={()=> console.log('novo membro')} style={{cursor: 'pointer', color: 'rgba(0, 0, 0, 0.54)'}}/>
                      </Link>
                    </Stack>
                  </InputAdornment>
                  ),}}/>

              :
              <Stack direction={'row'} spacing={2}  sx={{ width: '100%'}}>

                 <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={brLocale}>
                  <DatePicker

                    fulllWidth
                    value={dataInicial}
                    label="Data inicial"
                    onChange={e => setDataInicial(e)}
                    renderInput={(params) => <TextField required {...params} sx={{width: '100%'}}  />}
                    mask="__/__/____"
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={brLocale}>
                  <DatePicker

                    fulllWidth
                    value={dataFinal}
                    label="Data final"
                    onChange={e => setDataFinal(e)}
                    renderInput={(params) => <TextField required {...params} sx={{width: '100%'}}  />}
                    mask="__/__/____"
                  />
                </LocalizationProvider>

                <Button size='large' sx={{ px: 5, width: '220px'}} disableElevation variant={'contained'} >Buscar</Button>

              </Stack>
              
            }

            <FormControl sx={{width: '250px'}} >
              <InputLabel id="filtros-label">Buscar por</InputLabel>
              <Select                  
                labelId="filtros-label"
                id="filtros"
                value={selectedFilter}
                label="Buscar por"
                onChange={e => setSelectedFilter(e.target.value)}
                MenuProps={MenuProps} >
                    {filters.map((filter) => (
                      <MenuItem key={filter.id} value={filter} >{filter.name}</MenuItem>
                    ))}
                    
                    {/* <MenuItem value={'congregacao'}>Congregação</MenuItem>
                    <MenuItem value={'tipo-membro'}>Tipo membro</MenuItem>
                    <MenuItem value={'data-nascimento'} >Data de nascimento</MenuItem> */}
                

                  </Select>
            </FormControl>

          </Stack>
       
        </Grid>

        {members.map((member, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}   >
            <CardMember member={member} edit={index%2 === 0 ? true : false} />
        </Grid>
        ))}


       </Grid>

    </Container>

  );
});



