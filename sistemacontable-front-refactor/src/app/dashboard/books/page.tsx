
import React from 'react'
import BooksOverview from './ui/books-overview'
import BooksTable from './ui/books-table'

export const metadata = {
  title: "SSAA II - Libros",
  description: "Gestión de libros del sistema",
}


export default function BooksPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <BooksOverview />
      <BooksTable />
    </div>
  )
}
