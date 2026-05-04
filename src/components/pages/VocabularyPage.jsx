import { useEffect, useState } from 'react';

import Section from '../layout/Section';

import Vocabulary from '../vocabulary/Vocabulary';
import AskVocabulary from '../vocabulary/AskVocabulary';
import LearnVocabulary from '../vocabulary/LearnVocabulary';

function VocabularyPage() {
  const [vocabulary, setVocabulary] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const fetchVocabulary = async (params) => {
    setLoading(true);
    try {
        const response = await fetch('/api/vocabulary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params)
        })

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        if (data && data.vocabulary) {
          setVocabulary(data.vocabulary);
          setHasData(true);
        }
    } catch (err) {
      console.error("Fetch failed: ", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading ...</p>; 

  return (
    <>
      {hasData ? (
        <>
          <Section title="Daily Vocabulary List">
            <Vocabulary vocabulary={vocabulary} />
          </Section>
          <Section title="Daily Vocabulary Practice" >
            <LearnVocabulary vocabulary={vocabulary} />
          </Section>
        </>
      ) : (
        <AskVocabulary onSubmit={fetchVocabulary} />
      )}
    </>
  );
}

export default VocabularyPage;
