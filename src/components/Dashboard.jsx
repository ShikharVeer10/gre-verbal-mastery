import React from 'react';
import { 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  BookOpen, 
  ArrowRight, 
  Flame, 
  Play, 
  Lock, 
  Zap, 
  Target,
  BarChart2,
  Calendar
} from 'lucide-react';
import { getAllWords } from '../data/dbHelper';

export default function Dashboard({ state, setActiveTab, setSelectedWord }) {
  const allWords = getAllWords(state);
  const totalWords = allWords.length;
  const masteredCount = state.masteredWordIds.length;
  const learnedCount = state.learnedWordIds.length;
  const weakCount = state.weakWordIds.length;
  const masteryPercentage = Math.round((masteredCount / totalWords) * 100) || 1;
  const completionPercentage = Math.round((learnedCount / totalWords) * 100) || 2;

  // Active Set Info (15 words)
  const activeSetId = state.currentActiveSetId || 1;
  const activeSetWords = allWords.filter(w => w.setId === activeSetId).slice(0, 15);
  const activeSetProgress = (state.completedSteps.length / 15) * 100;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      
      {/* Hero Header Card */}
      <div className="glass-panel" style={{ padding: 32, position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(18, 24, 40, 0.9) 0%, rgba(30, 27, 75, 0.4) 100%)' }}>
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ maxWidth: 650 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span className="badge badge-indigo">DAILY MISSION</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Set {activeSetId} • 15 Words Target</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
              Master Today's 15 GRE Words & Lock In Long-Term Memory
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 20 }}>
              Complete the strict 15-step daily study sequence to unlock Set {activeSetId + 1}. Step 1 starts with reviewing weak words and spaced repetition intervals!
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => setActiveTab('daily_flow')} style={{ padding: '12px 24px', fontSize: '0.95rem', borderRadius: 12 }}>
                <Play size={18} fill="#fff" />
                <span>Continue Today's 15-Step Flow</span>
                <span className="badge badge-gold" style={{ fontSize: '0.65rem', marginLeft: 4 }}>{state.completedSteps.length}/15 DONE</span>
              </button>

              <button className="btn-secondary" onClick={() => setActiveTab('sets')} style={{ borderRadius: 12 }}>
                <BookOpen size={16} />
                <span>View All 192 Sets</span>
              </button>
            </div>
          </div>

          {/* Quick Progress Dial Widget */}
          <div className="glass-panel" style={{ padding: 24, borderRadius: 20, width: 260, textAlign: 'center', background: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 12 }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="50" 
                  fill="none" 
                  stroke="url(#indigo-gradient)" 
                  strokeWidth="10" 
                  strokeDasharray="314"
                  strokeDashoffset={314 - (314 * activeSetProgress) / 100}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
                <defs>
                  <linearGradient id="indigo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'block' }}>{Math.round(activeSetProgress)}%</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Flow Progress</span>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Step {Math.min(15, state.completedSteps.length + 1)} of 15 Active</p>
          </div>
        </div>
      </div>

      {/* Grid of Key Dashboard Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
        <MetricCard 
          icon={<RefreshCw size={22} color="#818cf8" />} 
          title="Review Due Today" 
          value="12 Words" 
          subText="Spaced Repetition SM-2"
          onClick={() => setActiveTab('spaced_rep')}
        />
        <MetricCard 
          icon={<Sparkles size={22} color="#fbbf24" />} 
          title="Today's 15 Words" 
          value={`Set ${activeSetId}`} 
          subText="15 Words Active"
          onClick={() => setActiveTab('daily_flow')}
        />
        <MetricCard 
          icon={<CheckCircle2 size={22} color="#34d399" />} 
          title="Words Mastered" 
          value={masteredCount} 
          subText={`${masteryPercentage}% of Database`}
          onClick={() => setActiveTab('sets')}
        />
        <MetricCard 
          icon={<BookOpen size={22} color="#38bdf8" />} 
          title="Words Learned" 
          value={learnedCount} 
          subText={`${completionPercentage}% Progress`}
          onClick={() => setActiveTab('sets')}
        />
        <MetricCard 
          icon={<AlertTriangle size={22} color="#f43f5e" />} 
          title="Weak Words" 
          value={weakCount} 
          subText="Targeted Review"
          onClick={() => setActiveTab('weak_words')}
        />
      </div>

      {/* Main Dashboard Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        
        {/* Left Column: Set 1 Preview & Daily Flow Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Today's 15 Words List */}
          <div className="glass-panel" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                  Today's Set {activeSetId} Words (15 Target Words)
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Click any word to open its dedicated GRE learning page with audio, roots, mnemonics & questions.
                </p>
              </div>
              <button className="btn-secondary" onClick={() => setActiveTab('daily_flow')} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                <span>Start Study</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 12 }}>
              {activeSetWords.map((wordObj) => {
                const isMastered = state.masteredWordIds.includes(wordObj.id);
                const isWeak = state.weakWordIds.includes(wordObj.id);

                return (
                  <div
                    key={wordObj.id}
                    onClick={() => setSelectedWord(wordObj)}
                    className="glass-panel glass-card-hover"
                    style={{
                      padding: 14,
                      borderRadius: 12,
                      cursor: 'pointer',
                      border: isWeak 
                        ? '1px solid rgba(244, 63, 94, 0.4)' 
                        : isMastered 
                        ? '1px solid rgba(16, 185, 129, 0.4)' 
                        : '1px solid var(--border-glass)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{wordObj.word}</span>
                      {isMastered && <CheckCircle2 size={14} color="#34d399" />}
                      {isWeak && <AlertTriangle size={14} color="#f43f5e" />}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', fontStyle: 'italic', marginBottom: 6 }}>{wordObj.pos}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {wordObj.simpleMeaning}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Reading Comprehension Widget */}
          <div className="glass-panel" style={{ padding: 24, background: 'linear-gradient(135deg, rgba(18, 24, 40, 0.9) 0%, rgba(6, 182, 212, 0.1) 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: 8, display: 'inline-block' }}>DAILY READING PASSAGE</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                  Historical Shifts in Astronomical Models
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Topic: History of Science / Astronomy • 380 Words • 3 Original GRE Questions
                </p>
              </div>

              <button className="btn-primary" onClick={() => setActiveTab('reading_comp')} style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' }}>
                <BookOpen size={16} />
                <span>Read Passage & Quiz</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Spaced Repetition Timeline & Level Progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Spaced Repetition Schedule */}
          <div className="glass-panel" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Calendar size={18} color="#818cf8" />
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                Spaced Repetition Schedule
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <SRIntervalRow interval="Day 1" desc="Immediate Recall" count={3} color="#818cf8" />
              <SRIntervalRow interval="Day 3" desc="Short-Term Memory" count={5} color="#38bdf8" />
              <SRIntervalRow interval="Day 7" desc="Medium-Term Lock" count={4} color="#34d399" />
              <SRIntervalRow interval="Day 14" desc="Deep Storage" count={2} color="#fbbf24" />
              <SRIntervalRow interval="Day 30" desc="Permanent Memory" count={8} color="#a855f7" />
              <SRIntervalRow interval="Day 60 & 90" desc="Mastery Benchmark" count={14} color="#10b981" />
            </div>

            <button 
              className="btn-secondary" 
              onClick={() => setActiveTab('spaced_rep')} 
              style={{ width: '100%', marginTop: 16, justifyContent: 'center' }}
            >
              <span>Launch SR Review Session</span>
            </button>
          </div>

          {/* User Achievements */}
          <div className="glass-panel" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Award size={18} color="#fbbf24" />
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                Recent Badges
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {state.achievements.map((ach) => (
                <div key={ach.id} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255, 255, 255, 0.04)', padding: '10px 14px', borderRadius: 12, border: '1px solid var(--border-glass)' }}>
                  <span style={{ fontSize: '1.5rem' }}>{ach.icon}</span>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff', display: 'block' }}>{ach.title}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{ach.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function MetricCard({ icon, title, value, subText, onClick }) {
  return (
    <div className="glass-panel glass-card-hover" onClick={onClick} style={{ padding: 20, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{title}</span>
        {icon}
      </div>
      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)' }}>
        {value}
      </div>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{subText}</span>
    </div>
  );
}

function SRIntervalRow({ interval, desc, count, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.03)', padding: '8px 12px', borderRadius: 8 }}>
      <div>
        <span style={{ fontWeight: 700, fontSize: '0.82rem', color, marginRight: 8 }}>{interval}</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{desc}</span>
      </div>
      <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.08)', color: '#fff', fontSize: '0.7rem' }}>{count} words</span>
    </div>
  );
}
