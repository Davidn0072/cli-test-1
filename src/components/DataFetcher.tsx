import { useState, useEffect } from 'react';
import config from '../config';

// TypeScript interface לנתונים מהשרת
interface ApiData {
  message?: string;
  [key: string]: unknown;
}

function DataFetcher() {
  // useState לניהול מצבי הבקשה
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  // useEffect - רץ כשהקומפוננט עולה לראשונה
  useEffect(() => {
    document.title = 'React Test App';
    return () => {
      document.title = 'Vite + React'; // cleanup function
    };
  }, []); // dependency array ריק = רץ פעם אחת

  // useEffect שרץ בכל פעם ש-fetchCount משתנה
  useEffect(() => {
    if (fetchCount === 0) return;

    setLoading(true);
    setError(null);

    fetch(config.API_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then(json => setData(json))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [fetchCount]); // dependency array - רץ כש-fetchCount משתנה

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <h3 className="text-lg font-bold mb-2">שליפת נתונים מהשרת</h3>
      <p className="text-xs text-gray-400 mb-3">{config.API_URL}</p>

      <button
        onClick={() => setFetchCount(prev => prev + 1)}
        disabled={loading}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {loading ? 'טוען...' : 'שלוף נתונים'}
      </button>

      {/* Conditional rendering לפי מצב */}
      {loading && (
        <div className="mt-3 text-center text-gray-500 text-sm animate-pulse">טוען...</div>
      )}

      {error && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          שגיאה: {error}
        </div>
      )}

      {data && !loading && (
        <pre className="mt-3 p-2 bg-gray-50 rounded text-xs overflow-auto max-h-32">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default DataFetcher;
