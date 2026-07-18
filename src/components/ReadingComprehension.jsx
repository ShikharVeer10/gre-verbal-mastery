import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Award 
} from 'lucide-react';
import { getAllRcPassages } from '../data/dbHelper';

export default function ReadingComprehension() {
  const passages = getAllRcPassages();
  const [passIdx, setPassIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const activePassage = passages[passIdx % passages.length] || passages[0];
  const activeQuestion = activePassage.questions[qIdx % activePassage.questions.length];

  useEffect(() => {
    const interval = setInterval(() => setTimerSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: 6, display: 'inline-block' }}>DAILY READING COMPREHENSION</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
              {activePassage.title}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
              {activePassage.topic} • {activePassage.wordCount} Words • {activePassage.questions.length} Question Types
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(99, 102, 241, 0.12)', padding: '8px 14px', borderRadius: 20, border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              <Clock size={16} color="#818cf8" />
              <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>Timer: {formatTimer(timerSeconds)}</span>
            </div>

            <button className="btn-secondary" onClick={() => setPassIdx(passIdx + 1)} style={{ fontSize: '0.82rem' }}>
              <span>Next Passage</span>
            </button>
          </div>
        </div>
      </div>

      {/* Two-Column Passage & Question View */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        
        {/* Left Column: Passage Text */}
        <div className="glass-panel" style={{ padding: 24, maxHeight: 600, overflowY: 'auto' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#06b6d4', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
            PASSAGE TEXT
          </span>
          <div style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
            {activePassage.text}
          </div>
        </div>

        {/* Right Column: Question & Explanation */}
        <div className="glass-panel" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span className="badge badge-gold">Question {qIdx + 1} of {activePassage.questions.length}</span>
              <span className="badge badge-indigo">Type: {activeQuestion.type}</span>
            </div>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: 16, lineHeight: 1.5 }}>
              {activeQuestion.question}
            </h3>

            {/* Answer Choices */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {activeQuestion.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const isCorrect = idx === activeQuestion.correctIndex;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedOpt(idx);
                      setShowExplanation(true);
                    }}
                    style={{
                      padding: 14,
                      borderRadius: 10,
                      textAlign: 'left',
                      fontSize: '0.88rem',
                      fontWeight: 500,
                      background: showExplanation 
                        ? isCorrect 
                          ? 'rgba(16, 185, 129, 0.2)' 
                          : isSelected 
                          ? 'rgba(244, 63, 94, 0.2)' 
                          : 'rgba(255, 255, 255, 0.03)'
                        : isSelected 
                        ? 'rgba(99, 102, 241, 0.25)' 
                        : 'rgba(255, 255, 255, 0.03)',
                      border: showExplanation 
                        ? isCorrect 
                          ? '1px solid #10b981' 
                          : isSelected 
                          ? '1px solid #f43f5e' 
                          : '1px solid var(--border-glass)'
                        : isSelected 
                        ? '1px solid #6366f1' 
                        : '1px solid var(--border-glass)',
                      color: '#fff',
                      lineHeight: 1.4,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation Box */}
            {showExplanation && (
              <div className="animate-fade-in" style={{ background: 'rgba(15, 23, 42, 0.9)', padding: 18, borderRadius: 12, border: '1px solid rgba(99, 102, 241, 0.3)', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <HelpCircle size={16} color="#818cf8" />
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>RC Rationale & Analysis</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {activeQuestion.explanation}
                </p>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              className="btn-primary" 
              onClick={() => {
                setQIdx((qIdx + 1) % activePassage.questions.length);
                setSelectedOpt(null);
                setShowExplanation(false);
              }}
            >
              <span>Next Question</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
