import {TextField , Checkbox , Select, MenuItem , Rating } from '@mui/material'
import { ActionButton } from '@/styledComponents/styledComponents'
import { useRef, useState } from "react"

export const EditInput = ({handleClose , setOpen, changedBook, bookId}) => {

    const [editedBook, setEditedBook] = useState({
        id: bookId,
        book: changedBook.book || '',
        author: changedBook.author || '',
        genre: changedBook.genre || '',
        rating: changedBook.rating || null,
        rereading: changedBook.rereading || null,
        pages: changedBook.pages || null
    })

    const closeDialog = () => {
        setOpen(false)
    }

    const handleInputChange = (type, value) => {
        setEditedBook(prevState => ({
            ...prevState,
            [type]: value
        }))
    }

    const handleSubmit = () => {
        // Error's manipulation
        if(editedBook.book === '') {
            console.log('PREENCHA TODOS OS CAMPOS!')
        } else if(editedBook.author === '') {
            console.log('PREENCHA TODOS OS CAMPOS!')
        } else if(editedBook.genre === '') {
            console.log('PREENCHA TODOS OS CAMPOS!')
        } else if(editedBook.pages === '' || editedBook.pages === null) {
            console.log('PREENCHA TODOS OS CAMPOS!')
        } else {
            handleClose(editedBook)
        }
    }

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
                value={editedBook.book}
                onChange={(e) => handleInputChange('book', e.target.value)}
            />
            <div style={{width: '100%' ,display: 'flex', justifyContent: 'space-between'}}>
                <TextField
                    variant="outlined"
                    label="Autor"
                    size="small"
                    value={editedBook.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                />
                <Select
                    defaultValue='genero'
                    variant="outlined"
                    size="small"
                    style={{width: '50%'}}
                    value={editedBook.genre}
                    onChange={(e) => handleInputChange('genre', e.target.value)}
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
                        value={editedBook.rating}
                        onChange={(e) => handleInputChange('rating', e.target.value)}
                    />
                </div>
                <div>
                    <h5 style={{margin: 0}}>Releitura?</h5>
                    <Checkbox
                        size="small"
                        value={editedBook.rereading}
                        checked={editedBook.rereading}
                        onChange={(e) => handleInputChange('rereading', e.target.checked ? 1 : 0)}
                    />
                </div>
                <TextField
                    style={{width: '20%'}}
                    type="number"
                    variant="standard"
                    label="Qtd páginas"
                    size="small"
                    value={editedBook.pages}
                    onChange={(e) => handleInputChange('pages', e.target.value)}
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
                <ActionButton alias='submit' action={handleSubmit}/>
                <ActionButton alias='cancel' action={closeDialog}/>
            </div>
        </div>
    )
}