export type Todo = {
  id: string,
  title: string | null,
  content: string | null,
  isFavorite: boolean,
  color: string,
  createdAt: Date,
  updatedAt: Date,
}