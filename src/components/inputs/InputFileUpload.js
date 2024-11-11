import React from 'react';
import { Button, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
  
const InputFileUpload = ({ onChange, variant='contained', loading }) => {
    return (
      <LoadingButton
        component='label'
        variant={variant}
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        loading={loading}
        loadingPosition='start'
        sx={{ textTransform: 'none' }}
      >
        Prześlij plik
        <VisuallyHiddenInput
          type='file'
          onChange={(e) => onChange(e.target.files[0])}
        />
      </LoadingButton>
    );
}

export default InputFileUpload;