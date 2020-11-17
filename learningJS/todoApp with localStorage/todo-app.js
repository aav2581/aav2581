(function() {

    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
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

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        button.setAttribute('disabled', true);

        input.addEventListener('input', function() {
            if (input.value.length == 0) {
                button.setAttribute('disabled', true);
            } else {
                button.removeAttribute('disabled');
            }
        })
    
        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(name, done, newArr, nameList) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent =  'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        if (done) {
            item.classList.add('list-group-item-success');
        }

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        doneButton.addEventListener('click', function() {
            for (let i = 0; i !== newArr.length; i++) {
                let arrValues = Object.values(newArr[i]);
                if (item.textContent === (arrValues[0] + 'ГотовоУдалить')) {
                    if (arrValues[1] == true) {
                        newArr[i].done = false;
                    } else {
                        newArr[i].done = true;
                    }
                }
            }
            
            localStorage.removeItem(nameList);
            localStorage.setItem(nameList, JSON.stringify(newArr));

            item.classList.toggle('list-group-item-success');
        });

        deleteButton.addEventListener('click', function() {
            if (confirm('Вы уверены?')) {   
                for (let i = 0; i < newArr.length; i++) {
                    let arrValues = Object.values(newArr[i]);
                    if (item.textContent === (arrValues[0] + 'ГотовоУдалить')) {
                        let indexName = newArr.indexOf(newArr[i])
                        newArr.splice(indexName, 1);
                    }
                } 

                localStorage.removeItem(nameList);
                localStorage.setItem(nameList, JSON.stringify(newArr));

                item.remove(); 
            }
        });

        return {
            item,
            doneButton,
            deleteButton,
        };
    }


    function createTodoApp(container, title = 'Список дел', nameList, arr = []) {

        todoContainer = document.querySelector(container);
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        let arrFromStorage = JSON.parse(localStorage.getItem(nameList));

        let newArr = [];

        if (arrFromStorage != null) {
            for (i = 0; i < arrFromStorage.length; i++) {
            newArr.push(arrFromStorage[i]);
            }
        } else {
            for (i = 0; i < arr.length; i++) {
            newArr.push(arr[i]);
            }
        }

        
        localStorage.setItem(nameList, JSON.stringify(newArr));
        
        todoContainer.append(todoAppTitle);
        todoContainer.append(todoItemForm.form);
        todoContainer.append(todoList); 

        function createItemFromArr(arr) {

            if (arr !== undefined && arr !== null) {
                for (i = 0; i !== arr.length; i++) {
    
                    let arrEntries = Object.entries(arr[i]);
                    let arrEntriesName = arrEntries[0];
                    let arrEntriesDone = arrEntries[1];
        
                    name = arrEntriesName[1];
                    done = arrEntriesDone[1];
        
                    todoList.append(createTodoItem(name, done, newArr, nameList).item);
                }
            }
       }

        createItemFromArr(newArr);
        
        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (todoItemForm.input.value.length == 0) {
                return;
            }
            
            let todoItem = createTodoItem(todoItemForm.input.value, false, newArr, nameList);
            let newNameTodo = document.querySelector('input').value;
            
            newArr.push({name: newNameTodo, done: false});

            localStorage.removeItem(nameList);
            localStorage.setItem(nameList, JSON.stringify(newArr));

            todoList.append(todoItem.item);
            todoItemForm.input.value = '';
            todoItemForm.button.setAttribute('disabled', true);
            
        })
    }

    window.createTodoApp = createTodoApp;

})()

