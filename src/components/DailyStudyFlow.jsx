import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Volume2, 
  BookOpen, 
  HelpCircle, 
  Zap, 
  AlertTriangle,
  Lock,
  RotateCcw
} from 'lucide-react';
import { getAllWords, saveState, updateSpacedRepetition } from '../data/dbHelper';
import { speakWord } from '../utils/audio';

const STEPS = [
  { id: 1, title: 'Weak Word Review', desc: 'Target words missed in previous quizzes' },
  { id: 2, title: 'Yesterday\'s Words Review', desc: 'Confirm memory retention from yesterday' },
  { id: 3, title: 'Spaced Repetition Review', desc: 'Interval checks (Day 1, 3, 7, 14, 30, 60, 90)' },
  { id: 4, title: 'Meaning Revision', desc: 'Recall definitions for active set' },
  { id: 5, title: 'Synonym Revision', desc: 'Pair words with primary synonyms' },
  { id: 6, title: 'Antonym Revision', desc: 'Identify opposing terms' },
  { id: 7, title: 'Root Word Revision', desc: 'Study prefixes, suffixes & etymology' },
  { id: 8, title: 'Word Family Revision', desc: 'Master noun/verb/adjective forms' },
  { id: 9, title: 'Fill in the Blank', desc: 'Contextual sentence completion' },
  { id: 10, title: 'Sentence Equivalence', desc: 'Select TWO choices with equivalent meaning' },
  { id: 11, title: 'Text Completion', desc: 'GRE Single, Double & Triple blanks' },
  { id: 12, title: 'Learn Today\'s 15 Words', desc: 'Deep dive into 15 set words' },
  { id: 13, title: 'Immediate Quiz', desc: 'Instant post-study recall check' },
  { id: 14, title: 'Reading Comprehension', desc: 'Passage analysis & context questions' },
  { id: 15, title: 'Daily Summary', desc: 'Unlock Set ' }
];

export default function DailyStudyFlow({ state, setState, setSelectedWord, setActiveTab }) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const allWords = getAllWords(state);
  const activeSetId = state.currentActiveSetId || 1;
  const currentSetWords = allWords.filter(w => w.setId === activeSetId).slice(0, 15);
  const currentWord = currentSetWords[exerciseIndex % currentSetWords.length] || currentSetWords[0];

  const stepInfo = STEPS[currentStepIdx];

  const handleNextStep = () => {
    if (!state.completedSteps.includes(stepInfo.id)) {
      const updatedSteps = [...state.completedSteps, stepInfo.id];
      const newState = { ...state, completedSteps: updatedSteps, xp: state.xp + 20 };
      setState(newState);
      saveState(newState);
    }
    
    if (currentStepIdx < STEPS.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
      setExerciseIndex(0);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
      setExerciseIndex(0);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const unlockNextSet = () => {
    const nextSetId = activeSetId + 1;
    const newUnlocked = [...new Set([...state.unlockedSetIds, nextSetId])];
    const newState = {
      ...state,
      currentActiveSetId: nextSetId,
      unlockedSetIds: newUnlocked,
      completedSteps: [],
      xp: state.xp + 100,
      dailyStreak: state.dailyStreak + 1
    };
    setState(newState);
    saveState(newState);
    setActiveTab('sets');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Step Stepper Navigation Header */}
      <div className="glass-panel" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: 4, display: 'inline-block' }}>STRICT 15-STEP SEQUENCED FLOW</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              Step {stepInfo.id} of 15: {stepInfo.title}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{stepInfo.desc}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="btn-secondary" onClick={handlePrevStep} disabled={currentStepIdx === 0} style={{ opacity: currentStepIdx === 0 ? 0.4 : 1 }}>
              <ArrowLeft size={16} />
              <span>Prev Step</span>
            </button>
            <button className="btn-primary" onClick={handleNextStep} style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              <span>Complete Step {stepInfo.id}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)', gap: 4 }}>
          {STEPS.map((s, idx) => {
            const isCompleted = state.completedSteps.includes(s.id);
            const isCurrent = currentStepIdx === idx;
            return (
              <div 
                key={s.id} 
                onClick={() => setCurrentStepIdx(idx)}
                style={{ 
                  height: 8, 
                  borderRadius: 4, 
                  background: isCurrent 
                    ? '#fbbf24' 
                    : isCompleted 
                    ? '#10b981' 
                    : 'rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                title={`Step ${s.id}: ${s.title}`}
              />
            );
          })}
        </div>
      </div>

      {/* Dynamic Exercise Container based on step index */}
      <div className="glass-panel" style={{ padding: 28 }}>
        
        {/* Step 12: Deep Learn Today's 15 Words */}
        {currentStepIdx === 11 ? (
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#fff', marginBottom: 16 }}>
              Deep Dive: Learn Today's 15 Words (Set {activeSetId})
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {currentSetWords.map((wordObj) => (
                <div 
                  key={wordObj.id} 
                  className="glass-panel glass-card-hover"
                  onClick={() => setSelectedWord(wordObj)}
                  style={{ padding: 18, cursor: 'pointer', border: '1px solid var(--border-glass)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>{wordObj.word}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); speakWord(wordObj.word); }}
                      style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer' }}
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontStyle: 'italic', display: 'block', marginBottom: 8 }}>{wordObj.pos} • Root: {wordObj.root}</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 10 }}>{wordObj.simpleMeaning}</p>
                  <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>Synonym: {wordObj.synonyms[0]}</span>
                </div>
              ))}
            </div>
          </div>
        ) : currentStepIdx === 14 ? (
          /* Step 15: Daily Summary & Set Unlock */
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <CheckCircle2 size={44} color="#10b981" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: 10 }}>
              All 15 Daily Steps Completed!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 550, margin: '0 auto 24px auto' }}>
              You have successfully completed all revision, root, synonym, practice, and reading comprehension steps for Set {activeSetId}.
            </p>
            <button className="btn-gold" onClick={unlockNextSet} style={{ padding: '14px 32px', fontSize: '1.05rem', borderRadius: 12 }}>
              <Sparkles size={20} />
              <span>Unlock Set {activeSetId + 1} (+100 XP)</span>
            </button>
          </div>
        ) : (
          /* Interactive Quiz / Flashcard Review Exercise */
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <span className="badge badge-indigo">Exercise {exerciseIndex + 1} of {currentSetWords.length}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Target Word: <strong style={{ color: '#fff' }}>{currentWord.word}</strong></span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 24, borderRadius: 16, border: '1px solid var(--border-glass)', marginBottom: 24 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
                {stepInfo.id === 4 && `What is the precise definition of "${currentWord.word}"?`}
                {stepInfo.id === 5 && `Which word is a primary synonym for "${currentWord.word}"?`}
                {stepInfo.id === 6 && `Which word is an antonym for "${currentWord.word}"?`}
                {stepInfo.id === 7 && `What is the root of "${currentWord.word}" (${currentWord.root})?`}
                {stepInfo.id === 9 && `Fill in the blank: "The scholar's statement was far from being ________."`}
                {stepInfo.id === 10 && `Sentence Equivalence: Select the word equivalent to "${currentWord.synonyms[0]}".`}
                {(stepInfo.id <= 3 || stepInfo.id === 8 || stepInfo.id === 11 || stepInfo.id === 13) && `Select the correct definition/context for "${currentWord.word}".`}
              </h3>

              {/* Multiple Choice Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                {[
                  currentWord.simpleMeaning,
                  `Alternative option 1 for ${currentWord.word}`,
                  `Opposing definition for ${currentWord.word}`,
                  `Unrelated GRE distractor option`
                ].map((opt, oIdx) => {
                  const isCorrect = oIdx === 0;
                  const isSelected = selectedOption === oIdx;

                  return (
                    <button
                      key={oIdx}
                      onClick={() => {
                        setSelectedOption(oIdx);
                        setShowExplanation(true);
                        updateSpacedRepetition(state, currentWord.id, isCorrect ? 5 : 1);
                      }}
                      style={{
                        padding: 16,
                        borderRadius: 12,
                        textAlign: 'left',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        background: showExplanation 
                          ? isCorrect 
                            ? 'rgba(16, 185, 129, 0.2)' 
                            : isSelected 
                            ? 'rgba(244, 63, 94, 0.2)' 
                            : 'rgba(255, 255, 255, 0.04)'
                          : isSelected 
                          ? 'rgba(99, 102, 241, 0.25)' 
                          : 'rgba(255, 255, 255, 0.04)',
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
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span style={{ fontWeight: 700, marginRight: 12, color: 'var(--text-muted)' }}>
                        {String.fromCharCode(65 + oIdx)}.
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation Footer */}
            {showExplanation && (
              <div style={{ background: 'rgba(15, 23, 42, 0.9)', padding: 20, borderRadius: 14, border: '1px solid rgba(99, 102, 241, 0.4)', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <HelpCircle size={18} color="#818cf8" />
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Explanation & Memory Trick</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 12 }}>
                  {currentWord.detailedMeaning}
                </p>
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(245, 158, 11, 0.3)', fontSize: '0.85rem', color: '#fbbf24' }}>
                  💡 <strong>Memory Trick:</strong> {currentWord.memoryTrick}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button 
                className="btn-primary" 
                onClick={() => {
                  setExerciseIndex(exerciseIndex + 1);
                  setSelectedOption(null);
                  setShowExplanation(false);
                }}
              >
                <span>Next Question</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
