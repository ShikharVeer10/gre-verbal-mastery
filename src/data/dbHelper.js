import vocabData from './vocab_database.json';
import rootsData from './roots_database.json';
import rcData from './rc_database.json';
import greQuestionsData from './gre_questions.json';

const STORAGE_KEY = 'GRE_VERBAL_MASTERY_STATE_V1';

// Initial state template
const defaultState = {
  xp: 450,
  level: 3,
  dailyStreak: 5,
  lastStudyDate: new Date().toISOString().split('T')[0],
  completedSteps: [1, 2, 3], // 1-15 steps completed today
  currentActiveSetId: 1,
  unlockedSetIds: [1, 2],
  masteredWordIds: ['aesthetic'],
  learnedWordIds: ['alacrity', 'archaic', 'ascetic', 'assuage'],
  weakWordIds: ['capricious', 'censure'],
  bookmarkedWordIds: ['audacious', 'austere'],
  customNotes: {
    'capricious': 'Remember: Capricious weather in Atlantic!'
  },
  wordProgress: {
    // wordId -> { stage: 1..12, reps: number, interval: number, nextReview: timestamp, easeFactor: 2.5 }
    'aesthetic': { stage: 12, reps: 5, interval: 30, nextReview: Date.now() + 30 * 86400000, easeFactor: 2.5 },
    'alacrity': { stage: 4, reps: 2, interval: 3, nextReview: Date.now() + 3 * 86400000, easeFactor: 2.4 },
    'capricious': { stage: 2, reps: 0, interval: 1, nextReview: Date.now(), easeFactor: 2.1 }
  },
  achievements: [
    { id: 'first_word', title: 'First Word Mastered', desc: 'Master your first GRE word', icon: '🏆', unlockedAt: '2026-07-15' },
    { id: 'streak_3', title: '3-Day Streak', desc: 'Maintain a 3-day study streak', icon: '🔥', unlockedAt: '2026-07-17' },
    { id: 'root_scholar', title: 'Root Scholar', desc: 'Complete 5 Root Word Quizzes', icon: '🧬', unlockedAt: '2026-07-18' }
  ],
  customImportedWords: []
};

// Load state from localStorage or fallback to defaults
export const loadState = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return { ...defaultState, ...JSON.parse(data) };
    }
  } catch (e) {
    console.error("Failed to load state from localStorage:", e);
  }
  return defaultState;
};

// Save state to localStorage
export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state to localStorage:", e);
  }
};

// Get all active words combining initial DB and imported words
export const getAllWords = (state = loadState()) => {
  return [...vocabData, ...state.customImportedWords];
};

export const getAllRoots = () => rootsData;
export const getAllRcPassages = () => rcData;
export const getAllGreQuestions = () => greQuestionsData;

// SM-2 Spaced Repetition calculation algorithm
export const updateSpacedRepetition = (state, wordId, qualityRating) => {
  // qualityRating: 0 (total blank) to 5 (perfect recall)
  const current = state.wordProgress[wordId] || { stage: 1, reps: 0, interval: 1, nextReview: Date.now(), easeFactor: 2.5 };
  
  let { reps, interval, easeFactor } = current;

  if (qualityRating >= 3) {
    if (reps === 0) interval = 1;
    else if (reps === 1) interval = 3;
    else if (reps === 2) interval = 7;
    else if (reps === 3) interval = 14;
    else if (reps === 4) interval = 30;
    else if (reps === 5) interval = 60;
    else interval = 90;

    reps += 1;
  } else {
    reps = 0;
    interval = 1; // back to day 1 review
  }

  // Adjust ease factor
  easeFactor = easeFactor + (0.1 - (5 - qualityRating) * (0.08 + (5 - qualityRating) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  const nextReview = Date.now() + interval * 86400000;
  const newStage = qualityRating >= 4 ? Math.min(12, current.stage + 1) : Math.max(1, current.stage - 1);

  const updatedProgress = {
    ...state.wordProgress,
    [wordId]: { stage: newStage, reps, interval, nextReview, easeFactor }
  };

  let newWeakWords = [...state.weakWordIds];
  let newMastered = [...state.masteredWordIds];
  let newLearned = [...state.learnedWordIds];

  if (qualityRating < 3) {
    if (!newWeakWords.includes(wordId)) newWeakWords.push(wordId);
    newMastered = newMastered.filter(id => id !== wordId);
  } else if (newStage >= 12 && reps >= 4) {
    if (!newMastered.includes(wordId)) newMastered.push(wordId);
    newWeakWords = newWeakWords.filter(id => id !== wordId);
  }

  if (!newLearned.includes(wordId)) newLearned.push(wordId);

  const newState = {
    ...state,
    wordProgress: updatedProgress,
    weakWordIds: newWeakWords,
    masteredWordIds: newMastered,
    learnedWordIds: newLearned,
    xp: state.xp + (qualityRating >= 3 ? 15 : 5)
  };

  saveState(newState);
  return newState;
};
