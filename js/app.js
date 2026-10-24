/**
 * ============================================================================
 * BODA GLORIA & MARCO - APLICACIÓN INTERACTIVA, ANIMACIÓN DE SOBRE & PASE DIGITAL
 * ============================================================================
 */

// Desactivar restauración automática de scroll del navegador para que siempre inicie arriba
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // Configurar volumen por defecto en nivel medio (50%)
  const audio = document.getElementById('weddingAudio');
  if (audio) {
    audio.volume = 0.5;
  }

  initEnvelopeIntro();
  initScrollProgress();
  initPetalsCanvas();
  initMusicPlayer();
  initCountdown();
  initCalendarActions();
  initGuestPersonalization();
  initPassDigital();
  initRsvpForm();
  initNavigation();
  initVideoSync();
});

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

/* ============================================================================
   0. ANIMACIÓN DEL SOBRE DE INVITACIÓN (3 Segundos al dar Clic en Botón Redondo)
   ============================================================================ */
function initEnvelopeIntro() {
  const overlay = document.getElementById('envelopeIntroOverlay');
  const envelope = document.getElementById('weddingEnvelope');
  const sealBtn = document.getElementById('waxSealBtn');
  const audio = document.getElementById('weddingAudio');

  // Asegurar siempre posición en la parte superior
  window.scrollTo(0, 0);

  if (audio) {
    audio.volume = 0.5; // Volumen por defecto Medio (50%)
  }

  if (!overlay || !envelope || !sealBtn) return;

  // Bloquear scroll mientras el sobre esté en pantalla
  document.body.classList.add('envelope-active');

  let opened = false;

  sealBtn.addEventListener('click', () => {
    if (opened) return;
    opened = true;

    // Asegurar siempre que la página esté en la parte superior
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 1. Iniciar la reproducción de la canción (audio/cancion.mpeg)
    if (audio) {
      audio.volume = 0.5; // Asegurar volumen medio
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            updateMusicWidgets(true);
          })
          .catch(() => {
            // En caso de bloqueo del navegador, iniciar sintetizador
            startWeddingSynth();
            updateMusicWidgets(true);
          });
      }
    }

    // 2. Activar la animación de apertura del sobre y salida de la foto (imag/001.jpg)
    envelope.classList.add('opened');

    // 3. Duración de visualización del sobre y foto: 5.5 segundos (5500 ms)
    setTimeout(() => {
      // Desvanecer el sobre hacia la página web
      overlay.classList.add('fade-out');

      setTimeout(() => {
        overlay.style.display = 'none';
        document.body.classList.remove('envelope-active');
        // Garantizar que la página quede fija y perfecta en la parte superior
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 800);
    }, 5500);
  });
}

function updateMusicWidgets(isPlaying) {
  const toggleBtn = document.getElementById('musicToggleBtn');
  const heroMusicBtn = document.getElementById('heroMusicBtn');
  const tooltip = document.getElementById('musicTooltip');
  const statusText = tooltip ? tooltip.querySelector('.music-status') : null;

  if (toggleBtn) {
    if (isPlaying) {
      toggleBtn.classList.add('playing');
      if (statusText) statusText.textContent = 'Sonando: Nuestra Canción';
      if (heroMusicBtn) heroMusicBtn.innerHTML = '<i class="ri-pause-circle-line"></i> Pausar Canción';
    } else {
      toggleBtn.classList.remove('playing');
      if (statusText) statusText.textContent = 'Toca para reproducir';
      if (heroMusicBtn) heroMusicBtn.innerHTML = '<i class="ri-volume-up-line"></i> Escuchar Canción';
    }
  }
}

/* ============================================================================
   1. BARRA DE PROGRESO DE DESPLAZAMIENTO (Golden Scroll Indicator)
   ============================================================================ */
function initScrollProgress() {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${scrolled}%`;
  }, { passive: true });
}

/* ============================================================================
   2. CANVAS DE PÉTALOS Y DESTELLOS NUPCIALES (Breeze Atmosphere)
   ============================================================================ */
function initPetalsCanvas() {
  const canvas = document.getElementById('petalsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const petalCount = window.innerWidth < 768 ? 16 : 28;

  const petalColors = [
    'rgba(244, 219, 216, 0.65)', // Rubor suave
    'rgba(255, 255, 255, 0.75)', // Blanco seda
    'rgba(226, 206, 181, 0.6)',  // Champaña
    'rgba(212, 175, 55, 0.45)'   // Destello dorado
  ];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 9 + 6;
      this.speedY = Math.random() * 0.9 + 0.4;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 1.5;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
      this.opacity = Math.random() * 0.5 + 0.3;
      this.swing = Math.random() * 2;
      this.swingStep = Math.random() * 0.02;
    }

    update() {
      this.y += this.speedY;
      this.swing += this.swingStep;
      this.x += Math.sin(this.swing) * 0.8 + this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }
    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  });
}

/* ============================================================================
   3. REPRODUCTOR DE MÚSICA DE BODA (Canción Preferida con Web Audio Fallback)
   ============================================================================ */
let audioCtx = null;
let isPlayingSynth = false;
let synthTimeout = null;
let isPlayingMusic = false;
let wasMusicPlayingBeforeVideo = false;

function initMusicPlayer() {
  const audio = document.getElementById('weddingAudio');
  const toggleBtn = document.getElementById('musicToggleBtn');
  const heroMusicBtn = document.getElementById('heroMusicBtn');

  if (audio) {
    audio.volume = 0.5; // Volumen por defecto Medio (50%)
  }

  async function togglePlay() {
    if (!isPlayingMusic) {
      try {
        if (audio) {
          audio.volume = 0.5;
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                isPlayingMusic = true;
                updateMusicWidgets(true);
              })
              .catch(() => {
                startWeddingSynth();
                isPlayingMusic = true;
                updateMusicWidgets(true);
              });
          }
        }
      } catch (err) {
        startWeddingSynth();
        isPlayingMusic = true;
        updateMusicWidgets(true);
      }
    } else {
      try {
        if (audio) audio.pause();
      } catch (e) {}
      stopWeddingSynth();
      isPlayingMusic = false;
      wasMusicPlayingBeforeVideo = false;
      updateMusicWidgets(false);
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', togglePlay);
  }

  if (heroMusicBtn) {
    heroMusicBtn.addEventListener('click', togglePlay);
  }
}

// Melodía romántica de respaldo (Canon en Re)
function startWeddingSynth() {
  if (isPlayingSynth) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioCtx = new AudioContext();

    const notes = [
      { f: 587.33, d: 0.9 }, // D5
      { f: 523.25, d: 0.9 }, // C#5
      { f: 493.88, d: 0.9 }, // B4
      { f: 440.00, d: 0.9 }, // A4
      { f: 392.00, d: 0.9 }, // G4
      { f: 369.99, d: 0.9 }, // F#4
      { f: 392.00, d: 0.9 }, // G4
      { f: 440.00, d: 0.9 }  // A4
    ];

    let noteIndex = 0;
    isPlayingSynth = true;

    function playNextNote() {
      if (!isPlayingSynth || !audioCtx) return;
      const note = notes[noteIndex];
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, audioCtx.currentTime);

      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + note.d);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + note.d);

      noteIndex = (noteIndex + 1) % notes.length;
      synthTimeout = setTimeout(playNextNote, note.d * 900);
    }

    playNextNote();
  } catch (err) {
    console.log('Audio synth no soportado', err);
  }
}

function stopWeddingSynth() {
  isPlayingSynth = false;
  if (synthTimeout) clearTimeout(synthTimeout);
  if (audioCtx) {
    try { audioCtx.close(); } catch (e) {}
    audioCtx = null;
  }
}

/* ============================================================================
   4. CUENTA REGRESIVA DINÁMICA (Countdown)
   ============================================================================ */
function initCountdown() {
  // Fecha oficial de la boda: Sábado, 5 de Diciembre de 2026, 16:00:00 (Hora local)
  const weddingDate = new Date('2026-12-05T16:00:00').getTime();

  const daysEl = document.getElementById('cdDays');
  const hoursEl = document.getElementById('cdHours');
  const minutesEl = document.getElementById('cdMinutes');
  const secondsEl = document.getElementById('cdSeconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ============================================================================
   5. AGENDAR EN CALENDARIO (Google Calendar & Apple / Outlook .ics)
   ============================================================================ */
function initCalendarActions() {
  const googleBtn = document.getElementById('addToCalendarBtn');
  const icsBtn = document.getElementById('downloadIcsBtn');

  const title = encodeURIComponent('Boda de Gloria & Marco 💍');
  const details = encodeURIComponent('¡Nos casamos! Acompáñanos a celebrar nuestra unión sagrada y una noche inolvidable.');
  const location = encodeURIComponent('EL BÚHO NUEVE, Lebrija, Santander, Colombia');
  const dates = '20261205T210000Z/20261206T080000Z'; // UTC

  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
      window.open(gcalUrl, '_blank');
    });
  }

  if (icsBtn) {
    icsBtn.addEventListener('click', () => {
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Boda Gloria y Marco//ES',
        'BEGIN:VEVENT',
        'SUMMARY:Boda de Gloria & Marco 💍',
        'DESCRIPTION:¡Nos casamos! Acompáñanos a celebrar nuestra unión sagrada.',
        'LOCATION:EL BÚHO NUEVE, Lebrija, Santander, Colombia',
        'DTSTART:20261205T160000',
        'DTEND:20261206T030000',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Boda_Gloria_y_Marco.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

/* ============================================================================
   5.5. PERSONALIZACIÓN DINÁMICA DE INVITADO (Sobre, Pase Digital y RSVP)
   ============================================================================ */
function getGuestUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('para') || params.get('invitado') || params.get('guest') || params.get('nombre') || '';
  const passes = params.get('pases') || params.get('cupos') || params.get('personas') || '';
  return {
    name: name.trim(),
    passes: passes.trim()
  };
}

function initGuestPersonalization() {
  const { name, passes } = getGuestUrlParams();
  if (!name) return;

  // 1. Personalizar Nombre Caligrafiado Directamente en el Frente del Sobre
  const frontLabel = document.getElementById('envelopeFrontLabel');
  const frontGuestName = document.getElementById('envelopeFrontGuestName');
  const letterGuestLine = document.getElementById('letterGuestLine');

  if (frontLabel && frontGuestName) {
    frontGuestName.textContent = name;
    frontLabel.style.display = 'flex';
    setTimeout(fitEnvelopeGuestName, 50);
    window.addEventListener('resize', fitEnvelopeGuestName);
  }

  if (letterGuestLine) {
    letterGuestLine.textContent = `Especialmente Para: ${name}`;
    letterGuestLine.style.display = 'block';
  }
}

function fitEnvelopeGuestName() {
  const el = document.getElementById('envelopeFrontGuestName');
  const container = document.getElementById('envelopeFrontLabel');
  if (!el || !container) return;

  el.style.fontSize = ''; // Restablecer al tamaño base del CSS
  const maxWidth = container.clientWidth || 300;
  let currentSize = parseFloat(window.getComputedStyle(el).fontSize) || 34;

  while (el.scrollWidth > maxWidth && currentSize > 16) {
    currentSize -= 1;
    el.style.fontSize = currentSize + 'px';
  }

  // 2. Personalizar Pase Digital
  const passNameInput = document.getElementById('passGuestNameInput');
  const passDisplayGuestName = document.getElementById('passDisplayGuestName');
  const passDisplayCount = document.getElementById('passDisplayCount');

  if (passNameInput) {
    passNameInput.value = name;
  }
  if (passDisplayGuestName) {
    passDisplayGuestName.textContent = name;
  }
  if (passes && passDisplayCount) {
    passDisplayCount.textContent = (passes === '1') ? '1 Persona' : `${passes} Personas`;
  }

  // 3. Personalizar Formulario RSVP
  const rsvpNameInput = document.getElementById('guestFullName');
  const rsvpTicketsSelect = document.getElementById('guestTickets');

  if (rsvpNameInput && !rsvpNameInput.value) {
    rsvpNameInput.value = name;
  }
  if (passes && rsvpTicketsSelect) {
    let optionExists = false;
    for (let i = 0; i < rsvpTicketsSelect.options.length; i++) {
      if (rsvpTicketsSelect.options[i].value === passes) {
        rsvpTicketsSelect.selectedIndex = i;
        optionExists = true;
        break;
      }
    }
    if (!optionExists) {
      const newOpt = document.createElement('option');
      newOpt.value = passes;
      newOpt.textContent = `${passes} Pases`;
      rsvpTicketsSelect.appendChild(newOpt);
      rsvpTicketsSelect.value = passes;
    }
  }
}

/* ============================================================================
   6. PASE DIGITAL INTERACTIVO (Generador QR, Personalización y Descarga PDF)
   ============================================================================ */
let qrCodeInstance = null;

function initPassDigital() {
  const nameInput = document.getElementById('passGuestNameInput');
  const updateBtn = document.getElementById('updatePassBtn');
  const displayGuestName = document.getElementById('passDisplayGuestName');
  const qrContainer = document.getElementById('passQrcode');
  const passIdEl = document.getElementById('passIdCode');

  function updatePassData() {
    const rawName = (nameInput && nameInput.value.trim()) || 'Invitado de Honor';
    if (displayGuestName) {
      displayGuestName.textContent = rawName;
    }

    const codeId = 'PAS-GM-' + Math.abs(hashCode(rawName)).toString(36).toUpperCase().padStart(6, '0');
    if (passIdEl) passIdEl.textContent = codeId;

    const qrPayload = JSON.stringify({
      evento: 'Boda Gloria & Marco',
      fecha: '2026-12-05',
      invitado: rawName,
      codigo: codeId
    });

    if (qrContainer) {
      qrContainer.innerHTML = '';
      qrCodeInstance = new QRCode(qrContainer, {
        text: qrPayload,
        width: 86,
        height: 86,
        colorDark: '#4A3B32',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
    }
  }

  if (updateBtn) {
    updateBtn.addEventListener('click', updatePassData);
  }

  if (nameInput) {
    nameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') updatePassData();
    });
  }

  setTimeout(updatePassData, 200);
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

window.generatePassPDF = function() {
  const element = document.getElementById('passTicketToPrint');
  const guestName = document.getElementById('passDisplayGuestName')?.textContent || 'Invitado';
  const cleanName = guestName.replace(/[^a-zA-Z0-9]/g, '_');

  const opt = {
    margin: [8, 8, 8, 8],
    filename: `Pase_Boda_Gloria_y_Marco_${cleanName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false
    },
    jsPDF: { unit: 'mm', format: 'a5', orientation: 'portrait' }
  };

  const btn = document.getElementById('downloadPdfBtn');
  const originalText = btn ? btn.innerHTML : '';
  if (btn) btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Generando PDF...';

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      if (btn) btn.innerHTML = originalText;
    })
    .catch((err) => {
      console.error('Error generando PDF:', err);
      if (btn) btn.innerHTML = originalText;
      alert('Se generó la vista de impresión. Puedes guardar como PDF.');
      window.print();
    });
};

window.openPassModal = function() {
  const modal = document.getElementById('passFullscreenModal');
  const modalTarget = document.getElementById('modalPassTarget');
  const originalPass = document.getElementById('passTicketToPrint');

  if (modal && modalTarget && originalPass) {
    modalTarget.innerHTML = '';
    const clone = originalPass.cloneNode(true);
    clone.id = 'passModalClone';
    modalTarget.appendChild(clone);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closePassModal = function() {
  const modal = document.getElementById('passFullscreenModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.sharePassWhatsapp = function() {
  const guestName = document.getElementById('passDisplayGuestName')?.textContent || 'Invitado';
  const text = encodeURIComponent(`Hola Gloria y Marco 💍, aquí tengo listo mi Pase Digital para su boda:\n\n👤 Invitado: ${guestName}\n📅 Fecha: Sábado, 5 de Diciembre de 2026\n📍 Lugar: EL BÚHO NUEVE, Lebrija, Santander, Colombia\n\n¡Ansioso(a) de verlos y celebrar juntos! ❤️`);
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
};

/* ============================================================================
   7. DETALLES Y COPIAR CUENTA BANCARIA
   ============================================================================ */
window.copyBankAccount = function() {
  const accountText = "3175419845"; // Número de Nequi exacto
  navigator.clipboard.writeText(accountText).then(() => {
    const successMsg = document.getElementById('copySuccessMsg');
    if (successMsg) {
      successMsg.textContent = "¡Número Nequi (3175419845) copiado al portapapeles!";
      successMsg.style.display = 'block';
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 3500);
    }
  }).catch(() => {
    alert("Nequi: 3175419845 - Titular: Marco Aurelio Ortiz Ardila");
  });
};

/* ============================================================================
   8. FORMULARIO RSVP FORMAL & CONFIRMACIÓN POR WHATSAPP
   ============================================================================ */
function initRsvpForm() {
  const form = document.getElementById('rsvpWeddingForm');
  const radioButtons = document.querySelectorAll('input[name="attendanceStatus"]');
  const companionsRow = document.getElementById('companionsRow');

  radioButtons.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (companionsRow) {
        companionsRow.style.display = e.target.value === 'NO' ? 'none' : 'block';
      }
    });
  });
}

window.handleRsvpSubmit = function(event) {
  event.preventDefault();

  const name = document.getElementById('guestFullName').value.trim();
  const phone = document.getElementById('guestPhone').value.trim();
  const attendance = document.querySelector('input[name="attendanceStatus"]:checked')?.value || 'SI';
  const tickets = document.getElementById('guestTickets')?.value || '2';
  const song = document.getElementById('songRequest')?.value.trim() || '';
  const message = document.getElementById('loveMessage')?.value.trim() || '';

  const passIdCode = document.getElementById('passIdCode')?.textContent || 'PAS-GM-2026';

  const rsvpData = {
    name,
    phone,
    attendance,
    tickets: attendance === 'SI' ? tickets : '0',
    song,
    message,
    codigoPase: passIdCode,
    fechaRegistro: new Date().toISOString()
  };

  // 1. Guardar localmente en el navegador (LocalStorage)
  try {
    const savedList = JSON.parse(localStorage.getItem('boda_rsvp_list') || '[]');
    savedList.push(rsvpData);
    localStorage.setItem('boda_rsvp_list', JSON.stringify(savedList));
  } catch (e) {}

  // 2. Enviar directamente a Google Sheets en Google Drive vía Apps Script
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzNxP3pt3umOdLWCtSbLsQihEUfL9CYlcjkp7hC23RvRoD574zHTUBOd9QfomlAthyAZA/exec';

  fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify(rsvpData)
  })
  .then(() => {
    console.log('[GOOGLE SHEETS] Confirmación enviada exitosamente a Google Drive');
  })
  .catch(err => {
    console.warn('[GOOGLE SHEETS ERROR]', err);
  });

  // Fallback si corre en servidor local Python
  fetch('/api/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rsvpData)
  }).catch(() => {});

  const passNameInput = document.getElementById('passGuestNameInput');
  const passCountEl = document.getElementById('passDisplayCount');
  if (passNameInput) passNameInput.value = name;
  if (passCountEl && attendance === 'SI') passCountEl.textContent = `${tickets} Persona(s)`;

  const updateBtn = document.getElementById('updatePassBtn');
  if (updateBtn) updateBtn.click();

  const successAlert = document.getElementById('rsvpSuccessAlert');
  if (successAlert) {
    successAlert.style.display = 'flex';
    successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  const submitBtn = document.getElementById('rsvpSubmitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="ri-check-line"></i> ¡Confirmación Registrada con Éxito!';
  }
};

// Función para descargar el archivo Excel con los confirmados (Google Sheets en la nube)
window.exportRsvpToExcel = function() {
  // Descarga directa oficial del libro Excel desde Google Sheets
  const googleSheetsExportUrl = 'https://docs.google.com/spreadsheets/d/1Z259LPWHXvQXcWFg9v7qR2VWwE3vl9rQ/export?format=xlsx';
  window.open(googleSheetsExportUrl, '_blank');
};

window.sendRsvpViaWhatsapp = function() {
  const name = document.getElementById('guestFullName')?.value.trim() || 'Invitado(a)';
  const attendance = document.querySelector('input[name="attendanceStatus"]:checked')?.value || 'SI';
  const tickets = document.getElementById('guestTickets')?.value || '2';
  const song = document.getElementById('songRequest')?.value.trim() || '';
  const message = document.getElementById('loveMessage')?.value.trim() || '';

  let messageText = '';
  if (attendance === 'SI') {
    messageText = `¡Hola Gloria y Marco! 💍❤️\n\nCon mucha alegría *confirmo mi asistencia* a su gran día:\n\n` +
      `👤 *Nombre:* ${name}\n` +
      `🎟️ *Pases Confirmados:* ${tickets}\n` +
      (song ? `🎵 *Canción para la pista:* ${song}\n` : '') +
      (message ? `💌 *Mensaje:* "${message}"\n` : '') +
      `\n¡Nos vemos en el altar para celebrar su amor! ✨`;
  } else {
    messageText = `¡Hola Gloria y Marco! 💍\n\nLamentablemente por motivos de fuerza mayor *no podré acompañarlos físicamente* a su boda:\n\n` +
      `👤 *Nombre:* ${name}\n` +
      (message ? `💌 *Mensaje:* "${message}"\n` : '') +
      `\n¡Les deseo toda la felicidad y bendiciones del mundo en este hermoso paso! Los quiero mucho. ❤️`;
  }

  const phoneNovios = '573155817380';
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNovios}&text=${encodeURIComponent(messageText)}`;
  window.open(whatsappUrl, '_blank');
};

/* ============================================================================
   9. NAVEGACIÓN MÓVIL Y SCROLLSPY
   ============================================================================ */
function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.className = 'ri-close-line';
        } else {
          icon.className = 'ri-menu-4-line';
        }
      }
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'ri-menu-4-line';
      });
    });
  }

  const sections = document.querySelectorAll('section[id], main[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ============================================================================
   10. VIDEO PLAYER CONTROLS & AUTO-SYNC CON LA CANCIÓN DE FONDO
   ============================================================================ */
function initVideoSync() {
  const video = document.getElementById('weddingVideoPlayer');
  const audio = document.getElementById('weddingAudio');

  // Si el usuario hace clic en los enlaces de Google Drive para ver el video:
  const driveVideoBtns = document.querySelectorAll('a[href*="1_a0LYkCTgFFct6fBYbT5ONjBj5j7VjXW"]');
  driveVideoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isPlayingMusic && audio) {
        audio.pause();
        stopWeddingSynth();
        isPlayingMusic = false;
        updateMusicWidgets(false);
      }
    });
  });

  if (!video) return;

  // 1. Cuando el usuario reproduce el video -> Pausar la canción para que no interfiera
  video.addEventListener('play', () => {
    if (isPlayingMusic || (audio && !audio.paused)) {
      wasMusicPlayingBeforeVideo = true;
      if (audio) audio.pause();
      stopWeddingSynth();
      isPlayingMusic = false;
      updateMusicWidgets(false);
    }
  });

  // 2. Función auxiliar para reanudar la canción exactamente donde iba
  function resumeMusicWhereItWas() {
    if (wasMusicPlayingBeforeVideo && audio) {
      audio.volume = 0.5; // Mantener volumen medio por defecto
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isPlayingMusic = true;
            updateMusicWidgets(true);
            wasMusicPlayingBeforeVideo = false;
          })
          .catch(() => {
            // Reintentar o mantener estado
          });
      }
    }
  }

  // 3. Cuando el usuario pausa el video -> Reanudar la canción donde iba
  video.addEventListener('pause', () => {
    resumeMusicWhereItWas();
  });

  // 4. Cuando el video finaliza -> Reanudar la canción donde iba
  video.addEventListener('ended', () => {
    resumeMusicWhereItWas();
  });

  // 5. Si el usuario se desplaza (scroll) y sale del video mientras se reproduce:
  //    Pausar el video automáticamente para que la canción continúe sin interferencia
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && !video.paused) {
          video.pause(); // Al pausar, se dispara el evento 'pause' que reanuda la música
        }
      });
    }, {
      threshold: 0.2 // Se considera fuera si menos del 20% es visible
    });

    videoObserver.observe(video);
  }

  // 6. Si el usuario hace clic en los enlaces de navegación del menú:
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetHref = link.getAttribute('href');
      if (targetHref !== '#video-seccion' && !video.paused) {
        video.pause();
      }
    });
  });
}

window.toggleVideoFullscreen = function() {
  const video = document.getElementById('weddingVideoPlayer');
  if (!video) return;

  if (!document.fullscreenElement) {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
