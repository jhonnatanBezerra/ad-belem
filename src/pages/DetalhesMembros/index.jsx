import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Button,
  Typography,
  Box,
  Input,
  Stack,
  TextField,
  Grid,
  Paper,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  Backdrop,
  Fade,
  Modal,
  DialogActions,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import brLocale from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import { X } from 'phosphor-react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { helpers } from '../../helpers';
import { api, baseUrl } from '../../services/api';

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

const citys = ['Naviraí', 'Juti', 'Itaquiraí'];
const formationsSchool = [
  'Não informado',
  'Ensino Médio',
  'Ensino Superior',
  'Mestrado',
  'Doutorado',
];

export const DetalhesMembro = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [listRole, setListRole] = useState([]);
  const [listCongregation, setListCongregation] = useState([]);

  const [selectedFile, setSelectedFile] = useState('');
  const [preview, setPreview] = useState('');

  const [name, setName] = useState('');
  const [sexo, setSexo] = useState('');
  const [selectedRule, setSelectedRule] = useState('');
  const [mon, setMon] = useState('');
  const [dad, setDad] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [birthplace, setBirthplace] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [email, setEmail] = useState('');
  const [nationality, setNationality] = useState('');
  const [profession, setProfession] = useState('');
  const [schooling, setSchooling] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [address, setAddress] = useState('');
  const [numAdress, setNumAdress] = useState('');
  const [district, setDistrict] = useState('');
  const [complent, setComplent] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [baptismalDate, setBaptismalDate] = useState(null);
  const [baptismalAdress, setBaptismalAdress] = useState('');
  const [church, setChurch] = useState('');
  const [spouse, setSpouse] = useState('');
  const [weddingDate, setWeddingDate] = useState(null);
  const [selectedCongregation, setSelectedCongregation] = useState('');

  const [memberSince, setMemberSince] = useState(null);
  const [observation, setObservation] = useState('');
  const [suspended, setSuspended] = useState(false);
  const [disciplined, setDisciplined] = useState(false);
  const [moved, setMoved] = useState(false);
  const [hasPrinted, setHasPrinted] = useState(false);
  const [hasDelivered, setHasDelivered] = useState(false);
  const [dateDelivered, setDateDelivered] = useState(null);

  const [open, setOpen] = useState(false);
  const [removePhoto, setRemovePhoto] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    getAllMembers();
    getAllCongregations();
    getDetailsMember();
  }, []);

  const getDetailsMember = async () => {
    const { data } = await api.get(`/membros/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    setData(data);

    console.log(data);
    setName(data.nome);
    setSexo(data.sexo);
    setSelectedRule(data.tipo_membro.id);
    setMon(data.mae);
    setDad(data.pai);
    setBirthDate(data.nascimento);
    setBirthplace(data.naturalde);
    setCpf(data.cpf);
    setRg(data.rg);
    setEmail(data.email);
    setNationality(data.nacionalidade);
    setProfession(data.profissao);
    setSchooling(data.escolaridade);
    setMaritalStatus(data.estcivil);
    setAddress(data.endereco);
    setNumAdress(data.numend);
    setDistrict(data.bairro);
    setComplent(data.complemento);
    setCity(data.cidade);
    setCellPhone(data.celular);
    setPhone(data.fone);
    setBaptismalDate(data.databatismo);
    setBaptismalAdress(data.localbatismo);
    setChurch(data.igrejabatismo);
    setSpouse(data.conjuge);
    setWeddingDate(data.data_casamento);
    setSelectedCongregation(data.congregacao.id);
    setMemberSince(data.membrodesde);
    setObservation(data.obs);
    setSuspended(data.suspenso);
    setDisciplined(data.diciplinado);
    setMoved(data.mudou);
    setHasPrinted(data.cartao_imp);
    setHasDelivered(data.cartao_entregue);
    setDateDelivered(data.cartao_dt_entreg);
  };

  const getAllCongregations = async () => {
    const { data } = await axios.get('http://127.0.0.1:8000/api/congregacoes', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setListCongregation(data);
  };

  const getAllMembers = async () => {
    const { data } = await axios.get('http://127.0.0.1:8000/api/tipo-membro', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setListRole(data);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="lg" sx={{ marginBottom: '15px' }}>
      <Box component="form" sx={{ py: 3 }}>
        <Box
          mb={2}
          sx={{
            height: '170px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              height: '100%',
              width: '170px',
              position: 'relative',
              background: '#fff',
              border: '1px solid #ccc',
              borderRadius: 4,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={`${baseUrl}foto/${id}?hash=${new Date().getTime()}`}
              style={{
                objectFit: 'contain',
                width: '100%',
                height: '100%',
                position: 'relative',
              }}
            />
            <input type={'hidden'} name={'_method'} value={'PUT'} />
          </div>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              shrink
              value={data?.nome}
              InputLabelProps={{ shrink: true }}
              label="Nome"
              name={'nome'}
              fullWidth
            />
          </Grid>

          <Grid item xs={4} sm={5} md={2}>
            <TextField
              shrink
              value={data.sexo === 'M' ? 'Masculino' : 'Feminino'}
              InputLabelProps={{ shrink: true }}
              label="Sexo"
              name={'sexo'}
              fullWidth
            />
          </Grid>

          <Grid item xs={8} sm={7} md={4}>
            <TextField
              shrink
              value={data?.tipo_membro?.tipo.toUpperCase()}
              InputLabelProps={{ shrink: true }}
              label="Cargo"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <TextField
              value={data.mae}
              name={'mae'}
              InputLabelProps={{ shrink: true }}
              label="Mãe"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <TextField
              value={data.pai}
              name={'pai'}
              InputLabelProps={{ shrink: true }}
              label="Pai"
              fullWidth
            />
          </Grid>

          <Grid item xs={6} sm={4} md={3}>
            <TextField
              value={data.nascimento}
              InputLabelProps={{ shrink: true }}
              label="Data de nascimento"
              name={'datanascimento'}
              fullWidth
            />
          </Grid>

          <Grid item xs={6} sm={8} md={5}>
            <TextField
              name={'naturalde'}
              value={data.naturalde}
              InputLabelProps={{ shrink: true }}
              label="Natural de"
              fullWidth
            />
          </Grid>

          <Grid item xs={6} sm={6} md={4}>
            <TextField
              name={'cpf'}
              InputLabelProps={{ shrink: true }}
              label="CPF"
              value={data.cpf && helpers.maskDocuments(data.cpf)}
              fullWidth
            />
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <TextField
              name={'rg'}
              InputLabelProps={{ shrink: true }}
              label="RG"
              value={data.rg}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <TextField
              name={'email'}
              value={data.email}
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="E-mail"
            />
          </Grid>

          <Grid item xs={6} sm={6} md={4}>
            <TextField
              name={'nacionalidade'}
              value={data?.nacionalidade && data?.nacionalidade.toUpperCase()}
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Nacionalidade"
            />
          </Grid>

          <Grid item xs={6} sm={6} md={4}>
            <TextField
              name={'profissao'}
              InputLabelProps={{ shrink: true }}
              value={data.profissao}
              fullWidth
              label="Profissão"
            />
          </Grid>

          <Grid item xs={6} sm={6} md={4}>
            <TextField
              name={'escolaridade'}
              fullWidth
              label="Escolaridade"
              InputLabelProps={{ shrink: true }}
              value={data.escolaridade}
            ></TextField>
          </Grid>

          <Grid item xs={6} sm={6} md={4}>
            <TextField
              name={'estcivil'}
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Estado cívil"
              value={data?.estcivil}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={10}>
            <TextField
              name={'endereco'}
              value={data?.endereco}
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Endereço"
            />
          </Grid>

          <Grid item xs={3} sm={4} md={2}>
            <TextField
              name={'numend'}
              value={data?.numend}
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Número"
            />
          </Grid>

          <Grid item xs={9} sm={8} md={4}>
            <TextField
              name={'bairro'}
              value={data?.bairro}
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Bairro"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <TextField
              name={'complemento'}
              value={data?.complemento}
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Complemento"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <TextField
              name={'cidade'}
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Cidade"
              value={data?.cidade}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={6}>
            <TextField
              name={'celular'}
              value={data?.celular && helpers.maskPhone(data?.celular)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Celular"
            />
          </Grid>

          <Grid item xs={6} sm={6} md={6}>
            <TextField
              name={'fone'}
              value={data?.fone && helpers.maskPhone(data?.fone)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Fone"
            />
          </Grid>

          <Grid item xs={6} sm={6} md={4}>
            <TextField
              name={'databatismo'}
              value={data?.databatismo}
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Data de batismo"
            />
          </Grid>

          <Grid item xs={6} sm={6} md={4}>
            <TextField
              name={'localbatismo'}
              value={data?.localbatismo}
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Local de batismo"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <TextField
              name={'igrejabatismo'}
              value={data?.igrejabatismo}
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Igreja de batismo"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <TextField
              name={'conjuge'}
              value={data?.conjuge}
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Cônjuge"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <TextField
              name={'datacasamento'}
              value={data?.data_casamento}
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Data de casamento"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <TextField
              name={'conjuge'}
              value={
                data?.congregacao &&
                data?.congregacao?.congregacao.toUpperCase()
              }
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Congregação"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <TextField
              name={'membrodesde'}
              value={data?.membrodesde}
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Membro desde"
            />
          </Grid>

          <Grid item xs={7} sm={9} md={9}>
            <TextField
              name={'obs'}
              value={data?.obs}
              InputLabelProps={{ shrink: true }}
              label="Observações"
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={5} sm={3} md={3}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name={'suspenso'}
                    value={suspended}
                    checked={suspended}
                  />
                }
                label="Suspenso"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name={'diciplinado'}
                    value={disciplined}
                    checked={disciplined}
                  />
                }
                label="Disciplinado"
              />
              <FormControlLabel
                control={
                  <Checkbox name={'mudou'} value={moved} checked={moved} />
                }
                label="Mudou"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Divider>
              <Chip
                sx={{ background: 'transparent' }}
                label="Cartão de membro"
              />
            </Divider>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Stack>
              <FormControlLabel
                control={
                  <Checkbox
                    name={'cartao_imp'}
                    value={hasPrinted}
                    checked={hasPrinted}
                  />
                }
                label="Impresso"
              />

              <Stack direction={'row'}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={'cartao_entregue'}
                      value={hasDelivered}
                      checked={hasDelivered}
                    />
                  }
                  label="Entregue"
                />

                <TextField
                  name={'cartao_dt_entreg'}
                  value={data?.cartao_dt_entreg}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Data de entrega"
                />
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Divider />
          </Grid>
        </Grid>

        <Stack
          mt={2}
          spacing={2}
          direction={'row'}
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <Button
            size="large"
            sx={{ px: 8 }}
            onClick={() => navigate('/')}
            variant="contained"
          >
            Voltar
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
