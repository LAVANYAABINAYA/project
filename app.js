import { createTask, toggleTask, removeTask, validateText, countActive, filterTasks, clearDone } from './tasks.js';
import { loadTasks, saveTasks } from './storage.js';
import { renderTasks } from './ui.js';

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const counter = document.getElementById('counter');
const filters = document.getElementById('filters');
const clearBtn = document.getElementById('clear-done');

let tasks = loadTasks();
let filter = 'all';

function render() {
  renderTasks(filterTasks(tasks, filter), list);
  const n = countActive(tasks);
  counter.textContent = `${n} item${n === 1 ? '' : 's'} left`;
}

function update() {
  saveTasks(tasks);
  render();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = validateText(input.value);
  if (!text) {
    input.classList.add('invalid');
    return;
  }
  input.classList.remove('invalid');
  tasks = [...tasks, createTask(text)];
  input.value = '';
  update();
});

list.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  const id = li.dataset.id;
  if (e.target.matches('.toggle')) tasks = toggleTask(tasks, id);
  else if (e.target.matches('.delete')) tasks = removeTask(tasks, id);
  else return;
  update();
});

filters.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-filter]');
  if (!btn) return;
  filter = btn.dataset.filter;
  filters.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b === btn));
  render();
});

clearBtn.addEventListener('click', () => {
  tasks = clearDone(tasks);
  update();
});

render();
