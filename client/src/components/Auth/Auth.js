import React, {useState} from 'react';
import useStyles from './styles'
import {Avatar, Button, Container, Grid, Paper, Typography} from "@material-ui/core";
import {Lock} from "@material-ui/icons";
import Input from './Input'
import GoogleLogin from "react-google-login";
import Icon from './Icon'
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory()

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = () => {

    }

    const handleChange = () => {

    }

    const switchMode = () => {
        setIsSignUp( (prevIsSignUp) => !prevIsSignUp )
        // setShowPassword(false)
        handleShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({type: 'AUTH', data: {result, token}})

            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = () => {
        console.log('google failure')
    }

    return (
        <Container component={'main'} maxWidth={'xs'}>
            <Paper  className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <Lock/>
                </Avatar>
                <Typography variant={'h5'}> {isSignUp ? 'Sign Up' : 'Sign In'} </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name={'firstname'} label={'First name'} onChange={handleChange} autoFocus half/>
                                    <Input name={'lastname'} label={'Last name'} onChange={handleChange} half/>
                                </>

                            )
                        }
                        <Input name={'email'} label={'Email Address'} handleChange={handleChange} type={'email'} />
                        <Input name={'password'} label={'Password'} handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignUp && <Input name={'confirmPassword'} label={'Repeat Password'} handleChange={handleChange} type={'password'} /> }
                    </Grid>
                    <Button type={'submit'} fullWidth variant={'contained'} color={'primary'} className={classes.submit}>
                        { isSignUp ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin
                        clientId={'201321787375-vfot38ibrf9j22hcth8s4310lh0gqcr5.apps.googleusercontent.com'}
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color={'primary'}
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant={'contained'}
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Grid container justify={'flex-end'}>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
// }
// ;

export default Auth;
