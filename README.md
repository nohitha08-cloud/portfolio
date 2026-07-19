# 🌟 Premium Personal Portfolio - Nohitha Gangireddy

Welcome to my professional portfolio website! This repository houses a modern, premium, and fully responsive personal portfolio designed for a Computer Science Engineering student specializing in **Web Design & Development, ReactJs, and Cyber Security**.

The layout features rich aesthetics, clean typography (Poppins & Inter), smooth scrolling, interactive counters, and custom visual mockups to create an engaging experience for recruiters.

---

## 🛠️ Tech Stack & Technologies

* **Core Structure**: Semantic HTML5 & Vanilla CSS3
* **Libraries & Frameworks**: ReactJs, Node.js
* **Build Tool & Dev Server**: Vite
* **Database**: MySQL
* **Icons**: FontAwesome v6.4.0 (integrated via CDN)
* **Fonts**: Google Fonts (Poppins & Inter)

---

## ✨ Features & Interactive Mechanics

1. **Preloader Screen**: Custom brand loading spinner ("NG") with an automated fadeout trigger using document ready state hooks and safety timeouts.
2. **Scroll Progress Tracker**: Horizontal progress bar at the top of the screen displaying real-time scrolling progression.
3. **Typewriter Introduction**: Loops through key specialization terms: *"Computer Science Student"*, *"Web Developer"*, *"ReactJs Developer"*, and *"Cyber Security Learner"*.
4. **3D Flip Cards**: Project cards that rotate `180 degrees` on hover utilizing CSS 3D perspective transforms to present tech tags, summaries, and action links.
5. **Intersection Observer Reveals**: Smooth fade-in, slide-up, and scale animations that trigger on scroll when components enter the viewport.
6. **Animated Statistics**: Numeric counter loops that increment dynamically to target stats upon scrolling to the About section.
7. **Scroll-Spy Active Navigation**: Sticky header navigation bar with glassmorphic filter backdrop that automatically highlights the current active section.
8. **Contact Form Validation**: Form submit interceptor with regex email matching, empty field alerts, and custom focus states.
9. **Credentials Mock PDF**: Ready-to-download copy of B.Tech CSE resume template linked to view and download actions.

---

## 📁 Project Structure

```text
portfolio/
├── assets/
│   ├── documents/
│   │   └── resume.pdf         # Stylized mock credentials PDF
│   └── images/
│       ├── profile.jpg        # Professional female avatar headshot
│       ├── project_hotel.jpg  # Assignment Dashboard mockup
│       ├── cert_aws.jpg       # Meta React Badge mockup
│       ├── cert_google.jpg    # JavaScript Cert Badge mockup
│       └── cert_internship.jpg# SAC Internship badge
├── css/
│   └── style.css              # Color tokens, glassmorphism, 3D card flips, media queries
├── js/
│   └── main.js                # Typewriters, scroll reveals, stats, form checkers
├── index.html                 # Semantic document layout structure
├── package.json               # Node.js Vite scripts and dependencies
├── .gitignore                 # Excludes node_modules and dist bundles from git
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started & Local Setup

Ensure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

### 1. Install Dependencies
Run the command below in the repository root folder to install Vite:
```bash
npm install
```

### 2. Run the Development Server
Launch the local server using Vite:
```bash
npm run dev
```
Once started, open your web browser and navigate to:
👉 **[http://localhost:5173/](http://localhost:5173/)**

### 3. Build for Production
Bundle and optimize all styles and scripts for production hosting:
```bash
npm run build
```
Vite will compile the code and place the static assets inside the `/dist` directory.

---

## 📄 License & Credits
Designed and developed by Nohitha Gangireddy. All rights reserved. Custom mockup assets generated for presentation purposes.
