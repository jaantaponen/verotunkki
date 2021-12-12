import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { DropzoneAreaBase, FileObject } from 'react-mui-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { createTheme, ThemeProvider } from '@mui/material';


export interface Props {
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
                acceptedFiles={['image/*']}
                onAdd={handleFiles}
                onDelete={(fileObj) => console.log('Removed File:', fileObj)}
                onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
                Icon={UploadFileIcon as any}
                dropzoneText={"Pudota CSV-tiedostoja tähän"}
                fileObjects={[]}

            />
        </Container>
    );
}

export { Dropzone }