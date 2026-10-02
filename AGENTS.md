# AGENTS.md - Quality Engineering Portfolio

This file describes the Quality Engineering Portfolio repository and guidelines for working with it.

## Project Overview

A public portfolio demonstrating Quality Engineering Lead capabilities across 5 case studies and a personal website. The portfolio is designed to show system design, strategy, metrics, risk-based decision making, and leadership - not just test automation.

**Positioning:** Software Engineer in Test / Quality Engineering Lead

## Repository Structure

```
/
├── README.md              # Vision, principios, roadmap, criterios EM
├── AGENTS.md              # This file
├── .github/               # (templates, workflows - add as needed)
├── /docs/                # (plantillas docs - add as needed)
├── /projects/            # 5 case studies con deliverables completos
│   ├── 01-quality-engineering-platform/
│   ├── 02-quality-intelligence/
│   ├── 03-ai-quality-lab/
│   ├── 04-performance-engineering/
│   └── 05-quality-operating-model/
└── /web/                 # Sitio web personal (HTML/CSS/JS)
    ├── index.html
    ├── about.html
    ├── contact.html
    ├── style.css
    └── script.js
```

## 5 Case Studies (Projects)

Each project follows a consistent structure and demonstrates leadership-level QE capabilities:

### Project 1: Quality Engineering Platform
- **Focus:** End-to-end QE system design
- **Key deliverables:** Risk matrix, automation architecture (POM+Service Pattern), API contract testing, CI/CD with quality gates, flaky test strategy, database validation
- **Elevates beyond automation:** Trade-off rationale (POM vs BDD, API vs UI coverage, 80% vs 100% coverage), decision documentation

### Project 2: Quality Intelligence
- **Focus:** Metrics-driven quality visibility
- **Key deliverables:** 8 metrics dashboard (Flaky Rate, Defect Escape, Regression Duration, Test Execution Time, MTTR, Release Readiness, Automation ROI, Quality Trends), simulated 6-sprint data, trend analysis
- **Elevates beyond raw data:** Metric selection rationale, ownership assignment, leading vs lagging indicators, stakeholder communication focus

### Project 3: AI Quality Engineering Lab
- **Focus:** AI-assisted QE with explicit risk gates
- **Key deliverables:** 5 agents (test generation, risk analysis, PR quality, failure analysis, missing-test detection), explicit risk documentation (hallucinations, false coverage, weak assertions, redundant tests, happy-path bias, incorrect assumptions), human approval gates for ALL generated tests, assumption logging
- **Elevates beyond automation:** AI risk awareness, human-in-the-loop design, quality gates as differentiator, responsible AI use documentation

### Project 4: Performance Engineering
- **Focus:** k6-integrated performance testing
- **Key deliverables:** Load/stress testing scenarios, threshold rationale (p95 < 2s, error rate < 1%, etc.), GitHub Actions integration, baselines and regression detection, k6 script structure
- **Elevates beyond running tests:** Baseline management, threshold design rationale, CI integration that fails on breach, regression detection vs just execution

### Project 5: Quality Operating Model
- **Focus:** Team transformation program
- **Key deliverables:** Current state assessment template, risk analysis (value stream mapping), quality strategy (risk-based approach, testing pyramid), Definition of Done with 7 criteria checklist, 4 quality gates with enforcement owners, metrics dashboard (what/how/frequency/owner), team enablement initiatives, 30/60/90 day mentoring plan
- **Elevates beyond process:** Transformation capability, stakeholder alignment, sustainability through developer ownership, mentoring plan with concrete milestones

## Personal Website

**5 HTML pages:**
- `index.html` - Home with positioning "Quality Engineering that Reduces Risk"
- `about.html` - Professional profile (~8 years exp, goal toward QA Lead)
- `contact.html` - Contact form/info with LinkedIn/GitHub links

**Assets:**
- `style.css` - Visual styles (dark theme #1a1a2e accent #e94560, responsive)
- `script.js` - Smooth scroll for anchor links

## Development Guidelines

### Adding a New Project/Case Study

1. **Create directory:** `projects/06-new-project-name/`
2. **Add README.md** following the same structure as existing projects (Risk Matrix, Architecture Decisions, Metrics, Decision Rationale, Next Steps)
3. **Key sections to include:**
   - Design decisions with "Alternative / Rationale" tables
   - Metrics & Results (clearly mark simulated vs real)
   - Why this approach over alternatives
   - Elevating beyond automation section
   - Próximos Pasos checklist

### Web Portfolio Updates

1. **Add project card** to `index.html` .project-grid section
2. **Add case study tile** to `#case-studies` .grid-three section
3. **Update navigation** if adding new section IDs
4. **Maintain consistency** in styling (uses existing .container, .project-card, .btn classes)

### Principle: Evidencia sobre Teoría

Every project must answer these questions:
- [ ] Decisiones de arquitectura/strategy documentadas con rationale
- [ ] Métricas/resultados presentes (no solo "tests run")
- [ ] Priorización risk-based evidente
- [ ] Trade-offs explicados (qué NO se hizo y por qué)
- [ ] Integración CI/CD o proceso visible
- [ ] Consideraciones de escalabilidad/maintenibilidad
- [ ] Enfoque de evidencia, no lista de skills
- [ ] Conexión clara a outcomes de calidad de negocio

### Review: Quality Lead vs Test Writer

> **¿Esto demuestra que puedo liderar Quality Engineering o simplemente demuestra que sé escribir tests?**

For each project, verify all 8 points above are satisfied. If a project only demonstrates automation, add:
- Architecture/strategy decisions
- Metrics with owners and rationale
- Risk-based prioritization
- Trade-off explanations
- CI/CD or process integration

### Roadmap Phases

| Phase | Focus | Status |
|-------|-------|--------|
| **MVP** | Repo structure + Projects 1 & 2 | Complete (uploaded to GitHub) |
| **Phase 2** | Projects 3, 4, 5 | Complete (all 5 projects in repo) |
| **Phase 3** | Web portfolio | Complete (5 HTML pages uploaded) |
| **Phase 4** | Polish & Narrative | Pending: Essays "How I Think", "Quality Decisions" |
| **Phase 5** | Ongoing | Pending: New projects, metrics updates |

### Git Operations

```bash
# View structure
find /d/Proyectos/Portfolio -type f | sort

# Add new file
git add .
git commit -m "feat: add new project - Case Study X"
git push origin main
```

### Important Notes

- **Repo is private** on GitHub (set via Settings → Danger Zone → Make private)
- **All metrics marked as simulated** where numerical values are hypothetical
- **No cloud costs** - this is a static HTML portfolio + markdown repos
- **Purpose:** Demonstrate Quality Engineering Lead capability, not showcase framework features
- **Each project intentionally avoids:** Lists of technologies, "hello world" demos, unnecessary features, complexity without demonstrable value

### Contact

Repository owner: Oscar Martinez (RiquelmeOscar on GitHub)
Email: oscar@oscarportfolio.com (simulated for portfolio)
Purpose: QA Lead / Quality Engineering Lead opportunities
