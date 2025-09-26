// Funciones JS básicas: tema, audio y validación de formulario.
(function(){
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const player = document.getElementById('player');
  const playBtn = document.getElementById('playBtn');
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('status');

  // Tema claro/oscuro con persistencia
  const saved = localStorage.getItem('theme') || 'dark';
  if(saved === 'light'){ root.classList.add('light'); themeToggle.textContent = '☀️'; }
  themeToggle.addEventListener('click', ()=>{
    root.classList.toggle('light');
    const isLight = root.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
  });

  // Reproducción de audio
  playBtn?.addEventListener('click', ()=>{
    if(player.paused){
      player.play(); playBtn.textContent = '⏸ Pausar';
    }else{
      player.pause(); playBtn.textContent = '▶ Reproducir';
    }
  });
  player.addEventListener('ended', ()=> playBtn.textContent = '▶ Reproducir');

  // Validación básica del formulario (cliente)
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    let errores = [];
    if(nombre.length < 2) errores.push('Nombre demasiado corto.');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) errores.push('Correo inválido.');
    if(mensaje.length < 5) errores.push('Mensaje demasiado corto.');

    if(errores.length){
      statusEl.textContent = '⚠ ' + errores.join(' ');
      statusEl.style.color = 'salmon';
      return;
    }
    // Simulación de "envío" + almacenamiento local
    const payload = { nombre, correo, mensaje, fecha: new Date().toISOString() };
    const prev = JSON.parse(localStorage.getItem('contactos') || '[]');
    prev.push(payload);
    localStorage.setItem('contactos', JSON.stringify(prev));
    statusEl.textContent = '✅ Mensaje registrado localmente (modo demo).';
    statusEl.style.color = 'lightgreen';
    form.reset();
  });
})();