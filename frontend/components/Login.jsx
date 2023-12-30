import React, { useState , useRef } from "react";
import { Paper , Dialog , Tabs } from '@mui/material';
import { Logo } from "@/styledComponents/styledComponents";
import { DialogHeader , DialogTabs , CustomTab , FormContainer , InputText , Submit , LabelText , Book , ErrorAlert } from "@/styledComponents/styledComponents"
import { useRouter } from "next/navigation"

const LoginRegister = () => {

    const router = useRouter()

    // Dialog Login/Register
    const [open, setOpen] = useState(true)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    // Alert's
    const [alertOpen, setAlertOpen] = useState(false)
    
    const handleAlertClose = () => {
        setAlertOpen(false)
    }

    // Tabs
    const [selectedTab, setSelectedTab] = useState(0)


    // Get username/password
    const [usernameRef, passwordRef] = [useRef(), useRef()]

    // Get error & success
    const [error, setError] = useState()
    
    const handleSubmit = () => {

        const [username, password] = [usernameRef.current.value, passwordRef.current.value]

        const body = {
            username: username,
            password: password
        }

        if(selectedTab === 0) {
            const handleLogin = async() => {
                let url = `http://127.0.0.1:8000/api/user/login`
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({username, password})
                })
                if(res.status === 200) {
                    const data = await res.json()
                    const userId = data.user_id
                    handleClose()
                    router.push(`home/?user_id=${userId}`)
                } else if (res.status === 401){
                    setError('Usário ou senha incorretos!')
                    setAlertOpen(true)
                }
            }
            handleLogin()
        } else {            
            const handleRegister = async() => {
                let url = `http://127.0.0.1:8000/api/user/register`
                const res = await fetch(url , {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                })
                if (res.status === 200) {
                    const data = await res.json();
                    setError('Usário cadastrado com sucesso! Faça o login.')
                    setAlertOpen(true)
                } else if (res.status === 401) {
                    setError('Usário já existente.')
                    setAlertOpen(true)
                }
            }
            handleRegister()
        }
    }

    return (
        <Paper>
            <Dialog
                open={open}
                onClose={null}
                fullWidth
            >   
                <DialogHeader>
                    <Logo />
                </DialogHeader>

                <DialogTabs>
                    <Tabs
                        value={selectedTab}
                        onChange={(e, value) => setSelectedTab(value)}
                        variant="fullWidth"
                        TabIndicatorProps={{
                            style: {
                              background: '#000',
                              marginBottom: '15px',
                              color: '#000'
                            }
                          }}
                    >
                        <CustomTab label={<LabelText>Sou de casa</LabelText>}/>
                        <CustomTab label={<LabelText>Sou novo</LabelText>}/>
                    </Tabs>

                    {selectedTab === 0 && (
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <Book />
                            <FormContainer alias={'right'}>
                                <InputText
                                label="Usuário"
                                inputRef={usernameRef}
                                size="small"
                                />
                                <InputText
                                label="Senha"
                                inputRef={passwordRef}
                                type="password"
                                size="small"
                                />
                                <Submit onClick={handleSubmit}>Login</Submit>
                            </FormContainer>
                        </div>
                        
                    )}

                    {selectedTab === 1 && (
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <FormContainer alias={'left'}>
                                <InputText
                                label="Usuário"
                                inputRef={usernameRef}
                                size="small"
                                />
                                <InputText
                                label="Senha"
                                type="password"
                                inputRef={passwordRef}
                                size="small"
                                />
                                <Submit onClick={handleSubmit}>Cadastrar</Submit>
                            </FormContainer>
                            <Book />
                        </div>
                        
                    )}
                </DialogTabs>

                {error && <ErrorAlert alias={error} alertOpen={alertOpen} handleAlertClose={handleAlertClose}/>}

            </Dialog>
        </Paper>
    )
}

export default LoginRegister