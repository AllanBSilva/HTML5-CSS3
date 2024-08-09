const API_HOST = "http://localhost:3000/api";
const movies = [
  { id: "fake-id-1", name: "Blade Runner" },
  { id: "fake-id-2", name: "2001: A Space Odyssey" },
  { id: "fake-id-3", name: "The Matrix" },
  { id: "fake-id-4", name: "Inception" },
  { id: "fake-id-5", name: "Interstellar" },
];
let quantity_history = movies.length;

async function getMoviesApi() {
  const params = {
    order: "asc",
  };
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_HOST}/movies?${queryString}`);

  if (!response.ok) {
    const responseError = await response.json();
    throw new Error(responseError?.error);
  }
  return response.json();
}

async function addMovieApi({ name }) {
  const response = await fetch(`${API_HOST}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    const responseError = await response.json();
    throw new Error(responseError?.error);
  }
  return response.json();
}


async function updateMovieApi({ id, name }) {
  const response = await fetch(`${API_HOST}/movies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    const responseError = await response.json();
    throw new Error(responseError?.error);
  }
  return response.json();
}

async function deleteMovieApi({ id }) 
{
  const response = await fetch(`${API_HOST}/movies/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const responseError = await response.json();
    throw new Error(responseError?.error);
  }
}
