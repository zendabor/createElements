// document.querySelector('body').innerHTML = '<form class="create-user-form"><label> Имя<input type="text" name="userName" placeholder="Введите ваше имя"></label><label> Пароль<input type="password" name="password" placeholder="Придумайте Пароль"></label><button type="submit"> Подтвердить</button></form>';



// const form = document.createElement('form');
// form.classList.add('create-user-form');
// const firstLabel = document.createElement('label');
// firstLabel.textContent = 'имя';
// const firstInp = document.createElement('input');
// firstInp.type = 'name';
// firstInp.name = 'userName';
// firstInp.placeholder = 'Введите ваше имя';
// firstLabel.append(firstInp);
// const secondLabel = document.createElement('label');
// secondLabel.textContent = 'Пароль';
// const secondtInp = document.createElement('input');
// secondtInp.type = 'password';
// secondtInp.name = 'password';
// secondtInp.placeholder = 'Придумайте Пароль';
// secondLabel.append(secondtInp);
// const btn = document.createElement('button');
// btn.textContent = 'Подтвердить';
// btn.type = 'submit';
// form.append(firstLabel, secondLabel, btn);

// document.querySelector('body').append(form);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let theme = 'white';
document.addEventListener('keyup', (e) => {
    const { key } = e;
    if (key === 'Tab' && theme === 'white') {
        document.querySelector('body').style.background = '#24292E';
        document.querySelectorAll('.task-item__text').forEach((item) => {
            item.classList.add('dark__text');
        });
        document.querySelectorAll('button').forEach((item) => {
            item.classList.add('dark');
        });
        theme = 'dark';
    } else if (key === 'Tab' && theme === 'dark') {
        document.querySelector('body').style.background = 'initial';
        document.querySelectorAll('.task-item__text').forEach((item) => {
            item.classList.remove('dark__text');
        });
        document.querySelectorAll('button').forEach((item) => {
            item.classList.remove('dark');
        });
        theme = 'white';
    }
})

const tasks = [
    { id: 1, completed: false, text: 'Посмотреть новый урок по JavaScript' },
    { id: 2, completed: false, text: 'Выполнить тест после урока' },
    { id: 3, completed: false, text: 'Выполнить ДЗ после урока' }
]

const taskList = document.querySelector('.tasks-list');
doSomething()
const formBlock = document.querySelector('.create-task-block');
formBlock.addEventListener('submit', (e) => {
    e.preventDefault();
    let span = document.createElement('span');
    span.classList.add('error-message-block');
    formBlock.append(span);
    tasks.forEach((item) => {
        if (item.text === formBlock.taskName.value) {
            span.textContent = 'Задача с таким названием уже существует.';
            setTimeout(() => span.remove(), 2000);
            tasks.splice(tasks.length - 1, 1);
        }
    });
    if (formBlock.taskName.value === '') {
        span.textContent = 'Название задачи не должно быть пустым';
        setTimeout(() => span.remove(), 2000);
    } else {
        tasks.push({ id: tasks.length + 1, completed: false, text: `${formBlock.taskName.value}` });
        doSomething();
    }
})



function doSomething() {
    document.querySelectorAll('.task-item').forEach((item) => {
        item.remove();
    });

    tasks.forEach((item) => {
        //меин блок
        const task = document.createElement('div');
        task.className = 'task-item';
        task.setAttribute('data-task-id', item.id);
        //создание контейнера
        const container = document.createElement('div');
        container.className = 'task-item__main-container';
        //создание блока с task item main content
        const taskContent = document.createElement('div');
        taskContent.className = 'task-item__main-content';
        // создание формы
        const form = document.createElement('form');
        form.className = 'checkbox-form';
        //инпут и лейбел
        const inp = document.createElement('input');
        inp.className = 'checkbox-form__checkbox';
        inp.type = 'checkbox';
        inp.setAttribute('id', `task-${item.id}`);
        const label = document.createElement('label');
        label.htmlFor = `task-${item.id}`;
        //cоздание спана с текстом
        const spanText = document.createElement('span');
        spanText.className = 'task-item__text';
        if (theme === 'dark') {
            spanText.className = 'task-item__text dark__text';
        }
        spanText.textContent = item.text;
        //кнопка 
        const btn = document.createElement('button');
        btn.className = 'task-item__delete-button default-button delete-button';
        if (theme === 'dark') {
            btn.className = 'task-item__delete-button default-button delete-button dark';
        }
        btn.deleteTaskId = item.id;
        btn.textContent = 'Удалить';
        //добавление вложенности
        form.append(inp, label);
        taskContent.append(form, spanText);
        container.append(taskContent, btn);
        task.append(container);
        taskList.append(task);
    });
}

taskList.addEventListener('click', (e) => {
    if (e.target.closest('.task-item__delete-button')) {
        modal.classList.remove('modal-overlay_hidden');
        const mainTask = e.target.closest('.task-item');
        const mainId = mainTask.getAttribute('data-task-id');
        delbtn.addEventListener('click', () => {

            tasks.splice(mainId - 1, 1);
            mainTask.remove();
            modal.classList.add('modal-overlay_hidden');
        })

    } else {
        modal.classList.add('modal-overlay_hidden');
    }
})



/// создание модального окна
const modal = document.createElement('div');
modal.className = 'modal-overlay modal-overlay_hidden';
const delModal = document.createElement('div');
delModal.className = 'delete-modal';
modal.append(delModal);
const h3Q = document.createElement('h3');
h3Q.className = 'delete-modal__question';
h3Q.textContent = 'Вы действительно хотите удалить эту задачу?';
delModal.append(h3Q);
const blockBtn = document.createElement('div');
blockBtn.className = 'delete-modal__buttons';
delModal.append(blockBtn);
const delCansel = document.createElement('dutton');
delCansel.className = 'delete-modal__button delete-modal__cancel-button';
delCansel.textContent = 'Отмена';
const delbtn = document.createElement('dutton');
delbtn.className = 'delete-modal__button delete-modal__confirm-button';
delbtn.textContent = 'Удалить';
blockBtn.append(delCansel, delbtn);
document.querySelector('body').append(modal);

delCansel.addEventListener('click', () => {
    modal.classList.add('modal-overlay_hidden');
})