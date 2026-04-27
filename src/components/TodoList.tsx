import { useState, useRef } from 'react';

// TypeScript interface לפריט ברשימה
interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function TodoList() {
  // useState לניהול הרשימה
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'ללמוד React', done: true },
    { id: 2, text: 'לתרגל hooks', done: false },
  ]);

  // Controlled input - useState לשדה הטקסט
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'done' | 'active'>('all');

  // useRef לפוקוס על השדה אחרי הוספה
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    if (!inputValue.trim()) return;
    setTodos(prev => [...prev, { id: Date.now(), text: inputValue.trim(), done: false }]);
    setInputValue(''); // איפוס השדה
    inputRef.current?.focus(); // useRef - חזרה לפוקוס
  };

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // חישוב נגזר מהסטייט
  const filtered = todos.filter(t => {
    if (filter === 'done') return t.done;
    if (filter === 'active') return !t.done;
    return true;
  });

  const doneCount = todos.filter(t => t.done).length;

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <h3 className="text-lg font-bold mb-2">רשימת משימות</h3>
      <p className="text-sm text-gray-500 mb-3">{doneCount} / {todos.length} הושלמו</p>

      {/* Controlled input */}
      <div className="flex gap-2 mb-3">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="משימה חדשה..."
          className="border rounded px-3 py-1 flex-1 text-sm"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
          הוסף
        </button>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-1 mb-3">
        {(['all', 'active', 'done'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2 py-1 rounded text-xs ${filter === f ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            {f === 'all' ? 'הכל' : f === 'active' ? 'פעיל' : 'הושלם'}
          </button>
        ))}
      </div>

      {/* Conditional rendering - רשימה ריקה */}
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-center py-4 text-sm">אין משימות להצגה</p>
      ) : (
        // .map() עם key
        <ul className="space-y-2">
          {filtered.map(todo => (
            <li key={todo.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                className="cursor-pointer"
              />
              <span className={`flex-1 ${todo.done ? 'line-through text-gray-400' : ''}`}>
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)} className="text-red-400 hover:text-red-600 text-xs">
                מחק
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
