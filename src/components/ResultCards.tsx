import { Stack } from '@mui/material'
import { ResultCard } from './card/ResultCard'
import { calculatedResultsType } from './PreviewData'


const ResultCards = ({ results }: { results: calculatedResultsType }) => {
    return (
        <Stack direction="column" alignItems="center" justifyContent="center" spacing={2} sx={{ pb: 4 }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                <ResultCard header="Luovutusvoitto"
                    content={results.capitalGains.toFixed(2)}
                    footer="Voitot" footerSecondary="yhteensä"
                    contentColor="success.light"
                    infoHover='Luovutusvoittoa syntyy tilanteessa, jossa luovutetun omaisuuden myyntihinta ylittää sen hankintamenon ja voiton hankkimisesta aiheutuneet menot.'
                    infoDirection='left'
                />
                <ResultCard header="Luovutustappio"
                    content={results.capitalLosses.toFixed(2)}
                    footer="Häviöt"
                    footerSecondary="yhteensä"
                    contentColor="error.light"
                    infoHover='Luovutustappiota puolestaan syntyy tilanteessa, jossa luovutetun omaisuuden myyntihinta alittaa sen hankintamenon ja voiton hankkimisesta aiheutuneet menot.'
                    infoDirection='right'
                />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                <ResultCard header="Hankintakulut yhteensä"
                    content={results.acquisitionFees.toFixed(2)}
                    footer=""
                    footerSecondary="Hankintahinnat + hankinnasta aiheutuneet kulut"
                    contentColor="error.light"
                    infoHover='Arvopaperien hankintakulut eli niiden hankintahinnat ja muut hankinnasta aiheutuneet kulut yhteensä.'
                    infoDirection='left'
                />
                <ResultCard header="Myyntihinnat yhteensä"
                    content={results.sellprices.toFixed(2)}
                    footer=""
                    footerSecondary="Myyntihinnat - myynnistä aiheutuneet kulut"
                    contentColor={results.sellprices > 0 ? 'success.light' : 'error.light'}
                    infoHover='Kaikkien vuoden aikana myymiesi arvopaperien myyntihinnat yhteensä eli myyntihintojen ja myynnistä aiheutuneiden kulujen erotus. Myynnistä aiheutuneita kuluja ovat esimerkiksi välityspalkkiot.'
                    infoDirection='right'
                />
            </Stack>
        </Stack>)
}

export default ResultCards