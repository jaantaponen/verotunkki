
import { Alert, Box, Button, createTheme, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ThemeProvider } from '@mui/material';

interface Props {
    header: string,
    content: string,
    contentColor: string,
    footer: string,
    footerSecondary: string,
}


const ResultCard = ({ header, content, footer, footerSecondary, contentColor }: Props) => {
    const theme = createTheme({
        typography: {
            fontSize: 14,
        },
        palette: {
            background: {
                paper: '#fff',
            },
            text: {
                primary: '#173A5E',
                secondary: '#46505A',
            },
            action: {
                active: '#001E3C',
            }
        }
    });
    return (
        <ThemeProvider theme={theme}><Box
            sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 1,
                p: 2,
                minWidth: 350,
            }}
        >
            <Box sx={{ color: 'text.secondary' }}>{header}</Box>
            <Box sx={{ color: 'text.primary', fontSize: 30, fontWeight: 'medium' }}>
                {content}
            </Box>
            <Box
                sx={{
                    color: contentColor,
                    display: 'inline',
                    fontWeight: 'medium',
                    mx: 0.5,
                }}
            >
                {footer}
            </Box>
            <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}>
                {footerSecondary}
            </Box>
        </Box>
        </ThemeProvider>)
}

export { ResultCard }