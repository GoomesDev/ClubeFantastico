import React, { useState } from 'react';
import { Dialog , DialogContent } from '@mui/material'
import { DialogHeader , Title , ErrorInput } from "@/styledComponents/styledComponents"
import { CreateInput } from '../hooks/CreateInput';

const CreateForm = ({open, setOpen, handleClose}) => {

    const [openAlert, setOpenAlert] = useState(false)
    const handleOpenAlert = () => {
        setOpenAlert(true)
    }
    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

        return (
            <Dialog
                open={open}
                fullWidth
            >
                <DialogHeader>
                    <Title>Cadastrar nova leitura</Title>
                </DialogHeader>
                <DialogContent>
                    <CreateInput setOpen={setOpen} handleClose={handleClose} handleOpenAlert={handleOpenAlert}/>
                </DialogContent>
                <ErrorInput open={openAlert} handleClose={handleCloseAlert} />
            </Dialog>
        )
}

export default CreateForm