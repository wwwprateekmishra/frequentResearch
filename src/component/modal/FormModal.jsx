import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Grid, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyAutocomplete from '../Autocomplete';
import useUser from '../hooks/useUser';
/* ****************** Here modal box style ********************************** */
const style = { position: 'absolute', overflowY: "scroll", top: '35%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', border: '1px solid #000', boxShadow: 1, p: 0.5, };

export const calculateAge = (val = '') => {
    if (val) {
        const today = new Date();
        const [year, month, day] = val.split('-');
        const birthDate = new Date(`${month}/${day}/${year}`);
        const age = today.getFullYear() - birthDate.getFullYear();
        if (
            today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() &&
                today.getDate() < birthDate.getDate())
        ) {
            return age - 1;
        }

        return age;
    }

    return null;
};
/* ******************* Here main function ************************************* */
export default function FormModal(props) {
    const { addData, getContry, getState, getCity } = useUser()
    const [open, setOpen] = React.useState(false);
    const [country, setCountry] = React.useState('');
    const [state, setState] = React.useState('');
    const [stateOpt, setStateOpt] = React.useState([]);
    const [city, setcity] = React.useState('');
    const [cityOpt, setCityOpt] = React.useState([]);
    const [conOpt, setConOpt] = React.useState([]);
    const [errorAge, setErrorAge] = React.useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [info, SetInfo] = React.useState({
        fname: '',
        lname: '',
        email: '',
        age: '',
        dob: '',
        gender: ''
    })
    let { fname, lname, email, dob, gender } = info

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...info }
        if (name === 'dob') {
            let age = calculateAge(value)
            if (age !== null && (age <= 14 || age >= 99)) {
                setErrorAge('Age must be older than 14 years and less than 99 years.');
            } else {
                setErrorAge('');
            }
        }
        temp[name] = value
        SetInfo(temp);
    }
    React.useEffect(() => {
        ; (async () => {
            let res = await getContry()
            setConOpt(res)
        })().catch((e) => { console.log(e); })
    }, [])
    React.useEffect(() => {
        ; (async () => {
            if (country && state) {
                let st = await getCity(country, state)
                setCityOpt(st)
            }
        })().catch((e) => { console.log(e); })
    }, [state]);

    React.useEffect(() => {
        ; (async () => {
            if (country) {
                let st = await getState(country)
                setStateOpt(st)
            }
        })().catch((e) => { console.log(e); })
    }, [country]);
    /* *************** When form is submitted then calling *************************/
    const handleFormSubmit = async () => {
        if (errorAge) return
        let data = { fname, lname, email, country, state, city, gender, dob }
        let res = await addData(data)
        if (res.status === 201) {
            props.setDataAdd(props.dataAdd ? false : true)
            setOpen(false)
            SetInfo({
                fname: '',
                lname: '',
                email: '',
                age: '',
                dob: '',
                gender: ''
            })
            setCountry(''); setState(''); setcity('')
        }
        toast.success(res.msg)
    }
    return (
        <>
            <Grid item lg={7} md={7} sm={7} xs={12} sx={{ mb: 2.3 }}>
                <Button onClick={handleOpen} variant="contained" style={{ position: "absolute", right: 5.5, justifyContent: "right", alignItems: "right" }} >{props.name}</Button>
            </Grid>
            <Modal keepMounted open={open} onClose={handleClose} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
                <Box sx={style}>
                    <ValidatorForm onSubmit={handleFormSubmit} >
                        <Grid container rowSpacing={1} spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6} sx={{ mt: 1 }}>
                                <TextValidator
                                    sx={{ width: '100%' }}
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
                                    sx={{ width: '100%', mt: 1 }}
                                    variant="outlined"
                                    size="small"
                                    label="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'this field is required',
                                        'email is not valid',
                                    ]}
                                    autoComplete='off'
                                />
                                <MyAutocomplete size='small' sx={{ mt: 1 }} label='Select State' required={true} value={state} onChange={setState} options={stateOpt} />
                                <div>
                                    <TextValidator
                                        sx={{ mt: 1, width: '100%' }}
                                        variant="outlined"
                                        size="small"
                                        label="Select DOB"
                                        onChange={handleChange}
                                        type="date"
                                        name="dob"
                                        value={dob}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                    {errorAge && (
                                        <p style={{ color: 'red' }}>
                                            {errorAge}
                                        </p>
                                    )}
                                    {dob && !errorAge && (
                                        <p>
                                            Your age is: {calculateAge(dob)} years old.
                                        </p>
                                    )}
                                </div>

                            </Grid>
                            <Grid item xs={6} sx={{ mt: 1 }}>
                                <TextValidator
                                    sx={{ width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    label="Last Name"
                                    onChange={handleChange}
                                    type="text"
                                    name="lname"
                                    value={lname}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <MyAutocomplete sx={{ mt: 1 }} size='small' label='Country' required={true} value={country} onChange={setCountry} options={conOpt} />
                                <MyAutocomplete size='small' sx={{ mt: 1 }} label='Select City' required={true} value={city} onChange={setcity} options={cityOpt} />
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel name="gender" required={true} value="Male" control={<Radio onChange={handleChange} />} label="Male" />
                                        <FormControlLabel name="gender" required={true} value="Female" control={<Radio onChange={handleChange} />} label="Female" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Box textAlign={'center'}>
                            <Button type="submit" variant="contained" sx={{ textTransform: 'capitalize', ml: 2.2, mt: 1, mb: 1 }}  > Add </Button>

                        </Box>
                    </ValidatorForm>
                </Box>
            </Modal>
        </>
    );
}