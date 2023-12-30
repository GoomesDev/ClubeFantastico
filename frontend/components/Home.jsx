import React, { useEffect, useState } from "react"
import { 
    Header,
    Logo,
    MiniHeader,
    CustomButton,
    ActionButton,
    TableTitle,
    TableItem,
    Moldure
} from "@/styledComponents/styledComponents"
import {
    Paper,
    Table,
    TableBody,
    TableHead,
    TableRow,
    Tooltip,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    Rating,
    TextField,
    Pagination
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditNoteIcon from '@mui/icons-material/EditNote'
import CreateForm from "./form/Create"
import { useRouter } from "next/router"
import EditForm from "./form/Edit"
import { useSpring, animated } from "react-spring"
import styled from "styled-components"
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

const CustomPaper = styled(Paper)({
    margin: '10px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
})

const Container = styled.div`
    width: 25%;
    display: flex;
    justify-content: space-between;
    margin: 5px;
`

const Homepage = () => {

    // Router
    const router = useRouter()
    const userId = router.query
    const user_id = parseInt(userId.user_id)
    const Logout = () => {
        router.push('/')
    }

    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [openCreate, setOpenCreate] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [bookId, setBookId] = useState(null)
    const [changedBook, setChangedBook] = useState([])
    const [expanded, setExpanded] = useState(false)
    const [visibility, setVisibility] = useState(false)
    const [stats, setStats] = useState([])
    const [achievementBadge, setAchievementBadge] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

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

    // Info animation
    const expandInfo = useSpring({
        height: expanded ? 100 : 0,
        visibility: visibility ? 'visible' : 'hidden',
        config: {duration: 100}
    })

    const handleAnimate = () => {
        setExpanded(!expanded)
        setVisibility(!visibility)
        achievement()
        userStats()
    }

    // GET books
    const getBooks = async() => {
        let url = `http://127.0.0.1:8000/api/books/${user_id}?page=${page}`
        const res = await fetch(url)
        const books = await res.json()
        setData(books)
        if (books.data) {
            setFilterData(books.data.filter(book => book.book.toLowerCase().includes(search) || book.author.toLowerCase().includes(search)))
        }
    }

    useEffect(() => {
        getBooks()
    }, [user_id, search, page])

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
            } else {
                console.log('Ocorreu algum erro!')
            }
        }
        postBook()
    }

    const handleCloseEdit = (editedBook) => {
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
            getBooks()
            handleCloseDelete()
        } else {
            console.log('Ocorreu algum erro!')
        }
    }

    const userStats = async() => {
        let url = `http://127.0.0.1:8000/api/user/total-pages/${user_id}`
        const res = await fetch(url)
        const stats = await res.json()
        setStats(stats)
    }

    const achievements = [
        { threshold: 100000, badge: 'Bibliotecário' },
        { threshold: 50000, badge: 'Booktuber' },
        { threshold: 25000, badge: 'Amante dos calhamaços' },
        { threshold: 20000, badge: 'Colecionador' },
        { threshold: 15000, badge: 'Leitor de trilogias' },
        { threshold: 10000, badge: 'Primeira estante' },
        { threshold: 5000, badge: 'Entusiasta' },
        { threshold: 2500, badge: 'Prefere filmes a livros' },
        { threshold: 2000, badge: 'Leitor Crepúsculo' },
        { threshold: 1500, badge: 'Modinha' },
        { threshold: 1000, badge: 'Iniciante' },
        { threshold: 500, badge: 'Amador' },
        { threshold: 100, badge: 'Principiante' },
        { threshold: 0, badge: 'Pato' },
      ]
      
      const calculateAchievementBadge = (totalPages) => {
        for (const { threshold, badge } of achievements) {
          if (totalPages >= threshold) {
            return badge
          }
        }
      }
    
      const achievement = () => {
        const totalPages = parseFloat(stats.totalPages)
        const achievementBadge = calculateAchievementBadge(totalPages)
        setAchievementBadge(achievementBadge)
      }

    // Functions para search
    const handleChange = e => {
        setSearch(e.target.value)
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }


    return (
        <>
            <Paper style={{margin: '10px', borderRadius: '10px'}}>
                <Header>
                    <Logo />
                        <MiniHeader>
                            <CustomButton alias='info' action={handleAnimate}/>
                            <CustomButton alias='create' action={handleOpenCreate}/>
                            <CustomButton alias='logout' action={Logout}/>
                        </MiniHeader>
                </Header>
            </Paper>
            
            <animated.div 
                style={{
                    background: '#fff',
                    margin: '10px',
                    borderRadius: '10px',
                    boxShadow: '0 1px 1px 0px gray',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    ...expandInfo,
                }}
            >       
                    
                    <h2>{achievementBadge}</h2>

                    <Moldure>
                        <h1 style={{margin: 0}}>{stats.totalPages}</h1>
                        <span>páginas lidas</span>
                    </Moldure>

                    <Moldure>
                        <h1 style={{margin: 0}}>{stats.totalBooks}</h1>
                        <span>livros lidos</span>
                    </Moldure>
                    
            </animated.div>

            <CustomPaper>
            
            <Container>
                <TextField 
                    variant="outlined"
                    placeholder="Busque sua leitura"
                    size="small"
                    value={search}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                        ),
                    }}
                />
            </Container>

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableTitle 
                                style={{width: '30%'}}
                            >
                                Livro
                            </TableTitle>
                            <TableTitle style={{width: '20%'}}>Autor</TableTitle>
                            <TableTitle style={{width: '12%'}}>Gênero</TableTitle>
                            <TableTitle style={{width: '5%'}}>Avaliação</TableTitle>
                            <TableTitle style={{width: '3%'}}>Releitura?</TableTitle>
                            <TableTitle style={{width: '3%'}}>Páginas</TableTitle>
                            <TableTitle 
                                style={{width: '12%'}}
                            >
                                Opções
                            </TableTitle>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(filterData) && filterData.map(item => (
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
                <Pagination
                        style={{alignSelf: 'flex-end', margin: '10px'}}
                        count={data.last_page}
                        current_page={page}
                        onChange={handlePageChange}
                        size="small"
                    />
            </CustomPaper>

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