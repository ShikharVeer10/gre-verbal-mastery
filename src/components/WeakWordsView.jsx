import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  RotateCcw 
} from 'lucide-react';
import { getAllWords } from '../data/dbHelper';

export default function WeakWordsView({ state, setSelectedWord, setActiveTab }) {
  const allWords = getAllWords(state);
  const weakWords = allWords.filter(w => state.weakWordIds.includes(w.id));

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: 28, background: 'linear-gradient(135deg, rgba(18, 24, 40, 0.9) 0%, rgba(244, 63, 94, 0.15) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="badge badge-rose" style={{ marginBottom: 6, display: 'inline-block' }}>WEAK WORD ENGINE</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
              Targeted Weak Word Bank ({weakWords.length} Words)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
              Words missed during quizzes enter this bank with doubled review frequency until 100% mastery is proven.
            </p>
          </div>

          {weakWords.length > 0 && (
            <button className="btn-primary" onClick={() => setActiveTab('daily_flow')} style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)' }}>
              <RotateCcw size={16} />
              <span>Launch Weak Words Drill</span>
            </button>
          )}
        </div>
      </div>

      {/* Weak Words Grid */}
      {weakWords.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 18 }}>
          {weakWords.map((wordObj) => (
            <div
              key={wordObj.id}
              onClick={() => setSelectedWord(wordObj)}
              className="glass-panel glass-card-hover"
              style={{ padding: 18, borderRadius: 14, cursor: 'pointer', border: '1px solid rgba(244, 63, 94, 0.4)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>{wordObj.word}</span>
                <AlertTriangle size={18} color="#f43f5e" />
              </div>
              <span style={{ fontSize: '0.75rem', color: '#f43f5e', fontStyle: 'italic', display: 'block', marginBottom: 8 }}>{wordObj.pos} • Root: {wordObj.root}</span>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 10 }}>{wordObj.simpleMeaning}</p>
              <div style={{ background: 'rgba(244, 63, 94, 0.1)', padding: '6px 10px', borderRadius: 6, fontSize: '0.75rem', color: '#f43f5e' }}>
                Synonym: {wordObj.synonyms[0]}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: 48, textAlign: 'center' }}>
          <CheckCircle2 size={48} color="#10b981" style={{ marginBottom: 12 }} />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>No Weak Words in Bank!</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>You have answered all recent questions accurately. Keep up the high performance!</p>
        </div>
      )}

    </div>
  );
}
