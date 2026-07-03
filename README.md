# Aether Kit (@dsv77/aether-kit)

> **Nota:** Este projeto é um fork aprimorado do [ag-kit](https://github.com/vudovn/ag-kit).

Aether Kit é um conjunto de habilidades, workflows, regras de sistema e memórias configuradas nativamente para potencializar a IDE Antigravity.

Com o Aether Kit, qualquer projeto instantaneamente herda boas práticas de engenharia, checagens de segurança (Security Gatekeeper) e orquestração de subagentes paralelos, eliminando trabalho repetitivo e blindando o seu código.

## Instalação

Você pode instalar o Aether Kit globalmente na sua máquina via NPM:

```bash
npm install -g @dsv77/aether-kit
```

## Configuração do MCP (Model Context Protocol)

O Aether Kit vem preparado para integrar ferramentas avançadas através de servidores MCP (ex: `antigravity-learning-mcp`). Para configurar:

1. Acesse o diretório base das suas configurações na IDE Antigravity (geralmente `~/.gemini/antigravity-ide/mcp/`).
2. Utilize o arquivo `.agents/mcp_config.json` gerado pelo kit como base para registrar novos servidores.
3. Se houver servidores locais na pasta `.agents/mcp/` do projeto, lembre-se de rodar `npm install` dentro das respectivas pastas para instalar as dependências.

## Como Usar

Na raiz de qualquer projeto (seja novo ou existente), rode o comando:

```bash
aether-kit init
```

Esse comando irá instanciar a pasta `.agents` diretamente no seu projeto. A partir do momento que a pasta for criada, a IDE Antigravity (e o seu assistente AI) irá detectá-la automaticamente e ativar todas as configurações nativas, incluindo:

- **Security Gatekeeper:** Validação estática de vulnerabilidades e chaves de API antes de `commit` e `push`.
- **Workflows:** Comandos slash avançados (`/brainstorm`, `/deploy`, `/orchestrate`, etc).
- **Design Patterns e Regras:** Padrões arquiteturais pré-determinados injetados no contexto.

Se a pasta `.agents` já existir no seu projeto, o CLI irá perguntar se você deseja mesclar/sobrescrever os arquivos, mantendo o ambiente sempre seguro de acidentes.

---
🚀 *Elevando o nível do desenvolvimento agentico.*
