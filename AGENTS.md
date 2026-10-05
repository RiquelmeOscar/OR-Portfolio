# AGENTS.md — OR-Portfolio

Este repo contiene **únicamente la landing/portfolio personal** de Oscar Alexandro Riquelme.
Los case studies y proyectos viven en sus **propios repositorios** dentro de `github.com/RiquelmeOscar`.

## Stack

HTML + CSS + JavaScript vanilla. Sin frameworks, sin build step, sin dependencias.
Debe seguir siendo así salvo que el usuario lo pida explícitamente.

## Estructura

```
/
├── index.html        # Landing one-page (Inicio · Proyectos · Sobre mí · Contacto)
├── css/style.css     # Estilos (variables CSS en :root, Inter, responsive)
├── js/main.js        # Smooth scroll para anchors
└── assets/           # Recursos estáticos (imágenes, íconos)
```

## Reglas de contenido

- **Idioma:** todo el sitio en español. En el futuro se agregará switch EN/ES — por eso
  evitar hardcodear textos en varios lugares (cuando exista el switch, migrar a una
  estructura tipo `data-i18n` o archivos por idioma).
- **Datos reales:** usar información del CV/perfil de Oscar (+8 años, Recursiva 2024–actualidad,
  WebdriverIO/Appium/Playwright/Cypress/Karate/TypeScript, CI/CD, IA asistida).
  No inventar métricas, empresas ni certificaciones.
- **Contacto:** `riquelmeoscar98@gmail.com`, LinkedIn `linkedin.com/in/oscar-a-riquelme`,
  GitHub `github.com/RiquelmeOscar`.
- **Links de proyectos:** por ahora apuntan a `https://github.com/RiquelmeOscar`. Cuando
  cada proyecto tenga repo propio, actualizar el `href` de la card correspondiente.
- **Diseño:** sin imágenes externas (nada de Unsplash ni hotlinks). Colores y estilos
  definidos en `css/style.css` vía variables CSS. Mantener mobile-first y contraste.

## Cómo trabajar en este repo

- Cambios de contenido → editar `index.html`.
- Cambios visuales → editar `css/style.css` (no estilos inline, salvo casos puntuales).
- La nav es sticky con anchors; toda sección nueva necesita un `id` y un `<li>` en la nav.
- Verificar abriendo `index.html` en el navegador o con `npx serve .`.

## No hacer

- No re-agregar carpetas de proyectos ni docs de case studies a este repo.
- No agregar build tools, frameworks ni dependencias npm sin aprobación.
- No commitear `node_modules` ni archivos temporales.
