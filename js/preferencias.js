/* Preferências 1.8.2 — implementação independente, sem dependências. */
(() => {
  'use strict';
  const script = document.currentScript;
  const cssURL = new URL('../css/preferencias.css?v=1.8.2', script.src).href;
  const key = 'fm-preferencias-v1';
  const visibilityKey = `fm-preferencias-hidden-v1:${location.pathname}${location.search}`;
  const compactKey = `fm-preferencias-compact-v1:${location.pathname}${location.search}`;
  const options = {
    size: ['original', '125', '150', '175', '200'],
    line: ['original', '150', '175', '200'],
    letter: ['original', '005', '010', '015'],
    word: ['original', '010', '020', '030'],
    inputs: ['original', 'on'],
    font: ['original', 'system', 'serif', 'arial', 'atkinson', 'lexend', 'open-sans', 'verdana'],
    contrast: ['original', 'light', 'dark', 'yellow', 'sepia'],
    bold: ['original', 'on'],
    zoom: ['original', '125', '150', '175', '200', '300', '400'],
    mute: ['original', 'on'],
    motion: ['original', 'on'],
    cursor: ['original', 'yellow', 'blue', 'white', 'black']
  };
  function init() {
    if (document.getElementById('fm-preferences')) return;
    const root = document.documentElement;
    const host = document.createElement('div');
    host.id = 'fm-preferences';
    const shadow = host.attachShadow({ mode: 'open' });
    const sheet = document.createElement('link');
    sheet.rel = 'stylesheet';
    sheet.href = cssURL;
    document.head.append(sheet);
    const panelSheet = sheet.cloneNode();
    shadow.append(panelSheet);
    const labels = {
      size: ['Tamanho do texto', ['Original (100%)', '125%', '150%', '175%', '200%']],
      line: ['Espaçamento entre linhas', ['Original', '1,5', '1,75', '2']],
      letter: ['Espaçamento entre letras', ['Original', '0,05 em', '0,10 em', '0,15 em']],
      word: ['Espaçamento entre palavras', ['Original', '0,10 em', '0,20 em', '0,30 em']],
      inputs: ['Destacar controles', ['Desativado', 'Ativado']],
      font: ['Estilo de texto e fontes', ['Original', 'Fonte do sistema', 'Com serifa', 'Arial', 'Atkinson', 'Lexend', 'Open Sans', 'Verdana']],
      contrast: ['Cor e contraste', ['Original', 'Preto sobre branco', 'Branco sobre preto', 'Amarelo sobre preto', 'Sépia']],
      bold: ['Negrito', []],
      zoom: ['Aplicar zoom', ['Original (100%)', '125%', '150%', '175%', '200%', '300%', '400%']],
      mute: ['Desabilitar sons', []],
      motion: ['Pausar animações', []],
      cursor: ['Cor do cursor', ['Original', 'Amarelo', 'Azul', 'Branco', 'Preto']]
    };
    const container = document.createElement('div');
    container.innerHTML = `
      <a class="trigger" href="#fm-panel" tabindex="0" aria-controls="fm-panel" aria-expanded="false"><span class="trigger-label">exibir preferências</span><svg class="trigger-icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-720q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720ZM360-120v-480q-68-6-127-16t-113-24l20-80q75 20 159 30t181 10q97 0 181-10t159-30l20 80q-54 14-113 24t-127 16v480h-80v-240h-80v240h-80Zm440-320q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440Zm0 160q-17 0-28.5-11.5T760-320q0-17 11.5-28.5T800-360q17 0 28.5 11.5T840-320q0 17-11.5 28.5T800-280Zm0 160q-17 0-28.5-11.5T760-160q0-17 11.5-28.5T800-200q17 0 28.5 11.5T840-160q0 17-11.5 28.5T800-120Z"/></svg><span class="sr-only"> — abre o painel na mesma página</span></a>
      <section id="fm-panel" class="panel" aria-labelledby="fm-title" hidden>
        <header class="panel-header">
          <div><p class="eyebrow">configure do seu jeito</p><h2 id="fm-title" tabindex="-1">Preferências</h2></div>
          <button type="button" class="close" aria-label="Fechar preferências">Fechar</button>
        </header>
        <div class="panel-content">
          <p class="intro">Ajuste a apresentação desta página para você.</p>
          <label class="show-all checkbox-label" for="fm-floating">
            <input id="fm-floating" type="checkbox" aria-describedby="fm-floating-help">
            <span>deixar esta camada flutuante</span>
          </label>
          <div class="floating-controls" hidden>
            <p id="fm-floating-help">Arraste pelo botão Mover painel, use as setas do teclado nesse botão ou selecione uma direção abaixo.</p>
            <button type="button" class="move-handle" aria-describedby="fm-panel-position fm-floating-help">Mover painel</button>
            <p id="fm-panel-position" class="sr-only"></p>
            <p class="sr-only move-status" role="status" aria-live="polite" aria-atomic="true"></p>
            <div class="move-directions" role="group" aria-label="Mover painel por direção">
              <button type="button" data-move="left" aria-label="Mover painel para a esquerda">←</button>
              <button type="button" data-move="up" aria-label="Mover painel para cima">↑</button>
              <button type="button" data-move="down" aria-label="Mover painel para baixo">↓</button>
              <button type="button" data-move="right" aria-label="Mover painel para a direita">→</button>
            </div>
          </div>
          <label class="show-all checkbox-label" for="fm-show-all">
            <input id="fm-show-all" type="checkbox">
            <span>exibir todas as preferências</span>
          </label>
          <div class="controls"></div>
          <details class="more-preferences">
            <summary>exibir mais preferências</summary>
            <div class="extra-controls"></div>
          </details>
          <footer>
            <div class="visibility-option">
              <label class="visibility-label" for="fm-compact-trigger">
                <input id="fm-compact-trigger" type="checkbox" aria-describedby="fm-compact-help">
                <span>exibir ícone pequeno da ferramenta</span>
              </label>
              <p id="fm-compact-help">Substitui o texto do botão pelo ícone de preferências nesta página. Desmarque para voltar a exibir o texto.</p>
            </div>
            <div class="visibility-option">
              <label class="visibility-label" for="fm-hide-trigger">
                <input id="fm-hide-trigger" type="checkbox" aria-describedby="fm-hide-help">
                <span>não exibir o botão de preferências nessa página</span>
              </label>
              <p id="fm-hide-help">Ao selecionar essa opção, após fechar a ferramenta o botão não será mais exibido. Para o botão ser exibido novamente, será preciso limpar o cache do navegador, incluindo os dados deste site.</p>
            </div>
            <button type="button" class="reset">Restaurar padrão</button>
            <p class="status" role="status"></p>
            <p class="note">Ajustar preferências não corrigem barreiras de acessibilidade do site. <span class="version">Versão 1.8.2</span></p>
            <p class="project-credit">Conheça o projeto “<a href="http://preferenciasdeacessibilidade.com/" target="_blank" rel="noopener noreferrer">Preferências de Acessibilidade<span class="sr-only"> (abre em uma nova aba)</span></a><svg class="external-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>”.</p>
            <p class="project-credit">Este é um projeto de <a href="https://github.com/acessibilidade/preferencias-a11y" target="_blank" rel="noopener noreferrer">código aberto<span class="sr-only"> (abre em uma nova aba)</span></a><svg class="external-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>.</p>
          </footer>
        </div>
      </section>`;
    shadow.append(container);
    document.body.append(host);
    const panel = shadow.querySelector('.panel');
    const trigger = shadow.querySelector('.trigger');
    const status = shadow.querySelector('.status');
    const floating = shadow.querySelector('#fm-floating');
    const floatingControls = shadow.querySelector('.floating-controls');
    const moveHandle = shadow.querySelector('.move-handle');
    // Runtime coordinates live in a stylesheet, never in inline HTML styles.
    const positionSheet = new CSSStyleSheet();
    positionSheet.replaceSync(':host .panel.is-floating { left: 0px; top: 0px; right: auto; }');
    shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, positionSheet];
    const positionRule = positionSheet.cssRules[0];
    let drag = null;
    let announcementTimer;
    const positionDescription = shadow.querySelector('#fm-panel-position');
    const moveStatus = shadow.querySelector('.move-status');
    function describePosition() {
      const rect = panel.getBoundingClientRect();
      const viewport = window.visualViewport;
      const availableX = (viewport ? viewport.width : window.innerWidth) - rect.width;
      const availableY = (viewport ? viewport.height : window.innerHeight) - rect.height;
      const x = availableX > 1 ? (rect.left - (viewport?.offsetLeft || 0)) / availableX : 0.5;
      const y = availableY > 1 ? (rect.top - (viewport?.offsetTop || 0)) / availableY : 0.5;
      const column = x < 0.33 ? 0 : x > 0.67 ? 2 : 1;
      const row = y < 0.33 ? 0 : y > 0.67 ? 2 : 1;
      const regions = [
        ['canto superior esquerdo', 'centro superior', 'canto superior direito'],
        ['centro à esquerda', 'centro', 'centro à direita'],
        ['canto inferior esquerdo', 'centro inferior', 'canto inferior direito']
      ];
      const text = `Posição aproximada: ${regions[row][column]} da área disponível da tela.`;
      positionDescription.textContent = text;
      return text;
    }
    function announceMovement(message) {
      clearTimeout(announcementTimer);
      moveStatus.textContent = '';
      // Coalesce repeated keys and allow identical messages to be announced again.
      announcementTimer = setTimeout(() => {
        moveStatus.textContent = `${message} ${describePosition()}`;
      }, 180);
    }
    function describeMovement(before, direction) {
      const after = panel.getBoundingClientRect();
      const dx = after.left - before.left;
      const dy = after.top - before.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
        const names = { left: 'à esquerda', right: 'à direita', up: 'acima', down: 'abaixo' };
        announceMovement(direction ? `Limite ${names[direction]} atingido. O painel não foi movido.` : 'O painel não foi movido.');
        return;
      }
      const movements = [];
      if (Math.abs(dx) >= 1) movements.push(dx < 0 ? 'para a esquerda' : 'para a direita');
      if (Math.abs(dy) >= 1) movements.push(dy < 0 ? 'para cima' : 'para baixo');
      announceMovement(`Painel movido ${movements.join(' e ')}.`);
    }

    function positionPanel(x, y) {
      const rect = panel.getBoundingClientRect();
      const viewport = window.visualViewport;
      const left = viewport ? viewport.offsetLeft : 0;
      const top = viewport ? viewport.offsetTop : 0;
      const width = viewport ? viewport.width : window.innerWidth;
      const height = viewport ? viewport.height : window.innerHeight;
      const scaleX = rect.width / panel.offsetWidth || 1;
      const scaleY = rect.height / panel.offsetHeight || 1;
      x = Math.max(left, Math.min(x, left + width - rect.width));
      y = Math.max(top, Math.min(y, top + height - rect.height));
      positionRule.style.left = `${x / scaleX}px`;
      positionRule.style.top = `${y / scaleY}px`;
      describePosition();
    }
    function stopDragging() {
      const finishedDrag = drag;
      drag = null;
      if (finishedDrag) {
        if (moveHandle.hasPointerCapture(finishedDrag.id)) moveHandle.releasePointerCapture(finishedDrag.id);
        describeMovement(finishedDrag.start);
      }
      moveHandle.classList.remove('is-dragging');
    }
    function setFloating(enabled) {
      stopDragging();
      const rect = panel.getBoundingClientRect();
      floating.checked = enabled;
      floatingControls.hidden = !enabled;
      panel.classList.toggle('is-floating', enabled);
      if (enabled) positionPanel(rect.left, rect.top);
      else {
        clearTimeout(announcementTimer);
        moveStatus.textContent = '';
      }
    }
    floating.addEventListener('change', () => {
      setFloating(floating.checked);
      status.textContent = floating.checked ? 'Painel flutuante ativado.' : 'Painel devolvido à posição original.';
    });
    moveHandle.addEventListener('pointerdown', event => {
      if (!floating.checked || !event.isPrimary || event.button !== 0) return;
      const rect = panel.getBoundingClientRect();
      drag = { id: event.pointerId, x: event.clientX - rect.left, y: event.clientY - rect.top, start: rect };
      moveHandle.setPointerCapture(event.pointerId);
      moveHandle.classList.add('is-dragging');
      moveHandle.focus({ preventScroll: true });
      event.preventDefault();
    });
    moveHandle.addEventListener('pointermove', event => {
      if (drag && drag.id === event.pointerId) positionPanel(event.clientX - drag.x, event.clientY - drag.y);
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => moveHandle.addEventListener(type, stopDragging));
    const directions = { left: [-24, 0], right: [24, 0], up: [0, -24], down: [0, 24] };
    function movePanel(direction) {
      if (!floating.checked) return;
      const rect = panel.getBoundingClientRect();
      const [x, y] = directions[direction];
      positionPanel(rect.left + x, rect.top + y);
      describeMovement(rect, direction);
    }
    moveHandle.addEventListener('focus', describePosition);
    moveHandle.addEventListener('keydown', event => {
      const direction = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' }[event.key];
      if (direction) { event.preventDefault(); movePanel(direction); }
    });
    shadow.querySelectorAll('[data-move]').forEach(button => {
      button.addEventListener('click', () => movePanel(button.dataset.move));
    });
    function constrainPanel() {
      if (!floating.checked || panel.hidden) return;
      const rect = panel.getBoundingClientRect();
      positionPanel(rect.left, rect.top);
    }
    window.addEventListener('resize', constrainPanel);
    window.visualViewport?.addEventListener('resize', constrainPanel);
    window.visualViewport?.addEventListener('scroll', constrainPanel);
    new ResizeObserver(constrainPanel).observe(panel);
    const hideTrigger = shadow.querySelector('#fm-hide-trigger');
    try { trigger.hidden = localStorage.getItem(visibilityKey) === 'true'; } catch (_) { /* Optional storage. */ }
    const compactTrigger = shadow.querySelector('#fm-compact-trigger');
    function applyCompactTrigger() {
      trigger.classList.toggle('trigger-compact', compactTrigger.checked);
      shadow.querySelector('.trigger-label').classList.toggle('sr-only', compactTrigger.checked);
    }
    try { compactTrigger.checked = localStorage.getItem(compactKey) === 'true'; } catch (_) { /* Optional storage. */ }
    applyCompactTrigger();
    compactTrigger.addEventListener('change', () => {
      applyCompactTrigger();
      try { localStorage.setItem(compactKey, String(compactTrigger.checked)); } catch (_) { /* Optional storage. */ }
      status.textContent = compactTrigger.checked ? 'Botão de preferências exibido como ícone.' : 'Botão de preferências exibido com texto.';
    });
    const state = {};
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(key)) || {}; } catch (_) { /* Storage is optional. */ }
    for (const name of Object.keys(options)) {
      state[name] = options[name].includes(saved[name]) ? saved[name] : 'original';
      const row = document.createElement('div');
      row.className = 'control';
      const label = document.createElement('label');
      label.htmlFor = `fm-${name}`;
      label.textContent = labels[name][0];
      const checkbox = ['bold', 'mute', 'motion'].includes(name);
      const control = document.createElement(checkbox ? 'input' : 'select');
      control.id = label.htmlFor;
      control.name = name;
      if (checkbox) {
        control.type = 'checkbox';
        control.checked = state[name] === 'on';
        label.className = 'checkbox-label';
        label.prepend(control);
        row.append(label);
      } else {
        options[name].forEach((value, index) => control.add(new Option(labels[name][1][index], value)));
        control.value = state[name];
        row.append(label, control);
      }
      const help = {
        zoom: 'Amplia o conteúdo do site. O painel mantém seu tamanho. Não altera o zoom nativo do navegador.',
        mute: 'Silencia áudios e vídeos HTML desta página. Não controla Web Audio nem players de terceiros em iframes.',
        motion: 'Pausa vídeos HTML e animações CSS/Web Animations. GIFs, canvas, animações por scripts e iframes podem continuar. Vídeos não reiniciam automaticamente ao desmarcar.'
      };
      if (help[name]) {
        const description = document.createElement('p');
        description.className = 'control-help';
        description.id = `fm-${name}-help`;
        description.textContent = help[name];
        control.setAttribute('aria-describedby', description.id);
        row.append(description);
      }
      shadow.querySelector('.controls').append(row);
      if (name === 'bold') shadow.querySelector('#fm-font').parentElement.append(row);
      control.addEventListener('change', () => {
        state[name] = checkbox ? (control.checked ? 'on' : 'original') : control.value;
        apply();
        persist();
      });
    }
    const primaryOrder = ['zoom', 'contrast', 'inputs', 'font', 'size', 'line', 'letter', 'word', 'cursor'];
    const primaryControls = shadow.querySelector('.controls');
    const configuredGroups = [];
    function registerConfiguredGroup(group, names) {
      const badge = document.createElement('span');
      badge.className = 'configured-badge';
      badge.textContent = 'Configurado';
      badge.hidden = true;
      group.querySelector('summary').append(' ', badge);
      configuredGroups.push({ group, names, badge });
    }
    primaryOrder.forEach(name => {
      const row = shadow.querySelector(`#fm-${name}`).parentElement;
      const group = document.createElement('details');
      group.className = 'preference-group';
      group.name = 'fm-preference-groups';
      const summary = document.createElement('summary');
      summary.textContent = labels[name][0];
      row.querySelector('label').classList.add('sr-only');
      group.append(summary, row);
      registerConfiguredGroup(group, name === 'font' ? ['font', 'bold'] : [name]);
      primaryControls.append(group);
    });
    const morePreferences = shadow.querySelector('.more-preferences');
    morePreferences.name = 'fm-preference-groups';
    registerConfiguredGroup(morePreferences, ['motion', 'mute']);
    // Also enforce exclusivity in browsers without support for details[name].
    const groups = [...shadow.querySelectorAll('details[name="fm-preference-groups"]')];
    const showAll = shadow.querySelector('#fm-show-all');
    function setAllGroups(expanded) {
      showAll.checked = expanded;
      showAll.indeterminate = false;
      groups.forEach(group => group.removeAttribute('name'));
      groups.forEach(group => { group.open = expanded; });
      if (!expanded) groups.forEach(group => { group.name = 'fm-preference-groups'; });
    }
    showAll.addEventListener('change', () => setAllGroups(showAll.checked));
    groups.forEach(group => group.addEventListener('toggle', () => {
      if (showAll.checked) {
        showAll.indeterminate = !groups.every(item => item.open);
        return;
      }
      if (!group.open) return;
      groups.forEach(other => { if (other !== group) other.open = false; });
    }));
    const extraControls = shadow.querySelector('.extra-controls');
    ['motion', 'mute'].forEach(name => extraControls.append(shadow.querySelector(`#fm-${name}`).closest('.control')));
    // Old persisted "simplify" values are deliberately not loaded in this version.
    root.removeAttribute('data-fm-simplify');
    document.querySelectorAll('[data-fm-hidden]').forEach(el => el.removeAttribute('data-fm-hidden'));
    const originalMuted = new Map();
    const pausedAnimations = new Set();
    let observing = false;
    let motionActive = false;
    function enforceMedia(media) {
      if (!(media instanceof HTMLMediaElement)) return;
      if (state.mute === 'on') {
        if (!originalMuted.has(media)) originalMuted.set(media, media.muted);
        if (!media.muted) media.muted = true;
      }
      if (state.motion === 'on' && media instanceof HTMLVideoElement && !media.paused) media.pause();
    }
    function pauseAnimations() {
      if (state.motion !== 'on' || !document.getAnimations) return;
      document.getAnimations().forEach(animation => {
        // CSS animations are paused by the stylesheet and restored by removing it.
        if (typeof CSSAnimation !== 'undefined' && animation instanceof CSSAnimation) return;
        if (animation.playState === 'running' || animation.pending) {
          animation.pause();
          pausedAnimations.add(animation);
        }
      });
    }
    const observer = new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType !== 1 || node === host) continue;
          enforceMedia(node);
          node.querySelectorAll('audio, video').forEach(enforceMedia);
        }
      }
      pauseAnimations();
    });
    ['play', 'playing', 'volumechange', 'loadedmetadata'].forEach(type => {
      document.addEventListener(type, event => enforceMedia(event.target), true);
    });
    document.addEventListener('animationstart', pauseAnimations, true);
    function applyMedia() {
      if (state.mute !== 'on') {
        originalMuted.forEach((muted, media) => { media.muted = muted; });
        originalMuted.clear();
      }
      document.querySelectorAll('audio, video').forEach(enforceMedia);
      if (state.motion === 'on') pauseAnimations();
      else if (motionActive) {
        pausedAnimations.forEach(animation => {
          if (animation.playState === 'paused') animation.play();
        });
        pausedAnimations.clear();
      }
      motionActive = state.motion === 'on';
      const needed = state.mute === 'on' || motionActive;
      if (needed && !observing) observer.observe(document.body, { childList: true, subtree: true });
      else if (!needed && observing) observer.disconnect();
      observing = needed;
    }
    function apply() {
      for (const [name, value] of Object.entries(state)) {
        if (value === 'original') root.removeAttribute(`data-fm-${name}`);
        else root.setAttribute(`data-fm-${name}`, value);
      }
      configuredGroups.forEach(({ group, names, badge }) => {
        const configured = names.some(name => state[name] !== 'original');
        badge.hidden = !configured;
        group.classList.toggle('is-configured', configured);
      });
      applyMedia();
      status.textContent = 'Alterações aplicadas nesta página.';
    }
    function persist() {
      try { localStorage.setItem(key, JSON.stringify(state)); }
      catch (_) { status.textContent += ' O navegador não permitiu salvar as preferências.'; }
    }
    function close(restoreFocus = true) {
      stopDragging();
      clearTimeout(announcementTimer);
      moveStatus.textContent = '';
      panel.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      trigger.hidden = hideTrigger.checked;
      if (hideTrigger.checked) {
        try { localStorage.setItem(visibilityKey, 'true'); }
        catch (_) { /* The button stays hidden until this document is reloaded. */ }
      }
      if (restoreFocus && !trigger.hidden) trigger.focus();
      else if (restoreFocus) {
        const destination = document.querySelector('main, [role="main"]') || document.body;
        const previousTabindex = destination.getAttribute('tabindex');
        destination.setAttribute('tabindex', '-1');
        destination.focus({ preventScroll: true });
        destination.addEventListener('blur', () => {
          if (previousTabindex === null) destination.removeAttribute('tabindex');
          else destination.setAttribute('tabindex', previousTabindex);
        }, { once: true });
      }
    }
    trigger.addEventListener('click', event => {
      event.preventDefault();
      if (!panel.hidden) return close();
      panel.hidden = false;
      constrainPanel();
      trigger.setAttribute('aria-expanded', 'true');
      shadow.querySelector('#fm-title').focus();
    });
    shadow.querySelector('.close').addEventListener('click', () => close());
    document.addEventListener('focusin', event => {
      if (!panel.hidden && event.target !== host) close(false);
    });
    shadow.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !panel.hidden) { event.preventDefault(); close(); }
    });
    shadow.querySelector('.reset').addEventListener('click', () => {
      setAllGroups(false);
      setFloating(false);
      Object.keys(state).forEach(name => {
        state[name] = 'original';
        const control = shadow.querySelector(`#fm-${name}`);
        if (control.type === 'checkbox') control.checked = false;
        else control.value = 'original';
      });
      hideTrigger.checked = false;
      compactTrigger.checked = false;
      applyCompactTrigger();
      try { localStorage.removeItem(compactKey); } catch (_) { /* Optional persistence. */ }
      apply();
      try { localStorage.removeItem(key); } catch (_) { /* Optional persistence. */ }
      status.textContent = 'Preferências restauradas.';
    });
    apply();
    if (status.textContent === 'Alterações aplicadas nesta página.') {
      status.textContent = 'Preferências salvas apenas neste navegador, por site.';
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
