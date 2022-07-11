import {  Divider, Stack, Tooltip,  } from '@mui/material';

import {   PencilSimple } from 'phosphor-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { baseUrl, api } from '../../services/api';
import { helpers } from '../../helpers';
import './styles.css';


export const CardMember = ({member}) => {

  const {id} = member;
  const token = 'Bearer' + localStorage.getItem('token');


  return (
    <Link to={id % 2 === 0 ? `/editar${id}` : `/detalhes${id}`} style={{width: '100%', cursor: 'pointer',  height: 150, borderRadius: 10, display: 'flex', overflow: 'hidden', border: '1px solid #ccc', padding: '5px', position: 'relative'}}>

      <div style={{width: '35%',}}>
        <img src={`${baseUrl}foto/${id}?hash=${new Date().getTime()}`}  style={{objectFit: 'contain', width: '100%', height: '100%'}} />
      </div>

      <Divider orientation='vertical'  />

      <Stack spacing={0.5} sx={{p: 1, width: '100%'}} >
        <Tooltip title={member.nome} >
          <h3 className='overflow-width'>{member.nome}</h3>
        </Tooltip>

        <Stack direction={'row'} spacing={1}>
          <span>Cargo:</span>
          <strong className='overflow-width'>{helpers.captalizeFirstChart(member.tipo_membro.tipo)}</strong>
        </Stack>

        <Stack direction={'row'} spacing={1}>
          <span>Congregação:</span>
          <strong className='overflow-width'>{helpers.captalizeFirstChart(member.congregacao.congregacao)}</strong>
          
        </Stack>

        <Stack direction={'row'} spacing={1} sx={{}}>
          <span>Telefone:</span>
          <strong className='overflow-width'>{helpers.maskPhone(member.celular)}</strong>
        </Stack>

        <Stack direction={'row'} spacing={1}>
          <span>Nascimento:</span>
          <strong className='overflow-width'>{new Date(member.nascimento+ ' 00:00:01').toLocaleDateString()}</strong>
        </Stack>

      </Stack>
    </Link>
  );
}
