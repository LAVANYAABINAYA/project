export function renderTasks(tasks, list) {
  list.innerHTML = '';
  for (const t of tasks) {
    const li = document.createElement('li');
    li.dataset.id = t.id;
    if (t.done) li.classList.add('done');
    const label = document.createElement('span');
    label.textContent = t.text;
    label.className = 'label';
    li.append(label);
    list.append(li);
  }
}
