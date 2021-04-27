import {AppBar, Avatar, Button, Toolbar, Typography} from "@material-ui/core";
import {Link, useHistory, useLocation} from 'react-router-dom'
import memories from "../../assets/images/memories.png";
import React, {useEffect, useState} from "react";
import useStyles from  './styles'
import {useDispatch} from "react-redux";

const Navbar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const logout = () => {
        dispatch({type: 'LOGOUT'})

        history.push('/')

        setUser(null)
    }

    useEffect( () => {
        const token = user?.token

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location] )

    return (
        <AppBar className={classes.appBar} position={'static'} color={'inherit'} >
            <div className={classes.brandContainer}>
                <Typography component={Link} to={'/'} className={classes.heading} variant={'h2'} align={'center'} > Memories </Typography>
                <img className={classes.image} src={memories} alt="memories" height={'60'}/>
            </div>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageURL} >
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography variant={'h6'} className={classes.userName}>
                                {user.result.name}
                            </Typography>
                            <Button variant={'contained'} className={classes.logout} color={'secondary'} onClick={logout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Button component={Link} to={'/auth'} variant={'contained'} color={'primary'}> Sign in </Button>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar