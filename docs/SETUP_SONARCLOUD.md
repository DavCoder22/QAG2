# Guía de Configuración SonarCloud

## Requisitos Previos

- Cuenta en [sonarcloud.io](https://sonarcloud.io) (login con GitHub)
- Acceso de admin al repositorio en GitHub

## Paso 1: Importar Proyecto en SonarCloud

1. Ir a [sonarcloud.io](https://sonarcloud.io)
2. Click **Analyze new project** → Select "QAG2" from GitHub
3. Confirmar la importación

## Paso 2: Generar Token de Acceso

1. En SonarCloud: Click en tu avatar → **My Account**
2. Ir a **Security** → **Generate Token**
3. Nombre: `github-actions-qag2`
4. Click **Generate** y copiar el token

## Paso 3: Configurar Secrets en GitHub

Ir a: **Settings → Secrets and variables → Actions**

| Secret | Value |
|--------|-------|
| `SONAR_TOKEN` | Token generado en paso 2 |
| `SONAR_ORGANIZATION` | Tu usuario/organización de SonarCloud |
| `SONAR_PROJECT_KEY` | `QAG2` |

## Paso 4: Verificar Configuración

1. Hacer push de un commit para触发 el análisis
2. Ir a **Actions** → Ver que el workflow corra
3. Ir a SonarCloud → **Projects** → Ver los resultados

## Configuración Adicional

### Para más lenguajes:

```properties
# Python
sonar.python.sourceEncoding=UTF-8

# Java
sonar.java.sourceEncoding=UTF-8

# C#
sonar.rosator.sln.file=YourSolution.sln
```

### Exclusiones personalizadas:

```properties
sonar.exclusions=**/node_modules/**,**/dist/**,**/coverage/**
```

## Troubleshooting

### "Project not found"
- Verificar que `SONAR_PROJECT_KEY` coincide exactamente
- Verificar que el proyecto existe en SonarCloud

### "Token is invalid"
- Regenerar el token en SonarCloud
- Actualizar el secret en GitHub

### "Analysis timeout"
- Aumentar el timeout en el workflow (default: 5 min)
- Verificar que el repositorio es público (para planes gratuitos)