# netology_nodejs

Домашнее задание по курсу Нетологии-NodeJS

# Запросы для MongoDB

### Структура Books

```
{
  title: "string",
  description: "string",
  authors: "string"
}
```

## Запрос(ы) для вставки данных минимум о двух книгах в коллекцию books

```

db.books.insertOne({ title: "Книга 1", description: "Описание 1", authors: "Автор 1" })

db.books.insertMany( [
      { title: "Книга 1", description: "Описание 1", authors: "Автор 1" },
      { title: "Книга 2", description: "Описание 2", authors: "Автор 2" },
      { title: "Книга 3", description: "Описание 3", authors: "Автор 3" }
   ] )

```

## Запрос для поиска полей документов коллекции books по полю title

```
db.books.find({title: 'Книга 2'})

```

## Запрос для редактирования полей: description и authors коллекции books по \_id записи

```
db.books.updateOne(
    { _id: 1},
    { $set: {authors: "Новый Автор", description: "Новое описание"} }
);

db.books.updateMany(
[
    { _id: 1}, { $set: {authors: "Новый Автор 1", description: "Новое описание 1"} },
    { _id: 2}, { $set: {authors: "Новый Автор 2", description: "Новое описание 2"} }
]
);

```
