import { Fragment } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Copyright } from './Copyright'
import Typography from '@mui/material/Typography';
import { CardActionArea, createTheme, Paper, Stack, styled, ThemeProvider } from '@mui/material';

const FrontPageContent = () => {
    const navigate = useNavigate();
    const theme = createTheme({
        typography: {
            fontSize: 14,
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ pt: 8, pb: 4 }}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={6}
                    width="sm"

                >
                    <Typography
                        component="h1"
                        variant="h3"
                        align="center"
                        color="text.primary"
                        gutterBottom
                        sx={{ fontWeight: 'bold', pt: 8 }}
                    >
                        VEROTUNKKI
                    </Typography>
                    <Typography alignSelf="center" align="center" variant="h6" sx={{ pt: 3 }} component="p">
                        Verotunkki laskee puolestasi luovutusvoitot ja -tappiot, ja ulostaa verottajayhteensopivan
                        rapsan. Hyvä elämä vittu
                    </Typography>
                    <Typography alignSelf="center" variant="h6" component="p" sx={{ pt: 2 }}>
                        Valitse verotettavan tulon tyyppi:
                    </Typography>
                    <Card sx={{ width: 450 }} onClick={() => {
                        navigate("/crypto");
                    }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Virtuaalivaluutat
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Perus hyvä Ethereum.
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Tuetut lähteet: <b>Coinbase, Coinbase Pro</b>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card sx={{ width: 450 }} onClick={() => {
                        navigate("/securities");
                    }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Arvopaperit
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Osakkeet ETF:t, rahastot ja muut arvopaperit.
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Tuetut lähteet: <b>Degiro, Nordnet</b>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Stack>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}

export { FrontPageContent as Frontpage }
