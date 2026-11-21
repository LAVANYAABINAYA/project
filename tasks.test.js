import test from 'node:test';
import assert from 'node:assert/strict';
import { createTask, toggleTask, removeTask } from '../js/tasks.js';

test('createTask builds an undone task with an id', () => {
  const t = createTask('Buy milk');
  assert.equal(t.text, 'Buy milk');
  assert.equal(t.done, false);
  assert.ok(t.id);
});

test('toggleTask flips done for the matching id only', () => {
  const a = createTask('a');
  const b = createTask('b');
  const out = toggleTask([a, b], a.id);
  assert.equal(out[0].done, true);
  assert.equal(out[1].done, false);
});

test('removeTask removes the matching task', () => {
  const a = createTask('a');
  const b = createTask('b');
  assert.deepEqual(removeTask([a, b], a.id), [b]);
});
