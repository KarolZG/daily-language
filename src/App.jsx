import { useState } from 'react';
import './App.css';
import AskVocabulary from './components/AskVocabulary';
import Vocabulary from './components/Vocabulary';

function App() {
  const [vocabulary, setVocabulary] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVocabulary = (params) => {
    setLoading(true);
    fetch('/api/vocabulary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      })
      .then(res => res.json())
      .then(data => {
        setVocabulary(data.vocabulary);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching:", err);
        setLoading(false);
      })
  }

  return (
    <>
      <AskVocabulary onSubmit={fetchVocabulary} />
      {loading ? <p>Generating vocabulary...</p> : <Vocabulary vocabulary={vocabulary}/>}
    </>
  );
}

export default App;
