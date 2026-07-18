import React from 'react';
import { 
  BookOpen, 
  Flame, 
  Award, 
  Zap, 
  Search, 
  Sparkles, 
  Grid, 
  GitFork, 
  FileText, 
  UploadCloud, 
  ShieldCheck,
  RefreshCw,
  Bookmark,
  AlertTriangle
} from 'lucide-react';

export default function Header({ state, activeTab, setActiveTab, onOpenSearch }) {
  const levelProgress = ((state.xp % 200) / 200) * 100;

  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', position: 'sticky', top: 0, zIndex: 100, padding: '12px 24px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Top Header Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          
          {/* Logo & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>
            <div style={{ 
              width: 44, 
              height: 44, 
              borderRadius: 12, 
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
            }}>
              <BookOpen size={24} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
                  GRE Verbal Mastery
                </h1>
                <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>PRO SYSTEM</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                100% Long-Term Retention & Authentic GRE Verbal Engine
              </p>
            </div>
          </div>

          {/* Gamification & Stats Widget */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            {/* Streak */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(245, 158, 11, 0.12)', padding: '6px 12px', borderRadius: 20, border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <Flame size={18} color="#f59e0b" className="pulse-glow" />
              <span style={{ fontWeight: 700, color: '#fbbf24', fontSize: '0.9rem' }}>{state.dailyStreak} Day Streak</span>
            </div>

            {/* Level & XP */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(99, 102, 241, 0.12)', padding: '6px 14px', borderRadius: 20, border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              <Award size={18} color="#818cf8" />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.85rem' }}>Level {state.level}</span>
                  <span style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 600 }}>({state.xp} XP)</span>
                </div>
                <div style={{ width: 80, height: 4, background: 'rgba(255, 255, 255, 0.1)', borderRadius: 2, overflow: 'hidden', marginTop: 2 }}>
                  <div style={{ width: `${levelProgress}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #06b6d4)' }} />
                </div>
              </div>
            </div>

            {/* Search Trigger Button */}
            <button 
              className="btn-secondary" 
              onClick={onOpenSearch} 
              style={{ padding: '8px 14px', fontSize: '0.85rem', borderRadius: 20 }}
            >
              <Search size={16} color="var(--text-muted)" />
              <span>Search GRE Vocab...</span>
              <kbd style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '2px 6px', borderRadius: 4, fontSize: '0.7rem', color: 'var(--text-muted)' }}>⌘K</kbd>
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          <NavTab id="dashboard" label="Dashboard" icon={<Grid size={16} />} activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavTab id="daily_flow" label="Today's 15-Step Study" icon={<Sparkles size={16} />} activeTab={activeTab} setActiveTab={setActiveTab} badge="STRICT" />
          <NavTab id="sets" label="Vocabulary Sets (15/set)" icon={<BookOpen size={16} />} activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavTab id="roots" label="Root Dictionary" icon={<Zap size={16} />} activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavTab id="synonyms" label="Synonym & Relationship Graph" icon={<GitFork size={16} />} activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavTab id="gre_practice" label="GRE Verbal Practice" icon={<FileText size={16} />} activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavTab id="reading_comp" label="Daily Reading Comp" icon={<BookOpen size={16} />} activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavTab id="spaced_rep" label="Spaced Repetition" icon={<RefreshCw size={16} />} activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavTab id="weak_words" label="Weak Words Bank" icon={<AlertTriangle size={16} />} activeTab={activeTab} setActiveTab={setActiveTab} count={state.weakWordIds.length} />
          <NavTab id="ocr_import" label="OCR AI Importer" icon={<UploadCloud size={16} />} activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavTab id="admin" label="Admin Manager" icon={<ShieldCheck size={16} />} activeTab={activeTab} setActiveTab={setActiveTab} />
        </nav>
      </div>
    </header>
  );
}

function NavTab({ id, label, icon, activeTab, setActiveTab, badge, count }) {
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        padding: '8px 14px',
        borderRadius: 10,
        fontSize: '0.82rem',
        fontWeight: isActive ? 700 : 500,
        color: isActive ? '#fff' : 'var(--text-muted)',
        background: isActive ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(79, 70, 229, 0.15) 100%)' : 'transparent',
        border: isActive ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        whiteSpace: 'nowrap',
        transition: 'all 0.2s ease'
      }}
    >
      <span style={{ color: isActive ? '#818cf8' : 'var(--text-dim)' }}>{icon}</span>
      <span>{label}</span>
      {badge && <span className="badge badge-gold" style={{ fontSize: '0.55rem', padding: '2px 5px' }}>{badge}</span>}
      {count !== undefined && count > 0 && (
        <span className="badge badge-rose" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>{count}</span>
      )}
    </button>
  );
}
