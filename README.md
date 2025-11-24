🚀 Dynamic Survey Builder

A modern, Next.js-powered interactive survey builder with live preview, JSON inspector, and a clean Webflow-like adaptive UI.

🔧 Tech Stack

Next.js 14+ (App Router)

React (useState, client components)

Tailwind CSS

Lucide Icons

Auto–adaptive Light/Dark theme (system-based)

Smooth animations

Fully client-side prototype

🎥 Features
✔️ Dynamic Question Builder

Add, edit, delete questions

Multiple-choice or text questions

Editable options

Required field toggle

Animated card interactions (hover, scale, subtle transitions)

✔️ Live Survey Preview

Preview exactly what users will see

Auto-updates as you build the survey

Respond and see responses appear live

✔️ JSON Inspector

Real-time JSON output:

Survey definition

User responses

Expand/collapse panels

“Copy JSON” button

Syntax-highlighted JSON rendering

✔️ Elegant Webflow-Style UI

Rounded canvas container

Clean light colors

Shadowed sections

Auto-adaptive OS theme (light/dark)

Smooth panel transitions

📦 Project Structure
survey-builder/
 ├── app/
 │   ├── globals.css        # Global styling + dark/light variables
 │   ├── layout.js         # Root layout
 │   └── page.js           # Main Survey Builder UI
 ├── public/               # SVG assets
 ├── README.md
 ├── tailwind.config.js
 ├── postcss.config.js
 ├── package.json
 └── ...

▶️ How to Run the Project
1️⃣ Install dependencies
npm install

2️⃣ Run development server
npm run dev


Then visit:
👉 http://localhost:3000

🧠 Architectural Approach
1. Single-File Client Architecture

All builder interactions are handled in a single React component (page.js) using useState, keeping the project lean and easy to understand.

2. Two-View System

The UI toggles between:

Builder view — crafting questions

Preview view — simulating end-user responses

3. Real-Time Two-Way Binding

Survey definition & responses update immediately using local state objects:

surveyTitle

questions[]

responses{}

This keeps things simple without external state libraries.

4. Componentized UI

Reusable components:

JsonPanel

QuestionCard

TabChip

SurveyPreview

Each isolated for readability.

5. Auto-Adaptive Theming

globals.css uses CSS variables + color-scheme to match system light/dark mode.

🧪 Tradeoffs & Decisions
✔️ Chosen: Client-only Next.js

Because the prompt describes a prototype, using client-only rendering simplifies state, avoids server routing, and improves iteration speed.

✔️ Chosen: Tailwind Utility Classes

Designing a Webflow-style layout is easiest with Tailwind’s utility-first approach.

❌ Not Included: Drag & Drop reordering

Possible with dnd-kit, but out of scope for time constraints.

❌ Not Included: Saving to backend

Currently the “workspace” is local only. Could be extended using:

Supabase

Firebase

Next.js API Routes

LocalStorage autosave

🚧 If Given More Time, I Would Add:
⭐ 1. Drag & Drop Question Reordering

Enhance UX using dnd-kit with animated sort transitions.

⭐ 2. Persistent Autosave

Store user surveys in LocalStorage or cloud sync.

⭐ 3. Export/Import Survey

Allow exporting JSON + loading previously created surveys.

⭐ 4. More Question Types

Rating scale

Dropdown

Matrix

File upload
⭐ 5. Dedicated Live Theme Switcher

Currently uses OS theme; adding a toggle button would be next.

🧑‍💻 Author
Sanjana
Email: sanjanamaila27@gmail.com
🌟 License

MIT — free to use & modify.


⭐ 5. Dedicated Live Theme Switcher

Currently uses OS theme; adding a toggle button would be next.
