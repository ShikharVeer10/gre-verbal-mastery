import React, { useState } from 'react';
import { 
  UploadCloud, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Zap, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Edit3
} from 'lucide-react';
import { saveState } from '../data/dbHelper';

const PIPELINE_STEPS = [
  'Detect Handwriting',
  'Extract Vocabulary',
  'Extract Meanings',
  'Extract Roots',
  'Extract Prefixes',
  'Extract Suffixes',
  'Extract Synonyms',
  'Extract Antonyms',
  'Extract Sentences',
  'Detect Duplicates',
  'Merge Existing Entries',
  'Manual Approval',
  'Save into Database',
  'Generate Learning Material'
];

export default function OcrImporter({ state, setState }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [extractedWords, setExtractedWords] = useState([]);
  const [isApproved, setIsApproved] = useState(false);

  const sampleNotebookUpload = () => {
    setIsProcessing(true);
    setCurrentStep(0);
    setExtractedWords([]);
    setIsApproved(false);

    let stepCounter = 0;
    const interval = setInterval(() => {
      stepCounter++;
      setCurrentStep(stepCounter);

      if (stepCounter >= PIPELINE_STEPS.length - 1) {
        clearInterval(interval);
        setIsProcessing(false);

        // Populate sample extracted entries from handwritten notebook simulation
        setExtractedWords([
          {
            id: 'penurious',
            word: 'penurious',
            pos: 'adjective',
            simpleMeaning: 'Extremely poor; poverty-stricken or stingy.',
            detailedMeaning: 'Characterized by extreme penury; lacking money or resources; excessively frugal.',
            synonyms: ['impecunious', 'destitute', 'parsimonious', 'miserly'],
            antonyms: ['affluent', 'profligate', 'generous'],
            root: 'PEN',
            rootMeaning: 'Poverty, lacking',
            prefix: 'pen-',
            suffix: '-ous',
            origin: 'Latin (penuria)',
            wordFamily: ['penurious', 'penury', 'penuriously'],
            exampleSentences: ['The penurious student managed to save every penny for tuition.'],
            memoryTrick: 'Penurious = Penny + Curious (always counting pennies!).',
            isDuplicate: false
          },
          {
            id: 'obsequious',
            word: 'obsequious',
            pos: 'adjective',
            simpleMeaning: 'Obedient or attentive to an excessive degree; fawning.',
            detailedMeaning: 'Servile, sycophantic, or overly eager to please someone in authority.',
            synonyms: ['sycophantic', 'servile', 'fawning', 'subservient'],
            antonyms: ['domineering', 'rebellious', 'assertive'],
            root: 'SEQ',
            rootMeaning: 'Follow',
            prefix: 'ob-',
            suffix: '-ious',
            origin: 'Latin (obsequium)',
            wordFamily: ['obsequious', 'obsequiousness'],
            exampleSentences: ['The assistant was obsequious, agreeing with every word the CEO uttered.'],
            memoryTrick: 'Obsequious = Obey + Sequence (follows every order in sequence!).',
            isDuplicate: false
          }
        ]);
      }
    }, 450);
  };

  const handleApproveAndSave = () => {
    const newCustom = [...state.customImportedWords, ...extractedWords];
    const newState = {
      ...state,
      customImportedWords: newCustom,
      xp: state.xp + 150
    };
    setState(newState);
    saveState(newState);
    setIsApproved(true);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: 6, display: 'inline-block' }}>OCR + AI PARSER ENGINE</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
              Handwritten Notebook OCR Importer
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
              Upload handwritten notebook pages or Excel lists. Automatically parses roots, meanings, synonyms, antonyms, and merges duplicates into the database.
            </p>
          </div>

          <button className="btn-gold" onClick={sampleNotebookUpload} disabled={isProcessing} style={{ padding: '12px 24px' }}>
            <UploadCloud size={18} />
            <span>Upload & Run OCR Pipeline</span>
          </button>
        </div>
      </div>

      {/* OCR Step-by-Step Pipeline Visualization */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: 16 }}>
          14-Stage Extraction & Parsing Pipeline
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 10 }}>
          {PIPELINE_STEPS.map((stepName, idx) => {
            const isDone = currentStep > idx;
            const isActive = currentStep === idx;

            return (
              <div
                key={idx}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  background: isDone 
                    ? 'rgba(16, 185, 129, 0.15)' 
                    : isActive 
                    ? 'rgba(245, 158, 11, 0.25)' 
                    : 'rgba(255, 255, 255, 0.03)',
                  border: isDone 
                    ? '1px solid #10b981' 
                    : isActive 
                    ? '1px solid #f59e0b' 
                    : '1px solid var(--border-glass)',
                  color: isDone ? '#34d399' : isActive ? '#fbbf24' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.3s ease'
                }}
              >
                {isDone && <CheckCircle2 size={14} color="#34d399" />}
                {isActive && <Zap size={14} color="#fbbf24" className="pulse-glow" />}
                <span>{idx + 1}. {stepName}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Extracted Data Review & Approval */}
      {extractedWords.length > 0 && (
        <div className="glass-panel animate-fade-in" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <span className="badge badge-emerald">EXTRACTION COMPLETE</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginTop: 4 }}>
                Review Extracted Notebook Entries ({extractedWords.length} Words)
              </h3>
            </div>

            {!isApproved ? (
              <button className="btn-primary" onClick={handleApproveAndSave}>
                <ShieldCheck size={18} />
                <span>Approve & Save into Database</span>
              </button>
            ) : (
              <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.95rem' }}>
                ✓ Approved & Imported into Database! (+150 XP)
              </span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {extractedWords.map((w, idx) => (
              <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 18, borderRadius: 14, border: '1px solid var(--border-glass)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>{w.word}</h4>
                  <span className="badge badge-indigo">Root: {w.root}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#fbbf24', marginBottom: 8 }}>{w.simpleMeaning}</p>
                <div style={{ display: 'flex', gap: 12, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>Synonyms: {w.synonyms.join(', ')}</span>
                  <span>Antonyms: {w.antonyms.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
