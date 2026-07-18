import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Search,
  RefreshCw
} from 'lucide-react';
import { getAllWords, saveState } from '../data/dbHelper';

export default function AdminPanel({ state, setState }) {
  const allWords = getAllWords(state);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingWord, setEditingWord] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newWord, setNewWord] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newSynonyms, setNewSynonyms] = useState('');
  const [newRoot, setNewRoot] = useState('AB');

  const filteredWords = allWords.filter(w => 
    w.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddWord = () => {
    if (!newWord.trim()) return;

    const newObj = {
      id: newWord.toLowerCase().trim(),
      word: newWord.toLowerCase().trim(),
      pos: 'adjective',
      simpleMeaning: newMeaning || 'Custom GRE vocabulary word.',
      detailedMeaning: newMeaning || 'Custom GRE vocabulary word definition.',
      synonyms: newSynonyms.split(',').map(s => s.trim()).filter(Boolean) || ['custom synonym'],
      nearSynonyms: ['approximate synonym'],
      antonyms: ['contrary word'],
      root: newRoot,
      rootMeaning: 'Core root element',
      prefix: 'a-',
      suffix: '-ic',
      origin: 'Latin',
      wordFamily: [newWord],
      exampleSentences: ['The scholar used the term in academic discourse.'],
      greExampleSentences: ['Far from being ordinary, the study proved remarkably impactful.'],
      confusingWords: [`${newWord} vs similar`],
      memoryTrick: `Visualize ${newWord} in context.`,
      mnemonicStory: `Remember ${newWord} through its root ${newRoot}.`,
      visualMemory: 'Custom visual anchor.',
      difficulty: 'Medium',
      frequency: 'HIGH',
      setId: state.currentActiveSetId || 1
    };

    const newCustom = [...state.customImportedWords, newObj];
    const newState = { ...state, customImportedWords: newCustom };
    setState(newState);
    saveState(newState);
    setShowAddModal(false);
    setNewWord('');
    setNewMeaning('');
    setNewSynonyms('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: 6, display: 'inline-block' }}>ADMINISTRATOR CONTROL</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
              Admin Vocabulary Manager & Database Controls
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
              Add words, edit definitions, update roots/synonyms, merge duplicates, and regenerate GRE practice questions.
            </p>
          </div>

          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            <span>Add New GRE Word</span>
          </button>
        </div>
      </div>

      {/* Database Search & Table */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            DATABASE ENTRIES ({allWords.length} Words)
          </span>

          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search word..."
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-glass)',
                padding: '8px 14px 8px 34px',
                borderRadius: 10,
                color: '#fff',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-dim)' }}>
                <th style={{ padding: 12 }}>WORD</th>
                <th style={{ padding: 12 }}>POS</th>
                <th style={{ padding: 12 }}>ROOT</th>
                <th style={{ padding: 12 }}>SIMPLE MEANING</th>
                <th style={{ padding: 12 }}>SET</th>
                <th style={{ padding: 12 }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredWords.slice(0, 30).map((w) => (
                <tr key={w.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', color: '#fff' }}>
                  <td style={{ padding: 12, fontWeight: 700 }}>{w.word}</td>
                  <td style={{ padding: 12, color: '#38bdf8' }}>{w.pos}</td>
                  <td style={{ padding: 12, color: '#fbbf24' }}>{w.root}</td>
                  <td style={{ padding: 12, color: 'var(--text-muted)' }}>{w.simpleMeaning}</td>
                  <td style={{ padding: 12 }}>Set {w.setId}</td>
                  <td style={{ padding: 12 }}>
                    <button style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer', marginRight: 8 }}>
                      <Edit3 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Word Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: 550, padding: 28 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#fff', marginBottom: 16 }}>
              Add Custom GRE Vocabulary Word
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Word</label>
                <input
                  type="text"
                  value={newWord}
                  onChange={e => setNewWord(e.target.value)}
                  placeholder="e.g. sycophant"
                  style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-glass)', padding: 10, borderRadius: 8, color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Simple Meaning</label>
                <input
                  type="text"
                  value={newMeaning}
                  onChange={e => setNewMeaning(e.target.value)}
                  placeholder="A person who acts obsequiously toward someone important"
                  style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-glass)', padding: 10, borderRadius: 8, color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Synonyms (comma separated)</label>
                <input
                  type="text"
                  value={newSynonyms}
                  onChange={e => setNewSynonyms(e.target.value)}
                  placeholder="toady, flatterer, fawner"
                  style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-glass)', padding: 10, borderRadius: 8, color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                <button className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button className="btn-primary" onClick={handleAddWord}>Add to Database</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
