import {  Divider, Stack,  } from '@mui/material';

import {   PencilSimple } from 'phosphor-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { baseUrl } from '../../services/api';
import { helpers } from '../../helpers';


export const CardMember = ({member}) => {

  const {id} = member;


  return (
    <Link to={`/editar${id}`} style={{width: '100%', cursor: 'pointer',  height: 150, borderRadius: 10, display: 'flex', overflow: 'hidden', border: '1px solid #ccc', padding: '5px', position: 'relative'}}>

      <div style={{width: '35%',}}>
        <img src={`${baseUrl}foto/${id}?hash=${new Date().getTime()}`}  style={{objectFit: 'contain', width: '100%', height: '100%'}} />
      </div>

      <Divider orientation='vertical'  />

      <Stack spacing={0.5} sx={{p: 1, width: '100%'}} >
        <h3>{helpers.limitText(helpers.captalizeFirstChart(member.nome),20)}</h3>

        <Stack direction={'row'} spacing={1}>
          <span>Cargo:</span>
          <strong>{helpers.captalizeFirstChart(member.tipo_membro.tipo)}</strong>
        </Stack>

        <Stack direction={'row'} spacing={1}>
          <span>Congregação:</span>
          <strong>{helpers.captalizeFirstChart(member.congregacao.congregacao)}</strong>
          
        </Stack>

        <Stack direction={'row'} spacing={1}>
          <span>Telefone:</span>
          <strong>{helpers.maskPhone(member.celular)}</strong>
        </Stack>

        <Stack direction={'row'} spacing={1}>
          <span>Nascimento:</span>
          <strong>{new Date(member.nascimento+ ' 00:00:01').toLocaleDateString()}</strong>
        </Stack>

        {/* {props.edit && 
          <Link to={`/editar${props.index}`}>
            <PencilSimple style={{position: 'absolute', bottom: 5, right: 5, cursor: 'pointer'}} size={22} />
          </Link>
        } */}


      </Stack>
    </Link>
  );
}
