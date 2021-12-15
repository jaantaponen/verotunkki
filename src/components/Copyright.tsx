import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Stack} from '@mui/material';

const Copyright = () => {
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            width={"sm"}
            sx={{ pt: 2 }}
        >
            <Typography alignSelf="center" align="center" component="p" sx={{ pt: 4 }}>
                Tarkista tiedot aina itse virheiden varalta.
            </Typography>
            <Typography alignSelf="center" align="center" component="p" sx={{ pt: 0 }}>
                Oleta, että tämän sivuston tekijät eivät tiedä mitään veroista.
            </Typography>
            <Typography alignSelf="center" align="center" component="p" sx={{ pt: 0 }}>
                Sivustolle lähettämiäsi tiedostoja käsitellään vain paikallisesti selaimessasi.
            </Typography>
            <Typography variant="body2" sx={{ pt: 2 }} color="text.secondary" align="center" >
                {'Copyright © '}
                <Link color="inherit" href="https://verotunkki.fi/">
                    Verotunkki
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Stack>
    );
}

export { Copyright }
