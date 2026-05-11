# Quality Gates Configuration

## Overview

Quality Gates son reglas de calidad que determinan si el código puede ser fusionado albranch principal. Este proyecto utiliza **Sonar Way** como quality gate por defecto.

## Default Quality Gate (Sonar Way)

El quality gate "Sonar Way" incluye las siguientes condiciones:

| Métrica | Valor Máximo | Descripción |
|---------|--------------|-------------|
| Bugs | 0 | Número de bugs nuevos en el código nuevo |
| Vulnerabilities | 0 | Vulnerabilidades de seguridad nuevas |
| Code Smells | - | Code smells nuevos (mantenibilidad) |
| Coverage on New Code | >= 80% | Cobertura de pruebas mínima |
| Duplicated Lines on New Code | < 3% | Líneas duplicadas máximas |

## Custom Quality Gate

Para crear un quality gate personalizado:

1. Ir a **SonarCloud → Quality Gates**
2. Click en **Create**
3. Agregar las condiciones deseadas
4. Asignar como default para el proyecto

### Condiciones Recomendadas

```yaml
- Reliability Rating: A (0 bugs)
- Security Rating: A (0 vulnerabilidades)
- Maintainability Rating: A
- Coverage on New Code: >= 80%
- Duplicated Lines on New Code: < 3%
- New Cognitive Complexity: < 15
```

## Pipeline Integration

El quality gate se valida automáticamente en el workflow:

```yaml
- name: SonarCloud Quality Gate Check
  uses: SonarSource/sonarqube-quality-gate-action@v1
  timeout-minutes: 5
  env:
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

Si el Quality Gate falla, el pipeline falla y el PR no puede ser fusionado.

## Branch Protection Rules

Para enforcesar el quality gate antes del merge:

1. **GitHub → Settings → Branches → Branch protection rules**
2. Crear regla para `main`:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date
   - Select "SonarCloud Analysis" como required check

## Monitoreo

Revisa el dashboard de SonarCloud regularmente:
- **Reliability**: Bugs encontrados
- **Security**: Vulnerabilidades detectadas
- **Maintainability**: Code smells y deuda técnica
- **Coverage**: Cobertura de pruebas

## Troubleshooting

### Quality Gate Failed
1. Revisar los errores en el dashboard de SonarCloud
2. Fixear los issues identificados
3. Volver a hacer push para reanudar el análisis

### Pipeline Timeout
- Aumentar el timeout en el workflow (default: 5 minutos)
- Verificar que el servidor de SonarCloud está accesible

### No Coverage Report
- Verificar que `jest-sonar-reporter` está configurado
- Confirmar que el XML se genera en `coverage/test-results.xml`