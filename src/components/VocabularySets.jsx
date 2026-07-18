import React, { useState } from 'react';
import { 
  Lock, 
  CheckCircle2, 
  Play, 
  Sparkles, 
  BookOpen, 
  Search 
} from 'lucide-react';
import { getAllWords } from '../data/dbHelper';

export default function VocabularySets({ state, setActiveTab, setSelectedWord }) {
  const [searchFilter, setSearchFilter] = useState('');
  const allWords = getAllWords(state);
  const totalSets = Math.ceil(allWords.length / 15);

  const activeSetId = state.currentActiveSetId || 1;

  const setsList = Array.from({ length: totalSets }, (_, idx) => {
    const setId = idx + 1;
    const setWords = allWords.filter(w => w.setId === setId).slice(0, 15);
    const isUnlocked = state.unlockedSetIds.includes(setId);
    const isCompleted = setId < activeSetId;
    const isCurrent = setId === activeSetId;

    return {
      setId,
      setWords,
      isUnlocked,
      isCompleted,
      isCurrent
    };
  });

  const filteredSets = setsList.filter(s => {
    if (!searchFilter) return true;
    return s.setWords.some(w => w.word.toLowerCase().includes(searchFilter.toLowerCase()));
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: 6, display: 'inline-block' }}>FIXED DAILY SETS</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
              192 Daily Sets (15 Words Per Set)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
              Sequential progression enforced. Future sets unlock automatically upon completing today's 15-step study flow.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder="Filter by word..."
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
          </div>
        </div>
      </div>

      {/* Grid of Daily Sets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {filteredSets.map((setItem) => {
          return (
            <div
              key={setItem.setId}
              className="glass-panel glass-card-hover"
              style={{
                padding: 22,
                borderRadius: 16,
                border: setItem.isCurrent 
                  ? '1px solid rgba(245, 158, 11, 0.6)' 
                  : setItem.isCompleted 
                  ? '1px solid rgba(16, 185, 129, 0.4)' 
                  : '1px solid var(--border-glass)',
                opacity: setItem.isUnlocked ? 1 : 0.6,
                position: 'relative'
              }}
            >
              {/* Set Title & Status */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ 
                    width: 36, 
                    height: 36, 
                    borderRadius: 10, 
                    background: setItem.isCurrent ? 'rgba(245, 158, 11, 0.2)' : setItem.isCompleted ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    color: setItem.isCurrent ? '#fbbf24' : setItem.isCompleted ? '#34d399' : 'var(--text-muted)'
                  }}>
                    {setItem.setId}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                      Set {setItem.setId}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>15 Target Words</span>
                  </div>
                </div>

                <div>
                  {setItem.isCompleted && <span className="badge badge-emerald">Mastered</span>}
                  {setItem.isCurrent && <span className="badge badge-gold">Active Today</span>}
                  {!setItem.isUnlocked && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                      <Lock size={14} />
                      <span>Locked</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 15 Words Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                {setItem.setWords.map(w => (
                  <span
                    key={w.id}
                    onClick={() => setItem.isUnlocked && setSelectedWord(w)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '4px 8px',
                      borderRadius: 6,
                      fontSize: '0.78rem',
                      color: setItem.isUnlocked ? 'var(--text-main)' : 'var(--text-dim)',
                      cursor: setItem.isUnlocked ? 'pointer' : 'default',
                      border: '1px solid var(--border-glass)'
                    }}
                  >
                    {w.word}
                  </span>
                ))}
              </div>

              {/* Card Action */}
              {setItem.isCurrent && (
                <button 
                  className="btn-gold" 
                  onClick={() => setActiveTab('daily_flow')} 
                  style={{ width: '100%', justifyContent: 'center', padding: '10px 0', fontSize: '0.85rem' }}
                >
                  <Play size={16} fill="#000" />
                  <span>Start Set {setItem.setId} Daily Flow</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
