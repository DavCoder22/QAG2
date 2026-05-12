# QAG2 - Quality Assurance & Governance

[![Build & Test](https://github.com/DavCoder22/QAG2/actions/workflows/build.yml/badge.svg)](https://github.com/DavCoder22/QAG2/actions/workflows/build.yml)

> Pipeline de QA automatizado con GitHub Actions y SonarQube (self-hosted) para análisis de código y validación de Pull Requests.

## Arquitectura

```mermaid
flowchart TD
    classDef developer fill:#f9f,stroke:#333,stroke-width:2px;
    classDef repo fill:#e6f3ff,stroke:#333;
    classDef orchestration fill:#98fb98,stroke:#333;
    classDef sonarqube fill:#90ee90,stroke:#333;
    classDef quality fill:#ffd700,stroke:#333;

    A[Developer]:::developer
    B[GitHub Repository]:::repo
    C[GitHub Actions]:::orchestration
    D[SonarQube Docker]:::sonarqube
    E[Quality Gate]:::quality

    A -->|Push/PR| B
    B -->|Trigger| C
    C -->|Analysis| D
    D -->|Valida| E
    E -->|Bloquea/Permite| B
```

## Tech Stack

| Componente | Tecnología |
|------------|------------|
| CI/CD | GitHub Actions |
| Análisis de Código | SonarQube (Docker self-hosted) |
| Quality Gates | Sonar Way (default) |

## Primeros Pasos

### Levantar SonarQube con Docker

```bash
# Iniciar SonarQube
docker-compose up -d

# Acceder: http://localhost:9000
# Login: admin / admin
```

### Secrets de GitHub Actions

| Secret | Value |
|--------|-------|
| `SONAR_TOKEN` | Token de SonarQube |
| `SONAR_HOST_URL` | URL de SonarQube |
| `SONAR_PROJECT_KEY` | QAG2 |

## Quality Gates

El pipeline incluye validación automática de Quality Gates:

- **Bugs**: 0 permitidos en código nuevo
- **Vulnerabilidades**: 0 permitidas
- **Coverage**: >= 80%
- **Duplicación**: < 3%

Ver [Quality Gates](docs/QUALITY_GATES.md) para más detalles.

## Pipeline de CI/CD

- **build.yml**: Compilación y tests
- **sonarqube-selfhosted.yml**: Análisis con SonarQube + Quality Gate

## Licencia

MIT