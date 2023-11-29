import Image from "next/image"
import { Paper , DialogContent , Tab , TextField , Button, Alert , Collapse , Tooltip , TableCell } from '@mui/material'
import styled from "styled-components"
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'


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

// Error's Alert's Login
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

export const Header = styled.div`
    width: 97%;
    display: flex;
    justify-content: space-between;
    place-items: center;
    margin: auto;
    padding: 10px 0px 10px 0px;
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

export const TableTitle = styled(TableCell)({
    fontWeight: '600',
    fontSize: '12px'
})

export const TableItem = styled(TableCell)({
    fontSize: '13px'
})

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
        },
        logout: {
            color: '#ce6a6a',
            content: <LogoutIcon />,
            description: 'Sair'
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
        width: 25px;
        height: 25px;
        border-radius: 5px;
        box-shadow: 1px 1px 1px 0px #b6b6b6;
        background-color: ${getColor()};
        display: flex;
        place-content: center;
        place-items: center;
        font-size: 20px;
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
        },
        yes: {
            color: '#e05353',
            content: 'Sim',
        },
        no: {
            color: '#6ace9d',
            content: 'Não',
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

// Error's Alert's Create Book
export const ErrorInput = ({open, handleClose}) => {

    return (
        <Collapse in={open}>
            <Alert 
            open={open} 
            onClose={handleClose} 
            variant="filled" 
            severity='warning'
            style={{borderRadius: '0'}}
            >
                É necessário preencher todos os campos!
            </Alert>
        </Collapse>
    )
}