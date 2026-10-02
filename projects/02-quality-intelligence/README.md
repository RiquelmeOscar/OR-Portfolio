# 02-quality-intelligence

## Quality Intelligence Dashboard

### Metricas para Stakeholder Visibility

| Métrica | Descripción | Fuente | Frecuencia | Formato |
|---------|-------------|--------|------------|---------|
| Flaky Test Rate | % de tests que fallan sin cambio de código | Resultados CI | Sprint | Gauge + trend line |
| Defect Escape Rate | Defectos a producción vs detectados internos | Jira + QE tracking | Monthly | Rate % |
| Regression Duration | Tiempo total de ejecución suite completa | GitHub Actions artifacts | Per run | Time (min) |
| Test Execution Time | Tiempo por entorno (dev/staging/prod) | CI timing | Per run | Distribution chart |
| MTTR | Mean Time to Resolution | QE triage → fix deployment | Per incident | Hours |
| Release Readiness | Score 0-100 para liberar | Múltiples gates combinados | Per release | Score + rationale |
| Automation ROI | Horas ahorradas vs testing manual | Cálculo comparativo | Per project | Ratio + dollars |
| Quality Trends | Evolución last 6 sprints | Datos históricos acumulados | Sprint | Multi-line chart |

### Datos Simulados (6 Sprints)

| Sprint | Flaky Rate | Defect Escapes | Regression Time | Release Readiness |
|--------|------------|----------------|-----------------|-------------------|
| Sprint 1 | 6.8% | 4 | 18 min | 72 |
| Sprint 2 | 5.1% | 3 | 15 min | 78 |
| Sprint 3 | 4.3% | 2 | 12 min | 85 |
| Sprint 4 | 3.9% | 1 | 10 min | 88 |
| Sprint 5 | 3.2% | 0 | 8 min | 92 |
| Sprint 6 | 2.9% | 0 | 6 min | 95 |

### Tendencias Observadas

- **Flaky Test Rate**: Disminuyó 57% (6.8% → 2.9%) tras implementar retry isolation y tagged flaky test job
- **Defect Escape Rate**: A cero después de agregar validación de API contracts y expansión de cobertura de high-risk paths
- **Regression Duration**: Reducido 67% (18min → 6min) por paralelización (4 workers) y eliminación de tests lentos
- **Release Readiness**: Aumentó 23 puntos por gates más estrictos y reporte de métricas transparente

### Tech Stack

- **Dashboard**: Streamlit (Python) + Plotly para visualizaciones interactivas
- **Data source**: CSV files mock (fácil reemplazo por BD real o API)
- **Deployment**: GitHub Pages o Streamlit Sharing (costo cero para portfolio)
- **Refresh**: Scripts que leen artifacts de GitHub Actions o CSVs generados localmente

### Decisiones de Diseño

| Decision | Rationale |
|----------|-----------|
| Streamlit sobre Tableau/PowerBI | Cero costo, Python skills existentes, fácil customización, ideal para demo |
| Datos simulados vs integración real | Portfolio controlado; datos reales podrían exponer información sensible; simulación demuestra capacidad de diseño |
| Gauge + trend vs tabla pura | Insight visual inmediato + dirección clara; stakeholders escanean gauge rápido |
| Métricas Leading vs Lagging | Combination: flaky rate (leading) + defect escapes (lagging) → predictivo + retrospectivo |

### Rationale Elevating Beyond Raw Data

| Question | Answer |
|----------|--------|
| Why these metrics? | Selected based on what Engineering Managers need to make release decisions; vanity metrics (total test count) excluded |
| Why not include code coverage? | Coverage sin risk context es engañoso; Flaky Rate y Defect Escape son mejores indicadores de calidad |
| How es Release Readiness calculated? | Weighted sum: 40% flaky rate, 30% defect escapes, 20% regression duration, 10% automation ROI — trade-off explicado, no arbitrario |
| Who owns each metric? | Defined owner per metric (QE Lead, Dev Team, Product) → accountability, no solo visibility |

### Próximos Pasos

- [ ] Implementar dashboard Streamlit con datos mock
- [ ] Agregar selector de sprint/rango de fechas
- [ ] Exportar CSV/JSON de los datos visualizados
- [ ] Conectar con datos reales de GitHub Actions (futuro)
- [ ] Documentar "How to read this dashboard" para stakeholders no técnicos
