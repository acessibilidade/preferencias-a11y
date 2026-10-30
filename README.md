# Preferências — versão 1.8.2

Ferramenta independente inspirada nos recursos da [demonstração do Fluid Infusion](https://build-infusion.fluidproject.org/demos/prefsFramework/). Não inclui código ou dependências do Infusion. A imagem fornecida orientou o painel lateral sobreposto. Sem build, bibliotecas, fontes remotas, telemetria ou minificação.

## Instalação

Baixe `downloads/preferencias-a11y.zip`, extraia e copie os arquivos, preservando a estrutura:

- `ferramentas/js/preferencias.js`
- `ferramentas/css/preferencias.css`
- `ferramentas/fonts/` (fontes e licenças)
- `ferramentas/img/cursor-yellow.svg`
- `ferramentas/img/cursor-blue.svg`
- `ferramentas/img/cursor-white.svg`
- `ferramentas/img/cursor-black.svg`

Inclua no `head` de cada página ou no template compartilhado:

```html
<script src="/ferramentas/js/preferencias.js" defer></script>
```

Uma linha no HTML; JavaScript, CSS, fontes locais e quatro pequenos SVGs de cursor hospedados. O CSS é resolvido em relação ao endereço do script (inclusive em outro domínio, se a política do site permitir). Em hospedagens em subpastas, ajuste o caminho do script. Prefira hospedar no próprio site. Não precisa de chamada adicional ou inicialização inline. Não renomeie/mova apenas um dos arquivos sem ajustar o caminho no JS.

A demonstração está em `index.html` na raiz deste repositório. Para uso local, inicie um servidor HTTP na raiz do projeto (`python3 -m http.server 8765`) e acesse `http://localhost:8765/`.

## Recursos, na ordem do painel

1. **Aplicar zoom:** Original, 125%, 150%, 175%, 200%, 300% e 400%. Usa CSS zoom no conteúdo e compensação no painel. Não modifica o zoom nativo do navegador; pode produzir rolagem horizontal e não altera os breakpoints das media queries.
2. **Cor e contraste:** preto sobre branco, branco sobre preto, amarelo sobre preto e sépia.
3. **Destacar controles:** contornos e altura mínima nos campos/botões, sublinhado e negrito nos links.
4. **Estilo de texto e fontes:** sistema, Arial, Verdana, Georgia, Atkinson Hyperlegible, Lexend e Open Sans, com checkbox Negrito independente da fonte.
5. **Tamanho do texto:** fonte raiz em 125%, 150%, 175% ou 200% do tamanho padrão do navegador. “Original” devolve o CSS do site. Não representa multiplicação do tamanho personalizado original do site.
6. **Espaçamento entre linhas:** 1,5; 1,75; 2.
7. **Espaçamento entre letras:** 0,05; 0,10; 0,15 em.
8. **Espaçamento entre palavras:** 0,10; 0,20; 0,30 em.
9. **Cor do cursor:** Original, amarelo, azul, branco e preto; altera o ponteiro dentro da página, incluindo o painel, usando SVG de 32 px com contorno contrastante. Não altera a interface do navegador ou o cursor do sistema operacional.

O grupo **exibir mais preferências** começa fechado e pode ser aberto com mouse, Enter ou Espaço. Contém, nesta ordem:

- **Pausar animações:** checkbox para pausar vídeos HTML, animações CSS (incluindo pseudoelementos) e Web Animations existentes. Desativa transições. Ao desmarcar, animações retomam, mas vídeos permanecem pausados até uma ação da pessoa.
- **Desabilitar sons:** checkbox para silenciar elementos HTML audio/video acessíveis no documento. Mantém o estado de mute anterior e o restaura ao desmarcar.

Simplificar foi removido; valores antigos salvos para essa opção são ignorados.

## Interação e dados

O link “exibir preferências” fica fixo no topo à direita, mas é inserido no final do `body`, depois dos controles existentes na ordem de Tab. Elementos adicionados posteriormente pelo site podem alterar essa ordem. O painel é uma região não modal: abrir leva o foco ao título; Fechar ou Escape no painel devolvem o foco ao link. Ao mover o foco para fora, o painel fecha sem deslocar o foco, evitando encobrir a navegação por teclado. Não há captura de Tab ou atalhos globais.

As escolhas são salvas na chave `fm-preferencias-v1` do `localStorage`, por origem (protocolo, domínio e porta). Não são enviadas a servidores. Se o armazenamento não estiver disponível, a ferramenta continua funcionando na página. Restaurar padrão remove os atributos e a chave. Uma inclusão duplicada do script não cria um segundo painel.

## Limites de integração

- Não corrige barreiras de acessibilidade e não certifica conformidade com normas.
- Textos em `px`, estilos muito específicos ou declarações `!important` podem não acompanhar todas as preferências. Use unidades relativas no site. Teste possíveis cortes em componentes com altura fixa.
- Não altera o interior de iframes ou Shadow DOM de terceiros, texto desenhado em canvas ou imagens. Ícones Material Icons e SVG são preservados na troca de fonte; outras fontes de ícones precisam de adaptação específica.
- Os temas trocam cores e removem imagens de fundo: essas imagens não devem ser a única forma de transmitir conteúdo. Imagens HTML, vídeos e SVG permanecem intactos. Pseudoelementos e estilos inline prioritários podem exigir adaptação.
- O painel é isolado via Shadow DOM; o zoom do navegador continua disponível. Seu tamanho visual não acompanha a preferência de tamanho do conteúdo.
- O link fixo pode coincidir com menus do seu site; ajuste `:host .trigger` e `:host .panel` em `css/preferencias.css` conforme a integração. Transformações em `body`/ancestrais podem alterar o posicionamento de elementos fixos.
- CSP: permita a origem dos arquivos em `script-src`, `style-src` e `img-src` (cursores). Não exige `unsafe-inline` ou `eval`. O CSS é usado tanto no documento quanto no painel, normalmente com reaproveitamento de cache pelo navegador.

## Verificação recomendada em cada site

Confira teclado, zoom de navegador, leitor de tela real, todos os temas, restauração, persistência, texto longo, telas de 320 px e combinações de espaçamentos. Verificação automatizada ou inspeção da árvore de acessibilidade não substitui uso com VoiceOver e outras tecnologias assistivas.

## Publicação da demonstração

Consulte `FTP-MANIFEST.txt`. A página inicial do projeto não foi modificada. A demonstração reutiliza a imagem de compartilhamento já existente em `img/ferramentas-share.jpg`; revise a URL absoluta para seu domínio final. Google Analytics existe na página inicial, mas não foi incluído na demonstração nem na ferramenta.

## Ocultar o acionador nesta página (1.1.0)

A opção destacada “não exibir o botão de preferências nessa página” é aplicada ao fechar o painel, inclusive por Escape ou saída do foco. Antes de fechar, é possível desmarcar a opção; Restaurar padrão também desmarca a escolha pendente. Ao fechar ocultando o acionador, o foco vai para o conteúdo principal; ao sair por Tab, a navegação mantém o destino escolhido.

A ocultação usa uma chave `fm-preferencias-hidden-v1:` acrescida do caminho e da query string, por origem. Fragmentos `#` não criam outra página. A escolha persiste após recarregar; outras páginas não são afetadas. Limpar apenas o cache HTTP não apaga essa escolha: é necessário incluir os dados do site (localStorage) na limpeza do navegador. Se o navegador bloquear o armazenamento, a ocultação dura apenas até recarregar. Aplicações que trocam de rota sem recarregar exigem integração específica.

## Limites dos novos controles

Não é possível prometer controle sobre todos os sons e movimentos de qualquer site. Iframes, componentes Shadow DOM isolados, Web Audio, fala sintetizada, GIF/APNG/WebP animados, SVG animado por SMIL, canvas e animações implementadas em loops JavaScript precisam de integração própria. Web Animations criadas posteriormente por scripts sem mudança no DOM podem não ser capturadas; desative e reative a opção. Nenhum protótipo global ou API nativa é sobrescrito.

Um MutationObserver de adição de elementos opera apenas enquanto silenciar ou pausar está ativo; percorre os novos ramos para encontrar mídia, sem varredura contínua por temporizador. Eventos de play/volumechange impedem a retomada comum de vídeos e som enquanto selecionados. A aplicação ocorre por eventos e não é um bloqueio de áudio em nível de sistema. Ao restaurar, o observador é desconectado e os estados anteriores de mute são restaurados. Os SVGs são carregados conforme a seleção do cursor.

A pasta `testes/` contém uma página de verificação manual, CSS, JS e uma mídia WAV silenciosa usada tanto em audio quanto em video; é somente de desenvolvimento e não deve ser publicada. Ela permite testar reprodução, novas mídias, tentativas de reativação e ler os estados reais das animações/mídias.

## Painel compacto (1.4.0)

Os nove grupos principais começam recolhidos e revelam os controles ao selecionar seu título. Só um grupo fica aberto por vez, incluindo “exibir mais preferências”. Recolher um grupo não desfaz suas escolhas. Enter e Espaço operam os títulos nativos de details/summary; os controles internos recolhidos saem da ordem de Tab.

O painel tem altura máxima de 640 px, limitada também pela altura disponível da tela. O cabeçalho e Fechar ficam fora da área de rolagem. Somente o conteúdo interno rola; a barra tem espaço reservado e não encosta nos cantos superiores arredondados. Telas pequenas continuam permitindo rolar até o rodapé, sem ocultar a barra.

## Exibir todas as preferências (1.5.0)

O checkbox no topo começa desmarcado. Marcar abre os nove grupos e “exibir mais preferências”, permitindo múltiplos grupos abertos. Desmarcar recolhe todos e restaura a abertura exclusiva. Se um grupo for fechado individualmente nesse modo, o checkbox indica estado misto. Desmarcá-lo recolhe todos. Restaurar padrão também recolhe os grupos. A expansão é apenas visual e não é salva entre carregamentos.

## Crédito do projeto (1.7.2)

Rodapé com link para https://github.com/acessibilidade/preferencias-a11y em nova aba, aviso textual para leitores de tela e ícone Material Icons open_in_new em SVG local embutido, sem carregar fonte ou serviço externo.

## Créditos da demonstração

Personagens: Open Peeps, Pablo Stanley, CC0 — https://www.openpeeps.com/. Ícone open_in_new: Google Material Icons, Apache 2.0. Fontes: Google Fonts, SIL Open Font License; licenças em `fonts/`.

## Rótulos de valores originais (1.7.2)

Tamanho do texto e zoom exibem `Original (100%)`, indicando a apresentação original, sem ajuste aplicado pela ferramenta. Espaçamentos, fonte, cores e cursor mantêm `Original`: o estilo original pode variar entre elementos e sites, portanto não há um valor numérico único a informar.

## Botão compacto (1.7.2)

A opção “exibir ícone pequeno da ferramenta” substitui o texto do botão pelo Material Symbol `accessible_menu`, do Google, incorporado como SVG no JavaScript. Mantém área de 44 × 44 px e nome acessível. A escolha é salva por página, pode ser desmarcada e é removida por Restaurar padrão. Ocultar o botão continua tendo prioridade. Fonte do ícone: https://github.com/google/material-design-icons/blob/master/symbols/web/accessible_menu/materialsymbolsoutlined/accessible_menu_24px.svg (Apache 2.0).

## Estrutura do repositório

O site está na raiz do repositório preferencias-a11y. O ZIP de distribuição mantém a pasta `ferramentas/` para instalação em outros sites. A página provisória index.htm foi preservada apenas no backup local, fora do controle de versão.

## Camada flutuante (1.8.0)

A opção “deixar esta camada flutuante”, acima de “exibir todas as preferências”, permite arrastar o painel pelo botão Mover painel com mouse ou toque. Com foco nesse botão, as setas do teclado movem o painel; os quatro botões de direção oferecem a mesma ação por clique ou toque, sem arrastar. O painel permanece nos limites visíveis e se ajusta ao redimensionar a tela. Desmarcar ou Restaurar padrão devolve a posição original. Esta escolha e a posição duram apenas até recarregar a página; fechar e reabrir mantém a posição durante a sessão da página.

## Anúncios de movimento (1.8.2)

Mover painel tem descrição acessível com instruções e posição aproximada em nove regiões da área disponível. Movimentos por teclado ou botões anunciam direção e posição em uma região de status educada; repetições rápidas são agrupadas. Arrastar anuncia o resultado ao soltar, sem anunciar cada pixel. Nos limites, informa que não houve movimento. A descrição de posição é atualizada ao mover, redimensionar e receber foco. A fala final depende do leitor de tela e de suas configurações; validar também com tecnologia assistiva real.
