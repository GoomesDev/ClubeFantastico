import React, { useEffect, useState } from "react"
import { Header , Logo , MiniHeader , HrBar , CustomButton , ActionButton } from "@/styledComponents/styledComponents"
import { Paper , Table , TableBody , TableHead , TableRow, TableCell , Tooltip , IconButton , Dialog , DialogActions , DialogContent} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditNoteIcon from '@mui/icons-material/EditNote'
import CreateForm from "./form/Create"
import { useRouter } from "next/router"
import EditForm from "./form/Edit"

const Homepage = () => {
    const [openCreate, setOpenCreate] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [bookId, setBookId] = useState(null)

    const handleOpenCreate = () => {setOpenCreate(true)}
    const handleOpenEdit = () => {setOpenEdit(true)}
    const handleOpenDelete = (item) => {
        setBookId(item.id)
        setOpenDelete(true)
    }
    const handleCloseDelete = () => {setOpenDelete(false)}

    const router = useRouter()
    const Logout = () => {
        router.push('/')
    }

    const [data, setData] = useState([])

    // GET books
    const getBooks = async() => {
        let url = `http://127.0.0.1:8000/api/books`
        const res = await fetch(url)
        const books = await res.json()
        setData(books)
    }

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
                rating: formValues.rating,
                rereading: formValues.rereading,
                pages: formValues.pages
            }

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

    const handleCloseEdit = () => {
        console.log('Teste de close')
    }


    // Delete books
    const deleteBooks = async() => {
        let url = `http://127.0.0.1:8000/api/delete/${bookId}`
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
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{width: '3%'}}>#</TableCell>
                            <TableCell style={{width: '20%'}}>Livro</TableCell>
                            <TableCell style={{width: '20%'}}>Autor</TableCell>
                            <TableCell style={{width: '12%'}}>Gênero</TableCell>
                            <TableCell style={{width: '5%'}}>Avaliação</TableCell>
                            <TableCell style={{width: '3%'}}>Releitura?</TableCell>
                            <TableCell style={{width: '3%'}}>Páginas</TableCell>
                            <TableCell style={{width: '12%'}}>Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(data) && data.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.book}</TableCell>
                                <TableCell>{item.author}</TableCell>
                                <TableCell>{item.genre}</TableCell>
                                <TableCell>{item.rating}</TableCell>
                                <TableCell>{item.rereading === true ? 'Sim' : 'Não'}</TableCell>
                                <TableCell>{item.pages}</TableCell>
                                <TableCell>
                                    <Tooltip>
                                        <IconButton onClick={handleOpenEdit}>
                                            <EditNoteIcon color="success"/>
                                        </IconButton>

                                        <IconButton onClick={(e) => handleOpenDelete(item)}>
                                            <DeleteIcon color="error"/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <CreateForm open={openCreate} setOpen={setOpenCreate} handleClose={handleCloseCreate}/>

            <EditForm open={openEdit} setOpen={setOpenEdit} handleClose={handleCloseEdit}/>

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