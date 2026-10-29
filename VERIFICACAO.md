# Verificação da versão 1.0.0

Data: 28/10/2026. Demonstração local servida por HTTP e consultada no navegador integrado.

- Os oito controles apareceram na ordem solicitada, com rótulos em português.
- Combinação verificada: texto 150%, linhas 1,75, letras 0,10 em, palavras 0,20 em, destaque ativo, Verdana, branco sobre preto e simplificação ativa.
- Estilos computados no texto de teste: 22,32 px, linha 39,06 px, letras 2,232 px, palavras 4,464 px, Verdana, texto branco e fundo rgb(17,17,17).
- Simplificar ocultou cabeçalho/rodapé externos e preservou o conteúdo principal.
- Após recarregar, tema e simplificação continuaram aplicados.
- Restaurar padrão removeu todos os atributos de preferências da raiz e reexibiu o cabeçalho.
- Escape no painel fechou a região e retornou o foco ao link.
- Tab após Restaurar padrão levou ao próximo link da página e fechou o painel sem devolver o foco.
- Testada largura de 320 px com texto em 200%: painel contido na área útil (esquerda 12 px, direita 293 px); documento sem transbordamento horizontal (305 px úteis e scrollWidth 305 px).
- Inspeção visual em tela larga e estreita; painel com rolagem interna para alcançar todos os controles.
- Sintaxe JavaScript validada com `node --check`.

Não foram executados testes reais com VoiceOver, outros leitores de tela, vários navegadores ou sites terceiros. Não há certificação de acessibilidade ou promessa de compatibilidade universal. O desempenho medido aqui é apenas o tamanho dos arquivos; não foi realizado benchmark de métricas de navegação.

## Atualização 1.1.0

- Tab a partir de “Voltar ao início” alcançou o acionador; Enter abriu o painel.
- Acionador inserido como último elemento do body, com tabindex 0.
- Marcar a ocultação manteve o acionador visível enquanto o painel estava aberto.
- Escape ocultou o acionador e transferiu o foco para main; recarregar manteve a ocultação.
- Outro endereço da demonstração permaneceu com o acionador disponível.
- Restaurar padrão desmarcou a ocultação pendente.
- Em 320 px, a nova opção ficou dentro do painel, sem transbordamento horizontal.
- Título “Preferências”, frase solicitada e versão 1.1.0 conferidos na árvore de acessibilidade e na captura visual.
- Sintaxe JavaScript validada. Não foi realizado teste com leitor de tela real.

## Atualização 1.2.0

- Simplificar removido; títulos Estilo de texto e fontes e Cores e contraste conferidos.
- Negrito aplicado ao conteúdo (font-weight computado 700); escolha independente da fonte.
- Zoom: 125%, 150%, 175%, 200%, 300% e 400% conferidos via estilo computado. Painel permaneceu com 370 px em tela larga.
- Em viewport de 320 px e zoom 400%, painel entre 12 e 293 px, sem transbordamento horizontal interno. O conteúdo ampliado pode ter rolagem horizontal.
- Cursor amarelo e azul selecionados, URL local conferida no CSS computado. SVGs locais validados como XML.
- Cenário manual em testes/: áudio e elemento video com WAV silencioso inicialmente em reprodução; CSS Animation e Web Animation em running.
- Com as opções ativas: mídia HTML silenciada, elementos video pausados e ambas as animações em paused. Novos elementos video e tentativas de desmutar/reproduzir também foram contidos.
- Restaurar padrão devolveu mute ao valor anterior e animações a running; vídeos continuaram pausados.
- Modo de leitura exibido desabilitado com explicação da restrição da plataforma. Não foi acionado o leitor nativo.
- Sintaxe JS e ausência de CSS/JS inline no HTML conferidas. Nenhum erro de execução registrado na demonstração.
- Limites: teste de vídeo usa elemento video reproduzindo WAV silencioso, sem validação de codecs visuais; não foram testados players externos ou tecnologias assistivas reais.

## Atualização 1.3.0

- Título da aba, metadados sociais e marca no cabeçalho/rodapé atualizados para Preferências de acessibilidade.
- Nove grupos principais conferidos no DOM na ordem solicitada; Negrito permanece dentro de Estilo de texto e fontes.
- Grupo exibir mais preferências inicia fechado. Enter abriu e Espaço fechou o details nativo; controles recolhidos desapareceram da árvore de acessibilidade.
- Dentro do grupo: Modo de leitura, Pausar animações, Desabilitar sons, nessa ordem.
- Em 320 px, grupo aberto sem transbordamento horizontal no painel.
- Sintaxe JavaScript validada; funcionalidades de mídia preservadas sem alterações nesta versão.

## Atualização 1.4.0

- Todos os grupos iniciaram fechados; Enter e Espaço alternaram a expansão.
- Abrir Cor e contraste recolheu Aplicar zoom; a seleção 125% permaneceu aplicada.
- Cabeçalho fora da rolagem; painel limitado a 640 px em tela larga.
- Em 320 × 640 px, painel de 560 px, sem overflow horizontal interno. Após rolar 742 px até os controles adicionais, cabeçalho permaneceu no topo (69 px).
- Opção adicional selecionável e restauração funcional; captura da apresentação recolhida conferida.

## Atualização 1.5.0

- Checkbox “exibir todas as preferências” no topo, desmarcado inicialmente.
- Espaço marcou e abriu os dez grupos; Espaço novamente recolheu todos.
- Após recolher, abrir dois grupos sucessivamente manteve somente o último aberto.
- Captura visual e sintaxe JavaScript verificadas.

## Atualização 1.5.1

- Fundo de exibir todas as preferências confirmado transparente no estilo computado.
- Texto configure do seu jeito acima do título conferido.
- Crédito abaixo da versão, ícone SVG decorativo e link com target _blank e rel noopener noreferrer conferidos.
- Tab alcançou o link com nome acessível “código aberto (abre em uma nova aba)”. Não foi realizado teste com leitor de tela real.
