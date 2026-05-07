import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Layout from './components/layout/Layout';

import VocabularyPage from './components/pages/VocabularyPage';
import GrammarPage from './components/pages/GrammarPage';
import WritingPage from './components/pages/WritingPage';


function App() {
  const [writing, setWriting] = useState("");
  const [status, setStatus] = useState({ vocabDone: false, grammarDone: false })

  const refreshStatus = () => {
    fetch('/api/status')
    .then(res => res.json())
    .then(data => setStatus(data));
  };

  useEffect(() => { refreshStatus(); }, [])

  return (
    <BrowserRouter>
      <Layout status={status}>
        <Routes>
          <Route path='/' element={<VocabularyPage onComplete={refreshStatus}/>} />
          <Route path='/grammar' element={
            status.vocabDone ? <GrammarPage onComplete={refreshStatus} /> : <Navigate to="/" />
          } />
          <Route path='/writing' element={
            status.grammarDone ? <WritingPage writing={writing} setWriting={setWriting} /> : 
            <Navigate to="/grammar" />
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
