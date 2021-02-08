# To do list

A basic to do list using Node JS, Mongo Atlas, Mongoose, Express and EJS. This was made for an assignment at Medieinstitutet.

## Functionality

- Uses pagination to display 3 tasks at a time
- Uses Mongo Atlas to store tasks.
- Possibility to add new tasks.
- Possibility to edit tasks.
- Remove tasks by clicking the cross icon.
- Complete tasks by checking them.
- Basic error handling

## Dependencies

- dotenv
- ejs
- express
- mongoose
- node-sass
- node-sass-middleware

##  Install & run

Clone the repo and install the dependencies before opening `http://localhost:3000`.

Clone the repo using Git:
```
git clone https://github.com/sophie-akesson/todo.git
```

Install dependencies using npm:
```
npm i
```

## Folder struture

```
main.js
├── model
├── node_modules
│   └── <package name>
├── public
│   └── images
│   └── style
├── routes
│   └── middleware
├── scss
├── views
```

New files should be put in a corresponding folder. 

## Naming conventions

The project uses camelCase for variables, ids and function names. PascalCase is used for class names. Use lowercase and dashes to separate multiple words for HTML id- and class names.