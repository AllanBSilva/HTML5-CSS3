import { json, urlencoded } from "body-parser";
import express, { Request } from "express";
import path from "path";
import { orderBy } from "./utils";
import { generateUniqueIdentifier, orderBy } from "./utils";


const app = express();
const port = 3000;
const movies = [
  { id: generateUniqueIdentifier(), name: "Blade Runner" },
  { id: generateUniqueIdentifier(), name: "2001: A Space Odyssey" },
  { id: generateUniqueIdentifier(), name: "The Matrix" },
  { id: generateUniqueIdentifier(), name: "Inception" },
  { id: generateUniqueIdentifier(), name: "Interstellar" },
];

// Middleware para parsear JSON
app.use(json());
app.use(urlencoded({ extended: true }));

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('Hello Word!')
});

// Rota de exemplo
//app.get('/api/movies', (req, res) => {
//  res.status(200).json(movies);
//});

//app.get('/api/movies', (req: Request<{}, {}, {}, { order: string}>, res) => {
 // const { order } = req.query;
 // if (order) {
 //   res.status(200).json(orderBy(movies, order));
 // } else {
//    res.status(200).json(movies);
 // }
//});

app.get("/api/movies", (req: Request<{}, {}, {}, { order: string }>, res, next) => {
    const { order } = req.query;
    if (order && (order !== 'asc' && order !== 'desc')) {
      return res.status(400).json({ error: 'Invalid order value. Use "asc" or "desc".' });
    }
    next();
  },
  (req: Request<{}, {}, {}, { order: string }>, res) => {
    const { order } = req.query;
    if (order) {
      res.status(200).json(orderBy(movies, order));
    } else {
      res.status(200).json(movies);
    }
  }
);

app.get('/pages/movies', (req, res) => {
  const filePath = path.join(__dirname, '../resources', 'movies.html');
  res.status(200).sendFile(filePath);
});

app.post("/api/movies", (req: Request<{}, {}, { name: string }>, res) => {
  const { name } = req.body;
  const newMovie = { id: generateUniqueIdentifier(), name };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.put("/api/movies/:id", (req: Request<{ id: string }, {}, { name: string }, {}>, res) => 
  {
    const { id } = req.params;
    // Crie um middleware para validar se `name` foi enviado no body
    const { name } = req.body;

    if (id) {
      const movie = movies.find((movie) => movie.id === id);
      if (movie) {
        movie.name = name;
        res.status(200).json(movie);
      } else {
        // Crie um middleware para retornar um erro 400 Bad Request
        res.status(404).json({ error: "The movie you want to update does not exist" });
      }
    } else {
      // Crie um middleware para retornar um erro 400 Bad Request
      res.status(400).json({ error: "The query params `id` is mandatory" });
    }
  }
);

app.delete(
  "/api/movies/:id",
  (req: Request<{ id: string }, {}, { name: string }, {}>, res) => {
    const { id } = req.params;

    if (id) {
      const movieIndex = movies.findIndex((movie) => movie.id === id);
      if (movieIndex !== -1) {
        movies.splice(movieIndex, 1);
        res.status(200).send();
      } else {
        // Crie um middleware para retornar um erro 400 Bad Request
        res.status(404).json({ error: "The movie you want to update does not exist" });
      }
    } else {
      // Crie um middleware para retornar um erro 400 Bad Request
      res.status(400).json({ error: "The query params `id` is mandatory" });
    }
  }
);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;