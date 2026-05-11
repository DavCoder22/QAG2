# Arquitectura del Pipeline CI/CD

## Overview

```
┌─────────────┐    ┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│   Push/PR   │───▶│   Build &    │───▶│ SonarCloud   │───▶│ Quality Gate │
│   to GitHub │    │   Test       │    │ Analysis     │    │   Validation │
└─────────────┘    └─────────────┘    └──────────────┘    └──────────────┘
                                                              │
                                                              ▼
                                              ┌──────────────────────────┐
                                              │    Branch Protection     │
                                              │    (Block if failed)     │
                                              └──────────────────────────┘
```

## Workflows

### 1. build.yml
```
Trigger: push to main/develop, PR to main
Jobs:
  - build: Compila y ejecuta tests
  - test-multi-version: Tests en Node 18, 20, 22
```

### 2. sonarqube.yml
```
Trigger: push to main/develop, PR opened/sync/reopened
Jobs:
  - sonarcloud: Análisis estático de código
    - Checkout code
    - Setup Node.js
    - Install dependencies
    - Run tests with coverage
    - SonarCloud Scan
    - Quality Gate Check
```

### 3. quality-gate.yml
```
Trigger: After sonarqube workflow completes
Jobs:
  - quality-gate-check: Verifica que todo pasó
```

## GitHub Actions Jobs Detail

| Job | Step | Descripción |
|-----|------|-------------|
| build | Checkout | Clona el repositorio |
| build | Setup Node | Configura Node.js 20 |
| build | Install deps | npm ci |
| build | Linter | ESLint check |
| build | Tests | Jest con coverage |
| build | Upload artifacts | Guarda reportes |
| sonarcloud | Checkout | Clona con fetch-depth: 0 |
| sonarcloud | Setup Node | Node.js 20 |
| sonarcloud | Install deps | npm ci |
| sonarcloud | Run tests | Jest con coverage |
| sonarcloud | Scan | SonarSource Scanner |
| sonarcloud | Quality Gate | Verifica gate |

## Quality Gates Conditions

| Métrica | Threshold |
|---------|-----------|
| Bugs | 0 |
| Vulnerabilities | 0 |
| Coverage | >= 80% |
| Duplicated Lines | < 3% |

## Branch Protection

- Require: 1 approval
- Require: SonarCloud Analysis ✓
- Require: Build and Test ✓
- Require: Branch up to date

## Costos

| Recurso | Costo |
|---------|-------|
| GitHub Actions (público) | Gratis (2000 min/mes) |
| SonarCloud (OSS) | Gratis |
| Total | $0 |