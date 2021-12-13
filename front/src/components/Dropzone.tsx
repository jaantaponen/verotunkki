import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { DropzoneAreaBase, FileObject } from 'react-mui-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { createTheme, ThemeProvider } from '@mui/material';


interface Props {
    zoneHeight: number, 
    handleFiles: (arg0: FileObject[]) => void;
}

const Dropzone = ({ zoneHeight, handleFiles }: Props) => {
    /***
     * 
     * TODO REFACTOR ZONEHEIGHT INTO ENUM/BETTER LOGIC
     */

    return (
        <Container sx={{
            pt: 4, pb: 3,
            width: "100%",
            '& .MuiDropzoneArea-textContainer': {
                color: 'black'
            },
            '& .MuiDropzoneArea-text': {
                paddingTop: zoneHeight > 200 ? 8 : 4,
                fontSize: 20,
            },
            '& .MuiDropzoneArea-root': {
                height: zoneHeight,
            },
        }}>
            <DropzoneAreaBase
                acceptedFiles={['.csv', 'image/*','application/vnd.ms-excel']}
                onAdd={handleFiles}
                onDelete={(fileObj) => console.log('Removed File:', fileObj)}
                onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
                Icon={UploadFileIcon as any}
                dropzoneText={zoneHeight > 200 ? "Pudota CSV-tiedostoja tähän" : "Pudota lisää CSV-tiedostoja tähän"}
                fileObjects={[]}

            />
        </Container>
    );
}

export { Dropzone }