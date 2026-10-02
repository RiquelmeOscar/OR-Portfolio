# 05-quality-operating-model

## Quality Operating Model - Team Transformation

### Simulación: Transformación de Equipo con Problemas de Calidad

#### Current State Assessment

| Area | Current State | Issues Identified | Data Source |
|------|--------------|-----------------|-------------|
| Test coverage | 45% overall | Critical paths untested; 80% UI, 20% API | Code analysis |
| Regression time | 22 min | Slow tests; no parallelization | CI metrics |
| Defect escape rate | 6.2/month | Bugs reaching production weekly | Jira + QE tracking |
| Flaky test rate | 12.5% | Unstable tests masking real issues | CI reports |
| Automation coverage | 30% of manual cases | High-value scenarios not automated | QE inventory |
| CI quality gates | None | Merge anytime; no prerequisites | Process review |
| Performance testing | Ad-hoc | Only before major releases | Stakeholder reports |
| Security testing | None | OWASP checks skipped | Dev team interview |

#### Risk Analysis (Value Stream Mapping)

```
User Story → Dev Branch → Merge → QA Review → Release → Production
     ↑                          ↑              ↑
  Blockers                  Quality Gates   Rollback Plan
     |                          |              |
  1. No test coverage       1. Blind merges   1. No rollback tested
  2. Flaky tests            2. No metrics     2. Unknown failure modes
  3. Slow feedback          3. Manual gates   3. Production incidents
```

**Root Causes Identified**:
1. No Definition of Done with quality criteria
2. Developer ownership of quality absent → "QA will fix it"
3. No risk-based prioritization → everything is "high priority"
4. Flaky tests erode confidence in suite
5. No feedback loop from production incidents to regression strategy

#### Quality Strategy (Risk-Based Approach)

| Pillar | Definition | Action |
|--------|------------|--------|
| **Risk Matrix** | Impact × Likelihood scoring for all features | Template created; embedded in DoD |
| **Testing Pyramid** | 70% unit, 20% API, 10% E2E | Current: inverted (70% E2E); gradual rebalance |
| **Quality Gates** | Prerequisites before merge to main | 4 gates defined (see below) |
| **Shift-Left** | Testing starts in dev story creation | Pair programming sessions; test templates |
| **Shift-Right** | Production feedback informs testing | Incident post-mortems → test additions |
| **Definition of Done** | Checklist ALL items must pass before merge | 7 items (see below) |

#### Definition of Done - Quality Criteria Checklist

- [ ] Unit tests written for new code (min 3 test cases per function)
- [ ] API contract validated against OpenAPI spec
- [ ] No severe flaky tests in modified areas (tag check)
- [ ] Performance threshold met for modified endpoints (k6 baseline)
- [ ] Security basic check passed (OWASP ZAP automated scan)
- [ ] Test coverage impact ≥ 0% (new code must have tests)
- [ ] Documentation updated (API specs, user flows)

#### Quality Gates (Prerequisites for Merge)

| Gate | Criteria | Owner | Enforcement |
|------|----------|-------|-------------|
| **Gate 1: Code Quality** | Lint + unit test pass | Dev | GitHub Actions block |
| **Gate 2: API Validation** | Schema validation + smoke test | QE | GitHub Actions block |
| **Gate 3: Risk Coverage** | High-risk paths tested | QE Lead | Manual check (sign-off) |
| **Gate 4: Performance Baseline** | No regression vs baseline | Performance | GitHub Actions (k6) |

#### Metrics Dashboard (What, How, Frequency, Owner)

| Métrica | How Medido | Frecuencia | Owner |
|---------|-----------|------------|-------|
| Test coverage | Istanbul report | Per PR | Dev |
| Flaky test rate | CI tag analysis | Weekly | QE Lead |
| Defect escape rate | Jira vs detected | Monthly | QE Manager |
| Regression duration | GitHub Actions timing | Per run | Dev Team |
| Release readiness | Weighted score (4 metrics) | Per release | QE Lead |
| Automation % | (automated / manual total) | Sprint end | QE Team |
| MTTR | Incident → deploy | Per incident | Dev Team |

#### Team Enablement & Developer Ownership

| Iniciativa | Descripción | Impacto Esperado |
|------------|-----------|------------------|
| **Testing workshops** | Fortnightly sessions: test patterns, anti-patterns | Juniors gain confidence; seniors refine craft |
| **Pair programming** | Dev + QE pair on complex stories | Knowledge spread; quality from start |
| **Test infrastructure ownership** | Dev maintains own test fixtures/reusables | Reduce QE bottleneck; sustainable pace |
| **Code review focus** | Reviewers check test quality, not just code | Test quality becomes everyone's responsibility |
| **Tutorial: "My first automated test"** | Onboarding series para new hires | 2-week ramp a first PR merge |

#### Mentoring Plan (30/60/90 Days)

| Fase | Actividades | Objetivo |
|------|-------------|----------|
| **30 days** | - Shadow senior QE on PR reviews<br>- Implement first automated test with mentor<br>- Learn risk matrix scoring<br>- Complete testing workshop series | Establish baseline; first autonomous test |
| **60 days** | - Own medium-complexity feature end-to-end<br>- Lead a workshop segment<br>- Analyze flaky test root cause<br>- Contribute to DoD improvements | Build independence; expand impact |
| **90 days** | - Own quality strategy component<br>- Mentor a junior QE<br>- Present metrics to stakeholders<br>- Propose 1 process improvement | Demonstrate leadership; strategic contribution |

#### Roadmap Transformación

| Timeline | Hitos Clave |
|----------|-------------|
| **Week 1-2** | Current state assessment completed; stakeholder interviews; metrics snapshot |
| **Week 3-4** | Risk matrix designed; Quality Gates prototype; DoD draft; first CI pipeline improvements |
| **Month 2** | Gates implemented in branch protection; testing workshops started; baseline metrics established |
| **Month 3** | First full sprint with all gates; flaky test reduction plan underway; release with quality scorecard |
| **Month 4-6** | Stabilization; continuous improvement loop; metrics refined; developer ownership consolidated |
| **Month 6+** | New normal: quality integrated in flow; reduced defect escapes; team enabling metrics improving |

#### Decisiones Clave y Rationale

| Decision | Alternative | Rationale |
|----------|-----------|-----------|
| Risk-based gates vs 100% coverage | Exigir coverage 100% | Coverage sin risk context es engañoso; gates por riesgo priorizan alto valor |
| Quality gates in CI vs manual sign-off solo | Gates más restrictivos | Automation = feedback faster; pero human sign-off para decisiones de riesgo sigue siendo necesario |
| Testing pyramid rebalance vs actual state | Empezar E2E primero | Pyramid toma tiempo; gates inmediatos dan resultados rápidos; pyramid es meta a largo plazo |
| Metrics dashboard Streamlit vs Tableau | Herramienta enterprise costosa | Portfolio controlado; Streamlit demuestra capacidad + costo 0 para público |
| AI assistance with gates vs none | IA sin gates | Riesgo inaceptable para Quality Lead; gates humanos explícitos diferenciator clave |

#### Próximos Pasos en Este Case Study

- [ ] Aplicar assessment en escenario real o anonimizado del equipo
- [ ] Diseñar e implementar Quality Gates en GitHub Actions + branch protection
- [ ] Crear plantilla de Definition of Done con criteria de calidad
- [ ] Diseñar e iniciar workshops de testing para el equipo
- [ ] Establecer primera baseline de métricas (coverage, flaky rate, escapes)
- [ ] Documentar "30/60/90 day plan" presentado a stakeholders
- [ ] Diseñar dashboard de métricas simplificado (Streamlit o tabla ejecutiva)

### Rationale Final: Quality Lead vs Test Writer

Este case study demuestra liderazgo porque:

1. **No es lista de tests** → Es sistema completo: gates, metrics, strategy, transformación
2. **Decisiones trade-off explicadas** → Why risk-based vs coverage-based, why gates now vs later
3. **Métricas con owners** → No solo "reportar", sino "quién es responsable y cómo se asegura"
4. **Plan de transformación** → Capacidad de llevar a un equipo de punto A a punto B en timeline definido
5
