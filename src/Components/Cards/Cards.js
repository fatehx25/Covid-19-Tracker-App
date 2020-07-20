import React from 'react'
import DataContext from '../../API/DataContext';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CountUp from 'react-countup';
import Chart from '../Chart/Chart';
import '../../API';
import './Cards.css';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      flexGrow: 1,
    },
    media: {
      height: 150,
    },
    
    paper: {
        padding: theme.spacing(20),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
  

const Cards = () => {
    
    let data = React.useContext(DataContext);
    const infected = data[0];
    const deaths = data[1];
    const recovered = data[2];
    const active = data[3];
    const serious = data[4];
    const unresolved = data[5];
    const checkData = data[6]; 

    const classes = useStyles();

    console.log("Infected", infected);
    console.log("Recovered", recovered);
    console.log("Deaths", deaths);
    console.log("globalData", checkData);
    
    if (!infected !== !deaths !== !recovered !== !active !== !serious !== !unresolved) {
        console.log("let's check?")
        return 'Loading...'
    }

    return (
        <div>
            <Grid container  spacing={3}>
            
                <Grid item xs={1}></Grid>
                
                <Grid item xs={10}>
                <Grid container>
                    <Grid item xs={3}>
                        <Card className={classes.root} >
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="https://i.guim.co.uk/img/media/ea5320db5d9fdede46615f0f5a8bb5daab4d474e/0_118_2268_1362/master/2268.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=29f98a609d9163035e420ffd2e3cbd9f"
                                    title="Corona Infected"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Infected <div className="Case-Container1"><CountUp start={0} end={checkData? infected:0} duration={2.5} separator=","/></div>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Total Number of People infected by Covid-19
                                        <br/>
                                        Active Cases <strong><CountUp start={0} end={checkData? active:0} duration={2.5} separator=","/></strong>            
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={3}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://news.cgtn.com/news/3067544d7741444f31517a4d3159544e3359444f31457a6333566d54/img/348ad96520c84ff5bbeca8667129af0b/348ad96520c84ff5bbeca8667129af0b.jpg"
                                title="Corona Recovered"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Recovered <div className="Case-Container2"><CountUp start={0} end={checkData? recovered:0} duration={2.5} separator=","/></div>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Total Number of People recovered from Covid-19 
                                    <br/>
                                    Unresolved Cases <strong><CountUp start={0} end={checkData? unresolved:0} duration={2.5} separator=","/></strong> 
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={3}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2020/03/30/899831-capture-photo.jpg"
                                title="Corona Deaths"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Deaths <div className="Case-Container3"><CountUp start={0} end={checkData? deaths:0} duration={2.5} separator=","/></div>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Total Number of casualties caused by Covid-19 
                                    <br/>
                                    Serious Cases <strong><CountUp start={0} end={checkData? serious:0} duration={2.5} separator=","/></strong>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    
                    </Grid>
                </Grid>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>

            <br/>
            <br/>
            <br/>

            <Grid container spacing={3}>
            
                <Grid item xs={1}></Grid>

                <Grid item xs={10}> <Chart /> </Grid>

                <Grid item xs={1}></Grid>
            
            </Grid>
        </div>
    )
}

export default Cards;

        // <CountUp start={0} end={cases} duration={2.5}/>

        //Active cases <NumberFormat value={active} displayType={'text'} thousandSeparator={true} />