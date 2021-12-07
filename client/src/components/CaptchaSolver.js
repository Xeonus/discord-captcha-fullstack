import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReCAPTCHA from "react-google-recaptcha";
import Header from './../components/Header';
import Title from './../components/Title';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import BalLogo from './../resources/logotype-white.svg';
import BgImage from './../resources/header.png'


function CaptchaSolver(props) {

    const palletType = "dark";
    const mainPrimaryColor = "#ffffff";
    const mainSecondaryColor = "#272936";
    const backgroundColor = "	#091027";
    const paperColor = "#162031";

    const theme = createTheme({
        palette: {
            type: palletType,
            primary: {
                main: mainPrimaryColor
            },
            secondary: {
                main: mainSecondaryColor
            },
            background: {
                default: backgroundColor,
                paper: paperColor
            },

        },
        active_tabStyle: {
            fontSize: 11,
            color: 'white',
            backgroundColor: 'red',
        },
        typography: {
            // Use the system font instead of the default Roboto font.
            fontFamily: [

                'Inter-Variable',
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Helvetica',
                'Arial',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',

            ].join(','),
        },
    });

    const useStyles = makeStyles((theme) => ({
        title: {
            flexGrow: 1,
            flexDirection: "row",
            display: "flex",
            margin: "1px",
            textAlign: 'center',
            align: "center",
        },
        titleBox: {
            flexGrow: 1,
            flexDirection: "column",
            display: "flex",
            justifyContent: 'center',
            textAlign: 'center',
            align: "center",
            alignItems: "center",
        },
        container: {
            paddingTop: theme.spacing(15),
            direction: "column",
            justifyContent: "center",
            alignItems: "center",
            spacing: 2,
        },
        alignItemsAndJustifyContent: {
            direction: 'column',
            alignItems: 'center',
            justifyContent: 'center',

        },
        button: {
            color: "#fff",
            height: "48px",
            minWidth: "200px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            backgroundSize: "200% 100%",
            transition: "all .2s ease-out",
            background: "linear-gradient(90deg,#00f,#f0f,#00f)",
            '&:hover': {
                backgroundPosition: "100% 0",
                boxShadow: "0 4px 15px 0 rgb(255 100 50 / 0%)",
                transition: "all .2s ease-out",
            },
            boxShadow: "0 4px 15px 0 rgb(224 100 61 / 8%)",
            margin: "0",
            border: 0,
        },
        paper: {
            minWidth: '320px',
            textAlign: 'center',
            align: 'center',
            color: '#272936',
            boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.35), 20px 20px 80px #FED533, -20px -20px 80px #EC4899",
            '&:hover': {
                backgroundPosition: "100% 0",
                boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.35), 30px 30px 100px #FED533, -30px -30px 100px #EC4899",
                opacity: "1",
                transition: "all .2s ease-out",
            },
            borderRadius: "22px",
        },
        header: {
            justifyContent: 'center',
            //minHeight: "80px",
            display: "flex",
            alignItems: "center",
            align: "left",
            backgroundImage: `url(${BgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        }
    }));

    const classes = useStyles();
    const [solved, setSolved] = useState(false);
    //Only add this backup static-link if if you have to
    const staticLink = 'https://discord.gg/yourStaticInviteBackupID';
    const discordUrl = 'https://discord.gg/';
    const recaptchaRef = React.useRef();

    //Reload page when captcha is expired
    const handleExpired = () => {
        window.location.reload();
    }

    const handleSimpleClick = async (token) => {
       
        const response = await fetch("/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
            }),
          });
          const data = await response.json();
          console.log("Captcha server-sided validation: ", data["response"]);
          if (data["response"] ==="Successful") {
            setSolved(true);
          } 
    }

    const handleBackendLinkClick = async () => {
    
        const response = await fetch("/discord", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'expires': process.env.EXPIRATION_DURATION,
            }),
          });
          const discordData = await response.json();
          if (discordData.code) {
              console.log("Link", discordUrl + discordData.code)
              window.location.href = discordUrl + discordData.code;
            
          } else {
                //Return Backup-code
                window.location.href = staticLink;
        }
          
    }

    const showLink = () => {
        return (
            <Box maxWidth={320}>
                <Box>
                    <Button className={classes.button} variant="outlined" onClick={handleBackendLinkClick
                    }>Join Discord</Button>
                </Box>
                <Box align="left" p={2}>
                    <Typography color="primary">This is a one-time use invite to join the Balancer Discord server. Further verification steps at server needed!</Typography>
                </Box>

            </Box>
        );
    };

   

    return (
        <div className="CaptchaSolver">

            <ThemeProvider theme={theme} >
                <CssBaseline />
                <Container className={classes.container}>
                    <Grid
                        container
                        display="flex"
                        direction="column"
                        alignItems="center"
                    >
                        <Grid item  >
                            <Paper elevation={3} className={classes.paper}>
                                <Box className={classes.header} align="left">
                                    <Header  >
                                        <img src={BalLogo} alt="Balancer Logo" height="30" />
                                    </Header>
                                </Box>
                                <Box align="left" m={2}>
                                    <Title align="left">Balancer Discord Invite</Title>

                                </Box>
                                <Box align="left" m={2}>
                                    <Typography color="primary">Are you human? Prove it.</Typography>
                                </Box>
                                <Box mt={2} align="center">
                                    <Box pb={3}>

                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey={process.env.REACT_APP_CAPTCHA_KEY}
                                            onChange={handleSimpleClick}
                                            theme="dark"
                                            onExpired={handleExpired}
                                        />

                                    </Box>
                                </Box>
                                <Box mt={2}>
                                    {
                                        solved ?
                                        showLink()
                                        : null
                                    }
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>

        </div>
    );
}

export default CaptchaSolver;
