import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  Sparkles,
  Zap
} from 'lucide-react';
import { getAllGreQuestions } from '../data/dbHelper';

export default function GrePractice({ state, setState }) {
  const questions = getAllGreQuestions();
  const [qIndex, setQIndex] = useState(0);
  const [selectedSingle, setSelectedSingle] = useState(null);
  const [selectedSE, setSelectedSE] = useState([]); // Array for Sentence Equivalence (select 2)
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ = questions[qIndex % questions.length] || questions[0];
  const isSE = currentQ.category === 'Sentence Equivalence';

  const handleSelectOption = (idx) => {
    if (isSE) {
      if (selectedSE.includes(idx)) {
        setSelectedSE(selectedSE.filter(i => i !== idx));
      } else if (selectedSE.length < 2) {
        setSelectedSE([...selectedSE, idx]);
      }
    } else {
      setSelectedSingle(idx);
    }
  };

  const isCorrect = isSE 
    ? (selectedSE.length === 2 && currentQ.correctIndices.every(i => selectedSE.includes(i)))
    : selectedSingle === currentQ.correctIndex;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: 6, display: 'inline-block' }}>ORIGINAL GRE PRACTICE</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
              Text Completion & Sentence Equivalence Engine
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
              100% Original GRE-style questions with comprehensive answer explanations for every option choice.
            </p>
          </div>

          <span className="badge badge-indigo" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
            Question {qIndex + 1} of {questions.length}
          </span>
        </div>
      </div>

      {/* Main Question Box */}
      <div className="glass-panel" style={{ padding: 32 }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span className="badge badge-cyan">{currentQ.category} • {currentQ.subtype}</span>
          <span className="badge badge-gold">Difficulty: {currentQ.difficulty}</span>
        </div>

        {/* Question Text */}
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 24, borderRadius: 16, border: '1px solid var(--border-glass)', marginBottom: 24 }}>
          <p style={{ fontSize: '1.15rem', color: '#fff', lineHeight: 1.7, fontWeight: 500 }}>
            {currentQ.questionText}
          </p>
          {isSE && (
            <span style={{ display: 'block', fontSize: '0.8rem', color: '#fbbf24', marginTop: 12, fontWeight: 600 }}>
              * Select EXACTLY TWO answer choices that produce completed sentences that are alike in meaning.
            </span>
          )}
        </div>

        {/* Option Choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {currentQ.options.map((opt, idx) => {
            const isOptSelected = isSE ? selectedSE.includes(idx) : selectedSingle === idx;
            const isOptCorrect = isSE ? currentQ.correctIndices.includes(idx) : idx === currentQ.correctIndex;

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                style={{
                  padding: 16,
                  borderRadius: 12,
                  textAlign: 'left',
                  fontSize: '0.98rem',
                  fontWeight: 500,
                  background: showExplanation
                    ? isOptCorrect 
                      ? 'rgba(16, 185, 129, 0.2)' 
                      : isOptSelected 
                      ? 'rgba(244, 63, 94, 0.2)' 
                      : 'rgba(255, 255, 255, 0.04)'
                    : isOptSelected 
                    ? 'rgba(99, 102, 241, 0.25)' 
                    : 'rgba(255, 255, 255, 0.04)',
                  border: showExplanation 
                    ? isOptCorrect 
                      ? '1px solid #10b981' 
                      : isOptSelected 
                      ? '1px solid #f43f5e' 
                      : '1px solid var(--border-glass)'
                    : isOptSelected 
                    ? '1px solid #6366f1' 
                    : '1px solid var(--border-glass)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <span style={{ fontWeight: 700, marginRight: 12, color: 'var(--text-muted)' }}>
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span>{opt}</span>
                </div>
                {showExplanation && isOptCorrect && <CheckCircle2 size={18} color="#34d399" />}
                {showExplanation && isOptSelected && !isOptCorrect && <XCircle size={18} color="#f43f5e" />}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button 
            className="btn-primary" 
            onClick={() => setShowExplanation(true)}
            disabled={isSE ? selectedSE.length < 2 : selectedSingle === null}
            style={{ opacity: (isSE ? selectedSE.length < 2 : selectedSingle === null) ? 0.5 : 1 }}
          >
            <span>Submit & Check Explanation</span>
          </button>

          {showExplanation && (
            <button 
              className="btn-gold" 
              onClick={() => {
                setQIndex(qIndex + 1);
                setSelectedSingle(null);
                setSelectedSE([]);
                setShowExplanation(false);
              }}
            >
              <span>Next Practice Question</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>

        {/* Explanation Card */}
        {showExplanation && (
          <div className="animate-fade-in" style={{ marginTop: 28, background: 'rgba(15, 23, 42, 0.9)', padding: 24, borderRadius: 16, border: '1px solid rgba(99, 102, 241, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <HelpCircle size={20} color="#818cf8" />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
                Detailed Question Explanation
              </h4>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
              {currentQ.explanation}
            </p>

            <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginBottom: 8 }}>Option Choice Analysis:</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {Object.entries(currentQ.whyIncorrect).map(([optKey, exp], i) => (
                <div key={i} style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <strong style={{ color: '#818cf8' }}>{optKey}:</strong> {exp}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
