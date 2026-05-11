# QAG2 - Quality Assurance & Governance

[![Build & Test](https://github.com/DavCoder22/QAG2/actions/workflows/build.yml/badge.svg)](https://github.com/DavCoder22/QAG2/actions/workflows/build.yml)
[![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=QAG2&metric=alert_status)](https://sonarcloud.io/dashboard?id=QAG2)

> Pipeline de QA automatizado con GitHub Actions y SonarCloud para análisis de código y validación de Pull Requests.

## Descripción

Este proyecto implementa un pipeline de CI/CD robusto para garantizar la calidad del código a través de:
- Integración continua con GitHub Actions
- Análisis estático de código con SonarCloud
- Quality Gates para validación automática de PRs
- Cobertura de código automatizada

## Tech Stack

| Componente | Tecnología |
|------------|------------|
| CI/CD | GitHub Actions |
| Análisis de Código | SonarCloud |
| Lenguaje | Node.js/JavaScript |
| Testing | Jest |

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

## Contribuir

1. Crear branch desde `develop`: `git checkout -b feature/tu-feature`
2. Hacer cambios y agregar tests
3. Crear Pull Request hacia `develop`
4. Esperar validación del Quality Gate

## Licencia

MIT License - voir [LICENSE](LICENSE) para más detalles.