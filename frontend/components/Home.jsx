import React, { useEffect, useState } from "react"
import { Header , Logo , MiniHeader , HrBar , CustomButton , ActionButton , TableTitle , TableItem } from "@/styledComponents/styledComponents"
import { Paper , Table , TableBody , TableHead , TableRow, TableCell , Tooltip , IconButton , Dialog , DialogActions , DialogContent , Rating } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditNoteIcon from '@mui/icons-material/EditNote'
import CreateForm from "./form/Create"
import { useRouter } from "next/router"
import EditForm from "./form/Edit"

const Homepage = () => {

    // Router
    const router = useRouter()
    const userId = router.query
    const user_id = parseInt(userId.user_id)
    const Logout = () => {
        router.push('/')
    }
    console.log(user_id)

    const [openCreate, setOpenCreate] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [bookId, setBookId] = useState(null)
    const [changedBook, setChangedBook] = useState([])

    const handleOpenCreate = () => {setOpenCreate(true)}

    const handleOpenEdit = (item) => {
        setBookId(item.id)
        setChangedBook({
            book: item.book,
            author: item.author,
            genre: item.genre,
            rating: item.rating,
            rereading: item.rereading,
            pages: item.pages
        })
        setOpenEdit(true)
    }

    const handleOpenDelete = (item) => {
        setBookId(item.id)
        setOpenDelete(true)
    }
    const handleCloseDelete = () => {setOpenDelete(false)}

    const [data, setData] = useState([])

    // GET books
    const getBooks = async() => {
        let url = `http://127.0.0.1:8000/api/books/${user_id}`
        const res = await fetch(url)
        const books = await res.json()
        setData(books)
    }

    console.log('Books', data)

    useEffect(() => {
        getBooks()
    }, [])

    const handleCloseCreate = (formValues) => {
        setOpenCreate(false)
        
        // POST books
        const postBook = async() => {

            let body = {
                book: formValues.book,
                author: formValues.author,
                genre: formValues.genre,
                rating: parseFloat(formValues.rating),
                rereading: formValues.rereading,
                pages: formValues.pages,
                user_id,
            }
            console.log(body)

            let url = `http://127.0.0.1:8000/api/create-book`
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            if (res.status === 200) {
                const newBook = await res.json();
                getBooks()
                console.log('Livro cadastrado com sucesso!', newBook)
            } else {
                console.log('Ocorreu algum erro!')
            }
        }
        postBook()
    }

    const handleCloseEdit = (editedBook) => {
        console.log('Teste de close', editedBook)
        setOpenEdit(false)

        // PUT book
        let body = {
            book: editedBook.book,
            author: editedBook.author,
            genre: editedBook.genre,
            rating: parseFloat(editedBook.rating),
            rereading: editedBook.rereading !== null ? editedBook.rereading : 0,
            pages: editedBook.pages,
            user_id
        }

        const editBook = async() => {
            let url = `http://127.0.0.1:8000/api/edit-book/${editedBook.id}`
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            if (res.status === 200) {
                const book = await res.json();
                getBooks()
                console.log('Leitura editada com sucesso!', book)
            } else {
                console.log('Ocorreu algum erro!')
            }
        }
        editBook()
    }


    // Delete books
    const deleteBooks = async() => {
        let url = `http://127.0.0.1:8000/api/delete/${bookId}/${user_id}`
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if(res.status === 200) {
            const delBook = await res.json()
            console.log('Livro deletado com sucesso!', delBook)
            getBooks()
            handleCloseDelete()
        } else {
            console.log('Ocorreu algum erro!')
        }
    }

    return (
        <>
            <Header>
                <Logo />
                <MiniHeader>
                    <CustomButton alias='info' />
                    <CustomButton alias='create' action={handleOpenCreate}/>
                    <CustomButton alias='logout' action={Logout}/>
                </MiniHeader>
            </Header>

            <HrBar />

            <Paper style={{margin: '10px'}}>
                <Table size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableTitle style={{width: '30%'}}>Livro</TableTitle>
                            <TableTitle style={{width: '20%'}}>Autor</TableTitle>
                            <TableTitle style={{width: '12%'}}>Gênero</TableTitle>
                            <TableTitle style={{width: '5%'}}>Avaliação</TableTitle>
                            <TableTitle style={{width: '3%'}}>Releitura?</TableTitle>
                            <TableTitle style={{width: '3%'}}>Páginas</TableTitle>
                            <TableTitle style={{width: '12%'}}>Opções</TableTitle>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(data) && data.map(item => (
                            <TableRow key={item.id}>
                                <TableItem>{item.book}</TableItem>
                                <TableItem>{item.author}</TableItem>
                                <TableItem>{item.genre}</TableItem>
                                <TableItem>
                                    <Rating readOnly value={item.rating} precision={0.5} size="small"/>
                                </TableItem>
                                <TableItem>{item.rereading === 1 ? 'Sim' : 'Não'}</TableItem>
                                <TableItem>{item.pages}</TableItem>
                                <TableItem>
                                    <Tooltip title='Editar leitura'>
                                        <IconButton onClick={(e) => handleOpenEdit(item)}>
                                            <EditNoteIcon color="success"/>
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title='Apagar leitura'>
                                        <IconButton onClick={(e) => handleOpenDelete(item)}>
                                            <DeleteIcon color="error"/>
                                        </IconButton>
                                    </Tooltip>
                                </TableItem>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <CreateForm 
                open={openCreate} 
                setOpen={setOpenCreate} 
                handleClose={handleCloseCreate}
            />

            <EditForm 
                open={openEdit} 
                setOpen={setOpenEdit} 
                handleClose={handleCloseEdit} 
                bookId={bookId} 
                changedBook={changedBook}
            />

            <Dialog
                open={openDelete}
                style={{textAlign: 'center'}}
            >
                <DialogContent>
                    <h4>Tem certeza que deseja excluir essa leitura?</h4>
                </DialogContent>
                
                <DialogActions>
                    <ActionButton alias='yes' action={deleteBooks}/>
                    <ActionButton alias='no' action={handleCloseDelete}/>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Homepage