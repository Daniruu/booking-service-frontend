import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, Collapse, Divider, IconButton, ImageList, ImageListItem, ImageListItemBar, Skeleton, Stack } from '@mui/material';
import { useBusiness } from '../../../../context/BusinessContext';
import BurstModeOutlinedIcon from '@mui/icons-material/BurstModeOutlined';
import ExpandMoreButton from '../../../../components/buttons/ExpandMoreButton/ExpandMoreButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import InputFileUpload from '../../../../components/inputs/InputFileUpload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const BusinessGalleryCard = () => {
    const { business, images, uploadImage, fetchBusinessImages, setPrimaryImage, deleteImage } = useBusiness();
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (business) {
            fetchBusinessImages(business.id);
        }
    }, [business]);

    const handleImageUpload = (file) => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            uploadImage(business.id, formData);
        }
    };

    const handleSetPrimaryImage = (image) => {
        setPrimaryImage(business.id, image.id);
    };

    const handleDeleteImage = (image) => {
        deleteImage(business.id, image);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card elevation={2} sx={{ minWidth: 600, width: '100%' }}>
            <CardHeader 
                avatar={<BurstModeOutlinedIcon />} 
                action={<ExpandMoreButton expand={expanded} onClick={handleExpandClick}/>}
                title='Galeria' 
                subheader='Zarządzanie galerią konta biznesowego'  
                sx={{ '& .MuiCardHeader-action': { marginTop: 0, marginRight: 0, marginBottom: 0, alignSelf: 'center' } }}
            />
            <Divider />
            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                    <Stack direction='column' spacing={2}>
                        <Box sx={{ alignSelf: 'end' }}>
                            <InputFileUpload onChange={handleImageUpload} />
                        </Box>

                        {images?.length > 0 ? (
                            <ImageList
                                sx={{ width: '100%', height: 'auto', maxHeight: 500 }}
                                cols={4}
                                gap={8}
                            >
                                {images.map((image) => (
                                    <ImageListItem key={image.id} sx={{ maxWidth: 200, maxHeight: 200, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                                        <img 
                                            src={`${image.imageUrl}?w=248&fit=crop&auto=format`}
                                            alt='Obraz z galerii'
                                            style={{
                                                objectFit: 'cover',
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '4px',
                                            }}
                                            loading="lazy"
                                        />
                                        <ImageListItemBar
                                            sx={{ 
                                                background:
                                                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                            }}
                                            position='top'
                                            actionIcon={
                                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                                                    <IconButton
                                                        sx={{ color: 'white' }}
                                                        onClick={() => handleSetPrimaryImage(image)}
                                                    >
                                                        {image.isPrimary ? <StarIcon /> : <StarBorderIcon />}
                                                    </IconButton>

                                                    <IconButton
                                                        sx={{ color: 'white' }}
                                                        onClick={() => handleDeleteImage(image)}
                                                    >
                                                        <DeleteOutlineIcon />
                                                    </IconButton>
                                                </Box>
                                            }
                                            actionPosition="left"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        ) : (
                            <Skeleton variant='rounded' width={'100%'} height={200} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                Brak obrazów w galerii
                            </Skeleton>
                        )}
                    </Stack>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default BusinessGalleryCard;
