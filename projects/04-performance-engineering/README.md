# 04-performance-engineering

## Performance Engineering with k6

### Objetivas: Integrar testing de performance en CI/CD con baselines y thresholds

#### Load Testing

| Scenario | VUs | Duration | RPS Target | Success Criteria |
|----------|-----|----------|------------|------------------|
| Expected peak | 50 | 30 min | 500 req/s | p95 latency < 2s, error rate < 1% |
| Sustained load | 75 | 45 min | 750 req/s | p95 latency < 3s, error rate < 2% |
| Spike test | 100 → 200 | 10 min | Peak 1200 req/s | No crashes, graceful degradation |
| Stress test | 200 → 300+ | Until failure | N/A | Breakpoint identified, memory leaks noted |

#### k6 Script Structure

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

// Metrics definitions
const latencia = new Trend('latencia');
const error_rate = new Rate('errores');

export const options = {
  stages: [
    { duration: '5m', target: 10 },   // ramp up
    { duration: '10m', target: 50 },  // sustained
    { duration: '5m', target: 100 },  // spike
    { duration: '10m', target: 200 }, // stress
    { duration: '5m', target: 0 },    // ramp down
  ],
  thresholds: {
    'latencia': ['p(95)<2000'],     // p95 < 2s
    'errores': ['rate<0.01'],       // < 1% errors
    'http_req_duration': ['max<5000'] // max < 5s
  }
};

export default function () {
  const res = http.get('https://api.healthcare-scheduler.com/appointments');
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 2s': (r) => r.timings.duration < 2000,
  });
  
  latencia.add(res.timings.duration);
  if (res.status !== 200) error_rate.add(1);
  
  sleep(1);
}
```

#### Umbrales (Thresholds) con Rationale

| Umbral | Valor | Rationale |
|--------|-------|-----------|
| p95 latency | < 2s | Umbral de negocio: users abandon después de 3s; 2s es margen cómoda |
| p99 latency | < 5s | Fallback para users con conexiones lentas; no debe romper experiencia crítica |
| Error rate | < 1% | Umbral de alerta temprana; > 1% indica problema de infrastructure o code |
| Requests/sec | > 500 | Meta de capacidad; debajo indica bottleneck de backend o API |
| CPU usage | < 70% | Evitar auto-scaling triggers innecesarios y costos cloud |

#### Integración GitHub Actions

```yaml
name: Performance Testing

on: [push, pull_request]

jobs:
  k6:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx k6 run performance/appointments.js
        # Output results as JSON artifact
        env:
          K6_OUT: json=performance/results.json
      - uses: actions/upload-artifact@v4
        with:
          name: k6-results
          path: performance/results.json
      # Threshold breach fails the job automatically
      # (enforced by k6 thresholds in the script)
```

#### Baselines y Regression Detection

| Tipo | Descripción | Implementación |
|------|-------------|----------------|
| **Baseline commit** | First run on main branch stored as reference | `k6 baseline compare` command |
| **Per-PR comparison** | New run vs baseline commit; fail on degradation | `k6 compare` GitHub Action |
| **Regression detection** | Alert if p95 degrades > 10% vs baseline | Custom script que lee results.json y compara |
| **Trend tracking** | Historical baseline evolution over months | Store results.json por tag/version en GitHub Packages |

```bash
# Comparar nueva run contra baseline
npx k6 compare@0.50.0 \
  --baseline=performance/baseline.json \
  --run=performance/results.json \
  --output=performance/comparison.html
```

#### Reporte de Resultados (Simulado)

| Métrica | Baseline | Nueva Run | Change | Status |
|---------|----------|-----------|--------|--------|
| p95 latency | 1.8s | 2.4s | +33% ⚠️ | ❌ Fails threshold |
| p99 latency | 4.2s | 5.1s | +21% ⚠️ | ⚠️ Warning |
| Error rate | 0.3% | 0.8% | +167% ⚠️ | ⚠️ Near threshold |
| Requests/sec | 650 | 580 | -11% ⬇️ | ⬇️ Down |
| CPU avg | 45% | 62% | +38% ⬆️ | ⬆️ Up |

**Action Required**: New feature introduced database query N+1; optimize query or increase threshold with justification.

#### Rationale: Why k6 Over Other Tools

| Tool | Choice | Rationale |
|------|--------|-----------|
| LoadRunner | k6 | Cost-prohibitive para portfolio; k6 open-source + JS/TS nativo; team familiar |
| Gatling | k6 | Gatling Scala learning curve; k6 JavaScript/TypeScript lowers barrier |
| Locust | k6 | Locust Python; team TS-first; k6 mejor integra con JS ecosystem |
| Custom script | k6 | Reusable CI artifact; k6 HTML report + JSON export standardized |

**Opinion**: k6 is practice consolidated para modern CI/CD; experimentando con Taurus integration layer para report unification.

#### Métricas & Results (Simulados)

| Métrica | Meta | Simulated Result |
|---------|------|------------------|
| p95 latency | < 2s | 1.9s (pass) |
| p99 latency | < 5s | 4.5s (pass) |
| Error rate | < 1% | 0.4% (pass) |
| Throughput | > 500 RPS | 620 RPS (pass) |
| Test execution time | < 10 min | 6 min (parallel VUs) |
| Baseline stability | No regression | 3 consecutive runs stable |

#### Próximos Pasos

- [ ] Crear script k6 base para API de appointments
- [ ] Configurar umbrales iniciales con rationale documentado
- [ ] Integrar con GitHub Actions (plantilla .github/workflows)
- [ ] Crear script de baseline establishment y comparación
- [ ] Documentar "When performance testing is wrong solution" (ej: stories cambios freq, UI prototyping)
