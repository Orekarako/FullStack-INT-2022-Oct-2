import React, { useState } from "react"
import { ImageCategory } from "./imgBoxSlice"
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
    selectImage,
    addNewImage,
    updateImage,
    deleteImage
} from "./imgBoxSlice"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Paper, PaperProps, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import theme from "../../theme"
import { DeleteForever } from "@mui/icons-material";
import Draggable from 'react-draggable';
interface updateImageByIDProps {
    id: string
}

export const AddImage = () => {
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const [category, setCategory] = useState<string>('');



    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    const handleClickAddImg = () => open ? setOpen(false) : setOpen(true); 

    const handleSubmitAddImg = (ev: any) => {
        ev.preventDefault()
        try {
            const name = ev.target.elements.name.value;
            const src = ev.target.elements.src.value
            if (!name) throw new Error("no name")
            if (!src) throw new Error("no name")
            // if (!category) throw new Error("no category")
            const payload = { name: `${name}`, src: `${src}`, id: `${Math.ceil(Math.random() * 99999)}`, category: `${category}` };
            dispatch(addNewImage(payload))
            setOpen(false)
            ev.target.reset()

        } catch (error) {
            console.error(error)
        }
    }


    const CategoryList = Object.values(ImageCategory);
    for (const value of CategoryList)


        return (
            <Box >
                <Button variant="contained" onClick={handleClickAddImg}>הוסף תמונה מקישור</Button>
                <Box m={3} color={theme.palette.primary.main}
                    sx={{
                        border: "1px solid ",
                        zIndex: "999",
                        padding: "25px",
                        backgroundColor: "rgba(255, 255, 255, 0.9);",
                        position: "absolute",
                        right: 50,
                        display: open ? 'block' : 'none',


                    }}>
                    <Typography variant="h6">הוסף תמונה חדשה</Typography>
                    <Box m={3} color={theme.palette.primary.main}
                        component="form"
                        onSubmit={() => { handleSubmitAddImg(event) }}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "14px"

                        }}>


                        <TextField dir="rtl" id="name"
                            label="שם לתמונה"
                            type="text"
                            placeholder="הכנס/י שם..."
                            multiline
                            maxRows={4}
                            variant="outlined"
                        />
                        <TextField dir="rtl" id="src"
                            label="קישור לתמונה"
                            maxRows={4}
                            type="text"
                            placeholder="הכנס/י קישור לתמונה...."
                            multiline
                            variant="outlined" />

                        <FormControl fullWidth  >
                            <InputLabel id="albumsCategory-label">אלבומים</InputLabel>
                            <Select
                                labelId="albumsCategory-label"
                                id="category"
                                value={category}
                                label="Category"
                                onChange={handleChange}
                            >
                                {CategoryList.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}

                            </Select>
                        </FormControl>

                        <Button  variant="contained" type="submit" endIcon={<SendIcon />}>
                            הוסף
                        </Button>

                    </Box>
                </Box>

            </Box>


        )
}

export const UpdateImageByID: React.FC<updateImageByIDProps> = ({ id }) => {
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const [category, setCategory] = useState<string>('');
    // const images = useAppSelector(selectImage)


    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };
    const handleClickAddImg = () => open ? setOpen(false) : setOpen(true);

    const handleSubmitAddImg = (ev: any) => {
        ev.preventDefault()
        try {
            const name = ev.target.elements.name.value
            const src = ev.target.elements.src.value
            const categoryValue = ev.target.elements[6].value
            console.log(category)
            const payload = { name: `${name}`, src: `${src}`, id: `${id}`, category: categoryValue };
            dispatch(updateImage(payload))
            setOpen(false)
            ev.target.reset()

        } catch (error) {
            console.error(error)
        }
    }
    const images = useAppSelector(selectImage).images
    const getImageByID = images.find(image => image.id === id)
    if (!getImageByID) return
    const CategoryList = Object.values(ImageCategory);
    for (const value of CategoryList)

        return (
            <Box dir="rtl" sx={{
                minWidth: "100%",
                minHeight: "100%"
            }}>
                <Button variant="text" onClick={handleClickAddImg}>
                    <SystemUpdateAltIcon />
                </Button>
                <Box color={theme.palette.primary.main}
                    sx={{
                        zIndex: 999,
                        border: "1px solid ",

                        position: "absolute",
                        top: 0,
                        left: 0,
                        minWidth: "100%",
                        minHeight: "100%",
                        backgroundColor: "#fff",
                        width: "inherit",
                        height: "inherit",
                        display: open ? 'block' : 'none',


                    }}>
                    <Typography variant="h6">עדכן תמונה</Typography>
                    <Box m={3} color={theme.palette.primary.main}
                        component="form"
                        onSubmit={() => { handleSubmitAddImg(event) }}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "14px"

                        }}>
                        <TextField id="name"
                            label="שם תמונה"
                            defaultValue={getImageByID.name}

                            type="text"
                            placeholder="הכנס/י שם...."
                            multiline
                            maxRows={4}
                            variant="outlined"
                        />
                        <TextField id="src"
                            label="קישור לתמונה"
                            defaultValue={getImageByID.src}
                            type="text"
                            placeholder="הכנס/י קישור לתמונה"
                            multiline
                            maxRows={4}
                            variant="outlined" />

                        <FormControl fullWidth  >
                            <InputLabel id="albumsCategory-label">אלבומים</InputLabel>
                            <Select
                                labelId="albumsCategory-label"
                                id="category"
                                defaultValue={getImageByID.category}
                                label="Category"
                                onChange={handleChange}
                            >
                                {CategoryList.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}

                            </Select>
                        </FormControl>

                        <Button dir="ltr" variant="contained" type="submit" endIcon={<SendIcon />}>
                            עדכן
                        </Button>

                    </Box>
                </Box>

            </Box>


        )
}

export const DeleteImageByID: React.FC<updateImageByIDProps> = ({ id }) => {
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch()


    const handleClickOpenAlert = () => open ? setOpen(false) : setOpen(true);

    const handleSubmitDeleteImage = () => {
        try {
        
            dispatch(deleteImage({id}))
            handleClickOpenAlert()

        } catch (error) {
            console.error(error)
        }
    }

    function PaperComponent(props: PaperProps) {
        return (
          <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
          >
            <Paper {...props} />
          </Draggable>
        );
      }
        return (
            <Box sx={{
                minWidth: "100%",
                minHeight: "100%"
            }}>
                <Button variant="text" onClick={handleClickOpenAlert}>
                    <DeleteForever />
                </Button>
                <Dialog
        open={open}
        onClose={handleClickOpenAlert}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle dir="rtl" style={{ cursor: 'move' }} id="draggable-dialog-title">
            מחיקה
        </DialogTitle>
        <DialogContent>
          <DialogContentText dir="rtl">
          האם אתה בטוח רוצה למחוק את התמונה ?
          </DialogContentText>
        </DialogContent>
        <DialogActions dir="rtl">
          <Button autoFocus onClick={handleClickOpenAlert}>
            בטל
          </Button>
          <Button  onClick={handleSubmitDeleteImage}>מחק</Button>
        </DialogActions>
      </Dialog>
                        
               
                </Box>


        )
}



