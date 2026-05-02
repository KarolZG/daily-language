import { useEffect, useState } from 'react';

import './App.css';

import Vocabulary from './components/Vocabulary';
import AskVocabulary from './components/AskVocabulary';
import LearnVocabulary from './components/LearnVocabulary';
import Section from './components/Section';

function App() {
  const [vocabulary, setVocabulary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    fetch('/api/vocabulary')
    .then(res => res.json())
    .then(data => {
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
          <Section title="Daily Vocabulary List">
            <Vocabulary vocabulary={vocabulary} />
          </Section>
          <Section title="Daily Vocabulary Practice">
            <LearnVocabulary vocabulary={vocabulary} />
          </Section>
        </>
      ) : (
        <AskVocabulary onSubmit={fetchVocabulary} />
      )}
    </>
  );
}

export default App;
