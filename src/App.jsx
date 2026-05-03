import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './components/layout/Layout';

import VocabularyPage from './components/pages/VocabularyPage';
import GrammarPage from './components/pages/GrammarPage';
import WritingPage from './components/pages/WritingPage';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<VocabularyPage />} />
          <Route path='/grammar' element={<GrammarPage />} />
          <Route path='/writing' element={<WritingPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
