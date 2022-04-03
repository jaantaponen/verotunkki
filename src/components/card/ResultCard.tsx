
import { Alert, Box, Button, createTheme, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ThemeProvider } from '@mui/material';
import { currencyFormatter } from '../tableSettings';
import Tooltip from '@mui/material/Tooltip';
interface Props {
    header: string,
    content: string,
    contentColor: string,
    footer: string,
    footerSecondary: string,
    infoHover: string,
    infoDirection?: "top" | "right" | "bottom" | "left" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined
}


const ResultCard = ({ header, content, footer, footerSecondary, contentColor, infoHover, infoDirection }: Props) => {
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

    const formatCurrency = (value: string) => {
        try {
            return currencyFormatter("EUR").format(Number(value))
        } catch {
            return value
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Tooltip title={infoHover} placement={infoDirection}>
                <Box
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
                        {formatCurrency(content)}
                    </Box>
                    {footer && <Box
                        sx={{
                            color: contentColor,
                            display: 'inline',
                            fontWeight: 'medium',
                            mx: 0.5,
                        }}
                    >
                        {footer}
                    </Box>}
                    <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}>
                        {footerSecondary}
                    </Box>
                </Box>
            </Tooltip>
        </ThemeProvider>)
}

export { ResultCard }