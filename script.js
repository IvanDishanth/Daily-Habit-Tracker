const habitForm = document.getElementById('habitForm');
const habitList = document.getElementById('habitList');
let habits = JSON.parse(localStorage.getItem('habits')) || [];

function renderHabits() {
    habitList.innerHTML = '';
    habits.forEach((habit, index) => {
        const habitItem = document.createElement('li');
        habitItem.className = 'habit-item';
        habitItem.innerHTML = `
            <span>${habit.title} ${habit.category ? `(${habit.category})` : ''}</span>
            <div>
                <input type="checkbox" ${habit.completed ? 'checked' : ''} data-index="${index}">
                <button data-index="${index}">Delete</button>
            </div>
        `;
        habitList.appendChild(habitItem);
    });
}

function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

habitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('habitTitle').value.trim();
    const category = document.getElementById('habitCategory').value.trim();
    if (title) {
        habits.push({ title, category, completed: false });
        saveHabits();
        renderHabits();
        habitForm.reset();
    }
});

habitList.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (e.target.tagName === 'BUTTON') {
        habits.splice(index, 1);
        saveHabits();
        renderHabits();
    } else if (e.target.tagName === 'INPUT') {
        habits[index].completed = e.target.checked;
        saveHabits();
    }
});

renderHabits();