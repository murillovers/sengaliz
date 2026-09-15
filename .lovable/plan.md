# Loja Sengaliz e sacola pelo WhatsApp

## Objetivo
Transformar o catálogo em uma loja exclusiva da Sengaliz, remover conteúdos fictícios e disponibilizar uma sacola funcional.

## Alterações
- Padronizar todos os produtos como Sengaliz e retirar a marca redundante dos cards.
- Remover a página e todos os links de “Marcas”, além das seções de marcas parceiras e depoimentos da página inicial.
- Atualizar o e-mail, vincular o Instagram oficial e retirar o Facebook do rodapé.
- Criar uma sacola compartilhada entre páginas, preservada no navegador, com quantidade, remoção e total.
- Fazer o botão de compra exigir um tamanho e adicionar o produto escolhido à sacola.
- Abrir a sacola em painel lateral pelo cabeçalho e finalizar com um resumo formatado no WhatsApp da Sengaliz.
- Atualizar textos de apresentação que ainda descrevem a Sengaliz como marketplace ou multimarcas, sem alterar fotos ou cores.

## Detalhes técnicos
- Usar Context API do React para o estado da sacola e `localStorage` somente após a página carregar, evitando diferenças entre servidor e navegador.
- Manter o painel acessível, com fechamento por botão, fundo externo e tecla Escape.
- Excluir a rota `/marcas` e não criar substituta.
- Validar a página inicial, um produto e o fluxo completo da sacola em computador e celular.
