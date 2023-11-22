import {TextField , Checkbox , Select, MenuItem , Rating } from '@mui/material'
import { ActionButton } from '@/styledComponents/styledComponents'
import { useRef, useState } from "react"

export const EditInput = ({handleClose , setOpen}) => {

    const closeDialog = () => {setOpen(false)}

    return (
        <div style={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            gap : '12px',
            placeItems: 'center',
            margin: 'auto'
        }}>
            <TextField
                style={{width: '100%'}}
                variant="outlined"
                label="Nome do Livro"
                size="small"
            />
            <div style={{width: '100%' ,display: 'flex', justifyContent: 'space-between'}}>
                <TextField
                    variant="outlined"
                    label="Autor"
                    size="small"
                />
                <Select
                    defaultValue='genero'
                    variant="outlined"
                    size="small"
                    style={{width: '50%'}}
                >
                    <MenuItem value='genero' disabled>Gênero</MenuItem>
                    <MenuItem value='Fantasia'>Fantasia</MenuItem>
                    <MenuItem value='Ficção Científica'>Ficção Científica</MenuItem>
                    <MenuItem value='Horror'>Horror</MenuItem>
                    <MenuItem value='Thriller'>Thriller</MenuItem>
                </Select>
            </div>
            <div style={{width: '100%' ,display: 'flex', justifyContent: 'space-between', placeItems: 'center'}}>
                <div>
                    <h5 style={{margin: 0}}>Avaliação</h5>
                    <Rating
                        precision={0.5}
                        label="Avaliação"
                        onChange={null}
                    />
                </div>
                <div>
                    <h5 style={{margin: 0}}>Releitura?</h5>
                    <Checkbox
                        onChange={() => {}}
                        size="small"
                    />
                </div>
                <TextField
                    style={{width: '20%'}}
                    type="number"
                    variant="standard"
                    label="Qtd páginas"
                    size="small"
                />
            </div>
            <div
                style={{
                    width: '100%',
                    marginTop: '35px',
                    display: 'flex',
                    gap: '10px',
                    placeItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                <ActionButton alias='submit' action={null}/>
                <ActionButton alias='cancel' action={closeDialog}/>
            </div>
        </div>
    )
}