# Aether Kit (@dsv77/aether-kit)

> **Nota:** Este projeto é um fork aprimorado do [ag-kit](https://github.com/vudovn/ag-kit).

Aether Kit é um conjunto de habilidades, workflows, regras de sistema e memórias configuradas nativamente para potencializar a IDE Antigravity.

Com o Aether Kit, qualquer projeto instantaneamente herda boas práticas de engenharia, checagens de segurança (Security Gatekeeper) e orquestração de subagentes paralelos, eliminando trabalho repetitivo e blindando o seu código.

## Instalação

Você pode instalar o Aether Kit globalmente na sua máquina via NPM:

```bash
npm install -g @dsv77/aether-kit
```

## Configuração e Instalação do MCP (Model Context Protocol)

O Aether Kit vem preparado para integrar ferramentas avançadas através de servidores MCP locais (ex: `antigravity-learning-mcp`). Para instalá-los e configurá-los corretamente:

1. **Instalação das dependências do MCP**:
   Acesse a pasta de servidores MCP embutida no Aether Kit e instale as dependências:
   ```bash
   cd .agents/mcp/antigravity-learning-mcp
   npm install
   ```

2. **Ativando o MCP na sua IDE**:
   Acesse o diretório base das suas configurações globais na IDE Antigravity (geralmente em `~/.gemini/antigravity-ide/mcp/`).
   
3. **Registro do Servidor**:
   Utilize o arquivo `.agents/mcp_config.json` gerado pelo kit como base. Copie os registros que estão nele e cole no arquivo `mcp_config.json` global da sua IDE para habilitar os servidores definitivamente para o contexto do agente.

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
