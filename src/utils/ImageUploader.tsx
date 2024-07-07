import { Box, Button } from '@mui/material';
import React, { FC, ChangeEvent } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from '@emotion/styled';

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

interface ImageUploaderProps {
  image: File | null;
  onChange: (file: File) => void;
}

const ImageUploader: FC<ImageUploaderProps> = ({ image, onChange }) => {

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    console.log('filefile',file)
    if (file) {
      onChange(file);
    }
  };

  let imageUrl: string | undefined;
  if (image) {
    try {
      imageUrl = URL.createObjectURL(image);
    } catch (error) {
      console.error('Failed to create object URL:', error);
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box>
        {imageUrl ? (
          <img src={imageUrl} alt="Uploaded" style={{ width: '100%', height: '300px' }} />
        ) : (
          <img src={`${process.env.PUBLIC_URL}/placeholder.png`} alt="Icon" style={{ width: '100%', height: '300px' }} />
        )}
        <Button
          fullWidth
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
      </Box>
    </Box>
  );
};

export default ImageUploader;
