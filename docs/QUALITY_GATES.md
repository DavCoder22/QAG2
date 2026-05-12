# Quality Gates Configuration

## Overview

Quality Gates son reglas de calidad que determinan si el código puede ser fusionado al branch principal.

## Default Quality Gate (Sonar Way)

| Métrica | Valor Máximo | Descripción |
|---------|--------------|-------------|
| Bugs | 0 | Número de bugs nuevos en el código nuevo |
| Vulnerabilities | 0 | Vulnerabilidades de seguridad nuevas |
| Coverage on New Code | >= 80% | Cobertura de pruebas mínima |
| Duplicated Lines on New Code | < 3% | Líneas duplicadas máximas |

## Pipeline Integration

El quality gate se valida automáticamente:

```yaml
- name: SonarQube Quality Gate Check
  uses: SonarSource/sonarqube-quality-gate-action@v1
  timeout-minutes: 5
  env:
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
    SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
```

Si el Quality Gate falla, el pipeline falla y el PR no puede ser fusionado.

## Branch Protection Rules

Para enforcesar el quality gate:

1. **GitHub → Settings → Branches → Branch protection rules**
2. Crear regla para `main`:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date