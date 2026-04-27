import { useState } from 'react';

// TypeScript interface לפרופס של קומפוננט
interface CounterProps {
  initialValue?: number;
  step?: number;
  label?: string;
}

// קומפוננט שמקבל props ומשתמש ב-useState
function Counter({ initialValue = 0, step = 1, label = 'Counter' }: CounterProps) {
  const [count, setCount] = useState<number>(initialValue);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(initialValue);

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <h3 className="text-lg font-bold mb-2">{label}</h3>
      <p className="text-3xl font-mono text-center my-3">{count}</p>

      {/* Conditional rendering - צבע לפי ערך */}
      <p className={`text-center text-sm mb-3 ${count > 0 ? 'text-green-600' : count < 0 ? 'text-red-600' : 'text-gray-500'}`}>
        {count > 0 ? 'חיובי' : count < 0 ? 'שלילי' : 'אפס'}
      </p>

      <div className="flex gap-2 justify-center">
        <button onClick={decrement} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          -{step}
        </button>
        <button onClick={reset} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">
          Reset
        </button>
        <button onClick={increment} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
          +{step}
        </button>
      </div>
    </div>
  );
}

export default Counter;
