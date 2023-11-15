import Image from "next/image"
import { Paper , DialogContent , Tab , TextField , Button, Alert , Collapse, Table , TableBody , TableHead , TableRow, TableCell , Tooltip , Switch} from '@mui/material';
import styled from "styled-components";
import PersonIcon from '@mui/icons-material/Person';
import { useRef } from "react";


export const Logo = () => {
    return (
        <Image src="/logo.png" alt="Logo do Clube" width={150} height={50}/>
    )
}

export const Book = () => {
    return (
        <Image src="/book.png" alt="Livros empilhados" width={160} height={160}/>
    )
}

export const DialogHeader = styled(DialogContent)({
    margin: '5px 0 0 0',
    display: 'flex',
    placeContent: 'center',
    placeItems: 'center',
    borderBottom: '1px solid #000'
})

export const DialogTabs = styled(DialogContent)({
    display: 'flex',
    flexDirection: 'column',
    margin: '0',
})

export const CustomTab = styled(Tab)({
    width: '50%',
    margin: '-10px 0 0 10px',
    background: '#fff',
    '&:focus': {
       color: '#000',
       background: '#fff',
    },
    '&:active': {
        background: '#fff',
        transition: '3s',
    },
})

export const LabelText = styled.span`
    color: #000;
`

export const FormContainer = ({alias , children}) => {

    const getSide = () => {
        if (alias === 'right') {
            return 'flex-end'
        } else if (alias === 'left') {
            return 'flex-start'
        }
    }

    return (
        <div
            style={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                placeContent: 'space-evenly',
                placeItems: 'center',
                alignSelf: getSide(),
                transition: '3s'
            }}
        >
            {children}
        </div>
    )
}

export const InputText = styled(TextField)({
    width: '100%',
    margin: '7px 0 0 0'
})

export const Submit = styled(Button)({
    width: '100%',
    margin: '7px 0 0 0',
    color: '#fff',
    background: '#947eff',
    '&:hover': {
        color: '#fff',
        background: '#947eff',
    }
})

export const Frame = ({children}) => {

    const MainFrame = styled(Paper)({
        width: '97%',
        margin: 'auto',
        height: '92vh'
    })

    return (
            <MainFrame>
                {children}
            </MainFrame>
    )
}

export const ErrorAlert = ({alias, alertOpen, handleAlertClose}) => {

    const getText = () => {
        if(alias === 'Usário cadastrado com sucesso! Faça o login.') {
            return 'success'
        } else if(alias === 'Usário já existente.') {
            return 'error'
        } else if(alias === 'Usário ou senha incorretos!') {
            return 'error'
        }
    }

    return (
        <Collapse in={alertOpen}>
            <Alert 
            open={alertOpen} 
            onClose={() => handleAlertClose()} 
            variant="filled" 
            severity={getText()}
            style={{borderRadius: '0'}}
            >
                {alias}
            </Alert>
        </Collapse>
    )
}

export const TableBook = ({data}) => {
    return (
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
        
    )
}

export const Header = styled.div`
    width: 95%;
    display: flex;
    justify-content: space-between;
    place-items: center;
    margin: auto;
    padding: 10px 0 10px 0;
`

export const MiniHeader = styled.div`
    width: 10%;
    display: flex;
    justify-content: space-evenly;
    place-items: center;
`

export const HrBar = styled.div`
    width: 100%;
    margin: auto;
    height: 4px;
    background-color: #E5E0FF;
`

export const CustomButton = ({alias, action}) => {

    const aliasInfo = {
        create: {
            color: '#6ace9d',
            content: '+',
            description: 'Cadastrar nova leitura'
        },
        info: {
            color: '#6a9ece',
            content: <PersonIcon />,
            description: 'Informações do usuário'
        }
    }

    const getColor = () => {
        return aliasInfo[alias].color
    }

    const getContent = () => {
        return aliasInfo[alias].content
    }

    const getDescription = () => {
        return aliasInfo[alias].description
    }

    const Btn = styled.div`
        width: 30px;
        height: 30px;
        border-radius: 5px;
        box-shadow: 1px 1px 1px 0px #b6b6b6;
        background-color: ${getColor()};
        display: flex;
        place-content: center;
        place-items: center;
        font-size: 25px;
        font-weight: 900;
        color: #fff;
        cursor: pointer;
        &:active {
            box-shadow: 0px 0px 0px 0px;
            transform: scale(0.9);
        }
    `

    return (
        <Tooltip title={getDescription()}>
            <Btn
                onClick={action}
            >
                {getContent()}
            </Btn>
        </Tooltip>
    )
}

export const ActionButton = ({alias, action}) => {

    const aliasInfo = {
        submit: {
            color: '#6ace9d',
            content: 'Salvar',
        },
        cancel: {
            color: '#e05353',
            content: 'Cancelar',
        }
    }

    const getColor = () => {
        return aliasInfo[alias].color
    }

    const getContent = () => {
        return aliasInfo[alias].content
    }

    const Btn = styled.div`
        width: 100px;
        height: 30px;
        border-radius: 5px;
        box-shadow: 1px 1px 1px 0px #b6b6b6;
        background-color: ${getColor()};
        display: flex;
        place-content: center;
        place-items: center;
        font-weight: 900;
        color: #fff;
        cursor: pointer;
        &:active {
            box-shadow: 0px 0px 0px 0px;
            transform: scale(0.9);
        }
    `

    return (
        <Btn
            onClick={action}
        >
            {getContent()}
        </Btn>
    )
}

export const Title = styled.h2`
    margin: 0;
`
export const CreateInput = () => {

    const [bookRef, authorRef, genreRef, ratingRef, rereadingRef, pagesRef] = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]

    const handleTest = () => {
        const [book, author, genre, rating, rereading, pages] = [
            bookRef.current.value,
            authorRef.current.value,
            genreRef.current.value,
            ratingRef.current.value,
            rereadingRef.current.value,
            pagesRef.current.value
        ]
        console.log(book, author, genre, rating, rereading, pages)
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
                <TextField
                    variant="outlined"
                    label="Gênero"
                    inputRef={genreRef}
                    size="small"
                />
            </div>
            <div style={{width: '100%' ,display: 'flex', justifyContent: 'space-between'}}>
                <TextField
                    type="number"
                    variant="outlined"
                    label="Avaliação"
                    inputRef={ratingRef}
                    size="small"
                />
                <TextField
                    type="number"
                    variant="outlined"
                    label="Páginas"
                    inputRef={pagesRef}
                    size="small"
                />
            </div>
            <h5 style={{margin: 0}}>Releitura?</h5>
            <Switch
                label="Releitura"
                inputRef={rereadingRef}
                size="small"
            />
            <Button onClick={handleTest}>Testar</Button>
        </div>
    )
}
