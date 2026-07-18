import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DailyStudyFlow from './components/DailyStudyFlow';
import VocabularySets from './components/VocabularySets';
import RootModule from './components/RootModule';
import SynonymDictionary from './components/SynonymDictionary';
import GrePractice from './components/GrePractice';
import ReadingComprehension from './components/ReadingComprehension';
import SpacedRepetitionView from './components/SpacedRepetitionView';
import WeakWordsView from './components/WeakWordsView';
import OcrImporter from './components/OcrImporter';
import AdminPanel from './components/AdminPanel';
import WordDetailModal from './components/WordDetailModal';
import GlobalSearchModal from './components/GlobalSearchModal';

import { loadState, saveState } from './data/dbHelper';

export default function App() {
  const [state, setState] = useState(loadState);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedWord, setSelectedWord] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Keyboard Shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header Navigation Bar */}
      <Header 
        state={state} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenSearch={() => setIsSearchOpen(true)} 
      />

      {/* Main Container */}
      <main style={{ maxWidth: 1400, width: '100%', margin: '0 auto', padding: '28px 24px', flex: 1 }}>
        {activeTab === 'dashboard' && (
          <Dashboard 
            state={state} 
            setActiveTab={setActiveTab} 
            setSelectedWord={setSelectedWord} 
          />
        )}

        {activeTab === 'daily_flow' && (
          <DailyStudyFlow 
            state={state} 
            setState={setState} 
            setSelectedWord={setSelectedWord}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'sets' && (
          <VocabularySets 
            state={state} 
            setActiveTab={setActiveTab} 
            setSelectedWord={setSelectedWord} 
          />
        )}

        {activeTab === 'roots' && (
          <RootModule 
            setSelectedWord={setSelectedWord} 
          />
        )}

        {activeTab === 'synonyms' && (
          <SynonymDictionary 
            setSelectedWord={setSelectedWord} 
          />
        )}

        {activeTab === 'gre_practice' && (
          <GrePractice 
            state={state} 
            setState={setState} 
          />
        )}

        {activeTab === 'reading_comp' && (
          <ReadingComprehension />
        )}

        {activeTab === 'spaced_rep' && (
          <SpacedRepetitionView 
            state={state} 
            setState={setState} 
            setSelectedWord={setSelectedWord} 
          />
        )}

        {activeTab === 'weak_words' && (
          <WeakWordsView 
            state={state} 
            setSelectedWord={setSelectedWord} 
            setActiveTab={setActiveTab} 
          />
        )}

        {activeTab === 'ocr_import' && (
          <OcrImporter 
            state={state} 
            setState={setState} 
          />
        )}

        {activeTab === 'admin' && (
          <AdminPanel 
            state={state} 
            setState={setState} 
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-glass)', padding: '20px 24px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
        GRE Verbal Mastery System • EXCLUSIVELY GRE VERBAL • Spaced Repetition & Long-Term Memory Protocol
      </footer>

      {/* Modals */}
      {selectedWord && (
        <WordDetailModal 
          wordObj={selectedWord} 
          onClose={() => setSelectedWord(null)} 
          state={state} 
          setState={setState} 
          setSelectedWord={setSelectedWord} 
        />
      )}

      {isSearchOpen && (
        <GlobalSearchModal 
          onClose={() => setIsSearchOpen(false)} 
          setSelectedWord={setSelectedWord} 
          state={state} 
        />
      )}

    </div>
  );
}
