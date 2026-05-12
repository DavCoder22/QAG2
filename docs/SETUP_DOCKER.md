# Setup SonarQube con Docker

## Requisitos Previos

- Docker >= 20.x
- Docker Compose >= 2.x
- 4GB RAM mínimo (recomendado 8GB)

## Levantar SonarQube

### Paso 1: Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus valores si es necesario.

### Paso 2: Iniciar SonarQube

```bash
docker-compose up -d
```

### Paso 3: Acceder a SonarQube

- URL: http://localhost:9000
- Usuario: admin
- Password: admin

**Nota**: La primera vez te pedirá cambiar el password.

## Configurar GitHub Actions

### Secrets requeridos

En GitHub: **Settings → Secrets and variables → Actions**

| Secret | Value |
|--------|-------|
| `SONAR_TOKEN` | Token generado en SonarQube |
| `SONAR_HOST_URL` | URL pública de tu SonarQube |
| `SONAR_PROJECT_KEY` | QAG2 |

### Generar Token

1. Ve a SonarQube: **Administration → Security → Users**
2. Click en tu usuario → **Tokens**
3. Generate new token: `github-actions`
4. Copia el token y guárdalo

### URL pública para GitHub Actions

Si ejecutas GitHub Actions (público), tu SonarQube debe ser accesible públicamente. Opciones:

1. **ngrok**: expose local SonarQube to internet
2. **Cloudflare Tunnel**: expose local services
3. **Deploy to cloud**: AWS/Azure/GCP con IP pública

```bash
# Ejemplo con ngrok
ngrok http 9000
# Te dará una URL como: https://abc123.ngrok.io
# Usa esa URL como SONAR_HOST_URL
```

## Comandos útiles

```bash
# Ver logs
docker-compose logs -f sonarqube

# Stop
docker-compose down

# Stop + eliminar datos
docker-compose down -v

# Reiniciar
docker-compose restart
```

## Troubleshooting

### "Connection refused"
- Verificar que SonarQube esté corriendo: `docker ps`
- Verificar puerto 9000: `curl http://localhost:9000`

### "Token inválido"
- Regenerar token en SonarQube
- Verificar que el token tenga permisos correctos

### "Timeout en GitHub Actions"
- Aumentar timeout en el workflow
- Verificar que la URL de SonarQube es accesible públicamente