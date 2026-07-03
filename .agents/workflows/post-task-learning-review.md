# Post Task Learning Review

Use este workflow após tarefas grandes ou sessões longas de trabalho.

## Objetivo

Verificar se o usuário forneceu alguma preferência nova durante a tarefa que deva ser salva como memória.

## Quando Ativar

- Após tarefas que envolveram mais de 5 interações.
- Após o usuário fazer correções durante a execução.
- Após criação de projetos novos.
- Quando o usuário encerrar uma sessão longa.

## Passos

1. **Revisar mensagens recentes** da conversa.
2. **Identificar correções persistentes** usando os indicadores de salvamento:
   - "Sempre...", "Nunca...", "Prefiro...", "A partir de agora..."
3. **Ignorar pedidos pontuais** que só valiam para aquela tarefa.
4. **Para cada correção persistente encontrada:**
   a. Classificar via `classify_instruction`.
   b. Se `shouldSave === true` e não foi salva antes, salvar via `save_learning`.
5. **Informar o usuário** discretamente sobre memórias salvas.
6. **Verificar promoção:** se alguma categoria agora tem 5+ regras, sugerir `promote-memory-to-skill`.

## Regras

- Não interromper o fluxo do usuário para fazer a revisão.
- Executar silenciosamente, informar apenas o resultado.
- Não salvar informações que já existem como memória.
- Na dúvida, perguntar ao usuário antes de salvar.
