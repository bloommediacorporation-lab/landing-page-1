# Bloom Landing Page

O pagină de aterizare AWWWARDS-ready pentru agenția de marketing digital Bloom.

## 🚀 Tehnologii

- **Astro** - Framework web ultra-rapid
- **React** - UI components
- **Three.js** + **React Three Fiber** - Grafică 3D
- **GSAP** - Animații performante
- **Lenis** - Smooth scrolling

## 📦 Instalare

```bash
npm install
```

## 🎨 Fonturi

- **Montserrat** - Font principal
- **Josefin Sans** - Font secundar/accent

Încărcate de pe Google Fonts.

## 🏃 Rulare

```bash
npm run dev
```

Site-ul va fi disponibil la `http://localhost:4321`

## 🏗️ Build

```bash
npm run build
```

## 📁 Structura Proiectului

```
bloom-landing/
├── public/
│   ├── fonts/
│   │   └── GeneralSans-Variable.woff2
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Loader.tsx          # Ecran de încărcare animat
│   │   ├── CustomCursor.tsx    # Cursor personalizat
│   │   ├── SmoothScroll.tsx    # Lenis smooth scroll
│   │   ├── Navbar.tsx          # Navigație
│   │   ├── Hero.tsx            # Secțiune hero
│   │   ├── HeroScene.tsx       # Scene 3D Three.js
│   │   ├── Marquee.tsx         # Text animat
│   │   ├── Services.tsx        # Servicii
│   │   ├── Stats.tsx           # Statistici animate
│   │   ├── Testimonials.tsx    # Testimoniale
│   │   ├── CTA.tsx             # Call to action
│   │   └── Footer.tsx          # Footer
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
└── tsconfig.json
```

## ✨ Funcționalități

- **Loader animat** cu counter și progress bar
- **Cursor personalizat** cu efect hover
- **Smooth scrolling** cu Lenis
- **Grafică 3D** cu Three.js (icosahedron animat + particule)
- **Animații GSAP-ready** pentru secțiuni
- **Design responsive** pentru toate dispozitivele
- **Tema dark** cu accente violet
- **Statistici animate** la scroll
- **Testimoniale carousel** automat
- **AWWWARDS-submission ready**

## 🎯 Next Steps

1. Adaugă fontul General Sans în `public/fonts/`
2. Personalizează conținutul în fiecare componentă
3. Conectează formularele de contact
4. Adaugă proiectele tale în secțiunea de portofoliu
5. Optimizează imaginile și asseturile
6. Testează pe diverse dispozitive
7. Trimite la AWWWARDS pentru recenzia finală!

## 📝 Licență

MIT License - Folosește liber pentru proiecte personale sau comerciale.
