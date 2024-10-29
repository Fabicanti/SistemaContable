import React from 'react'
import { BooksMenu } from '../components/Books/BooksMenu'
import "../styles/Books.css"
import { useBooks } from '../hooks/useBooks'

export const Books = () => {

    const { dataNameAccountsMov, dataTableBook, downloadPDFBooks } = useBooks();

    return (
        <div className="container-book">
            <BooksMenu 
                dataNameAccountsMov={dataNameAccountsMov}
                dataTableBook={dataTableBook}
                downloadPDFBooks={downloadPDFBooks}
            />
        </div>
    )
}
