# Learn From Correction

Use este workflow quando o usuário corrigir uma resposta, código, arquitetura, design ou comportamento do agente.

## Objetivo

Transformar correções persistentes em memórias úteis, sem salvar pedidos pontuais.

## Ativar quando o usuário disser

- "Sempre..."
- "Nunca..."
- "Prefiro..."
- "Não faça assim..."
- "Da próxima vez..."
- "Use isso como padrão..."
- "A partir de agora..."
- "Esse é meu jeito..."
- "Mantenha esse padrão..."
- "Salve isso" / "Lembre disso"
- "Considere isso nas próximas vezes"

## Passos

1. **Extraia a correção principal** da mensagem do usuário.
2. **Classifique** via `classify_instruction` no MCP.
3. Se `shouldSave === false`, **aplique a correção apenas nesta tarefa** e pare.
4. Se `shouldSave === true`:
   a. **Verifique conflitos** via `detect_conflicts`.
   b. Se **não houver conflito**, salve via `save_learning`.
   c. Se **houver conflito**, salve com status `pending-review` e avise o usuário.
5. **Aplique a correção imediatamente** na resposta atual (independente de salvar ou não).
6. **Confirme discretamente** se a memória foi salva.

## Exemplo

**Usuário:** "Não use alert, use modal customizado."

**Classificação:**
```json
{
  "shouldSave": true,
  "category": "frontend",
  "scope": "global",
  "confidence": 0.95
}
```

**Ação:** Salvar memória + aplicar na resposta atual.

## Regras

- Não salve pedidos pontuais ("faça essa tela azul").
- Não salve comentários momentâneos ("hoje estou sem tempo").
- Não salve dados sensíveis sem confirmação explícita.
- Na dúvida, pergunte ao usuário se deve salvar.
