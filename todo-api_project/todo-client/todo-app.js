  let todos = [];
  let nextId = 1;
  let currentStorage = 'local';

  function createAppTitle(title) {
      let appTitle = document.createElement('h2');
      appTitle.innerHTML = title;
      return appTitle;
  }

  function createStorageToggleButton(container) {
      let button = document.createElement('button');
      button.classList.add('btn', 'btn-secondary');
      button.textContent = 'Перейти на серверное хранилище';

      button.addEventListener('click', async function() {
          if (currentStorage === 'local') {
              currentStorage = 'api';
              button.textContent = 'Перейти на локальное хранилище';
          } else {
              currentStorage = 'local';
              button.textContent = 'Перейти на серверное хранилище';
          }
          localStorage.setItem('storageType', currentStorage);
          await reloadTodos();
      });

      container.append(button);
  }

  async function reloadTodos() {
      const todoList = document.querySelector('.list-group');
      todoList.innerHTML = '';
      if (currentStorage === 'local') {
          loadLocalTodos(todoList);
      } else {
          await loadApiTodos(todoList);
      }
  }

  function createTodoItemForm() {
      let form = document.createElement('form');
      let input = document.createElement('input');
      let buttonWrapper = document.createElement('div');
      let button = document.createElement('button');

      form.classList.add('input-group', 'mb-3');
      input.classList.add('form-control');
      input.placeholder = 'Введите название нового дела';
      buttonWrapper.classList.add('input-group-append');
      button.classList.add('btn', 'btn-primary');
      button.textContent = 'Добавить дело';
      button.disabled = true;

      buttonWrapper.append(button);
      form.append(input);
      form.append(buttonWrapper);

      input.addEventListener('input', function() {
          button.disabled = !input.value.trim();
      });

      form.addEventListener('submit', async function(e) {
          e.preventDefault();
          if (!input.value) return;

          let newTodo = {
              id: nextId++,
              name: input.value,
              done: false
          };

          todos.push(newTodo);
          const todoList = document.querySelector('.list-group');
          todoList.append(createTodoItem(newTodo, todoList));

          input.value = '';
          button.disabled = true;

          if (currentStorage === 'local') {
              saveLocalTodos();
          } else {
              await saveApiTodos(newTodo);
          }
      });

      return { form, input, button };
  }

  function createTodoList() {
      let list = document.createElement('ul');
      list.classList.add('list-group');
      return list;
  }

  function createTodoItem(todo, todoList) {
      let item = document.createElement('li');
      let buttonGroup = document.createElement('div');
      let doneButton = document.createElement('button');
      let deleteButton = document.createElement('button');

      item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
      item.textContent = todo.name;

      buttonGroup.classList.add('btn-group', 'btn-group-sm');
      doneButton.classList.add('btn', 'btn-success');
      doneButton.textContent = 'Готово';
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.textContent = 'Удалить';

      buttonGroup.append(doneButton);
      buttonGroup.append(deleteButton);
      item.append(buttonGroup);

      doneButton.addEventListener('click', function() {
          todo.done = !todo.done;
          item.classList.toggle('list-group-item-success', todo.done);
          if (currentStorage === 'local') {
              saveLocalTodos();
          } else {
              saveApiTodos(todo);
          }
      });

      deleteButton.addEventListener('click', async function() {
          if (confirm('Вы уверены?')) {
              todos = todos.filter(t => t.id !== todo.id);
              item.remove();
              if (currentStorage === 'local') {
                  saveLocalTodos();
              } else {
                  await deleteApiTodo(todo.id);
              }
          }
      });

      return item;
  }

  async function loadApiTodos(todoList) {
      try {
          const apiTodos = await import('./apiStorage.js');
          todos = await apiTodos.loadTodos('myTodoList');
          todos.forEach(todo => {
              todoList.append(createTodoItem(todo, todoList));
              nextId = Math.max(nextId, todo.id + 1);
          });
      } catch (error) {
          console.error('Ошибка загрузки задач с сервера:', error);
      }
  }

  function loadLocalTodos(todoList) {
      const savedTodos = localStorage.getItem('myTodoList');
      if (savedTodos) {
          todos = JSON.parse(savedTodos);
          todos.forEach(todo => {
              todoList.append(createTodoItem(todo, todoList));
              nextId = Math.max(nextId, todo.id + 1);
          });
      }
  }

  function saveLocalTodos() {
      localStorage.setItem('myTodoList', JSON.stringify(todos));
  }

  async function saveApiTodos(todo) {
      const apiTodos = await import('./apiStorage.js');
      await apiTodos.saveTodos('myTodoList', todo);
  }

  async function deleteApiTodo(id) {
      const apiTodos = await import('./apiStorage.js');
      await fetch(`http://localhost:3000/api/todos/myTodoList/${id}`, {
          method: 'DELETE'
      });
  }

  function createTodoApp(container, title = 'Список дел') {
      let todoAppTitle = createAppTitle(title);
      let todoItemForm = createTodoItemForm();
      let todoList = createTodoList();

      container.append(todoAppTitle);
      container.append(todoItemForm.form);
      container.append(todoList);

      createStorageToggleButton(container);

      loadLocalTodos(todoList);
  }

  window.createTodoApp = createTodoApp;
