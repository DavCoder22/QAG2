# Aplicar Branch Protection Rules

## Opción 1: GitHub CLI (recomendado)

Si tienes `gh` instalado:

```bash
# Requires GitHub CLI
gh api repos/DavCoder22/QAG2/protection --method PUT \
  -H "Accept: application/vnd.github+json" \
  -f 'enforce_admins=false' \
  -f 'required_status_checks[strict]=true' \
  -f 'required_status_checks[checks][][context]=SonarCloud Analysis' \
  -f 'required_status_checks[checks][][context]=Build and Test' \
  -f 'required_pull_request_reviews[dismiss_stale_reviews]=true' \
  -f 'required_pull_request_reviews[require_code_owner_reviews]=true' \
  -f 'required_pull_request_reviews[required_approving_review_count]=1'
```

## Opción 2: PowerShell Script

```powershell
gh api repos/DavCoder22/QAG2/protection/main --method PUT `
  -H "Accept: application/vnd.github+json" `
  -f 'enforce_admins=true' `
  -f 'required_status_checks[strict]=true' `
  -f 'required_status_checks[checks][0][context]=SonarCloud Analysis' `
  -f 'required_status_checks[checks][1][context]=Build and Test' `
  -f 'required_pull_request_reviews[dismiss_stale_reviews]=true' `
  -f 'required_pull_request_reviews[require_code_owner_reviews]=true' `
  -f 'required_pull_request_reviews[required_approving_review_count]=1' `
  -f 'allow_force_pushes=false' `
  -f 'allow_deletions=false'
```

## Opción 3: Manual

1. Ir a: https://github.com/DavCoder22/QAG2/settings/branches
2. Click **Add rule**
3. Ingresar: `main`
4. Configurar como se indica en el JSON

## Parámetros del JSON

| Campo | Valor | Descripción |
|-------|-------|-------------|
| `enforce_admins` | `true` | Aplicar reglas también a admins |
| `required_status_checks.strict` | `true` | Branch debe estar actualizado |
| `required_status_checks.checks` | SonarCloud, Build | Status checks requeridos |
| `require_code_owner_reviews` | `true` | Requiere review de owner |
| `required_approving_review_count` | `1` | Mínimo 1 aprobación |
| `allow_force_pushes` | `false` | No permitir force push |
| `allow_deletions` | `false` | No permitir eliminar branch |

---

## Notas

- Antes de aplicar, verifica que los workflows estén corriendo correctamente
- Los status checks deben pasar primero antes de que puedas agregarlos como requeridos
- Puedes modificar los valores según las necesidades del equipo