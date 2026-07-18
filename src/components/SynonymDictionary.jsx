import React, { useState } from 'react';
import { 
  GitFork, 
  Search, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { getAllWords } from '../data/dbHelper';
import RelationshipGraph from './RelationshipGraph';

export default function SynonymDictionary({ setSelectedWord }) {
  const allWords = getAllWords();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWordObj, setSelectedWordObj] = useState(allWords[0]);

  const filteredWords = allWords.filter(w => 
    w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.synonyms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: 6, display: 'inline-block' }}>SYNONYM ENGINE</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
              GRE Synonym & Antonym Dictionary + Relationship Graph
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
              Explore clickable synonyms, near synonyms, antonyms, and visual network connections between GRE vocabulary.
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search word or synonym..."
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-glass)',
                padding: '10px 16px 10px 38px',
                borderRadius: 12,
                color: '#fff',
                fontSize: '0.88rem',
                outline: 'none',
                width: 260
              }}
            />
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>
      </div>

      {/* Main Grid: Word List & Graph */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24 }}>
        
        {/* Left Column: Word Selector */}
        <div className="glass-panel" style={{ padding: 16, maxHeight: 650, overflowY: 'auto' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 12, paddingLeft: 8 }}>
            SEARCHABLE DICTIONARY ({filteredWords.length})
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredWords.slice(0, 50).map((w) => {
              const isSelected = w.id === selectedWordObj?.id;

              return (
                <div
                  key={w.id}
                  onClick={() => setSelectedWordObj(w)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '1px solid #10b981' : '1px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{w.word}</span>
                    <span style={{ fontSize: '0.72rem', color: '#34d399' }}>{w.synonyms.length} Synonyms</span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginTop: 2 }}>
                    Synonym: {w.synonyms[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Relationship Graph & Synonym Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {selectedWordObj && (
            <>
              {/* Visual Graph Card */}
              <RelationshipGraph wordObj={selectedWordObj} />

              {/* Detailed Synonym Breakdown */}
              <div className="glass-panel" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
                    {selectedWordObj.word} — Synonym Relationships
                  </h3>
                  <button className="btn-secondary" onClick={() => setSelectedWord(selectedWordObj)} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                    <span>Open Full Word Page</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: 16, borderRadius: 12, border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase' }}>Primary Synonyms</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                      {selectedWordObj.synonyms.map((s, idx) => (
                        <span key={idx} className="badge badge-emerald" style={{ fontSize: '0.85rem' }}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(244, 63, 94, 0.08)', padding: 16, borderRadius: 12, border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f43f5e', textTransform: 'uppercase' }}>Antonyms</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                      {selectedWordObj.antonyms.map((a, idx) => (
                        <span key={idx} className="badge badge-rose" style={{ fontSize: '0.85rem' }}>{a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}
