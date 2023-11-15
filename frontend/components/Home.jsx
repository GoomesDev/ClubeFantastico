import React, { useEffect, useState } from "react"
import { TableBook , Header , Logo , MiniHeader , HrBar , CustomButton } from "@/styledComponents/styledComponents"
import CreateForm from "./form/Create"

const Homepage = () => {

    const [data, setData] = useState([])

    const [openCreate, setOpenCreate] = useState(false)
    const handleOpenCreate = () => {setOpenCreate(true)}
    const handleCloseCreate = () => {setOpenCreate(false)}

    
    // Get books
    const getBooks = async() => {
        let url = `http://127.0.0.1:8000/api/books`
        const res = await fetch(url)
        const books = await res.json()
        setData(books)
    }

    useEffect(() => {
        getBooks()
    }, [])

    return (
        <>
            <Header>
                <Logo />
                <MiniHeader>
                    <CustomButton alias='info' />
                    <CustomButton alias='create' action={handleOpenCreate}/>
                </MiniHeader>
            </Header>

            <HrBar />

            <TableBook data={data}/>

            <CreateForm open={openCreate} handleClose={handleCloseCreate}/>
        </>
    )
}

export default Homepage