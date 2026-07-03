# Aether Kit (@dsv77/aether-kit)

Aether Kit é um conjunto de habilidades, workflows, regras de sistema e memórias configuradas nativamente para potencializar a IDE Antigravity.

Com o Aether Kit, qualquer projeto instantaneamente herda boas práticas de engenharia, checagens de segurança (Security Gatekeeper) e orquestração de subagentes paralelos, eliminando trabalho repetitivo e blindando o seu código.

## Instalação

Você pode instalar o Aether Kit globalmente na sua máquina via NPM:

```bash
npm install -g @dsv77/aether-kit
```

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
