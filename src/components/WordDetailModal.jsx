import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  GitFork, 
  BookOpen, 
  Zap, 
  Brain, 
  Eye, 
  Layers, 
  Edit3, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { speakWord } from '../utils/audio';
import { saveState } from '../data/dbHelper';

export default function WordDetailModal({ wordObj, onClose, state, setState, setSelectedWord }) {
  if (!wordObj) return null;

  const [activeTab, setActiveTab] = useState('overview');
  const isBookmarked = state.bookmarkedWordIds.includes(wordObj.id);
  const [noteText, setNoteText] = useState(state.customNotes[wordObj.id] || '');
  const [savedNoteSuccess, setSavedNoteSuccess] = useState(false);

  const toggleBookmark = () => {
    let newBookmarks;
    if (isBookmarked) {
      newBookmarks = state.bookmarkedWordIds.filter(id => id !== wordObj.id);
    } else {
      newBookmarks = [...state.bookmarkedWordIds, wordObj.id];
    }
    const newState = { ...state, bookmarkedWordIds: newBookmarks };
    setState(newState);
    saveState(newState);
  };

  const handleSaveNote = () => {
    const newNotes = { ...state.customNotes, [wordObj.id]: noteText };
    const newState = { ...state, customNotes: newNotes };
    setState(newState);
    saveState(newState);
    setSavedNoteSuccess(true);
    setTimeout(() => setSavedNoteSuccess(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: 850, padding: 32 }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
                {wordObj.word}
              </h2>
              
              <button 
                onClick={() => speakWord(wordObj.word)}
                style={{ background: 'rgba(99, 102, 241, 0.2)', border: '1px solid rgba(99, 102, 241, 0.4)', color: '#818cf8', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Listen Pronunciation"
              >
                <Volume2 size={20} />
              </button>

              <button 
                onClick={toggleBookmark}
                style={{ background: isBookmarked ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.08)', border: isBookmarked ? '1px solid #f59e0b' : '1px solid var(--border-glass)', color: isBookmarked ? '#fbbf24' : 'var(--text-muted)', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title={isBookmarked ? "Bookmarked" : "Bookmark Word"}
              >
                {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{wordObj.pronunciation}</span>
              <span className="badge badge-cyan">{wordObj.pos}</span>
              <span className="badge badge-gold">Difficulty: {wordObj.difficulty}</span>
              <span className="badge badge-indigo">Frequency: {wordObj.frequency}</span>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: 'var(--text-muted)', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={20} />
          </button>
        </div>

        {/* Word Page Tabs */}
        <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--border-glass)', paddingBottom: 12, marginBottom: 24, overflowX: 'auto' }}>
          <TabButton id="overview" label="Overview & Meanings" icon={<BookOpen size={16} />} activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton id="roots" label="Root & Etymology" icon={<Zap size={16} />} activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton id="synonyms" label="Synonyms & Antonyms" icon={<GitFork size={16} />} activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton id="mnemonic" label="Mnemonics & Memory" icon={<Brain size={16} />} activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton id="sentences" label="GRE Context & Sentences" icon={<Layers size={16} />} activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton id="notes" label="Custom Notes" icon={<Edit3 size={16} />} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: 18, borderRadius: 14, border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase' }}>Simple Meaning</span>
              <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginTop: 4 }}>{wordObj.simpleMeaning}</p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 18, borderRadius: 14, border: '1px solid var(--border-glass)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Detailed Academic Meaning</span>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: 4 }}>{wordObj.detailedMeaning}</p>
            </div>

            {/* Quick Synonyms / Antonyms */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: 16, borderRadius: 12, border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase' }}>Primary Synonyms</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                  {wordObj.synonyms.map((s, idx) => (
                    <span key={idx} className="badge badge-emerald" style={{ cursor: 'pointer' }}>{s}</span>
                  ))}
                </div>
              </div>

              <div style={{ background: 'rgba(244, 63, 94, 0.08)', padding: 16, borderRadius: 12, border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f43f5e', textTransform: 'uppercase' }}>Antonyms</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                  {wordObj.antonyms.map((a, idx) => (
                    <span key={idx} className="badge badge-rose" style={{ cursor: 'pointer' }}>{a}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Roots */}
        {activeTab === 'roots' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: 20, borderRadius: 14, border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Zap size={20} color="#fbbf24" />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Root Word: {wordObj.root}</h4>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#fbbf24' }}>Meaning: {wordObj.rootMeaning}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>Origin: {wordObj.origin}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 16, borderRadius: 12 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>PREFIX & SUFFIX</span>
                <p style={{ fontSize: '0.9rem', color: '#fff', marginTop: 4 }}>Prefix: <strong style={{ color: '#818cf8' }}>{wordObj.prefix}</strong></p>
                <p style={{ fontSize: '0.9rem', color: '#fff', marginTop: 2 }}>Suffix: <strong style={{ color: '#38bdf8' }}>{wordObj.suffix}</strong></p>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 16, borderRadius: 12 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>WORD FAMILY</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                  {wordObj.wordFamily.map((f, idx) => (
                    <span key={idx} className="badge badge-indigo">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Synonyms */}
        {activeTab === 'synonyms' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Synonyms & Near Synonyms</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[...wordObj.synonyms, ...wordObj.nearSynonyms].map((s, idx) => (
                <span key={idx} className="badge badge-emerald" style={{ padding: '8px 14px', fontSize: '0.85rem', cursor: 'pointer' }}>
                  {s}
                </span>
              ))}
            </div>

            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginTop: 12 }}>Commonly Confused Words</h4>
            <div style={{ background: 'rgba(244, 63, 94, 0.1)', padding: 16, borderRadius: 12, border: '1px solid rgba(244, 63, 94, 0.3)' }}>
              {wordObj.confusingWords.map((cw, idx) => (
                <div key={idx} style={{ color: '#f43f5e', fontWeight: 600, fontSize: '0.9rem' }}>⚠️ {cw}</div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Mnemonics */}
        {activeTab === 'mnemonic' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.12)', padding: 20, borderRadius: 14, border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Brain size={20} color="#fbbf24" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>Memory Trick</h4>
              </div>
              <p style={{ fontSize: '0.95rem', color: '#fbbf24', lineHeight: 1.5 }}>{wordObj.memoryTrick}</p>
            </div>

            <div style={{ background: 'rgba(99, 102, 241, 0.08)', padding: 20, borderRadius: 14, border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>Mnemonic Story</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{wordObj.mnemonicStory}</p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 20, borderRadius: 14, border: '1px solid var(--border-glass)', textAlign: 'center' }}>
              <Eye size={28} color="#38bdf8" style={{ marginBottom: 6 }} />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>Visual Memory Anchor</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{wordObj.visualMemory}</p>
            </div>
          </div>
        )}

        {/* Tab 5: Sentences */}
        {activeTab === 'sentences' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>Standard Usage Sentences</h4>
              {wordObj.exampleSentences.map((s, idx) => (
                <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 14, borderRadius: 10, border: '1px solid var(--border-glass)', marginBottom: 8, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  "{s}"
                </div>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>Original GRE-Style Sentences</h4>
              {wordObj.greExampleSentences.map((s, idx) => (
                <div key={idx} style={{ background: 'rgba(99, 102, 241, 0.1)', padding: 16, borderRadius: 12, border: '1px solid rgba(99, 102, 241, 0.3)', fontSize: '0.92rem', color: '#fff', lineHeight: 1.6 }}>
                  "{s}"
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Custom Notes */}
        {activeTab === 'notes' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Your Personal Learning Notes</h4>
            <textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Write your custom notes, personal mnemonics, or memory hooks for this word..."
              style={{
                width: '100%',
                height: 150,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-glass)',
                borderRadius: 12,
                padding: 16,
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                fontFamily: 'var(--font-main)'
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {savedNoteSuccess && <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>✓ Notes saved!</span>}
              <button className="btn-primary" onClick={handleSaveNote} style={{ marginLeft: 'auto' }}>
                <span>Save Notes</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function TabButton({ id, label, icon, activeTab, setActiveTab }) {
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        padding: '8px 14px',
        borderRadius: 8,
        fontSize: '0.82rem',
        fontWeight: isActive ? 700 : 500,
        color: isActive ? '#fff' : 'var(--text-muted)',
        background: isActive ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
        border: isActive ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        whiteSpace: 'nowrap'
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
