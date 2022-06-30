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
    DialogActions
   } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import brLocale from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import { X } from 'phosphor-react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
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
const formationsSchool = ['Não informado','Ensino Médio', 'Ensino Superior', 'Mestrado', 'Doutorado'];


export const EditarMembro = () => {

  const navigate = useNavigate();
  const {id} = useParams();

  const [listRole, setListRole] = useState([]);
  const [listCongregation, setListCongregation] = useState([]);

  const [selectedFile, setSelectedFile] = useState('')
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
  

  useEffect(() => {
    
    if (!selectedFile) {
        setPreview(undefined)
        return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
   
    return () => URL.revokeObjectURL(objectUrl)
    
  }, [selectedFile]);

  useEffect(() => {
    getAllMembers();
    getAllCongregations();
    getDetailsMember();
  }, []);

  const getDetailsMember = async () => {
    const {data} = await api.get(`/membros/${id}`);	
    console.log(data);
    setName(data.nome);
    setSexo(data.sexo);
    setSelectedRule(data.tipo_membro.id);
    console.log(data.tipo_membro.id);
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
    setBaptismalDate(data.data_batismo);
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
    
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    
    data.append('tipo_membro_id', selectedRule);
    data.append('congregacao_id',selectedCongregation);
    data.append('photo', selectedFile);

    {birthDate && data.append('nascimento', format(new Date(birthDate), 'yyyy-MM-dd HH:mm:ss'));}
    {baptismalDate && data.append('databatismo',format(new Date(baptismalDate), 'yyyy-MM-dd HH:mm:ss'));}
    {weddingDate && data.append('data_casamento', format(new Date(weddingDate), 'yyyy-MM-dd HH:mm:ss'));}
    {memberSince && data.append('membrodesde',format(new Date(memberSince), 'yyyy-MM-dd HH:mm:ss'));}
    {dateDelivered &&  data.append('cartao_dt_entreg',format(new Date(dateDelivered), 'yyyy-MM-dd HH:mm:ss'));}

    {suspended ? data.append('suspenso', 1) : data.append('suspenso', 0)}
    {disciplined ? data.append('diciplinado', 1) : data.append('diciplinado', 0)}
    {moved ? data.append('mudou', 1) : data.append('mudou', 0)}
    {hasPrinted ? data.append('cartao_imp', 1) : data.append('cartao_imp', 0)}
    {hasDelivered ? data.append('cartao_entregue', 1) : data.append('cartao_entregue', 0)}

    

    try {
      const {data: response, status} = await axios.post(`http://127.0.0.1:8000/api/membros/${id}`, data);

      if (status === 200) {
        setOpen(true);
      }

    } catch (error) {
      
      console.log('errro',error.response.data);
      
 
    }
    

   
    
   
  }

  const handleRemovePhoto = () => {
    setSelectedFile('')
    setPreview('')
  }

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined)
        return
    }

    setSelectedFile(e.target.files[0])
  }

  const getAllCongregations = async () => {
    const {data} = await axios.get('http://127.0.0.1:8000/api/congregacoes');
    setListCongregation(data);
  }

  const getAllMembers = async () => {
    const {data} = await axios.get('http://127.0.0.1:8000/api/tipo-membro');
    setListRole(data);
  }

  const handleBack = () =>{
    navigate('/')
  }



  return (
    <Container maxWidth="lg" sx={{marginBottom: '15px'}} >

    
      {open && <ModalAlert open={open} handleClose={()=> handleBack()} type={selectedRule.tipo} />}

      <Box component="form" onSubmit={handleSubmit} sx={{py: 3, }}>

        <Box mb={2} sx={{ height: '170px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>          
          <div style={{height: '100%', width: '170px', position: 'relative', background: '#fff', border: '1px solid #ccc', borderRadius: 4, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            
            {!removePhoto ? 
              <>
                <img  src={`${baseUrl}foto/${id}?hash=${new Date().getTime()}`} style={{objectFit: 'contain', width: '100%', height: '100%', position: 'relative'}} /> 
                <X onClick={()=> setRemovePhoto(true)} size={20} style={{position: 'absolute', top: 3, right: 3, cursor: 'pointer'}} />
                <input type={'hidden'} name={'_method'} value={'PUT'}  />
              </>
              :

              selectedFile ? 
              <>
               <img  src={preview} style={{objectFit: 'contain', width: '100%', height: '100%', position: 'relative'}} /> 
                <X onClick={handleRemovePhoto} size={20} style={{position: 'absolute', top: 3, right: 3, cursor: 'pointer'}} />
                <input type={'hidden'} name={'_method'} value={'PUT'}  />
              </>
              :
              <>
                <label style={{textAlign: 'center'}}>Clique para adicionar foto do membro</label>
                <input onChange={onSelectFile} style={{height: '100%', width: '100%',   position: 'absolute', opacity: 0,  cursor: 'pointer',}} type="file"   />
                <input type={'hidden'} name={'_method'} value={'PUT'}  />
              </>
              
            }
          </div>
        </Box>
       
        <Grid container spacing={2}>

          <Grid item xs={12} sm={12} md={12}  >
              <TextField 
                
                required
                value={name}
                name={'nome'}
                onChange={e => setName(e.target.value)}
                fullWidth 
                label="Nome"
              />
          </Grid>

          <Grid item xs={4}  sm={5}  md={2} >
            <TextField
              required
              name={'sexo'}
              fullWidth
              select
              label="Sexo"
              value={sexo}
              onChange={e => setSexo( e.target.value)}
            >
           
              <MenuItem  value='M'> Masculino</MenuItem>
              <MenuItem  value='F'> Feminino</MenuItem>             

            </TextField>
          </Grid>

          <Grid item xs={8}  sm={7}  md={4} >

              <FormControl required fullWidth>
                <InputLabel id="select-cargo-label">Cargo</InputLabel>
                <Select
                  
                  labelId="select-cargo-label"
                  id="select-cargo"
                  value={selectedRule}
                  label="Cargo"
                  onChange={e => setSelectedRule(e.target.value)}
                  MenuProps={MenuProps}
                >
                 {listRole.map(role => (
                  <MenuItem key={role.id} value={role.id}>{role.tipo.toUpperCase()}</MenuItem>
                ))}

                </Select>
              </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={12}  >
              <TextField 
                required
                value={mon}
                name={'mae'}
                onChange={e => setMon(e.target.value)}
                fullWidth 
                label="Mãe"
              />
          </Grid>

          <Grid item xs={12} sm={12} md={12}  >
              <TextField 
                value={dad}
                name={'pai'}
                onChange={e => setDad(e.target.value)}
                fullWidth 
                label="Pai"
              />
          </Grid>

          <Grid item xs={6}  sm={4}  md={3} >
             
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={brLocale}>
                <DatePicker

                  fulllWidth
                  value={birthDate}
                  label="Data de nascimento"
                  onChange={e => setBirthDate(e)}
                  renderInput={(params) => <TextField required {...params} sx={{width: '100%'}}  />}
                  mask="__/__/____"
                />
              </LocalizationProvider>

          </Grid>

          <Grid item xs={6}  sm={8}  md={5} >
              <TextField 
                name={'naturalde'}
                value={birthplace}
                onChange={e => setBirthplace( e.target.value)}
                fullWidth 
                label="Natural de"
              />
          </Grid> 

          <Grid item xs={6}  sm={6}  md={4} >
              <TextField 
                required
                name={'cpf'}
                value={cpf && helpers.maskDocuments(cpf)}
                onChange={e => setCpf(e.target.value)}
                fullWidth 
                label="CPF"
              />
          </Grid>

          <Grid item xs={6}  sm={6}  md={3} >
              <TextField 
                name={'rg'}
                value={rg}
                onChange={e => setRg(e.target.value)}
                fullWidth 
                label="RG"
              />
          </Grid>

          <Grid item xs={12} sm={12} md={5}  >
              <TextField 
                name={'email'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth 
                label="E-mail"
              />
          </Grid>

          <Grid item xs={6}  sm={6}  md={4} >
              <TextField 
                name={'nacionalidade'}
                value={nationality}
                onChange={e => setNationality(e.target.value)}
                fullWidth 
                label="Nacionalidade"
              />
          </Grid>

          <Grid item xs={6}  sm={6}  md={4} >
              <TextField 
                name={'profissao'}
                value={profession}
                onChange={e => setProfession(e.target.value)}
                fullWidth 
                label="Profissão"
              />
          </Grid>

          <Grid item xs={6}  sm={6}  md={4} >
            <TextField
              name={'escolaridade'}
              fullWidth
              select
              label="Escolaridade"
              value={schooling}
              onChange={e => setSchooling( e.target.value)}
            >
              {formationsSchool.map((school,index) => (
                <MenuItem key={index} value={school}>{school.toUpperCase()}</MenuItem>
              ))}
              
                  

            </TextField>
          </Grid>

          <Grid item xs={6}  sm={6}  md={4} >
            <TextField
              required
              name={'estcivil'}
              fullWidth
              select
              label="Estado cívil"
              value={maritalStatus}
              onChange={e => setMaritalStatus( e.target.value)}
            >
              
              <MenuItem  value='solteiro'> Solteiro</MenuItem>
              <MenuItem  value='casado'> Casado</MenuItem> 
              <MenuItem  value='divorciado'> Divorciado</MenuItem> 
              <MenuItem  value='viuvo'> Viuvo</MenuItem> 
                    

              </TextField>
          </Grid>

          <Grid item xs={12} sm={12} md={10}  >
              <TextField 
                required
                name={'endereco'}
                value={address}
                onChange={e => setAddress(e.target.value)}
                fullWidth 
                label="Endereço"
              />
          </Grid>

          <Grid item xs={3}  sm={4}  md={2} >
              <TextField 
                required
                name={'numend'}
                value={numAdress}
                onChange={e => setNumAdress(e.target.value)}
                fullWidth 
                label="Número"
              />
          </Grid>

          <Grid item xs={9}  sm={8}  md={4} >
              <TextField 
                required
                name={'bairro'}
                value={district}
                onChange={e => setDistrict(e.target.value)}
                fullWidth 
                label="Bairro"
              />
          </Grid> 

          <Grid item xs={12} sm={12} md={4}  >
              <TextField 
                name={'complemento'}
                value={complent}
                onChange={e => setComplent(e.target.value)}
                fullWidth 
                label="Complemento"
              />
          </Grid> 

          <Grid item xs={12} sm={12} md={4}  >

              <TextField
                required
                name={'cidade'}
                fullWidth
                select
                label="Cidade"
                value={city}
                onChange={e => setCity(e.target.value)}
              >
                {citys.map((city,index)=>(
                  <MenuItem key={index} value={city}>{city}</MenuItem>
                ))}
              
                  

            </TextField>

          </Grid> 

          <Grid item xs={6}  sm={6}  md={6} >
              <TextField 
                required
                name={'celular'}
                value={cellPhone && helpers.maskPhone(cellPhone)}
                onChange={e => setCellPhone(e.target.value)}
                fullWidth 
                label="Celular"
              />
          </Grid> 

          <Grid item xs={6}  sm={6}  md={6} >
              <TextField 
                name={'fone'}
                value={phone && helpers.maskPhone(phone)}
                onChange={e => setPhone(e.target.value)}
                fullWidth 
                label="Fone"
              />
          </Grid> 
          
          <Grid item xs={6}  sm={6}  md={4} >
             
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={brLocale}>
                <DatePicker
                 
                  fulllWidth
                  value={baptismalDate}
                  label="Data de batismo"
                  onChange={e => setBaptismalDate(e)}
                  renderInput={(params) => <TextField {...params}   sx={{width: '100%'}} />}
                  mask="__/__/____"
                />
              </LocalizationProvider>

          </Grid> 

          <Grid item xs={6}  sm={6}  md={4} >
              <TextField 
                name={'localbatismo'}
                value={baptismalAdress}
                onChange={e => setBaptismalAdress(e.target.value)}
                fullWidth 
                label="Local de batismo"
              />
          </Grid> 

          <Grid item xs={12} sm={12} md={4}  >
              <TextField 
                name={'igrejabatismo'}
                value={church}
                onChange={e => setChurch(e.target.value)}
                fullWidth 
                label="Igreja de batismo"
              />
          </Grid> 

          <Grid item xs={12} sm={12} md={8}  >
              <TextField 
                name={'conjuge'}
                value={spouse}
                onChange={e => setSpouse(e.target.value)}
                fullWidth 
                label="Cônjuge"
              />
          </Grid>

          <Grid item xs={12} sm={12} md={4}  >
             
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={brLocale}>
                <DatePicker
                 
                  fulllWidth
                  value={weddingDate}
                  label="Data de casamento"
                  onChange={e => setWeddingDate(e)}
                  renderInput={(params) => <TextField {...params}   sx={{width: '100%'}}  />}
                  mask="__/__/____"
                />
              </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={12} md={8}  >

            <FormControl required fullWidth>
              <InputLabel id="select-congregacao-label">Congregação</InputLabel>
              <Select

                labelId="select-congregacao-label"
                id="select-congregacao"
                value={selectedCongregation}
                label="Congregação"
                onChange={e => setSelectedCongregation(e.target.value)}
                MenuProps={MenuProps}
              >
                {listCongregation.map(congregation => (
                  
                  <MenuItem key={congregation.id}  value={congregation.id}> {congregation.congregacao.toUpperCase()}</MenuItem>
              ))}
             
              </Select>
            </FormControl>

          </Grid>

          <Grid item xs={12} sm={12} md={4}  >
          
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={brLocale}>
                <DatePicker
                  name={'membrodesde'}
                  fulllWidth
                  value={memberSince}
                  onChange={e => setMemberSince(e)}
                  label="Membro desde"
                  renderInput={(params) => <TextField {...params}  sx={{width: '100%'}}  />}
                  mask="__/__/____"
                />
              </LocalizationProvider>
          </Grid>

          <Grid item xs={7} sm={9} md={9}  >
            <TextField
              name={'obs'}
              value={observation}
              onChange={e => setObservation(e.target.value)}
              id="outlined-multiline-static"
              label="Observações"
              fullWidth
              multiline
              rows={4}
              
            />
          </Grid>

          <Grid item xs={5} sm={3} md={3}  >
            <FormGroup>
              <FormControlLabel control={<Checkbox name={'suspenso'} value={suspended} checked={suspended} onChange={()=>setSuspended(!suspended)} />} label="Suspenso" />
              <FormControlLabel control={<Checkbox name={'diciplinado'} value={disciplined} checked={disciplined} onChange={()=>setDisciplined(!disciplined)} />} label="Disciplinado" />
              <FormControlLabel control={<Checkbox name={'mudou'} value={moved} checked={moved} onChange={()=>setMoved(!moved)} />} label="Mudou" />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Divider >
              <Chip sx={{background: 'transparent'}} label="Cartão de membro" />
            </Divider>
          </Grid>         

          <Grid item xs={12} sm={12} md={6}  >
            <Stack >
              <FormControlLabel control={<Checkbox name={'cartao_imp'} value={hasPrinted} checked={hasPrinted} onChange={()=>setHasPrinted(!hasPrinted)}  />} label="Impresso" />
              
              <Stack direction={'row'} >
               <FormControlLabel control={<Checkbox name={'cartao_entregue'} value={hasDelivered} checked={hasDelivered} onChange={()=>setHasDelivered(!hasDelivered)}  />} label="Entregue" />
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={brLocale}>
                        <DatePicker
                          
                          fulllWidth
                          value={dateDelivered}
                          label="Data de entrega"
                          onChange={e =>setDateDelivered(e)}
                          renderInput={(params) => <TextField {...params}  sx={{width: '100%',}}  />}
                          mask="__/__/____"
                        />
                </LocalizationProvider>
              </Stack>
                
            </Stack>
                
          </Grid>

          <Grid item xs={12} sm={12} md={12} >
            <Divider />
            
          </Grid>       

         
        </Grid>

        <Stack mt={2} spacing={2} direction={'row'} sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button size='large' sx={{px: 8}} onClick={()=> navigate('/')} variant="outlined">Cancelar</Button>
          <Button type='submit' size='large' sx={{px: 8}} variant="contained">Salvar</Button>
        </Stack>
       

      </Box>

     

    </Container>
  );
}

const ModalAlert = ({open, handleClose, type}) =>{
  return(
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
            Membro editado com sucesso !!!
          </Typography>

          <DialogActions sx={{ justifyContent: 'end', flex: 1, height: '100%'}}>
            <Button variant='contained' size='large' sx={{px: 5}} onClick={handleClose}>Ok</Button>
        </DialogActions>
        </Box>
      </Fade>
</Modal> 
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

