# GitHub Repository Configuration Guide
## Keerthana R. — Portfolio

---

## STEP 1 — Create the Repository

1. Go to **github.com** → Click **"+"** → **New repository**
2. **Repository name:** `portfolio` *(clean, professional, matches your domain)*
3. **Description:** `Full Stack Developer portfolio — React + Java + Spring Boot. MCA @ Bangalore University.`
4. **Visibility:** ✅ Public *(required for GitHub Pages free tier)*
5. **Initialize:** ✅ Add a README (you'll replace it)
6. Click **"Create repository"**

---

## STEP 2 — Repository Topics / Tags

Go to your repository → click the ⚙️ gear next to "About" → add these topics:

```
portfolio react vite java spring-boot full-stack frontend javascript css3
mca bangalore developer web developer react-portfolio
```

These tags make your repo discoverable by recruiters searching GitHub.

---

## STEP 3 — Repository Description & Social Preview

**About section (top-right gear icon):**
- Description: `Full Stack Developer portfolio — React, Spring Boot, Java. MCA student @ Bangalore University.`
- Website: `https://keerthana7654.github.io/portfolio` *(after deploying)*
- ✅ Check "Releases", "Packages", "Environments" as appropriate

**Social Preview Image:**
- Go to Settings → Social preview
- Upload a 1280×640px image (screenshot of your portfolio hero)
- This appears when someone shares your GitHub repo link on LinkedIn/Twitter

---

## STEP 4 — Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. **Source:** Select `gh-pages` branch (after running `npm run deploy`)
   - OR select `GitHub Actions` for automatic deployment
3. **Custom domain (optional):** Enter `keerthana.dev` if you have one

**Vite config for GitHub Pages:**

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/', // ← Change to '/' if using custom domain or Vercel
})
```

**package.json scripts:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

---

## STEP 5 — GitHub Actions CI/CD (Automated Deployment)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Every push to `main` now auto-deploys your portfolio. 🚀

---

## STEP 6 — index.html SEO Meta Tags

Replace your `index.html` `<head>` with this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Primary SEO -->
  <title>Keerthana R. | Full Stack Developer — React, Java, Spring Boot</title>
  <meta name="description" content="Portfolio of Keerthana R., a Full Stack Developer and MCA student at Bangalore University. Specializes in React JS, Java, Spring Boot, and MySQL." />
  <meta name="keywords" content="Keerthana R, Full Stack Developer, React Developer, Java Developer, Spring Boot, Bangalore, MCA, portfolio" />
  <meta name="author" content="Keerthana R." />
  <meta name="robots" content="index, follow" />

  <!-- Open Graph (LinkedIn, Facebook, WhatsApp preview) -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://keerthana7654.github.io/portfolio/" />
  <meta property="og:title" content="Keerthana R. | Full Stack Developer" />
  <meta property="og:description" content="React, Java, Spring Boot developer. MCA @ Bangalore University. Open to full-time roles and internships." />
  <meta property="og:image" content="https://keerthana7654.github.io/portfolio/og-image.png" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Keerthana R. | Full Stack Developer" />
  <meta name="twitter:description" content="React, Java, Spring Boot portfolio. MCA @ Bangalore University." />
  <meta name="twitter:image" content="https://keerthana7654.github.io/portfolio/og-image.png" />

  <!-- Canonical URL -->
  <link rel="canonical" href="https://keerthana7654.github.io/portfolio/" />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

  <!-- Preconnect for fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- JSON-LD Structured Data (Google rich results) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Keerthana R.",
    "url": "https://keerthana7654.github.io/portfolio/",
    "email": "keerthi9643@gmail.com",
    "jobTitle": "Full Stack Developer",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Bangalore University"
    },
    "sameAs": [
      "https://www.linkedin.com/in/keerthana-r-8a19a3340",
      "https://github.com/Keerthana7654"
    ]
  }
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

---

## STEP 7 — Branch Protection Rules

Go to Settings → Branches → Add rule for `main`:

- ✅ Require pull request reviews before merging (1 reviewer)
- ✅ Require status checks to pass before merging
- ✅ Include administrators

*(Optional for personal repo — useful to demonstrate professional practices)*

---

## STEP 8 — Dependabot Configuration

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```

This auto-creates PRs when your npm packages have updates — shows you care about security.

---

## STEP 9 — Issue Templates

Create `.github/ISSUE_TEMPLATE/feedback.md`:

```markdown
---
name: Feedback / Bug Report
about: Report a visual bug or suggest an improvement
title: '[BUG/FEEDBACK] '
labels: feedback
---

**What did you notice?**

**Browser & device:**

**Screenshot (if applicable):**
```

---

## STEP 10 — Secrets & Environment Variables

Go to Settings → Secrets → Actions. For future integrations add:

| Secret Name | Value |
|---|---|
| `EMAILJS_SERVICE_ID` | Your EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | Your EmailJS template ID |
| `EMAILJS_PUBLIC_KEY` | Your EmailJS public key |

---

## FINAL CHECKLIST Before Publishing

- [ ] Replace `myPic.jpg` with your actual photo
- [ ] Add `Resume.pdf` to `/public/` folder
- [ ] Update phone number if needed
- [ ] Update GitHub URLs to match your actual repos
- [ ] Create `og-image.png` (1280×640px screenshot of hero) in `/public/`
- [ ] Run `npm run build` and verify no errors
- [ ] Run Lighthouse audit — aim for 90+ Performance, 100 Accessibility
- [ ] Test on mobile (Chrome DevTools → iPhone 12 / 375px)
- [ ] Test keyboard navigation (Tab through entire site)
- [ ] Verify all external links open correctly
- [ ] Deploy to GitHub Pages or Vercel
- [ ] Update LinkedIn "Website" field with portfolio URL
- [ ] Share portfolio URL in your resume header
- [ ] Pin the repository on your GitHub profile
- [ ] Add portfolio URL to GitHub profile bio

---

## GitHub Profile README (Bonus)

Create a repo named exactly `Keerthana7654` (same as your GitHub username). Add a `README.md` to it — it appears on your GitHub profile page:

```markdown
### Hi there 👋 I'm Keerthana R.

🎓 MCA @ Bangalore University  
💻 Full Stack Developer — React · Java · Spring Boot  
📍 Bangalore, India  

[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-E63329?style=for-the-badge)](https://keerthana7654.github.io/portfolio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/keerthana-r-8a19a3340)
[![Email](https://img.shields.io/badge/Email-Contact-D44638?style=for-the-badge&logo=gmail)](mailto:keerthi9643@gmail.com)

**Tech Stack:**  
`Java` `Spring Boot` `React JS` `JavaScript` `MySQL` `JDBC` `Hibernate` `HTML` `CSS`

📌 Currently: Looking for Full Stack / Java Developer opportunities
```
