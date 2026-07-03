# Memory Maintenance

Use este workflow periodicamente para manter os arquivos de memória organizados e saudáveis.

## Objetivo

Limpar, deduplicar e atualizar o índice de memórias para manter a qualidade do sistema ao longo do tempo.

## Quando Executar

- Quando o total de memórias ultrapassar 50 regras.
- Quando o usuário pedir organização das memórias.
- Quando houver suspeita de duplicatas ou conflitos acumulados.
- A cada 30 dias de uso ativo (recomendado).

## Passos

1. **Resumir** memórias via `summarize_memory` para visão geral.
2. **Identificar duplicatas** (regras com textos muito similares na mesma categoria).
3. **Identificar conflitos** via `detect_conflicts` entre regras ativas.
4. **Identificar regras fracas** (confidence < 0.60 e status `active`).
5. **Propor ações** ao usuário:
   - Mesclar duplicatas.
   - Resolver conflitos (manter uma, deprecar outra).
   - Revisar regras fracas (confirmar ou remover).
   - Promover categorias consolidadas para Skills.
6. **Executar ações aprovadas** pelo usuário.
7. **Atualizar** `rules-index.yml` com contagens atuais.
8. **Registrar** eventos de manutenção no log.

## Regras

- Nunca deletar memórias sem aprovação do usuário.
- Sempre usar soft-delete (status → `inactive`) por padrão.
- Preservar auditabilidade em todas as operações.
- Informar o usuário sobre o resultado da manutenção.
