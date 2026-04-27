import { useState } from 'react';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import DataFetcher from './components/DataFetcher';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

// TypeScript interface לפרופס - דוגמה נוספת
interface SectionProps {
  title: string;
  badge: string;
  children: React.ReactNode;
}

// קומפוננט עם children prop
function Section({ title, badge, children }: SectionProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setCollapsed(prev => !prev)}
        className="flex items-center gap-2 w-full text-left mb-2"
      >
        <span className="bg-blue-100 text-blue-800 text-xs font-mono px-2 py-0.5 rounded">{badge}</span>
        <h2 className="font-bold text-gray-700">{title}</h2>
        <span className="text-gray-400 text-sm ml-auto">{collapsed ? '▶' : '▼'}</span>
      </button>
      {/* Conditional rendering */}
      {!collapsed && children}
    </div>
  );
}

// ======== APP ========
function App() {
  // Custom hook - useState שנשמר ב-localStorage
  const [userName, setUserName, clearUserName] = useLocalStorage('userName', '');
  const [inputName, setInputName] = useState('');

  const handleSaveName = () => {
    if (inputName.trim()) {
      setUserName(inputName.trim());
      setInputName('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans" dir="rtl">
      <header className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-1">React Test - דוגמאות</h1>
        <p className="text-gray-500 text-sm">כל נושאי הליבה במקום אחד</p>
      </header>

      <main className="max-w-2xl mx-auto space-y-2">

        {/* useState + controlled input + custom hook */}
        <Section title="Custom Hook + useState + Controlled Input" badge="hook">
          <div className="border rounded-lg p-4 bg-white shadow">
            <h3 className="text-lg font-bold mb-2">Custom Hook: useLocalStorage</h3>

            {/* Conditional rendering */}
            {userName ? (
              <div className="flex items-center gap-3">
                <p className="text-green-700">שלום, <strong>{userName}</strong>! (נשמר ב-localStorage)</p>
                <button onClick={clearUserName} className="text-xs text-red-400 hover:text-red-600">
                  נקה
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                  placeholder="הכנס שם..."
                  className="border rounded px-3 py-1 text-sm flex-1"
                />
                <button onClick={handleSaveName} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                  שמור
                </button>
              </div>
            )}
          </div>
        </Section>

        {/* Props + useState + Conditional rendering */}
        <Section title="Props + useState + Conditional Rendering" badge="props">
          <div className="grid grid-cols-2 gap-3">
            {/* props: initialValue, step, label */}
            <Counter label="Counter רגיל" />
            <Counter label="צעד של 5" step={5} initialValue={10} />
          </div>
        </Section>

        {/* Controlled input + .map() + useRef + keys */}
        <Section title="Controlled Input + .map() + useRef + Keys" badge="list">
          <TodoList />
        </Section>

        {/* useEffect + fetch + loading/error states */}
        <Section title="useEffect + Fetch + Loading/Error" badge="effect">
          <DataFetcher />
        </Section>

        {/* טבלת נושאים כסיכום */}
        <Section title="סיכום נושאים שכוסו" badge="summary">
          <div className="border rounded-lg p-4 bg-white shadow overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-right p-2 font-semibold">נושא</th>
                  <th className="text-right p-2 font-semibold">היכן</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['useState', 'Counter, TodoList, App'],
                  ['useEffect', 'DataFetcher (טעינה + cleanup)'],
                  ['useRef', 'TodoList (פוקוס על input)'],
                  ['Custom Hook', 'useLocalStorage'],
                  ['Props + Interface', 'Counter, Section'],
                  ['children prop', 'Section'],
                  ['Controlled Input', 'TodoList, App'],
                  ['.map() + key', 'TodoList, filter buttons'],
                  ['Conditional Rendering', 'כל הקומפוננטים'],
                  ['TypeScript interfaces', 'Todo, CounterProps, SectionProps, ApiData'],
                  ['Event Handling', 'onClick, onChange, onKeyDown'],
                  ['Spread / immutable update', 'TodoList - toggleTodo'],
                ].map(([topic, where]) => (
                  <tr key={topic} className="border-t hover:bg-gray-50">
                    <td className="p-2 font-mono text-blue-700 text-xs">{topic}</td>
                    <td className="p-2 text-gray-600 text-xs">{where}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

      </main>
    </div>
  );
}

export default App;
