import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Input, Card, Grid, FormControl, FormControlLabel, Checkbox, FormGroup, Typography, Autocomplete } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* ****************** Here modal box style ********************************** */
const style = { position: 'absolute', height: '50%', overflowY: "scroll", top: '35%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', bgcolor: 'background.paper', border: '1px solid #000', boxShadow: 1, p: 2, };
/* ******************* Here main function ************************************* */
export default function CreateTagModal(props) {

    const [open, setOpen] = React.useState(false);
    const [gender, setGender] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [info, SetInfo] = React.useState({
        fname: '',
        lName: '',
        email: '',
        age: '',
        dob: ''
    })
    let { fname, lName, email, age, dob } = info
    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...info }
        temp[name] = value.toUpperCase()
        SetInfo(temp);
    }
    /* *************** When form is submitted then calling *************************/
    const handleFormSubmit = async (event) => {

    }

    /* *************** Here get all devices *************************/
    React.useEffect(() => {

    }, []);
    return (
        <>
            <Grid item lg={7} md={7} sm={7} xs={12} sx={{ mb: 2.3, mt: -3 }}>
                <Button onClick={handleOpen} variant="contained" style={{ position: "absolute", right: 5.5, justifyContent: "right", alignItems: "right" }} >{props.name}</Button>
            </Grid>
            <Modal keepMounted open={open} onClose={handleClose} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
                <Box sx={style}>
                    <Card className="card" sx={{ width: 'auto', m: -1 }}>
                        <ValidatorForm onSubmit={handleFormSubmit} >
                            <Grid container rowSpacing={1} spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={5.6} sx={{ ml: 1.3 }}>
                                    <Autocomplete sx={{ mt: 0.5 }} size="small" label="Device Name" options={[]} onChange={''} value={''} disableClearable={true} />
                                    <TextValidator
                                        sx={{ mt: 1, width: '100%' }}
                                        variant="outlined"
                                        size="small"
                                        label="First Name"
                                        onChange={handleChange}
                                        type="text"
                                        name="fname"
                                        value={fname}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                    <TextValidator
                                        sx={{ mt: 1, width: '100%' }}
                                        variant="outlined"
                                        size="small"
                                        label="Last Name"
                                        onChange={handleChange}
                                        type="text"
                                        name="lName"
                                        value={lName}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                    <FormControlLabel label={
                                        <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>
                                            Gender
                                        </Typography>
                                    } control={<Checkbox
                                        checked={gender}

                                        name='gender'
                                        onChange={(e) => { setGender(e.target.checked) }}
                                    />} />
                                </Grid>
                            </Grid>
                        </ValidatorForm>
                    </Card>
                </Box>
            </Modal>
        </>
    );
}