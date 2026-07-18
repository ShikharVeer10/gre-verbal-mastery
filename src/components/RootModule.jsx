import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Brain 
} from 'lucide-react';
import { getAllRoots, getAllWords } from '../data/dbHelper';

export default function RootModule({ setSelectedWord }) {
  const rootsData = getAllRoots();
  const allWords = getAllWords();

  const [selectedRootKey, setSelectedRootKey] = useState('AB');
  const [searchQuery, setSearchQuery] = useState('');
  const [quizActive, setQuizActive] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const rootsList = Object.values(rootsData);
  const activeRoot = rootsData[selectedRootKey] || rootsList[0];

  const filteredRoots = rootsList.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.meaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeRootWords = allWords.filter(w => w.root === activeRoot.name);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Module Banner */}
      <div className="glass-panel" style={{ padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: 6, display: 'inline-block' }}>ROOT WORD ENGINE</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
              GRE Root Word Dictionary & Learning Mode
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
              Unlock hundreds of complex GRE words by mastering core Latin & Greek roots, prefixes, and suffixes.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search root or meaning..."
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-glass)',
                  padding: '10px 16px 10px 38px',
                  borderRadius: 12,
                  color: '#fff',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            <button className="btn-primary" onClick={() => setQuizActive(!quizActive)}>
              <Zap size={16} />
              <span>{quizActive ? "Exit Root Quiz" : "Launch Root Quiz"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      {!quizActive ? (
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24 }}>
          
          {/* Left Column: Root Selector List */}
          <div className="glass-panel" style={{ padding: 16, maxHeight: 650, overflowY: 'auto' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 12, paddingLeft: 8 }}>
              AVAILABLE ROOTS ({filteredRoots.length})
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {filteredRoots.map((r) => {
                const isSelected = r.name === activeRoot.name;

                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRootKey(r.id)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 10,
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.02)',
                      border: isSelected ? '1px solid #6366f1' : '1px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>{r.name}</span>
                      <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>{r.origin}</span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginTop: 2 }}>
                      {r.meaning}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Root Detail Page */}
          <div className="glass-panel" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Root Title Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-glass)', paddingBottom: 16 }}>
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: 4, display: 'inline-block' }}>ROOT DETAILS</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#fff' }}>
                  Root: {activeRoot.name}
                </h3>
                <p style={{ fontSize: '1rem', color: '#fbbf24', fontWeight: 600, marginTop: 2 }}>
                  Core Meaning: "{activeRoot.meaning}"
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Origin: {activeRoot.origin}</span>
                <span style={{ fontSize: '0.8rem', color: '#818cf8', display: 'block', marginTop: 2 }}>
                  Prefix: {activeRoot.prefix} • Suffix: {activeRoot.suffix}
                </span>
              </div>
            </div>

            {/* Memory Tips */}
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: 18, borderRadius: 14, border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Brain size={18} color="#fbbf24" />
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>Root Memory Hook</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#fbbf24', lineHeight: 1.5 }}>
                {activeRoot.memoryTips}
              </p>
            </div>

            {/* Associated GRE Words */}
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: 14 }}>
                GRE Words Built from Root "{activeRoot.name}" ({activeRootWords.length} Words)
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                {activeRootWords.length > 0 ? (
                  activeRootWords.map((w) => (
                    <div
                      key={w.id}
                      onClick={() => setSelectedWord(w)}
                      className="glass-panel glass-card-hover"
                      style={{ padding: 14, borderRadius: 12, cursor: 'pointer', border: '1px solid var(--border-glass)' }}
                    >
                      <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', display: 'block', marginBottom: 4 }}>
                        {w.word}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {w.simpleMeaning}
                      </span>
                    </div>
                  ))
                ) : (
                  activeRoot.exampleWords.map((exWord, idx) => (
                    <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 14, borderRadius: 10, border: '1px solid var(--border-glass)', fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>
                      {exWord}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Root Quiz View */
        <div className="glass-panel" style={{ padding: 32, maxWidth: 700, margin: '0 auto', width: '100%' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
            Root Word Mastery Challenge
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 24 }}>
            Identify the correct root for the word: <strong style={{ color: '#fbbf24', fontSize: '1.1rem' }}>{activeRootWords[0]?.word || "Abdicate"}</strong>
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {rootsList.slice(0, 4).map((r, idx) => (
              <button
                key={idx}
                onClick={() => setQuizScore(quizScore + 1)}
                style={{
                  padding: 16,
                  borderRadius: 12,
                  textAlign: 'left',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-glass)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  fontWeight: 600
                }}
              >
                Root {r.name} — {r.meaning}
              </button>
            ))}
          </div>

          <button className="btn-primary" onClick={() => setQuizActive(false)}>
            <span>Done Quiz</span>
          </button>
        </div>
      )}

    </div>
  );
}
