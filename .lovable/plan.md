# Assistente de produtos Sengaliz

## Objetivo
Adicionar uma área de perguntas e respostas sobre os produtos Sengaliz, com uma única conversa por cliente, histórico salvo na Lovable Cloud e respostas geradas por IA com base exclusiva no catálogo atual.

## Experiência do cliente
- Criar a página **Consultora Sengaliz** e adicioná-la à navegação principal.
- Exibir uma conversa única, sem lista de atendimentos ou múltiplos tópicos.
- Manter o campo de pergunta sempre pronto para digitação e mostrar a resposta enquanto ela é gerada.
- Oferecer sugestões iniciais relacionadas a tecidos, linhas, ocasiões e comparação de peças.
- Mostrar falhas reais do serviço de IA de forma clara, preservando a pergunta para nova tentativa.
- Solicitar entrada ou criação de conta antes de salvar e continuar o histórico em outros dispositivos.

## Respostas baseadas no catálogo
- Enviar ao modelo somente os dados públicos do catálogo Sengaliz: nome, linha, categoria, ocasião, descrição e preço.
- Orientar a consultora a não inventar estoque, medidas, prazos, composição ou políticas ausentes no catálogo.
- Incluir links para as páginas dos produtos citados quando forem relevantes.
- Usar streaming pelo AI Gateway com raciocínio habilitado e manter a chave exclusivamente no servidor.

## Histórico na Lovable Cloud
- Criar uma tabela de mensagens vinculada ao cliente autenticado, com políticas que permitam acesso somente ao próprio histórico.
- Salvar mensagens do cliente e respostas concluídas da consultora na mesma conversa única.
- Restaurar o histórico ao abrir ou atualizar a página.
- Permitir limpar a conversa com confirmação, sem criar uma lista de conversas.

## Interface
- Usar os componentes oficiais AI Elements para conversa, mensagens, resposta formatada, estado de processamento e campo de envio.
- Manter a identidade visual existente da Sengaliz, com respostas da consultora sem balão colorido e perguntas do cliente em contraste alto.
- Usar o emblema transparente atual como identidade da consultora, sem alterar logos, fotos, hero ou paleta.
- Adaptar e validar a experiência em computador e celular.

## Validação
- Testar autenticação, envio de pergunta, resposta baseada em produto, persistência após recarregar e limpeza do histórico.
- Confirmar que as mensagens ficam isoladas por cliente.
- Executar uma chamada real ao AI Gateway e verificar os estados de carregamento, erro e créditos insuficientes.
- Conferir metadados próprios da nova página, build, lint e fluxo visual completo.
