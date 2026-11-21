export function createTask(text) {
  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    text,
    done: false,
  };
}

export function toggleTask(tasks, id) {
  return tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
}

export function removeTask(tasks, id) {
  return tasks.filter((t) => t.id !== id);
}

export const MAX_LENGTH = 120;

export function validateText(text) {
  const clean = String(text ?? '').trim();
  if (!clean || clean.length > MAX_LENGTH) return null;
  return clean;
}

export function countActive(tasks) {
  return tasks.filter((t) => !t.done).length;
}

export function filterTasks(tasks, filter) {
  if (filter === 'active') return tasks.filter((t) => !t.done);
  if (filter === 'done') return tasks.filter((t) => t.done);
  return tasks;
}

export function clearDone(tasks) {
  return tasks.filter((t) => !t.done);
}
