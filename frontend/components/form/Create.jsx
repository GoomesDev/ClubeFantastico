import React from 'react';
import { Dialog , DialogContent , DialogActions } from '@mui/material'
import { DialogHeader , Title , CreateInput , ActionButton } from "@/styledComponents/styledComponents";

const CreateForm = ({open , handleClose}) => {

        return (
            <Dialog
                open={open}
                fullWidth
            >
                <DialogHeader>
                    <Title>Cadastrar nova leitura</Title>
                </DialogHeader>
                <DialogContent>
                    <CreateInput />
                </DialogContent>
                <DialogActions>
                    <ActionButton alias='submit'/>
                    <ActionButton alias='cancel' action={handleClose}/>
                </DialogActions>
            </Dialog>
        )
}

export default CreateForm