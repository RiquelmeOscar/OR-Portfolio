# 01-quality-engineering-platform

## Quality Engineering Platform - Healthcare Appointment Scheduler

### Producto: HealthCare Scheduler (web + API + SQLite)

### Arquitectura y Design Decisions

#### Test Strategy - Risk Matrix

| Feature | Impact (1-5) | Likelihood (1-5) | Risk Score | Automation Priority |
|---------|-------------|-----------------|------------|---------------------|
| Book appointment | 5 | 3 | 15 | High |
| Cancel appointment | 5 | 2 | 10 | High |
| Provider availability | 4 | 3 | 12 | Medium |
| Payment processing | 5 | 2 | 10 | High |
| Notification system | 3 | 4 | 12 | Low |
| Profile management | 3 | 3 | 9 | Low |

**Rationale**: Prioritized by risk score (Impact × Likelihood). Payment and booking are highest impact, so automated first. Notification system has high likelihood but low impact → lower priority.

#### Automation Architecture

- **Framework**: WebdriverIO + TypeScript + Node.js
- **Pattern**: Page Object Model + Service Pattern for API
- **Reporter**: Allure (CI-integrated)
- **Test Data**: Factory pattern with faker.js, SQLite fixture loading
- **Configuration**: wdio.conf.ts with multi-browser capabilities

#### API Testing (REST Contracts)

- **Tool**: Playwright test API + JSON schema validation
- **Endpoints tested**:
  - POST /appointments → 201, valid date range, patient exists
  - GET /appointments/{id} → 200, 404 not found
  - PUT /appointments/{id} → 200, validation errors
  - DELETE /appointments/{id} → 204
- **Contract testing**: OpenAPI 3.0 spec validation

#### CI/CD Pipeline (GitHub Actions)

```yaml
name: QE Platform CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --reporter allure
      - uses: allureframework/allure-report-action@v2
        with:
          allure_results: allure-results
      - name: Upload Allure report
        uses: actions/upload-artifact@v4
        with:
          name: allure-report
          path: allure-report/

  performance:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - run: npx k6 run performance/load-test.js
        env:
          K6_OUT: json=results/k6-results.json
```

#### Quality Gates

| Gate | Criteria | Owner |
|------|----------|-------|
| Unit test coverage | ≥ 80% (critical paths) | Dev |
| API contract validation | 0 schema failures | QE |
| Security basic check | OWASP ZAP baseline pass | Sec |
| Performance threshold | < 2s p95 latency | Performance |
| Flaky test rate | < 5% of suite | QE Lead |

#### Database Validation

- **Test queries** embedded in service layer tests
- **Integrity checks**: FK constraints, unique validations
- **Data seeding**: Transaction rollback pattern per test

#### Flaky Test Strategy

1. **Tagging**: Tests tagged `@flaky` after 3 failures in same run
2. **Retry logic**: Max 2 retries with exponential backoff
3. **Isolation**: Flaky tests run in dedicated job, block merge if > 2 flaky
4. **Root cause analysis**: Label failures as `infrastructure`, `code`, `unclear`, `flaky`

### Decision Rationale (Elevating Beyond Automation)

| Choice | Alternative | Rationale |
|--------|------------|-----------|
| POM over BDD | Cucumber/Gherkin | Team maintained PO better than Gherkin syntax; stakeholder review not required for every test |
| API over UI for contracts | Full UI regression | API contracts catch 80% of bugs earlier; UI slower and more brittle |
| 80% coverage (critical) | 100% coverage chase | Diminishing returns after 80%; focus on high-risk paths (booking, payment) |
| Retry on failure | Fail fast | Retries mask underlying instability; better to fix root cause or isolate |
| SQLite in-memory | External DB | Faster CI, sufficient for unit/service validation; integration tests use separate DB |

### Metrics & Results (Simulated)

| Metric | Target | Simulated Result |
|--------|--------|------------------|
| Test execution time | < 10 min (full suite) | 7 min 45 s (parallel, 4 workers) |
| Flaky test rate | < 5% | 3.2% (down from 8.7% after retry isolation) |
| API contract failures | 0 | 0 in 12 sprints |
| Regression coverage (high-risk) | 100% | 12/12 test cases automated |
| Automation ROI | 3x vs manual | Estimated 150 hrs saved over 6 months |

### Arquitectura Completa

```
src/
  actors/           # Page objects (WebdriverIO)
  services/         # API service layer (Playwright/REST)
  tests/            # Test scenarios by risk priority
    /critical/      # Booking, payment (auto-generated from risk matrix)
    /high/          # Provider availability, notifications
    /low/           # Profile management, UI polish
  fixtures/         # SQLite seed data, API mock responses
  utils/            # Helpers, faker factories, flaky test tagging
  config/           # WDIO, k6, GitHub Actions configs
  reports/          # Allure, k6 JSON results
```

### Próximos Pasos en Este Case Study

- [ ] Implementar POM base y service layer
- [ ] Crear risk matrix integration con tagging automático
- [ ] Configurar GitHub Actions con quality gates
- [ ] Diseñar dashboard de métricas (Project 2 dependency)
- [ ] Documentar "Why not automate" decisions for low-priority features
