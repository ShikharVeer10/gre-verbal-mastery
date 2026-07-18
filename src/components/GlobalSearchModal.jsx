import React, { useState } from 'react';
import { 
  X, 
  Search, 
  BookOpen, 
  Zap, 
  GitFork, 
  CheckCircle2, 
  AlertTriangle,
  Bookmark
} from 'lucide-react';
import { getAllWords } from '../data/dbHelper';

export default function GlobalSearchModal({ onClose, setSelectedWord, state }) {
  const allWords = getAllWords(state);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredWords = allWords.filter(w => {
    // Filter by category
    if (activeFilter === 'BOOKMARKED' && !state.bookmarkedWordIds.includes(w.id)) return false;
    if (activeFilter === 'WEAK' && !state.weakWordIds.includes(w.id)) return false;
    if (activeFilter === 'MASTERED' && !state.masteredWordIds.includes(w.id)) return false;

    if (!query) return true;
    const q = query.toLowerCase();

    return (
      w.word.toLowerCase().includes(q) ||
      w.simpleMeaning.toLowerCase().includes(q) ||
      w.root.toLowerCase().includes(q) ||
      w.synonyms.some(s => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: 750, padding: 28 }}>
        
        {/* Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--border-glass)', paddingBottom: 16, marginBottom: 16 }}>
          <Search size={22} color="#818cf8" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            placeholder="Search by word, meaning, root, prefix, suffix, synonym..."
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '1.15rem',
              fontFamily: 'var(--font-main)'
            }}
          />
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
          <FilterPill label="All Words" id="ALL" activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          <FilterPill label="Bookmarked" id="BOOKMARKED" activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          <FilterPill label="Weak Words" id="WEAK" activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          <FilterPill label="Mastered" id="MASTERED" activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </div>

        {/* Results List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 400, overflowY: 'auto' }}>
          {filteredWords.slice(0, 40).map((w) => (
            <div
              key={w.id}
              onClick={() => {
                setSelectedWord(w);
                onClose();
              }}
              style={{
                padding: '12px 16px',
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-glass)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{w.word}</span>
                  <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>{w.pos}</span>
                  <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Root: {w.root}</span>
                </div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginTop: 2 }}>
                  {w.simpleMeaning}
                </span>
              </div>

              <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>Set {w.setId}</span>
            </div>
          ))}

          {filteredWords.length === 0 && (
            <div style={{ textAlign: 'center', padding: 30, color: 'var(--text-muted)' }}>
              No matching GRE words found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function FilterPill({ label, id, activeFilter, setActiveFilter }) {
  const isActive = activeFilter === id;

  return (
    <button
      onClick={() => setActiveFilter(id)}
      style={{
        padding: '6px 12px',
        borderRadius: 20,
        fontSize: '0.78rem',
        fontWeight: 600,
        color: isActive ? '#fff' : 'var(--text-muted)',
        background: isActive ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.04)',
        border: isActive ? '1px solid #6366f1' : '1px solid var(--border-glass)',
        whiteSpace: 'nowrap',
        cursor: 'pointer'
      }}
    >
      {label}
    </button>
  );
}
