# 007 — Cinematic Portfolio

Персональный portfolio website для motion / digital designer.

## Стек

- Next.js
- React
- GSAP + ScrollTrigger
- Responsive layout
- Локальные видео и аудио-ассеты

## Локальный запуск

```bash
npm install
npm run dev
```

Сборка:

```bash
npm run build
```

## Подготовка к GitHub

В проекте есть большие видеофайлы, поэтому нужен Git LFS.

```bash
git lfs install
git add .gitattributes .gitignore README.md .
git commit -m "Prepare cinematic portfolio"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Деплой на Vercel

- Framework: Next.js
- Build command: `npm run build`
- Output directory: оставить по умолчанию

Если репозиторий приватный и использует Git LFS, убедитесь, что видеофайлы доступны Vercel при сборке.
