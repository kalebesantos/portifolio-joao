# Portfolio

## Configuração do Vercel

Para que a funcionalidade de administração funcione corretamente, você precisa configurar um token do GitHub no Vercel:

1. Vá para [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Crie um novo token com as seguintes permissões:
   - `repo` (para acessar repositórios privados)
3. No painel do Vercel, vá para seu projeto
4. Vá para Settings > Environment Variables
5. Adicione uma variável de ambiente:
   - Name: `GITHUB_TOKEN`
   - Value: seu token do GitHub
6. Reimplante o projeto

## Desenvolvimento Local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

O projeto é automaticamente implantado no Vercel quando você faz push para a branch main.