(function() {
    console.log("my: " + localStorage.my)
    console.log("mom: " + localStorage.mom)
    console.log("dad: " + localStorage.dad)
    
// создаем и возвращаем заголовок
function createAppTitle(title) {
    let appTitle= document.createElement('h2');
    appTitle.innerHTML=title;
    return appTitle;
}

let items = []






function localSaveItems(localName,items){
if(localName ==='my') {
        localStorage.my = JSON.stringify(items)
}else if(localName==='mom'){
        localStorage.mom=JSON.stringify(items)
} else {
        localStorage.dad=JSON.stringify(items)
}

}


let localTitle;



let id=items.length

// создаем и возвращаем форму для создания дела
function createToboItemForm() {
    let form =document.createElement('form');
    let input =document.createElement('input');
    let buttonWraper=document.createElement('div');
    let button =document.createElement('button');
    button.setAttribute('disabled','disabled')
  

    form.classList.add('input-group','mb-3');// для форма мы делаем два класса они нужны чтобы правильно нарисовать форму
                                            // input-group содержит в себе группу элементов формы и специальном образом 
                                            // стерелизуется бутстрапом, mb-3 это класс который 
                                             //оставляет отступ после формы чтобы она не слиплялась потом со списком элементов
    
    input.classList.add('form-control'); // класс fotm-control для ого чтобы бутстрап правильно отобразил элемнент формы
    
    input.placeholder='Введите название нового дела';// с помощью отребута placeholder мы добавим пояснение что нужно вводить в 
                                                      //в данное поле этот текст будет всегда отображаться когда в поле ничего не 
                                                    //   введено
    
    buttonWraper.classList.add('input-group-append');// на кнопку мы добавим класс input-group-append он нужен для того чтобы
                                                     //позиционировать какой то элемент в форме справа от нашего поля для ввода

    button.classList.add('btn','btn-primary');// добавляем кнопке два класса  btn нужен для того чтобы применить все стили каждой кнопке
                                             //в бутстрапе, а btn-primary нарисует ее красивым синем цветом, такой набор классов 
                                            //  используется для единственной кнопке на форме
                                                    // либо если кнопка осуществляет основное действие если есть еще какие то
    
    button.textContent='Добавить дело';// добавляем к кнопке текст с помощью textContent

    // ОбЪединяем DOM элементы в одну структуру
    buttonWraper.append(button);// buttonWrapper мы вкладываеи botton
    form.append(input);
    form.append(buttonWraper);
// возвращаем результат но мы не можем вернуть form помимо нее нам отдельно нужно получить доступ к input иbutton внутри формы, 
// так как по нажатию на button мы должны создать новый элемент в списке и забрать при этом значение из input если мы вернем их осюда 
// то не будем иметь к ним доступа
    return {
        form,
        input,
        button,
    };

}

// создаем и возвращаем список элементов
// которая будет создавать список
function createToboList() {
    let list=document.createElement('ul') // создаем элемент list и присваиваем ей новы элемент ul
    list.classList.add('list-group');
    return list;
}




function createTodoItemLocal(obj) {
    let name = obj.name
    let item = document.createElement('li');
    //кнопки помещаем в элемент,который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div')
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement ('button');

    //Устанавливаем стили для элемента списка, ф также для размещения кнопок
    //в его правой части с помощью flex
    if(obj.done === true) {
        item.classList.add('list-group-item-success', 'list-group-item','d-flex','justify-content-between','align-items-center');
    } else {
        item.classList.add('list-group-item','d-flex','justify-content-between','align-items-center');
    }
    
    item.textContent = name;

    buttonGroup.classList.add('btn-group','btn-group-sm');
    doneButton.classList.add('btn','btn-success')
    doneButton.textContent ='Готово';
    deleteButton.classList.add('btn','btn-danger')
    deleteButton.textContent='Удалить'

    // вкладывае кнопки в отдельный элемент, чтобы они объединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);
    let button = document.querySelector('.btn');
    button.setAttribute('disabled','disabled')

    let id = obj.id

    // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
    return{
        item,
        doneButton,
        deleteButton,
        id
    }
}




function createTodoItem(obj) {
    let name = obj.name
    let item = document.createElement('li');
    //кнопки помещаем в элемент,который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div')
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement ('button');

    //Устанавливаем стили для элемента списка, ф также для размещения кнопок
    //в его правой части с помощью flex
    item.classList.add('list-group-item','d-flex','justify-content-between','align-items-center');
    item.textContent = name;

    buttonGroup.classList.add('btn-group','btn-group-sm');
    doneButton.classList.add('btn','btn-success')
    doneButton.textContent ='Готово';
    deleteButton.classList.add('btn','btn-danger')
    deleteButton.textContent='Удалить'

    // вкладывае кнопки в отдельный элемент, чтобы они объединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);
    let button = document.querySelector('.btn');
    button.setAttribute('disabled','disabled')

    items.push({id:obj.id,name:obj.name,done:obj.done})
    console.log(items)
    let id = obj.id

    // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
    return{
        item,
        doneButton,
        deleteButton,
        id
    }
}

    function localGetItems(localName){
        if(localName==='my'){
            let id = 0;
            if(localStorage.my){
                items = JSON.parse(localStorage.my)
                items.forEach(element => {
                    element.id = id
                    id = id + 1
                })
            } 
        } else if(localName==='mom') {
            if(localStorage.mom) {
                items = JSON.parse(localStorage.mom)
                items.forEach(element => {
                    element.id = id
                    id = id + 1
                })
            }
        }else {
            if(localStorage.dad){

                items = JSON.parse(localStorage.dad)
                items.forEach(element => {
                    element.id = id
                    id = id + 1
                })
            }
        }
    }

function createTodoApp(container,title, name){
    localTitle = name
    
    localGetItems(localTitle)


    let todoAppTitle=createAppTitle(title);
    let todoItemForm=createToboItemForm();
    let todoList =createToboList();


   
    // размещаем результат всех трех функции внутри контейнера
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);
    todoItemForm.form.addEventListener('keydown', () => {
        if (todoItemForm.form.value===''){
            todoItemForm.button.setAttribute('disabled','disabled')
        }else{todoItemForm.button.removeAttribute('disabled')}
    })

    let todoItemslocalstorage = [];
    if (items.length != 0 ) {
       

        for(let i = 0; i < items.length; i++) {
        todoItemslocalstorage[i] = createTodoItemLocal(items[i])
        todoList.append(todoItemslocalstorage[i].item);
        }
        
        
    }

    
    todoItemslocalstorage.forEach(element => {
        element.deleteButton.addEventListener('click', () => {
            console.log(element)
            if (confirm('Вы уверены?')) {
                items = items.filter(obj=>obj.id!=element.id)
                element.item.remove();
                localSaveItems(localTitle, items)
                id = items.length
            }
        })
    });

    todoItemslocalstorage.forEach(element => {
        element.doneButton.addEventListener('click', () => {
            element.item.classList.toggle('list-group-item-success');
            if(items[element.id].done === false){
                console.log(element.id)
                items[element.id].done=true
                localSaveItems(localTitle, items)
                console.log(items)
            }else { 
                console.log(element.id)
                items[element.id].done=false
                localSaveItems(localTitle, items)
                console.log(items)
            }

        })
    });
        
    

    // браузер создает событие submit на форме по нажатию на Enter или на кнопку содания дела
    todoItemForm.form.addEventListener('submit', function(e){
    // эта строчка необходима,чтобы предотвратить стандартное действия браузера
    // в данном случае мы не хотим чтобы страница перезагружалась при отправке формы
    e.preventDefault();
    
    // Игнорирум создание элемента, если пользователь ничего не ввел в поле
    if (!todoItemForm.input.value){
        return
    }
    // if(todoItemForm.input.value===null){
    //     button.setAttribute('disabled','disabled')
    // }
   
    let inputText = todoItemForm.input.value;
    id = items.length
    let obj = {name:inputText,done:false,id}
    console.log(obj)
    let todoItem = createTodoItem(obj);
  
    localSaveItems(localTitle, items)

    // добавляем обработчики на кнопки
    todoItem.doneButton.addEventListener('click',function(){
        todoItem.item.classList.toggle('list-group-item-success');
    if(items[todoItem.id].done=== false){
        items[todoItem.id].done=true
        localSaveItems(localTitle, items)
    }else { items[todoItem.id].done=false
        localSaveItems(localTitle, items)
    }
    });
     


    todoItem.deleteButton.addEventListener('click',function(){
        if (confirm('Вы уверены?')) {
            items = items.filter(obj=>obj.id!=todoItem.id)
            todoItem.item.remove();
            localSaveItems(localTitle, items)
            id = items.length
            
            
        }




    });

    // создаем и добавляем в список новое дело с названием из поля для ввода
    todoList.append(todoItem.item);

    // обнуляем значение в поле, чтобы не пришлось стирать его в ручную
    todoItemForm.input.value ='';
    })




    
    
}



// создали три функции теперь поместим их в DOM нашей страницы, для этого создам обработчик событий DOMContentLoaded на document
// это нужно для того чтобы мы получили доступ к DOM дереву с загрузившейся html страницы


// Не забываем что createAppTitle и creteTodoList вернут сам DOM элемент то есть todoAppTitle и todoList, а в случае createToboItemFor 
// мы возвращаем сам объект todoItemForm в котором есть form по этому мы не сам todoItemForm размещаем внутри контейнера а сначало 
//берем у него свойство Form

window.createTodoApp =createTodoApp;
})();