import { useEffect, useState } from 'react';
import './App.css';
import AskVocabulary from './components/AskVocabulary';
import Vocabulary from './components/Vocabulary';
import LearnVocabulary from './components/LearnVocabulary';

function App() {
  const [vocabulary, setVocabulary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    fetch('/api/vocabulary')
    .then(res => res.json())
    .then(data => {
      console.log("Data from API: ", data);
      if (data.vocabulary && data.vocabulary.length > 0)
      {
        setVocabulary(data.vocabulary);
        setHasData(true);
      }
      setLoading(false);
    });
  }, []);

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
        setHasData(true);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching:", err);
        setLoading(false);
      });
  }

  if (loading) return <p>Loading ...</p>; 

  return (
    <>
      {hasData ? (
        <>
          <Vocabulary vocabulary={vocabulary} />
          <LearnVocabulary vocabulary={vocabulary} />
        </>
      ) : (
        <AskVocabulary onSubmit={fetchVocabulary} />
      )}
    </>
  );
}

export default App;
