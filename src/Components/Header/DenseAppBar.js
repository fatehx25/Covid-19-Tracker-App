import React, { useState, useEffect, useContext } from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PublicIcon from '@material-ui/icons/Public';
import { Cards, CountrySelect } from '../index';
import { fetchCountries } from '../../API';
import StateContext from '../../API/StateContext';
import CountryContext from '../../API/CountryContext'; 
import IndexContext from '../../API/IndexContext';
import CodeContext from '../../API/CodeContext';
import ReactCountryFlag from "react-country-flag"
import coronaVirus from "../corona.png"
import "./DenseAppBar.css";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    colorit: {
        backgroundColor: "red",
    },
    root_b: {
        '& > *': {
        margin: theme.spacing(1),
        },
    },
}));


const DenseAppBar = ( ) => {
    let classes = useStyles();
    let theme = useTheme();
    let [open, setOpen] = useState(false);

    let handleDrawerOpen = () => {
        setOpen(true);
    };
    
    let handleDrawerClose = () => {
        setOpen(false);
    };

    // const url = 'https://covid19.mathdro.id/api';
    
    // let [globalData, setGlobal] = useState();

    // useEffect( () => {
    //     async function fetchGlobalData() {
    //         const apiResponse = await fetch(url);
    //         console.log("Response after fetch:", apiResponse);
    //         const apiData = await apiResponse.json();
    //         console.log("Data from API", apiData);
    //         setGlobal(apiData);
    //     }
    //     fetchGlobalData();
    // }, [])

    // console.log("Cheking in header", dataGlobal_Cases);
    
    //CountrySelect
    
    let [countriesData, setCountriesData] = useState([]);
    let [countriesCode, SetCountriesCode] = useState([]);

    useEffect(() => {
        const fetchNation = async () => {
            try {
                const nationsData = await fetchCountries();
                const getCountry = nationsData.map( (nation) => (nation.title) );
                const getCode = nationsData.map( (short) => (short.code) );

                var index = getCountry.indexOf("Diamond Princess");
                if (index > -1) {
                    getCountry.splice(index, 1);
                    getCountry.splice(-1, 1);
                    getCode.splice(index, 1);
                    getCode.splice(-1, 1)
                }
                console.log("final check", getCode);
                
                setCountriesData(getCountry);
                SetCountriesCode(getCode);
            }
            catch (error) {
                console.log(error);
            }
        }
        
        fetchNation();
    }, []);
    
    console.log("Countries", countriesData);

    console.log(JSON.stringify(countriesCode[0])); 
    
    let countryState = useContext(StateContext);
    let selectCountry = countryState[0];
    let setSelectCountry = countryState[1];

    console.log("Panel State:", selectCountry);

    let iState = useContext(CountryContext);
    let countryindex = iState[0];
    let setCountryIndex = iState[1];
    console.log("late", iState[0]);

    return (
        <CodeContext.Provider value={countriesCode}>
            <IndexContext.Provider value={countryindex}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    }, classes.colorit)}
                    >
                    <Toolbar>
                        <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            <div className="Font-style">C<img src={ coronaVirus } alt="Coronavirus" width="20" height="20" />vid-19 Tracker</div>
                        </Typography>
                        <div className={classes.root_b}> <Button color="primary">{selectCountry}</Button> </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {['Global'].map((text, index) => (
                        <ListItem button key={text} onClick={() => {setSelectCountry( "Global" )}}>
                            <ListItemIcon><PublicIcon /></ListItemIcon>   
                            <ListItemText primary={text} />
                        </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {countriesData.map((text, index) => (
                            <ListItem button key={text} onClick={() => {setSelectCountry(String(countriesData[index])); setCountryIndex(index) }}>
                                <ListItemIcon>
                                    {index-index === 0? <ReactCountryFlag countryCode={ String(countriesCode[index] ) } svg style={{width: '2em', height: '2em'}}/> : <PublicIcon />}
                                </ListItemIcon>

                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div>
                        {selectCountry === "Global"? <Cards />: <CountrySelect />}
                    </div>    
                </main>
            </div>
            </IndexContext.Provider>
        </CodeContext.Provider>
    );
}

export default DenseAppBar;

//['All mail', 'Trash', 'Spam', 'Starred', 'Send email', 'Drafts']
//<PublicIcon />