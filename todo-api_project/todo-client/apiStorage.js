export async function saveTodos(listName, todos) {
  await fetch(`http://localhost:3000/api/todos/${listName}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(todos)
  });
}

export async function loadTodos(listName) {
  const response = await fetch(`http://localhost:3000/api/todos/${listName}`);
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return await response.json();
}
