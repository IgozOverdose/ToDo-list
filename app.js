const tasks = [
{
    _id: '3453cf3455dfr123v',
    completed: true,
    body:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime rem tempora pariatur quas repudiandae eligendi voluptas maiores molestias vitae sunt. Praesentium numquam pariatur saepe iusto officia. Quas mollitia dicta delectus",
    title: 'adipisicing elit. Maxime rem tempora quas repudiandae eligendi pariatur quas repudiandae',
},
{
    _id: '3453cf3455dfr123b',
    completed: false,
    body:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime rem tempora pariatur quas repudiandae eligendi voluptas maiores molestias vitae sunt. Praesentium numquam pariatur saepe iusto officia. Quas mollitia dicta delectus",
    title: 'Maxime rem tempora adipisicing elit. ',
},
{
    _id: '3453cf3455dfr123g',
    completed: true,
    body:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime rem tempora pariatur quas repudiandae eligendi voluptas maiores molestias vitae sunt. Praesentium numquam pariatur saepe iusto officia. Quas mollitia dicta delectus",
    title: 'elit. Maxime rem tempora',
},


];
(function(arrayOfTasks){

    const objOfTasks = arrayOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
    }, {});

    const themes = {

        default: {
            '--base-text-color': '#212529',
            '--header-bg': '#007bff',
            '--header-text-color': '#fff',
            '--default-btn-bg': '#007bff',
            '--default-btn-text-color':'#fff',
            '--default-btn-hover-bg': '#0069d9',
            '--default-btn-border-color': '#0069d9',
            '--danger-btn-bg': '#dc3545',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#bd2130',
            '--danger-btn-border-color': '#dc3545',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#80bdff',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123,255,0.25)',

        },

        dark: {

            '--base-text-color': '#212529',
            '--header-bg': '#343a40',
            '--header-text-color': '#fff',
            '--default-btn-bg': '#58616b',
            '--default-btn-text-color':'#fff',
            '--default-btn-hover-bg': '#292d31',
            '--default-btn-border-color': '#343a40',
            '--default-btn-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--danger-btn-bg': '#b52d3a',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#88222c',
            '--danger-btn-border-color': '#88222c',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123,255,0.25)',
            
        },

        light:{

            '--base-text-color': '#212529',
            '--header-bg': '#fff',
            '--header-text-color': '#212529',
            '--default-btn-bg': '#fff',
            '--default-btn-text-color':'#212529',
            '--default-btn-hover-bg': '#e8e7e7',
            '--default-btn-border-color': '#343a40',
            '--danger-btn-bg': '#f1b5bb',
            '--danger-btn-text-color': '#212529',
            '--danger-btn-hover-bg': '#ef808a',
            '--danger-btn-border-color': '#ef818a',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        },

    };

    let lastSelectedTheme = localStorage.getItem('app_theme')|| 'default';

    // Elements UI
    const listContainer = document.querySelector('.tasks-list-section .list-group',);

const form = document.forms['addTask'];
const inputTitle = form.elements['title'];
const inputBody = form.elements['body'];
const themeSelect = document.getElementById('themeSelect');

setTheme(lastSelectedTheme);
//Events
    renderAllTasks(objOfTasks);
    form.addEventListener('submit', onFormSubmitHandler);
listContainer.addEventListener('click', onDeletehandler);
themeSelect.addEventListener('change', onThemeSelectHandler);

    function renderAllTasks(tasksList){
        if(!tasksList) {
            console.error("Передайте список задач!");
            return; }

            const fragment = document.createDocumentFragment();
            Object.values(tasksList).forEach(task => {
            const li = listItemTemplate(task);
            fragment.appendChild(li);

            });
            listContainer.appendChild(fragment);

    }

    function listItemTemplate({_id, title, body}={}) {

        const li = document.createElement("li");
        li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2',);
        li.setAttribute('data-task-id', _id);
        const span = document.createElement('span');
        span.textContent = title;
        span.style.fontWeight = 'bold';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete task';
        deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

        const article = document.createElement('p');
        article.textContent = body;
        article.classList.add('mt-2', 'w-100');


        li.appendChild(span);
        li.appendChild(article);
        li.appendChild(deleteBtn);
      

     return li;

    }
    
    function onFormSubmitHandler(e) {

        e.preventDefault();
        const titleValue = inputTitle.value;
        const bodyValue = inputBody.value;
        if(!titleValue || !bodyValue){

            alert("Пожалуйста введите title и body");
            return;
        }

        const task = createNewTask(titleValue, bodyValue);
        const listItem = listItemTemplate(task);
        listContainer.insertAdjacentElement("afterbegin", listItem);
        form.reset();

    }

    function createNewTask(title, body){
const newTask = {
title,
body,
completed: false,
_id: `task-${Math.random()}`,

};

objOfTasks[newTask._id] = newTask;

return {...newTask};
    }

    function deleteTask(id){
        const {title} =objOfTasks[id];
        const isConfirm = confirm(`Точно вы хотите удалить задачу: ${title}`);
       if(!isConfirm) return isConfirm;
       delete objOfTasks[id];
        return isConfirm;

        
    }

function deleteTaskFromHtml(confirmed, el){
            if(!confirmed) return;
            el.remove();
        }



    function onDeletehandler({target}){
       if(target.classList.contains('delete-btn')){
        const parent = target.closest('[data-task-id]');
       const id = parent.dataset.taskId;
        const confirmed = deleteTask(id);
        deleteTaskFromHtml(confirmed, parent);
       

       }
    }

    function onThemeSelectHandler(e){

        const selectedTheme =themeSelect.value;
        const isConfirmed = confirm(`Вы действительно хотите извенить тему на: ${selectedTheme}`,
        );
        if (!isConfirmed) {
            themeSelect.value = lastSelectedTheme;
            return;
        }
        setTheme(selectedTheme);
        lastSelectedTheme = selectedTheme;
        localStorage.setItem('app_theme', selectedTheme);

    }

    function setTheme(name){

    const selectedThemeObj = themes[name];
    Object.entries(selectedThemeObj).forEach(([key, value])=>{
   document.documentElement.style.setProperty(key, value);
    });
    }
})(tasks);