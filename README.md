# Ivan B. Tuazon — Personal Portfolio

A responsive, minimalist portfolio inspired by the general layout patterns of bryllim.com. This is an independent implementation, with original CSS and mock project illustrations. No original site code or assets were copied.

## Getting started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Personalize

1. Edit `src/data.ts`: your introduction, skills, project descriptions, email, GitHub, and LinkedIn. Contact/social links are intentionally hidden until provided.
2. Add a resume PDF to `public/resume.pdf` and set `resume: '/resume.pdf'`.
3. Replace the stylized Las Familias illustration with an actual project screenshot if desired.
4. Change the document title and meta description in `index.html`.
5. Only publish accurate skills, project details, and educational information.

## Build and deploy to Vercel

```bash
npm run build
```

Push this folder to your personal GitHub repository. In Vercel, select **Add New → Project**, import the repository, and use the detected **Vite** settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

Vercel will redeploy when you push changes to your connected branch.

## Features

- Responsive layout and mobile navigation
- Theme toggle with preference stored locally
- Search/command navigation using `Ctrl+K` / `Cmd+K`
- Project category filters
- Expandable current-focus section
- Optional contact email copy functionality
- Editable central profile data

Note: Contact buttons only appear after you configure your actual email. Project action links only appear after real URLs are provided.