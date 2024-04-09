import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DirectoriesService } from '../services/directories.services';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const Remoter = () => {
    const [path, setPath]= useState('')
    const [files, setFiles] = useState<IFile[]>([])
    const [search, setSearch] = useState('')

    const handle = async () => {
        const res = await DirectoriesService.getInitialDirectory()
        setPath(res.path)
    }

    const contents = async () => {
        const res = await DirectoriesService.getDirectoryContents(path)
        const sortedContents = res.contents?.sort((a, b) => {
            if (a.isDirectory && !b.isDirectory) {
                return -1;
            }
            if (!a.isDirectory && b.isDirectory) {
                return 1;
            }
            return 0;
        });
        setFiles(sortedContents);
    }

    const parent = async () => {
        const res = await DirectoriesService.goToParentDirectory(path)
        setPath(res.path)
    }

    const folder = async (folder:string) => {
        // const res = await DirectoriesService.openDirectory(`${path}/${folder}`)
        setPath(`${path}/${folder}`)
    }

    useEffect(() => {
        handle()
        // folder()
    },[])

    useEffect(() => {
        contents()
    },[path])
    console.log('filesss',files)
    return (
        <Box sx={{marginTop:'20px'}}>
            <Box sx={{display:'flex', gap:'20px', alignItems:'center'}}>
                <IconButton onClick={() => parent()}>
                    <ArrowBackIcon sx={{color:'white'}}/>
                </IconButton>
                <Typography variant='h6' align='center'>{path}</Typography>
            </Box>
            {/* <TextField id="outlined-basic" label="Outlined" variant="standard" sx={{color:'white'}} value={search} onChange={(e) => setSearch(e.target.value)}/> */}
            <List>
                {files?.map((item,index) => 
                <ListItem key={index} >
                    <ListItemButton sx={{margin:0,padding:0}} onClick={() => item.isDirectory && folder(item.name)}>
                        <ListItemIcon>
                            {item.isDirectory ?
                            <FolderIcon sx={{color:'white'}}/>
                            :
                            <InsertDriveFileIcon sx={{color:'white'}}/>
                            }
                        </ListItemIcon>
                        <ListItemText
                            primary={item.name}
                        />
                    </ListItemButton>
                </ListItem>
                )}

            </List>
        </Box>
    );
};

export default Remoter;