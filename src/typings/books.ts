export interface Book {
  id: string
  title: string
  image: string
  description: string
}

export type Books = Array<Book>