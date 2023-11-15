import Image from "next/image"
import { Paper , DialogContent , Tab , TextField , Button, Alert , Collapse, Table , TableBody , TableHead , TableRow, TableCell} from '@mui/material';
import styled from "styled-components";
import { useEffect, useState } from "react";

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
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Livro</TableCell>
                    <TableCell>Autor</TableCell>
                    <TableCell>Gênero</TableCell>
                    <TableCell>Avaliação</TableCell>
                    <TableCell>Releitura?</TableCell>
                    <TableCell>Páginas</TableCell>
                    <TableCell>Opções</TableCell>
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
                        <TableCell>{item.rereading}</TableCell>
                        <TableCell>{item.pages}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}