document.querySelector('#waapi').animate([{opacity: 1}, {opacity: .2}], {duration: 5000, iterations: Infinity});
document.querySelector('#reproduzir').addEventListener('click', () => document.querySelectorAll('audio, video').forEach(media => media.play().catch(() => {})));
document.querySelector('#adicionar').addEventListener('click', () => {
  const video = document.createElement('video');
  video.src = 'silencio.wav';
  video.loop = true;
  video.controls = true;
  document.querySelector('main').append(video);
  video.play().catch(() => {});
});
document.querySelector('#reativar').addEventListener('click', () => document.querySelectorAll('audio, video').forEach(media => { media.muted = false; media.play().catch(() => {}); }));

document.querySelector('#inspecionar').addEventListener('click', () => {
  document.querySelector('#resultado').textContent = JSON.stringify({media: [...document.querySelectorAll('audio,video')].map(m => ({tag: m.tagName, paused: m.paused, muted: m.muted})), animations: document.getAnimations().map(a => a.playState)});
});
