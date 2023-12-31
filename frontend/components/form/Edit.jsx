import React, { useState } from 'react';
import { Dialog , DialogContent } from '@mui/material'
import { DialogHeader , Title } from "@/styledComponents/styledComponents"
import { EditInput } from '../hooks/EditInput';

const EditForm = ({open, setOpen, handleClose, bookId, changedBook}) => {

        return (
            <Dialog
                open={open}
                fullWidth
            >
                <DialogHeader>
                    <Title>Editar livro: #{bookId}</Title>
                </DialogHeader>
                <DialogContent>
                    <EditInput 
                        setOpen={setOpen} 
                        handleClose={handleClose} 
                        changedBook={changedBook}
                        bookId={bookId}
                    />
                </DialogContent>
            </Dialog>
        )
}

export default EditForm