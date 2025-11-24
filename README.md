Dynamic Survey Builder
A lightweight survey-building tool built using Next.js, React, and Tailwind CSS.
Users can create questions, preview the survey, and view the live JSON schema and responses.

🚀 How to Run the Project
npm install
npm run dev

Then open:
http://localhost:3000

🧠 Architectural Approach
Built using Next.js App Router with client components.
Survey state (title, questions, options, responses) is fully managed using React useState.
The app has two main modes:
Builder View: Create, edit, and remove questions.
Preview View: See how respondents will experience the survey.

A reusable component structure:
QuestionCard
SurveyPreview
JsonPanel
TabChip
JSON panels automatically update as the survey changes.

🎨 Design Decisions
Clean, lightweight UI using Tailwind utility classes.
Center “canvas” layout inspired by modern Webflow-style design.
Auto-adaptive light/dark mode based on system settings.
Focused on clarity and interaction polish (hover states, spacing, layout consistency).
All functionality kept client-side for simplicity.

📌 Tradeoffs & Assumptions
Omitted drag-and-drop reordering to keep the solution simpler for the timebox.
Avoided extra UI libraries to highlight custom interface design.
Survey is not persisted (no backend/local storage).

Minimum question types implemented as requested:
Text
Multiple Choice

⏳ If I Had More Time
Add drag-and-drop sorting for questions.
Add more question types (rating, dropdown, matrix, etc.).
Add autosave (localStorage) and survey import/export.
Add form validation before submit.
Add a custom theme switcher and color presets.

🧑‍💻 Author
Sanjana
Email: sanjanamaila27@gmail.com
