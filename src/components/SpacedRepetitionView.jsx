import React, { useState } from 'react';
import { 
  RefreshCw, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles,
  Zap
} from 'lucide-react';
import { getAllWords, updateSpacedRepetition } from '../data/dbHelper';

export default function SpacedRepetitionView({ state, setState, setSelectedWord }) {
  const allWords = getAllWords(state);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Filter words that have progress or due for review
  const dueWords = allWords.filter(w => state.learnedWordIds.includes(w.id) || state.weakWordIds.includes(w.id));
  const activeWord = dueWords[currentIndex % Math.max(1, dueWords.length)] || allWords[0];

  const handleRateQuality = (rating) => {
    const newState = updateSpacedRepetition(state, activeWord.id, rating);
    setState(newState);
    setIsFlipped(false);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Banner */}
      <div className="glass-panel" style={{ padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: 6, display: 'inline-block' }}>SM-2 ALGORITHM</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
              Spaced Repetition Review Engine
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
              Automatic review intervals: Day 1, Day 3, Day 7, Day 14, Day 30, Day 60, and Day 90.
            </p>
          </div>

          <span className="badge badge-indigo" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
            {dueWords.length} Words in Active Memory Queue
          </span>
        </div>
      </div>

      {/* Main Flashcard Review Container */}
      <div style={{ maxWidth: 650, margin: '0 auto', width: '100%' }}>
        <div 
          className="glass-panel glass-card-hover" 
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            padding: 40,
            borderRadius: 24,
            minHeight: 340,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            border: isFlipped ? '1px solid rgba(99, 102, 241, 0.6)' : '1px solid var(--border-glass)',
            background: isFlipped ? 'rgba(30, 27, 75, 0.5)' : 'var(--bg-card)'
          }}
        >
          <span style={{ position: 'absolute', top: 20, right: 20, fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            {isFlipped ? "Click to Flip Back" : "Click to Reveal Answer"}
          </span>

          {!isFlipped ? (
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: 12, display: 'inline-block' }}>{activeWord.pos}</span>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 10 }}>
                {activeWord.word}
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {activeWord.pronunciation}
              </p>
            </div>
          ) : (
            <div className="animate-fade-in">
              <span className="badge badge-gold" style={{ marginBottom: 8, display: 'inline-block' }}>ROOT: {activeWord.root}</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
                {activeWord.simpleMeaning}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
                {activeWord.detailedMeaning}
              </p>
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: 12, borderRadius: 10, fontSize: '0.85rem', color: '#fbbf24' }}>
                💡 <strong>Memory Trick:</strong> {activeWord.memoryTrick}
              </div>
            </div>
          )}
        </div>

        {/* Quality Recall Rating Buttons (SM-2 Rating 1 to 5) */}
        {isFlipped && (
          <div className="animate-fade-in" style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', textAlign: 'center' }}>
              How well did you recall "{activeWord.word}"?
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              <button className="btn-secondary" onClick={() => handleRateQuality(1)} style={{ background: 'rgba(244, 63, 94, 0.2)', border: '1px solid #f43f5e', color: '#f43f5e', justifyContent: 'center' }}>
                1. Forgotten
              </button>
              <button className="btn-secondary" onClick={() => handleRateQuality(3)} style={{ background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #f59e0b', color: '#fbbf24', justifyContent: 'center' }}>
                3. Hard
              </button>
              <button className="btn-secondary" onClick={() => handleRateQuality(4)} style={{ background: 'rgba(6, 182, 212, 0.2)', border: '1px solid #06b6d4', color: '#38bdf8', justifyContent: 'center' }}>
                4. Good
              </button>
              <button className="btn-secondary" onClick={() => handleRateQuality(5)} style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399', justifyContent: 'center' }}>
                5. Perfect
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
