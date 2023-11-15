import React, { useEffect, useState } from "react";
import { TableBook } from "@/styledComponents/styledComponents";

const Homepage = () => {

    const [data, setData] = useState([])

    
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
        <div>
            <h1>HOME</h1>
            <TableBook data={data}/>
        </div>
    )
}

export default Homepage