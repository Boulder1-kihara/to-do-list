document.addEventListener('DOMContentLoaded', () =>{
    const hey = document.getElementById('hey');
    const time = document.getElementById('time');
    const search = document.getElementById('search');
    const serc = document.getElementById('serc');
    const progres = document.getElementById('progres');
    const pshow = document.getElementById('pshow');
    const circular_progress = document.getElementById('circular-progress');
    const percentage = document.getElementById('percentage');
    const newTaskInput = document.getElementById('newTaskInput');
    const main = document.getElementById('main');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const usericon = document.getElementById('userIcon');
    const namePopover = document.getElementById('namePopover');
    const nameInput = document.getElementById('nameInput');
    const saveBtn = document.getElementById('saveNameBtn');

    percentage.textContent = '0%';
    hey.textContent = 'hey there!';
    newTaskInput.value = '';

    //function to update the percentage
    function update_progress(){
        const all_tasks = main.querySelectorAll('.new-task');
        //count elements with 'completed' class
        const completed_tasks = main.querySelectorAll('.new-task .completed');

        const total_tasks = all_tasks.length;
        const tasks_done = completed_tasks.length;

        let current_percentage = 0;
        if(total_tasks > 0){
            current_percentage = Math.round((tasks_done/total_tasks)*100);
        }
        percentage.textContent = `${current_percentage}%`;

        const progress_angle = current_percentage * 3.6;
        circular_progress.style.background = `conic-gradient(rgb(94, 43, 94) ${progress_angle}deg, #502959 ${progress_angle}deg)`;
    }

    //event listener for  the save button in the popover
    saveBtn.addEventListener('click', () =>{
        //get the value from the input field
        const entered_name = nameInput.value.trim();
        if(entered_name){
            hey.textContent = `hey, ${entered_name}`;
            namePopover.style.display = 'none';
        }
    });

    //toggle popover visibility when the icon is clicked
    usericon.addEventListener('click', (event) =>{
        namePopover.style.display = namePopover.style.display === 'flex' ? 'none' : 'flex';
        event.stopPropagation();//prevent click from bubbling up to document
    });

    //hide popover if clicked outside
    document.addEventListener('click', (event) =>{
        if(!namePopover.contains(event.target) && event.target !== usericon){
            namePopover.style.display = 'none';
        }
    });

    addTaskBtn.addEventListener('click', () =>{
        //create a new element div for new task
        const new_task_value = newTaskInput.value.trim();

        if(new_task_value ===''){
            alert('please enter a task!');
            return;
        }

        const new_task_div = document.createElement('div');

        ///add the new item class for styling
        new_task_div.classList.add('new-task')


        //create a span elementfor the items text content
        const task_text_span = document.createElement('span');
        task_text_span.textContent = new_task_value;

        //create the check icon element
        const check_icon = document.createElement('i');
        check_icon.classList.add('fa-solid', 'fa-circle-check');
        check_icon.setAttribute('aria-hidden', 'true');
        check_icon.style.color = 'lime';

        //add event listenertotask as complete
        check_icon.addEventListener('click', () =>{
            task_text_span.classList.toggle('completed');
            update_progress();
        });

        //create an <i> element for removing the item
        const remove_button = document.createElement('i');
        remove_button.classList.add('fa-solid', 'fa-trash-can',);
        remove_button.setAttribute('aria-hidden', 'true');

        //add an event listener to the remove button
        remove_button.addEventListener('click', () =>{
            new_task_div.remove();
            update_progress();
        });

       new_task_div.appendChild(task_text_span);
       new_task_div.appendChild(check_icon);
       new_task_div.appendChild(remove_button);

       main.appendChild(new_task_div);

       newTaskInput.value = '';
       hey.value = '';
       update_progress();
    });

    //SEARCH OPTION
    serc.addEventListener('input', () =>{
        //get the search term and convert to lower case
        const searcterm = serc.value.toLowerCase();
        //get all task elements
        const tasks = main.querySelectorAll('.new-task')

        tasks.forEach(task =>{
            const tasktext = task.querySelector('span').textContent.toLowerCase();

            if(tasktext.includes(searcterm)){
                //show the task if it matches
                task.style.display = 'flex';
            }else{
                //hide task if doesnt match
                task.style.display = 'none';
            }
        });
    });
});
