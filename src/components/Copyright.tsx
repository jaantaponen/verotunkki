import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

const Copyright = () => {
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            width={"sm"}
            sx={{ pt: 1, pb: 4 }}
        >
            <Typography variant="body2" sx={{ pt: 4 }} color="text.secondary" align="center" >
                Tarkista tiedot aina itse virheiden varalta.
            </Typography>
            <Typography variant="body2" sx={{ pt: 0 }} color="text.secondary" align="center" >
                Olet itse vastuussa omista veroistasi.
            </Typography>
            <Typography variant="body2" sx={{ pt: 0 }} color="text.secondary" align="center" >
                Sivustolle lähettämiäsi tiedostoja käsitellään vain paikallisesti selaimessasi.
            </Typography>
            <Typography variant="body2" sx={{ pt: 4 }} color="text.secondary" align="center" >
                Huomasitko virheen tai sivusto ei toimi mielestäsi oikein? Ilmoita ongelmastasi&nbsp;
                <Link href="https://github.com/jaantaponen/verotunkki/issues/new">täällä</Link>
            </Typography>
            <Typography variant="body2" sx={{ pt: 0 }} color="text.secondary" align="center" >
                {'Copyright © '}
                <Link color="inherit" href="https://jaantaponen.github.io/verotunkki/">
                    Verotunkki
                </Link>{' '}
                {new Date().getFullYear()}
                {'. '}
                <Link color="inherit" href="https://github.com/jaantaponen/verotunkki/">
                    GitHub
                </Link>{' '}

            </Typography>
        </Stack>
    );
}

export { Copyright }
