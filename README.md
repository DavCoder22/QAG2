# QAG2 - Quality Assurance & Governance

[![Build & Test](https://github.com/DavCoder22/QAG2/actions/workflows/build.yml/badge.svg)](https://github.com/DavCoder22/QAG2/actions/workflows/build.yml)
[![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=QAG2&metric=alert_status)](https://sonarcloud.io/dashboard?id=QAG2)

> Framework QA Open Source con SonarQube como analizador de código y GitHub Actions como orquestador de CI/CD.

## Arquitectura del Pipeline

```mermaid
flowchart TD
    %% --- Estilos ---
    classDef developer fill:#f9f,stroke:#333,stroke-width:2px;
    classDef repo fill:#e6f3ff,stroke:#333;
    classDef orchestration fill:#98fb98,stroke:#333;
    classDef analysis fill:#90ee90,stroke:#333;
    classDef testing fill:#add8e6,stroke:#333;
    classDef security fill:#ffa07a,stroke:#333;
    classDef reporting fill:#f5deb3,stroke:#333;
    classDef visualization fill:#ffe4b5,stroke:#333;

    %% --- Nodos ---
    A[Developer]:::developer
    B[GitHub\nRepository]:::repo
    C[GitHub Actions\nOrquestador CI/CD]:::orchestration
    D[SonarQube\nAnálisis Estático\n- Calidad de Código\n- Cobertura\n- Vulnerabilidades]:::analysis
    E[PyTest\nUnit Tests\nPython]:::testing
    F[Cypress\nE2E Tests\nFrontend]:::testing
    G[Jest\nUnit Tests\nJavaScript]:::testing
    H[Trivy\nAnálisis de\nSeguridad\n- Contenedores\n- Dependencias]:::security
    I[Allure\nReportes de Pruebas\n- Dashboards\n- Historial]:::reporting
    J[Grafana\nVisualización\n- Métricas QA\n- Tendencias]:::reporting

    %% --- Conexiones ---
    A -->|1. Push/PR| B
    B -->|2. Trigger Pipeline| C
    C -->|3. Valida Calidad| D
    C -->|4. Ejecuta| E
    C -->|4. Ejecuta| F
    C -->|4. Ejecuta| G
    C -->|4. Ejecuta| H
    D -->|5. Reporte de Cobertura| I
    E -->|5. Reporte de Pruebas| I
    F -->|5. Reporte de Pruebas| I
    G -->|5. Reporte de Pruebas| I
    H -->|5. Reporte de Seguridad| I
    I -->|6. Métricas| J
```

## Descripción

Framework QA Open Source que implementa un pipeline de CI/CD robusto para garantizar la calidad del código a través de:

- **Orquestación**: GitHub Actions como motor de CI/CD
- **Análisis Estático**: SonarQube/SonarCloud para calidad de código, cobertura y vulnerabilidades
- **Testing**: PyTest (Python), Jest (JavaScript), Cypress (E2E)
- **Security**: Trivy para análisis de contenedores y dependencias
- **Reporting**: Allure para reportes de pruebas y Grafana para visualización de métricas
- **Quality Gates**: Validación automática de PRs antes del merge

## Tech Stack

| Categoria | Tecnología | Descripción |
|-----------|------------|-------------|
| Orquestador | GitHub Actions | Pipeline CI/CD |
| Análisis de Código | SonarCloud | Calidad, cobertura, vulnerabilidades |
| Testing JS | Jest | Unit tests JavaScript |
| Testing Python | PyTest | Unit tests Python |
| E2E Testing | Cypress | Pruebas end-to-end |
| Seguridad | Trivy | Análisis de contenedores y deps |
| Reportes | Allure | Dashboards de pruebas |
| Visualización | Grafana | Métricas y tendencias |

## Primeros Pasos

### Requisitos Previos
- Node.js >= 18.x
- npm >= 9.x

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/DavCoder22/QAG2.git
cd QAG2

# Instalar dependencias
npm install

# Ejecutar tests
npm test
```

## Pipeline de CI/CD

El pipeline se ejecuta automáticamente en:
- Push a `main` o `develop`
- Pull Requests hacia `main`

### Jobs del Pipeline

1. **Build** - Compilación del proyecto
2. **Test** - Ejecución de pruebas unitarias
3. **SonarCloud Analysis** - Análisis estático de código
4. **Quality Gate** - Validación de estándares de calidad

## Configuración

### Secrets de GitHub Actions

| Secret | Descripción |
|--------|-------------|
| `SONAR_TOKEN` | Token de autenticación de SonarCloud |
| `SONAR_ORGANIZATION` | Organización en SonarCloud |

### Calidad de Código

- **Coverage mínimo**: 80%
- **Duplicación máxima**: 3%
- **Bugs/Vulnerabilidades**: 0 permitidas en código nuevo

## Branch Protection Rules

Para garantizar que solo código de calidad se fusiona a `main`:

1. **Settings → Branches → Branch protection rules**
2. Crear regla para `main`:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass (incluir "SonarCloud Analysis")
   - ✅ Require branches to be up to date
   - ✅ Include administrators

## Documentación Adicional

- [Setup SonarCloud](docs/SETUP_SONARCLOUD.md) - Configuración paso a paso
- [Quality Gates](docs/QUALITY_GATES.md) - Definición de métricas
- [Arquitectura del Pipeline](docs/PIPELINE.md) - Diagramas y detalles
- [Branch Protection](docs/SETUP_BRANCH_PROTECTION.md) - Configuración de reglas

## Contribuir

1. Crear branch desde `develop`: `git checkout -b feature/tu-feature`
2. Hacer cambios y agregar tests
3. Crear Pull Request hacia `develop`
4. Esperar validación del Quality Gate
5. Obtener al menos 1 aprobación

## Licencia

MIT License - voir [LICENSE](LICENSE) para más detalles.