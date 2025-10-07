document.getElementById('showChain').addEventListener('click', async () => {
  const input = document.getElementById('className');
  const output = document.getElementById('output');
  output.innerHTML = '';
  input.classList.remove('error');

  const className = input.value.trim();
  let targetClass;

  if (className.endsWith('.js')) {
      try {
          const module = await import(className);
          targetClass = module.default;
      } catch (error) {
          console.error('Ошибка при загрузке модуля:', error);
          input.classList.add('error');
          return;
      }
  } else {
      targetClass = window[className];
  }

  if (typeof targetClass !== 'function') {
      input.classList.add('error');
      return;
  }

  const prototypeChain = [];
  let current = targetClass;

  prototypeChain.push(current);

  while (current) {
      current = Object.getPrototypeOf(current);
      if (current) {
          prototypeChain.push(current);
      }
  }

  const ol = document.createElement('ol');
  for (const proto of prototypeChain) {
      const li = document.createElement('li');
      li.textContent = proto ? (proto.constructor ? proto.constructor.name : '[Без названия]') : '[Object]';

      const innerOl = document.createElement('ol');
      for (const prop in proto) {
          if (proto.propertyIsEnumerable(prop)) {
              const innerLi = document.createElement('li');
              innerLi.textContent = `${prop}: ${typeof proto[prop]}`;
              innerOl.appendChild(innerLi);
          }
      }
      li.appendChild(innerOl);
      ol.appendChild(li);
  }

  output.appendChild(ol);
});
