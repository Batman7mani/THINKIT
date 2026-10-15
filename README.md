# THINKIT – Text-to-Speech (TTS) Web Platform

**THINKIT** is a responsive Text-to-Speech (TTS) web application designed to assist users—especially students with reading difficulties such as dyslexia—by converting typed text into spoken audio. It aims to improve reading comprehension, focus, and engagement through interactive learning.

## Purpose of Development

This project was created to:
- Help learners bridge the gap between written and spoken language.
- Provide an accessible, browser-based tool with no installation required.
- Strengthen my practical skills in web development and UI/UX design.
- Explore how technology can enhance educational experiences.

## Key Features

- Text-to-Speech conversion using the Web Speech API.
- Custom voice selection with pitch and rate control.
- Real-time word and character counters.
- A clean, responsive user interface for desktop and mobile.
- Progress tracking with level-up animations and scoring.
- Virtual keyboard visualizer and feedback messages.
- "Common Phrases" buttons for practice and engagement.

## Technologies Used

- **React 19** – Component-based UI; each tool is its own page component.
- **React Router** – Client-side navigation between the tools (hash routing for GitHub Pages).
- **HTML** – Page structure (JSX) and the Vite entry page.
- **CSS** – Styling, responsiveness, and layout animations (one stylesheet per tool).
- **JavaScript** – Interactivity, logic, speech synthesis (Web Speech API), progress tracking.
- **Vite** – Dev server and production build.

## Run It Locally

```bash
npm install
npm run dev      # open the printed localhost URL
npm run build    # production build in dist/
npm run deploy   # build and publish dist/ to the gh-pages branch (GitHub Pages)
```

## Project Structure

```
index.html            Vite entry page
src/main.jsx          Router: /, /text-to-speech, /phonetic, /worksheets, /typing, /quiz
src/usePage.js        Loads the active page's stylesheet and sets the tab title
src/pages/*.jsx       One React component per tool
src/styles/*.css      Original THINKIT stylesheets
public/               Images, mascot GIFs, sounds and worksheet PDFs
```

## What I Learned

- Implementing browser-based speech synthesis using the Web Speech API.
- Creating accessible and responsive UI components using pure CSS.
- Structuring interactive JavaScript applications.
- Handling DOM events efficiently and providing real-time feedback.
- Enhancing user experience through animations and gamification.

## Challenges Faced

- Ensuring cross-browser compatibility with the Web Speech API.
- Managing input validation and feedback without overwhelming the user.
- Designing a UI that’s both functional and visually simple for early learners.
- Making the application mobile-friendly, then migrating it to React without losing the original look.
- Handling edge cases like empty inputs and voice mismatches.

## Live Project

- GitHub Pages: **https://batman7mani.github.io/thinkit/**
- Netlify: **[THINK](https://thinkpro.netlify.app/)**

## Future Improvements

- Add more language support and custom voice previews.
- Introduce sentence-level tracking and reading speed analysis.
- Store user progress locally or via backend integration.
