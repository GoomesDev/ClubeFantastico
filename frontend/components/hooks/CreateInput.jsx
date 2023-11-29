import {TextField , Checkbox , Select, MenuItem , Rating } from '@mui/material'
import { ActionButton } from '@/styledComponents/styledComponents'
import { useRef, useState } from "react"

export const CreateInput = ({handleClose , handleOpenAlert , setOpen}) => {

    const closeDialog = () => {setOpen(false)}

    const [formValues, setFormValues] = useState({
        book: '',
        author: '',
        genre: '',
        rereading: null,
        pages: null,
    })

    const [rating, setRating] = useState(0)

    const [bookRef, authorRef, genreRef, rereadingRef, pagesRef] = [useRef(), useRef(), useRef(), useRef(), useRef()]

    const handleForm = () => {
        const [book, author, genre, rereading, pages] = [
            bookRef.current.value,
            authorRef.current.value,
            genreRef.current.value,
            rereadingRef.current.checked ? 1 : 0,
            pagesRef.current.value
        ]

        setFormValues({ book, author, genre, rating, rereading, pages })

        // Error's manipulation
        if(book === '') {
            console.log('PREENCHA TODOS OS CAMPOS!')
            handleOpenAlert()
        } else if(author === '') {
            console.log('PREENCHA TODOS OS CAMPOS!')
            handleOpenAlert()
        } else if(genre === '') {
            console.log('PREENCHA TODOS OS CAMPOS!')
            handleOpenAlert()
        } else if(pages === '' || pages === null) {
            console.log('PREENCHA TODOS OS CAMPOS!')
            handleOpenAlert()
        } else {
            handleClose({ book, author, genre, rating, rereading, pages })
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
                inputRef={bookRef}
                size="small"
            />
            <div style={{width: '100%' ,display: 'flex', justifyContent: 'space-between'}}>
                <TextField
                    variant="outlined"
                    label="Autor"
                    inputRef={authorRef}
                    size="small"
                />
                <Select
                    defaultValue='genero'
                    variant="outlined"
                    inputRef={genreRef}
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
                        inputRef={rating}
                        onChange={(rating, newRating) => {setRating(newRating)}}
                    />
                </div>
                <div>
                    <h5 style={{margin: 0}}>Releitura?</h5>
                    <Checkbox
                        onChange={() => {}}
                        inputRef={rereadingRef}
                        size="small"
                    />
                </div>
                <TextField
                    style={{width: '20%'}}
                    type="number"
                    variant="standard"
                    label="Qtd páginas"
                    inputRef={pagesRef}
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
                <ActionButton alias='submit' action={handleForm}/>
                <ActionButton alias='cancel' action={closeDialog}/>
            </div>
        </div>
    )
}