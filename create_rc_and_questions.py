import json
import os

rc_data = [
    {
        "id": "rc_1",
        "title": "Passage 1: Historical Shifts in Astronomical Models",
        "topic": "History of Science / Astronomy",
        "wordCount": 380,
        "difficulty": "Medium-Hard",
        "text": """For centuries, the geocentric cosmological paradigm—pioneered by Aristotle and mathematically refined by Claudius Ptolemy—dominated European intellectual discourse. This model posited that the Earth remained stationary at the gravitational epicenter of the universe, with all celestial bodies orbiting in perfect concentric spheres. To account for retrograding planetary movements without abandoning geocentrism, Ptolemaic astronomers introduced complex epicycles: secondary orbital sub-circles superimposed upon primary circular orbits.

However, by the mid-sixteenth century, Nicolaus Copernicus proposed a heliocentric framework, asserting that planetary bodies revolved around the Sun. Though initially greeted with profound skepticism by natural philosophers who deemed heliocentrism physically implausible and philosophically radical, the Copernican hypothesis gained empirical momentum through Galileo Galilei’s telescopic observations of Venusian phases and Jovian moons. 

Crucially, the ultimate triumph of heliocentrism relied not merely on observational novelties, but on Johannes Kepler's radical departure from circular geometry. By demonstrating that planetary orbits were elliptical rather than circular, Kepler eliminated the need for cumbersome epicycles while achieving unprecedented predictive accuracy. Thus, the transition to heliocentrism represents not a sudden epiphany, but an iterative synthesis of empirical anomaly and mathematical innovation.""",
        "questions": [
            {
                "id": "rc1_q1",
                "type": "Main Idea",
                "question": "Which of the following best expresses the primary purpose of the passage?",
                "options": [
                    "A) To argue that Galileo Galilei was solely responsible for the downfall of Ptolemaic astronomy.",
                    "B) To trace the transition from geocentric to heliocentric models as an iterative synthesis of empirical evidence and mathematical refinement.",
                    "C) To prove that Kepler's elliptical orbits were immediately accepted by sixteenth-century natural philosophers.",
                    "D) To contrast Aristotle's philosophical writings with Ptolemy's mathematical computations.",
                    "E) To criticize early European astronomers for relying on philosophical dogmas rather than empirical observation."
                ],
                "correctIndex": 1,
                "explanation": "Option B is correct because the passage chronologically outlines how astronomical models evolved from Ptolemy through Copernicus, Galileo, and Kepler, culminating in the conclusion that the shift was an 'iterative synthesis of empirical anomaly and mathematical innovation.'",
                "whyIncorrect": {
                    "A": "Incorrect. Galileo played a key role, but Kepler's elliptical orbits provided the ultimate mathematical resolution.",
                    "C": "Incorrect. The passage does not claim Kepler's ideas were instantly accepted without debate.",
                    "D": "Incorrect. Contrasting Aristotle and Ptolemy is a minor detail in paragraph 1, not the main purpose of the entire text.",
                    "E": "Incorrect. The passage maintains an objective analytical tone rather than criticizing early astronomers."
                }
            },
            {
                "id": "rc1_q2",
                "type": "Inference",
                "question": "It can be inferred from the passage that Ptolemaic astronomers utilized epicycles primarily to:",
                "options": [
                    "A) Calculate the exact distance between Jupiter and its moons.",
                    "B) Reconcile planetary observations with the assumption of circular geocentric orbits.",
                    "C) Prove that the Sun was the center of planetary motion.",
                    "D) Disprove Aristotle's theory regarding celestial spheres.",
                    "E) Replace Kepler's elliptical equations with geometric proofs."
                ],
                "correctIndex": 1,
                "explanation": "Option B is correct. Paragraph 1 states that epicycles were introduced 'To account for retrograding planetary movements without abandoning geocentrism.'",
                "whyIncorrect": {
                    "A": "Incorrect. Jupiter's moons were discovered later by Galileo.",
                    "C": "Incorrect. Ptolemaic astronomers were geocentric, not heliocentric.",
                    "D": "Incorrect. Epicycles preserved the geocentric framework, aligning with Aristotle's overall view.",
                    "E": "Incorrect. Epicycles preceded Kepler by over a thousand years."
                }
            },
            {
                "id": "rc1_q3",
                "type": "Vocabulary in Context",
                "question": "As used in the final sentence, the word 'iterative' most nearly means:",
                "options": [
                    "A) Spontaneous and unguided",
                    "B) Gradual and step-by-step",
                    "C) Dogmatic and unyielding",
                    "D) Accidental and erratic",
                    "E) Theoretical and unproven"
                ],
                "correctIndex": 1,
                "explanation": "Option B is correct. In context, 'iterative synthesis' refers to a multi-stage, step-by-step process evolving across successive thinkers (Copernicus -> Galileo -> Kepler).",
                "whyIncorrect": {
                    "A": "Incorrect. 'Spontaneous' contradicts the gradual historical progression described.",
                    "C": "Incorrect. 'Dogmatic' means stubborn, the opposite of scientific adaptation.",
                    "D": "Incorrect. The process was driven by systematic empirical observation, not accident.",
                    "E": "Incorrect. Kepler's work achieved empirical accuracy, so it was not unproven."
                }
            }
        ]
    },
    {
        "id": "rc_2",
        "title": "Passage 2: Literary Aesthetics and Narratological Subversion",
        "topic": "Literary Criticism / Humanities",
        "wordCount": 350,
        "difficulty": "Hard",
        "text": """Literary critics have long debated the function of the unreliable narrator in nineteenth-century Gothic fiction. Traditional readings view narrational unreliability as a mere stylistic mechanism designed to heighten psychological tension and elicit visceral dread. According to this perspective, the reader's primary cognitive task is to unravel the protagonist's delusions and reconstruct an objective, underlying reality.

However, recent structuralist analyses contend that unreliability serves a far more radical aesthetic purpose: it destabilizes the very notion of objective narrative truth. In works such as Charlotte Perkins Gilman's 'The Yellow Wallpaper,' the narrator's deteriorating sanity does not simply create suspense; rather, it exposes how social coercion reshapes perception itself. The text intentionally resists definitive resolution, forcing readers to inhabit a state of interpretive ambiguity. Consequently, far from being a flaw or a temporary puzzle to be solved, narrational dissonance functions as a critique of nineteenth-century rationalism.""",
        "questions": [
            {
                "id": "rc2_q1",
                "type": "Tone / Purpose",
                "question": "The author's primary purpose in the passage is to:",
                "options": [
                    "A) Reevaluate traditional interpretations of unreliable narrators by highlighting recent structuralist perspectives.",
                    "B) Condemn nineteenth-century authors for failing to provide clear narrative resolutions.",
                    "C) Prove that 'The Yellow Wallpaper' is the only true example of Gothic fiction.",
                    "D) Argue that psychological tension is irrelevant to literary analysis.",
                    "E) Advocate for a return to traditional nineteenth-century rationalism."
                ],
                "correctIndex": 0,
                "explanation": "Option A is correct. The passage contrasts traditional readings (paragraph 1) with recent structuralist analyses (paragraph 2) to present a richer understanding of narrative unreliability.",
                "whyIncorrect": {
                    "A": "Correct",
                    "B": "Incorrect. The author views narrative ambiguity as an intentional aesthetic accomplishment, not a failure.",
                    "C": "Incorrect. The text is cited as an example, not the exclusive instance.",
                    "D": "Incorrect. Psychological tension is mentioned as part of traditional readings, not dismissed as completely irrelevant.",
                    "E": "Incorrect. The passage discusses critiques of rationalism, not advocating a return to it."
                }
            }
        ]
    }
]

gre_questions_data = [
    {
        "id": "tc_sb_1",
        "category": "Text Completion",
        "subtype": "Single Blank",
        "difficulty": "Hard",
        "questionText": "Far from being ________, the executive's proposal was characterized by meticulous foresight and fiscal prudence, winning over even the most skeptical members of the board.",
        "options": [
            "audacious",
            "capricious",
            "perspicacious",
            "judicious",
            "scrupulous"
        ],
        "correctIndex": 1,
        "explanation": "The phrase 'Far from being ________' indicates a contrast with 'meticulous foresight and fiscal prudence.' We need a word that means erratic, impulsive, or lacking planning. 'Capricious' (fickle, unpredictable) fits perfectly.",
        "whyIncorrect": {
            "audacious": "Audacious means bold or daring, which does not directly contrast with fiscal foresight.",
            "capricious": "CORRECT. Capricious means unpredictable and erratic, directly contrasting with prudent foresight.",
            "perspicacious": "Perspicacious means acutely insightful, which is a positive trait, not a contrast.",
            "judicious": "Judicious means showing good judgment, which aligns with prudence rather than contrasting it.",
            "scrupulous": "Scrupulous means diligent and careful, which supports prudence rather than opposing it."
        }
    },
    {
        "id": "tc_db_1",
        "category": "Text Completion",
        "subtype": "Double Blank",
        "difficulty": "Extreme",
        "questionText": "Although the biographer attempted to (i) ________ the scandal surrounding the politician's early career, subsequent journalistic investigations only served to (ii) ________ public disapproval.",
        "blank1Options": ["assuage", "exacerbate", "admonish"],
        "blank2Options": ["mitigate", "intensify", "placate"],
        "correctIndices": [0, 1],
        "explanation": "Blank (i): The biographer tried to lessen or soothe the scandal ('assuage'). Blank (ii): 'Although... subsequent investigations only served to' indicates a contrast; instead of softening the scandal, the investigations increased public disapproval ('intensify').",
        "whyIncorrect": {
            "blank1": "Assuage means to lessen or soothe, fitting the biographer's goal to quiet the scandal.",
            "blank2": "Intensify means to make stronger, contradicting the biographer's attempt to assuage."
        }
    },
    {
        "id": "se_1",
        "category": "Sentence Equivalence",
        "subtype": "Sentence Equivalence",
        "difficulty": "Medium-Hard",
        "questionText": "Despite the critic's reputation for severe judgment, her review of the novel was surprisingly ________, praising its vivid imagery and emotional depth.",
        "options": [
            "laudatory",
            "censorious",
            "commendatory",
            "castigating",
            "excoriating",
            "disparaging"
        ],
        "correctIndices": [0, 2],
        "explanation": "The sentence requires TWO words that produce equivalent meaning. 'Surprisingly ________' contrasts with 'reputation for severe judgment' and aligns with 'praising its vivid imagery.' Both 'laudatory' and 'commendatory' mean expressing praise.",
        "whyIncorrect": {
            "laudatory": "CORRECT. Expressing praise.",
            "censorious": "Incorrect. Highly critical (matches her reputation, not the review).",
            "commendatory": "CORRECT. Expressing praise (synonym pair with laudatory).",
            "castigating": "Incorrect. Severely punishing or criticizing.",
            "excoriating": "Incorrect. Severely criticizing.",
            "disparaging": "Incorrect. Expressing a low opinion."
        }
    }
]

output_dir = r"C:\Users\shikh\gre-verbal-mastery\src\data"
with open(os.path.join(output_dir, "rc_database.json"), "w", encoding="utf-8") as f:
    json.dump(rc_data, f, indent=2)

with open(os.path.join(output_dir, "gre_questions.json"), "w", encoding="utf-8") as f:
    json.dump(gre_questions_data, f, indent=2)

print("RC and GRE Questions database created successfully!")
