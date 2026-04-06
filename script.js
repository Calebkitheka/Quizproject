// ==================== DOM ELEMENTS ====================
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const reviewScreen = document.getElementById("review-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const reviewButton = document.getElementById("review-btn");
const backToHomeBtn = document.getElementById("back-to-home-btn");
const progressBar = document.getElementById("progress");
const highScoreDisplay = document.getElementById("high-score-display");
const streakCount = document.getElementById("streak-count");
const categoryLabel = document.getElementById("category-label");
const explanationBox = document.getElementById("explanation-box");
const reviewContainer = document.getElementById("review-container");
const categorySelect = document.getElementById("category-select");
const timerDisplay = document.getElementById("timer"); // NEW: Day 7

// ==================== NURSING QUESTIONS (50 Total) ====================
const quizQuestions = [
  {
    id: 1,
    question: "What is the normal resting heart rate for a healthy adult?",
    category: "Vital Signs",
    difficulty: "easy",
    answers: [
      { text: "40-50 bpm", correct: false },
      { text: "60-100 bpm", correct: true },
      { text: "110-130 bpm", correct: false },
      { text: "140-160 bpm", correct: false }
    ],
    explanation: "The normal resting heart rate for adults is 60-100 beats per minute."
  },
  {
    id: 2,
    question: "Which organ is responsible for producing insulin?",
    category: "Anatomy & Physiology",
    difficulty: "easy",
    answers: [
      { text: "Liver", correct: false },
      { text: "Pancreas", correct: true },
      { text: "Kidney", correct: false },
      { text: "Spleen", correct: false }
    ],
    explanation: "The pancreas produces insulin, which regulates blood glucose levels."
  },
  {
    id: 3,
    question: "What does the acronym 'ABC' stand for in emergency nursing?",
    category: "Patient Safety",
    difficulty: "medium",
    answers: [
      { text: "Airway, Breathing, Circulation", correct: true },
      { text: "Assessment, Bandage, Care", correct: false },
      { text: "Alert, Breathing, Conscious", correct: false },
      { text: "Airway, Blood, Compression", correct: false }
    ],
    explanation: "ABC = Airway, Breathing, Circulation. This is the primary survey sequence."
  },
  {
    id: 4,
    question: "Which blood type is known as the 'universal donor'?",
    category: "Assessment",
    difficulty: "medium",
    answers: [
      { text: "A+", correct: false },
      { text: "AB+", correct: false },
      { text: "O-", correct: true },
      { text: "B-", correct: false }
    ],
    explanation: "O- blood lacks A, B, and Rh antigens, making it safe for any recipient."
  },
  {
    id: 5,
    question: "What is the first-line treatment for anaphylaxis?",
    category: "Medication Safety",
    difficulty: "hard",
    answers: [
      { text: "Antihistamines (Benadryl)", correct: false },
      { text: "Corticosteroids", correct: false },
      { text: "Epinephrine (EpiPen)", correct: true },
      { text: "Albuterol inhaler", correct: false }
    ],
    explanation: "Epinephrine is the first-line treatment for anaphylaxis."
  },
  {
    id: 6,
    question: "What does the medical abbreviation 'NPO' stand for?",
    category: "Nursing Process",
    difficulty: "easy",
    answers: [
      { text: "No Prescription Orders", correct: false },
      { text: "Nothing by Mouth", correct: true },
      { text: "Nurse Practice Order", correct: false },
      { text: "Normal Patient Observation", correct: false }
    ],
    explanation: "NPO = 'Nil Per Os' (Latin) meaning 'Nothing by Mouth'."
  },
  {
    id: 7,
    question: "When is it MOST important for a nurse to wear gloves?",
    category: "Infection Control",
    difficulty: "medium",
    answers: [
      { text: "When taking blood pressure", correct: false },
      { text: "When there is potential contact with blood or body fluids", correct: true },
      { text: "When entering any patient room", correct: false },
      { text: "When documenting in charts", correct: false }
    ],
    explanation: "Gloves are required when there's potential exposure to blood or body fluids."
  },
  {
    id: 8,
    question: "Which step of the nursing process involves collecting comprehensive patient data?",
    category: "Nursing Process",
    difficulty: "easy",
    answers: [
      { text: "Assessment", correct: true },
      { text: "Diagnosis", correct: false },
      { text: "Planning", correct: false },
      { text: "Implementation", correct: false }
    ],
    explanation: "Assessment is the first step of ADPIE, where nurses gather subjective and objective data."
  },
  {
    id: 9,
    question: "A nurse identifies 'Risk for Falls' in a patient's care plan. This is which nursing process step?",
    category: "Nursing Process",
    difficulty: "medium",
    answers: [
      { text: "Assessment", correct: false },
      { text: "Nursing Diagnosis", correct: true },
      { text: "Evaluation", correct: false },
      { text: "Implementation", correct: false }
    ],
    explanation: "Nursing diagnoses are formulated during the Diagnosis step based on assessment data."
  },
  {
    id: 10,
    question: "Setting a goal that a patient will ambulate 50 feet by day 3 occurs during which phase?",
    category: "Nursing Process",
    difficulty: "easy",
    answers: [
      { text: "Assessment", correct: false },
      { text: "Diagnosis", correct: false },
      { text: "Planning", correct: true },
      { text: "Evaluation", correct: false }
    ],
    explanation: "Planning involves setting measurable, patient-centered goals and outcomes."
  },
  {
    id: 11,
    question: "Administering prescribed medication is part of which nursing process step?",
    category: "Nursing Process",
    difficulty: "easy",
    answers: [
      { text: "Assessment", correct: false },
      { text: "Diagnosis", correct: false },
      { text: "Planning", correct: false },
      { text: "Implementation", correct: true }
    ],
    explanation: "Implementation is the action phase where nurses carry out planned interventions."
  },
  {
    id: 12,
    question: "Determining if a patient's pain decreased after an intervention occurs during which step?",
    category: "Nursing Process",
    difficulty: "medium",
    answers: [
      { text: "Assessment", correct: false },
      { text: "Diagnosis", correct: false },
      { text: "Implementation", correct: false },
      { text: "Evaluation", correct: true }
    ],
    explanation: "Evaluation measures whether goals were met and if interventions were effective."
  },
  {
    id: 13,
    question: "What is the FIRST action a nurse should take when discovering a fire in a patient's room?",
    category: "Patient Safety",
    difficulty: "medium",
    answers: [
      { text: "Activate the fire alarm", correct: false },
      { text: "Remove the patient from danger", correct: true },
      { text: "Close doors to contain the fire", correct: false },
      { text: "Use a fire extinguisher", correct: false }
    ],
    explanation: "RACE protocol: Rescue first, then Alarm, Contain, Extinguish/Evacuate."
  },
  {
    id: 14,
    question: "Which intervention BEST prevents pressure injuries in an immobile patient?",
    category: "Patient Safety",
    difficulty: "medium",
    answers: [
      { text: "Apply lotion every 4 hours", correct: false },
      { text: "Reposition every 2 hours", correct: true },
      { text: "Use a heating pad on bony areas", correct: false },
      { text: "Keep linens tightly tucked", correct: false }
    ],
    explanation: "Regular repositioning relieves pressure on vulnerable skin areas, preventing tissue breakdown."
  },
  {
    id: 15,
    question: "A patient is at high risk for falls. Which action is MOST appropriate?",
    category: "Patient Safety",
    difficulty: "easy",
    answers: [
      { text: "Keep the bed in the highest position", correct: false },
      { text: "Place the call light within reach", correct: true },
      { text: "Keep all side rails down", correct: false },
      { text: "Encourage the patient to ambulate alone", correct: false }
    ],
    explanation: "Ensuring the call light is accessible empowers the patient to request assistance safely."
  },
  {
    id: 16,
    question: "Which finding requires IMMEDIATE intervention for a patient receiving oxygen therapy?",
    category: "Patient Safety",
    difficulty: "hard",
    answers: [
      { text: "Oxygen flow rate at 2 L/min", correct: false },
      { text: "No 'No Smoking' sign visible", correct: false },
      { text: "Nasal cannula causing skin irritation", correct: false },
      { text: "Oxygen tubing near a space heater", correct: true }
    ],
    explanation: "Oxygen supports combustion. Heat sources near oxygen create a severe fire hazard."
  },
  {
    id: 17,
    question: "What is the correct sequence for donning PPE before entering an isolation room?",
    category: "Patient Safety",
    difficulty: "medium",
    answers: [
      { text: "Gown, mask, goggles, gloves", correct: true },
      { text: "Gloves, gown, mask, goggles", correct: false },
      { text: "Mask, gown, gloves, goggles", correct: false },
      { text: "Goggles, mask, gown, gloves", correct: false }
    ],
    explanation: "Donning order: Gown first, then mask/respirator, eye protection, then gloves last."
  },
  {
    id: 18,
    question: "Which action is MOST effective in preventing healthcare-associated infections?",
    category: "Infection Control",
    difficulty: "easy",
    answers: [
      { text: "Wearing gloves for all patient contact", correct: false },
      { text: "Performing hand hygiene", correct: true },
      { text: "Using antibacterial soap exclusively", correct: false },
      { text: "Keeping patients in private rooms", correct: false }
    ],
    explanation: "Hand hygiene is the single most important measure to prevent transmission of pathogens."
  },
  {
    id: 19,
    question: "A patient has Clostridium difficile. Which precaution is REQUIRED?",
    category: "Infection Control",
    difficulty: "medium",
    answers: [
      { text: "Airborne precautions", correct: false },
      { text: "Droplet precautions", correct: false },
      { text: "Contact precautions with soap and water handwashing", correct: true },
      { text: "Standard precautions only", correct: false }
    ],
    explanation: "C. diff spores are not killed by alcohol. Soap and water mechanical removal is required."
  },
  {
    id: 20,
    question: "When should a nurse perform hand hygiene with soap and water INSTEAD of alcohol sanitizer?",
    category: "Infection Control",
    difficulty: "medium",
    answers: [
      { text: "After touching a patient's intact skin", correct: false },
      { text: "When hands are visibly soiled", correct: true },
      { text: "Before administering medication", correct: false },
      { text: "After removing gloves", correct: false }
    ],
    explanation: "Soap and water are required when hands are visibly dirty, greasy, or contaminated with spores."
  },
  {
    id: 21,
    question: "Which item should be disposed of in a sharps container?",
    category: "Infection Control",
    difficulty: "easy",
    answers: [
      { text: "Used gauze pads", correct: false },
      { text: "Contaminated gloves", correct: false },
      { text: "Used insulin needle", correct: true },
      { text: "Empty medication vial", correct: false }
    ],
    explanation: "Sharps (needles, scalpels, lancets) must go in puncture-proof containers to prevent injuries."
  },
  {
    id: 22,
    question: "A patient is on airborne precautions. Which PPE is REQUIRED for the nurse?",
    category: "Infection Control",
    difficulty: "medium",
    answers: [
      { text: "Surgical mask", correct: false },
      { text: "N95 respirator or higher", correct: true },
      { text: "Face shield only", correct: false },
      { text: "Gloves and gown only", correct: false }
    ],
    explanation: "Airborne pathogens (TB, measles) require N95 or PAPR respirators that filter small particles."
  },
  {
    id: 23,
    question: "Which response demonstrates therapeutic communication?",
    category: "Communication",
    difficulty: "medium",
    answers: [
      { text: "'Don't worry, everything will be fine.'", correct: false },
      { text: "'Tell me more about what you're feeling.'", correct: true },
      { text: "'I know exactly how you feel.'", correct: false },
      { text: "'You should focus on getting better.'", correct: false }
    ],
    explanation: "Open-ended questions encourage patients to express feelings; false reassurance blocks communication."
  },
  {
    id: 24,
    question: "A patient says, 'I'm scared about my surgery.' What is the BEST nurse response?",
    category: "Communication",
    difficulty: "easy",
    answers: [
      { text: "'There's nothing to be scared of.'", correct: false },
      { text: "'What part of the surgery concerns you most?'", correct: true },
      { text: "'The surgeon is very experienced.'", correct: false },
      { text: "'Just try to relax.'", correct: false }
    ],
    explanation: "Exploring the patient's specific concerns allows targeted education and emotional support."
  },
  {
    id: 25,
    question: "Which action BEST supports a patient with limited English proficiency?",
    category: "Communication",
    difficulty: "medium",
    answers: [
      { text: "Speak louder and slower", correct: false },
      { text: "Use a professional medical interpreter", correct: true },
      { text: "Ask a family member to translate", correct: false },
      { text: "Use simple English words only", correct: false }
    ],
    explanation: "Professional interpreters ensure accuracy, confidentiality, and cultural competence."
  },
  {
    id: 26,
    question: "When teaching a patient about a new medication, which strategy is MOST effective?",
    category: "Communication",
    difficulty: "medium",
    answers: [
      { text: "Provide written instructions only", correct: false },
      { text: "Use the teach-back method", correct: true },
      { text: "Explain quickly to save time", correct: false },
      { text: "Assume the patient understands", correct: false }
    ],
    explanation: "Teach-back confirms understanding by having patients explain information in their own words."
  },
  {
    id: 27,
    question: "Which nonverbal behavior BEST conveys empathy to a patient?",
    category: "Communication",
    difficulty: "easy",
    answers: [
      { text: "Standing with arms crossed", correct: false },
      { text: "Maintaining appropriate eye contact", correct: true },
      { text: "Checking the clock frequently", correct: false },
      { text: "Facing away while documenting", correct: false }
    ],
    explanation: "Appropriate eye contact, open posture, and facing the patient demonstrate attentiveness and care."
  },
  {
    id: 28,
    question: "Which documentation practice is LEGALLY required?",
    category: "Nursing Process",
    difficulty: "medium",
    answers: [
      { text: "Using abbreviations to save time", correct: false },
      { text: "Documenting care immediately after providing it", correct: true },
      { text: "Erasing errors with white-out", correct: false },
      { text: "Documenting for another nurse", correct: false }
    ],
    explanation: "Timely, accurate documentation is a legal requirement; late entries must be clearly labeled."
  },
  {
    id: 29,
    question: "A nurse makes a documentation error. What is the CORRECT action?",
    category: "Nursing Process",
    difficulty: "easy",
    answers: [
      { text: "Use white-out to cover the error", correct: false },
      { text: "Draw a single line through it, write 'error', initial and date", correct: true },
      { text: "Black out the error with a marker", correct: false },
      { text: "Tear out the page and rewrite", correct: false }
    ],
    explanation: "Errors must remain legible; single line, label 'error', initial, and date maintains integrity."
  },
  {
    id: 30,
    question: "Which situation requires an incident report?",
    category: "Patient Safety",
    difficulty: "medium",
    answers: [
      { text: "A patient refuses a medication", correct: false },
      { text: "A patient falls without injury", correct: true },
      { text: "A family member complains about food", correct: false },
      { text: "A nurse arrives 5 minutes late", correct: false }
    ],
    explanation: "Incident reports document unexpected events (falls, errors, injuries) for quality improvement."
  },
  {
    id: 31,
    question: "A patient asks the nurse not to document a sensitive disclosure. What is the BEST response?",
    category: "Communication",
    difficulty: "hard",
    answers: [
      { text: "'I won't write it down if you prefer.'", correct: false },
      { text: "'I must document relevant health information, but I'll keep it confidential.'", correct: true },
      { text: "'You can tell me, and I'll forget it.'", correct: false },
      { text: "'That's not important for your care.'", correct: false }
    ],
    explanation: "Nurses must document clinically relevant information; confidentiality is maintained through secure records."
  },
  {
    id: 32,
    question: "Which action violates patient confidentiality under HIPAA?",
    category: "Communication",
    difficulty: "medium",
    answers: [
      { text: "Discussing a patient's case with the care team", correct: false },
      { text: "Posting a patient's photo on social media", correct: true },
      { text: "Documenting in the electronic health record", correct: false },
      { text: "Reporting suspected abuse to authorities", correct: false }
    ],
    explanation: "HIPAA prohibits sharing protected health information on public platforms without explicit consent."
  },
  {
    id: 33,
    question: "Which intervention BEST promotes sleep for a hospitalized patient?",
    category: "Patient Safety",
    difficulty: "easy",
    answers: [
      { text: "Cluster care activities to allow uninterrupted rest", correct: true },
      { text: "Keep lights on for safety", correct: false },
      { text: "Wake the patient every 2 hours for assessments", correct: false },
      { text: "Play television for distraction", correct: false }
    ],
    explanation: "Clustering care minimizes sleep disruptions, supporting healing and recovery."
  },
  {
    id: 34,
    question: "A patient reports pain rated 7/10. What is the nurse's PRIORITY action?",
    category: "Assessment",
    difficulty: "medium",
    answers: [
      { text: "Document the pain rating", correct: false },
      { text: "Administer prescribed analgesic", correct: true },
      { text: "Reassess pain in 1 hour", correct: false },
      { text: "Offer relaxation techniques first", correct: false }
    ],
    explanation: "After assessment, timely pain management is a priority for patient comfort and recovery."
  },
  {
    id: 35,
    question: "Which action is MOST important when assisting a patient with oral care?",
    category: "Patient Safety",
    difficulty: "medium",
    answers: [
      { text: "Use lemon-glycerin swabs", correct: false },
      { text: "Assess the mouth for sores or bleeding first", correct: true },
      { text: "Brush teeth vigorously", correct: false },
      { text: "Skip care if the patient is tired", correct: false }
    ],
    explanation: "Assessment identifies issues (infection, bleeding) that may require intervention before routine care."
  },
  {
    id: 36,
    question: "A patient is at risk for aspiration. Which intervention is MOST appropriate?",
    category: "Patient Safety",
    difficulty: "medium",
    answers: [
      { text: "Offer thin liquids", correct: false },
      { text: "Position upright at 90 degrees during meals", correct: true },
      { text: "Encourage rapid eating", correct: false },
      { text: "Lie flat after eating", correct: false }
    ],
    explanation: "Upright positioning uses gravity to help prevent food/liquid from entering the airway."
  },
  {
    id: 37,
    question: "Which finding indicates effective bowel management for a constipated patient?",
    category: "Assessment",
    difficulty: "easy",
    answers: [
      { text: "Patient reports abdominal pain", correct: false },
      { text: "Soft, formed stool passed", correct: true },
      { text: "No bowel movement for 3 days", correct: false },
      { text: "Patient refuses fluids", correct: false }
    ],
    explanation: "Soft, formed stool indicates successful intervention for constipation."
  },
  {
    id: 38,
    question: "Which statement by a patient indicates understanding of hypertension management?",
    category: "Health Promotion",
    difficulty: "medium",
    answers: [
      { text: "'I'll stop my meds when my BP is normal.'", correct: false },
      { text: "'I will limit sodium and exercise regularly.'", correct: true },
      { text: "'I only need to check my BP when I feel dizzy.'", correct: false },
      { text: "'Stress doesn't affect my blood pressure.'", correct: false }
    ],
    explanation: "Lifestyle modifications (low sodium, exercise) are foundational to hypertension management."
  },
  {
    id: 39,
    question: "A patient asks about smoking cessation. What is the nurse's BEST initial response?",
    category: "Communication",
    difficulty: "easy",
    answers: [
      { text: "'You should quit immediately.'", correct: false },
      { text: "'What has kept you from quitting in the past?'", correct: true },
      { text: "'Nicotine patches work for everyone.'", correct: false },
      { text: "'It's never too late to quit.'", correct: false }
    ],
    explanation: "Assessing readiness and barriers allows personalized, effective cessation support."
  },
  {
    id: 40,
    question: "Which screening is recommended annually for adults over 50?",
    category: "Health Promotion",
    difficulty: "medium",
    answers: [
      { text: "Mammogram", correct: false },
      { text: "Colonoscopy", correct: false },
      { text: "Influenza vaccination", correct: true },
      { text: "Bone density scan", correct: false }
    ],
    explanation: "Annual influenza vaccination is recommended for all adults, especially those over 50."
  },
  {
    id: 41,
    question: "A patient with diabetes asks about foot care. Which instruction is CORRECT?",
    category: "Health Promotion",
    difficulty: "medium",
    answers: [
      { text: "'Soak feet in hot water daily.'", correct: false },
      { text: "'Inspect feet daily for cuts or sores.'", correct: true },
      { text: "'Walk barefoot to strengthen feet.'", correct: false },
      { text: "'Cut toenails rounded to prevent ingrown nails.'", correct: false }
    ],
    explanation: "Daily foot inspection prevents complications; neuropathy may mask injuries in diabetic patients."
  },
  {
    id: 42,
    question: "Which statement indicates a patient understands medication adherence?",
    category: "Medication Safety",
    difficulty: "easy",
    answers: [
      { text: "'I'll skip doses if I feel better.'", correct: false },
      { text: "'I'll take my meds exactly as prescribed.'", correct: true },
      { text: "'I can share my meds with my spouse.'", correct: false },
      { text: "'I'll double the dose if I miss one.'", correct: false }
    ],
    explanation: "Adherence means taking medications exactly as prescribed, regardless of symptom changes."
  },
  {
    id: 43,
    question: "Which vital sign finding requires IMMEDIATE reporting?",
    category: "Vital Signs",
    difficulty: "medium",
    answers: [
      { text: "Temperature 99.1°F (37.3°C)", correct: false },
      { text: "Blood pressure 188/102 mmHg", correct: true },
      { text: "Heart rate 88 bpm", correct: false },
      { text: "Respirations 18/min", correct: false }
    ],
    explanation: "BP 188/102 indicates hypertensive crisis requiring urgent intervention to prevent organ damage."
  },
  {
    id: 44,
    question: "When measuring blood pressure, what error causes a FALSELY HIGH reading?",
    category: "Vital Signs",
    difficulty: "hard",
    answers: [
      { text: "Cuff too large for the arm", correct: false },
      { text: "Cuff too small for the arm", correct: true },
      { text: "Arm positioned above heart level", correct: false },
      { text: "Deflating the cuff too slowly", correct: false }
    ],
    explanation: "A cuff that is too narrow requires higher pressure to occlude the artery, yielding falsely high readings."
  },
  {
    id: 45,
    question: "Which pulse site is used for cardiac arrest assessment?",
    category: "Assessment",
    difficulty: "easy",
    answers: [
      { text: "Radial", correct: false },
      { text: "Brachial", correct: false },
      { text: "Carotid", correct: true },
      { text: "Pedal", correct: false }
    ],
    explanation: "Carotid pulse is most accessible and reliable during CPR for assessing circulation."
  },
  {
    id: 46,
    question: "A patient's oxygen saturation is 88% on room air. What is the nurse's PRIORITY action?",
    category: "Assessment",
    difficulty: "medium",
    answers: [
      { text: "Document the finding", correct: false },
      { text: "Apply supplemental oxygen and reassess", correct: true },
      { text: "Ask the patient to take deep breaths", correct: false },
      { text: "Wait 15 minutes and recheck", correct: false }
    ],
    explanation: "SpO2 <90% indicates hypoxemia requiring immediate oxygen therapy and further assessment."
  },
  {
    id: 47,
    question: "Which finding is NORMAL for an older adult?",
    category: "Assessment",
    difficulty: "medium",
    answers: [
      { text: "Systolic BP consistently >160 mmHg", correct: false },
      { text: "Mild decrease in hearing high-frequency sounds", correct: true },
      { text: "Confusion as a normal aging change", correct: false },
      { text: "Inability to perform ADLs independently", correct: false }
    ],
    explanation: "Presbycusis (age-related high-frequency hearing loss) is a normal aging change; confusion is NOT."
  },
  {
    id: 48,
    question: "Which action is part of the 'Five Rights' of medication administration?",
    category: "Medication Safety",
    difficulty: "easy",
    answers: [
      { text: "Right documentation", correct: false },
      { text: "Right patient", correct: true },
      { text: "Right cost", correct: false },
      { text: "Right brand name", correct: false }
    ],
    explanation: "The Five Rights: Right patient, drug, dose, route, time. Documentation is important but not one of the five."
  },
  {
    id: 49,
    question: "Before administering a medication, the nurse should verify the patient's identity using:",
    category: "Medication Safety",
    difficulty: "easy",
    answers: [
      { text: "Room number", correct: false },
      { text: "Two patient identifiers (e.g., name and DOB)", correct: true },
      { text: "Asking 'Are you Mr. Smith?'", correct: false },
      { text: "Checking the bed label", correct: false }
    ],
    explanation: "Two unique identifiers (name + DOB or medical record number) prevent wrong-patient errors."
  },
  {
    id: 50,
    question: "A patient reports an allergy to penicillin. Which action is MOST important?",
    category: "Medication Safety",
    difficulty: "medium",
    answers: [
      { text: "Document the allergy in the chart only", correct: false },
      { text: "Place an allergy alert band and notify the provider", correct: true },
      { text: "Ask the patient to describe the reaction", correct: false },
      { text: "Give the medication with an antihistamine", correct: false }
    ],
    explanation: "Allergy alerts (wristband, EHR flag) prevent accidental administration."
  }
];

// ==================== STATE VARIABLES ====================
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let filteredQuestions = [];
let timerInterval = null; // NEW: Day 7 - Timer interval
let timeLeft = 15; // NEW: Day 7 - Time per question (seconds)
const TIME_PER_QUESTION = 15; // NEW: Day 7 - Constant for time limit

// ==================== INITIALIZATION ====================
maxScoreSpan.textContent = quizQuestions.length;

// Load data when page loads
loadHighScore();
loadStreak();

// ==================== EVENT LISTENERS ====================
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
reviewButton.addEventListener("click", showReview);
backToHomeBtn.addEventListener("click", goHome);

// ==================== CORE FUNCTIONS ====================

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  scoreSpan.textContent = score;
  
  // Filter questions by selected category
  const selectedCategory = categorySelect.value;
  if (selectedCategory === "all") {
    filteredQuestions = quizQuestions;
  } else {
    filteredQuestions = quizQuestions.filter(q => q.category === selectedCategory);
  }
  
  // Update total questions display
  totalQuestionsSpan.textContent = filteredQuestions.length;
  maxScoreSpan.textContent = filteredQuestions.length;
  
  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  reviewScreen.classList.remove("active");
  quizScreen.classList.add("active");
  
  updateStreak();
  showQuestion();
}

function showQuestion() {
  resetState();
  
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  
  currentQuestionSpan.textContent = `Question ${currentQuestionIndex + 1} of ${filteredQuestions.length}`;
  questionText.textContent = currentQuestion.question;
  
  if (categoryLabel) {
    categoryLabel.textContent = `📚 ${currentQuestion.category} • ${currentQuestion.difficulty.toUpperCase()}`;
  }
  
  const progressPercent = ((currentQuestionIndex) / filteredQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";
  
  // NEW: Day 7 - Start timer for this question
  startTimer();
  
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerContainer.appendChild(button);
  });
}

// ==================== NEW: TIMER FUNCTIONS (Day 7) ====================

function startTimer() {
  // Clear any existing timer
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  
  // Reset time
  timeLeft = TIME_PER_QUESTION;
  timerDisplay.textContent = timeLeft;
  timerDisplay.classList.remove("warning");
  
  // Start countdown
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    
    // Add warning style when time is low (5 seconds or less)
    if (timeLeft <= 5) {
      timerDisplay.classList.add("warning");
    }
    
    // Auto-advance when time runs out
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeOut();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function handleTimeOut() {
  // Mark question as incorrect
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  
  userAnswers.push({
    questionId: currentQuestion.id,
    question: currentQuestion.question,
    category: currentQuestion.category,
    selectedAnswer: "Time Out",
    correctAnswer: currentQuestion.answers.find(a => a.correct).text,
    isCorrect: false,
    explanation: currentQuestion.explanation
  });
  
  // Show correct answer
  Array.from(answerContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  
  // Show explanation
  if (explanationBox) {
    explanationBox.textContent = `⏰ Time's up! 💡 ${currentQuestion.explanation}`;
    explanationBox.style.display = "block";
  }
  
  // Move to next question after 2 seconds
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < filteredQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 2000);
}

// ==================== ANSWER SELECTION ====================

function resetState() {
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
  if (explanationBox) {
    explanationBox.style.display = "none";
    explanationBox.textContent = "";
  }
}

function selectAnswer(e) {
  // Stop timer when answer is selected
  stopTimer();
  
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  
  userAnswers.push({
    questionId: currentQuestion.id,
    question: currentQuestion.question,
    category: currentQuestion.category,
    selectedAnswer: selectedBtn.textContent,
    correctAnswer: currentQuestion.answers.find(a => a.correct).text,
    isCorrect: isCorrect,
    explanation: currentQuestion.explanation
  });
  
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    scoreSpan.textContent = score;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  
  // Show correct answer
  Array.from(answerContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  
  // Show explanation
  if (explanationBox) {
    explanationBox.textContent = `💡 ${currentQuestion.explanation}`;
    explanationBox.style.display = "block";
  }
  
  // Move to next question after 2 seconds
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < filteredQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 2000);
}

function showResults() {
  // Stop timer when quiz ends
  stopTimer();
  
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  
  finalScoreSpan.textContent = score;
  
  saveHighScore(score);
  
  const percentage = (score / filteredQuestions.length) * 100;
  if (percentage === 100) {
    resultMessage.textContent = "🏆 Perfect! You're ready for clinicals!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "🎉 Excellent! Keep up the great work!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "📚 Good effort! Review the explanations.";
  } else {
    resultMessage.textContent = "💪 Keep studying! Nursing school is a marathon.";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}

// ==================== REVIEW FUNCTIONS ====================

function showReview() {
  resultScreen.classList.remove("active");
  reviewScreen.classList.add("active");
  
  reviewContainer.innerHTML = "";
  
  userAnswers.forEach((answer, index) => {
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-item");
    reviewItem.classList.add(answer.isCorrect ? "correct" : "incorrect");
    
    reviewItem.innerHTML = `
      <div class="review-status ${answer.isCorrect ? "correct" : "incorrect"}">
        ${answer.isCorrect ? "✓ Correct" : "✗ Incorrect"}
      </div>
      <div class="review-question">
        Q${index + 1}: ${answer.question}
      </div>
      <div class="review-answer your-answer">
        Your Answer: ${answer.selectedAnswer}
      </div>
      ${!answer.isCorrect ? `
      <div class="review-answer correct-answer">
        Correct Answer: ${answer.correctAnswer}
      </div>
      ` : ''}
      <div class="review-explanation">
        💡 ${answer.explanation}
      </div>
    `;
    
    reviewContainer.appendChild(reviewItem);
  });
}

function goHome() {
  reviewScreen.classList.remove("active");
  startScreen.classList.add("active");
}

// ==================== LOCAL STORAGE FUNCTIONS ====================

function saveHighScore(currentScore) {
  const storedHighScore = localStorage.getItem("nurseQuizHighScore");
  const highScore = storedHighScore ? parseInt(storedHighScore) : 0;
  
  if (currentScore > highScore) {
    localStorage.setItem("nurseQuizHighScore", currentScore);
    loadHighScore();
  }
}

function loadHighScore() {
  const storedHighScore = localStorage.getItem("nurseQuizHighScore");
  const highScore = storedHighScore ? parseInt(storedHighScore) : 0;
  
  if (highScoreDisplay) {
    highScoreDisplay.textContent = `🏆 High Score: ${highScore}`;
  }
}

// ==================== STREAK SYSTEM ====================

function updateStreak() {
  const today = new Date().toDateString();
  const lastStudyDate = localStorage.getItem("lastStudyDate");
  let currentStreak = parseInt(localStorage.getItem("currentStreak")) || 0;
  
  if (lastStudyDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastStudyDate === yesterday.toDateString()) {
      currentStreak++;
    } else if (lastStudyDate !== today) {
      currentStreak = 1;
    }
    
    localStorage.setItem("currentStreak", currentStreak);
    localStorage.setItem("lastStudyDate", today);
    
    if (streakCount) {
      streakCount.textContent = currentStreak;
    }
  }
}

function loadStreak() {
  const currentStreak = parseInt(localStorage.getItem("currentStreak")) || 0;
  
  if (streakCount) {
    streakCount.textContent = currentStreak;
  }
}