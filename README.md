# 💍 Boda Gloria & Marco - Página Web Oficial & Pase Digital Interactivo

Página web nupcial de gala y sistema de pase digital interactivo desarrollada con diseño **Mobile-First**, arquitectura limpia organizada en carpetas, animación cinematográfica de sobre de invitación y estética de alta costura nupcial.

---

## 📁 Estructura del Proyecto (Optimizado para GitHub Pages ~9.9 MB)

El proyecto completo pesa **menos de 10 MB** (muy por debajo del límite de 1 GB de GitHub Pages y 100 MB por archivo). Esto permite que tanto el audio como el video se reproduzcan de forma nativa e instantánea con sincronización perfecta entre sí.

```text
BODA_GLORIA_Y_MARCO/
│
├── index.html                  # Invitación formal y pase interactivo
├── README.md                   # Documentación y guía del proyecto
│
├── audio/
│   └── cancion.mpeg            # Canción oficial preferida de los novios (3.9 MB)
│
├── css/
│   └── styles.css              # Hoja de estilos de gala nupcial & animaciones 3D
│
├── imag/
│   ├── 001.jpg                 # Fotografía de los novios que emerge del sobre
│   └── 01.jpeg                 # Fotografía de portada de los novios (Hero & Pase)
│
├── js/
│   └── app.js                  # Lógica interactiva, control de sobre, sync de audio/video, QR y PDF
│
└── video/
    └── video_novios.mp4        # Video especial optimizado para web (5.5 MB)
```

### ☁️ Servicios Conectados en la Nube
- **Base de Datos de Invitados (Google Sheets en vivo)**: [Ver Hoja en Google Sheets](https://docs.google.com/spreadsheets/d/1Z259LPWHXvQXcWFg9v7qR2VWwE3vl9rQ/edit?usp=sharing)
- **Copia de Respaldo del Video (Google Drive)**: [Ver en Google Drive](https://drive.google.com/file/d/1_a0LYkCTgFFct6fBYbT5ONjBj5j7VjXW/view?usp=sharing)

---

## 🌟 Características Principales

1. **Animación Inicial de Entrada (Sobre de Invitación)**:
   - Al cargar la página, aparece un sobre de invitación de gala sellado.
   - Cuenta con un **botón redondo de sello de cera dorada** con monograma `G & M`.
   - Al dar clic sobre el botón redondo:
     * Inicia de inmediato la reproducción de la canción `audio/cancion.mpeg`.
     * La solapa superior se abre en perspectiva 3D.
     * Emerge deslizándose la fotografía de los novios `imag/001.jpg`.
     * La animación dura **3 segundos**, tras los cuales se desvanece suavemente para revelar toda la página web con la música continuando en reproducción armónica.

2. **Portada de Honor & Imagen Superior**:
   - Fotografía `imag/01.jpeg` enmarcada en un arco arquitectónico nupcial con iluminación dorada sutil y tipografía de gala (*Great Vibes* y *Playfair Display*).
   - Nombres de los novios, bendición y versículo romántico.

3. **Reproductor de Música / Canción Preferida**:
   - Widget flotante con animación de vinilo giratorio y ecualizador de ondas sonoras.
   - Sincronizado automáticamente con la canción iniciada desde el sobre de bienvenida.

4. **Video Especial de los Novios**:
   - Reproductor multimedia integrado en `video/video_novios.mp4` con subtítulo romántico y opción de pantalla completa.

5. **Cuenta Regresiva & Guardar Fecha**:
   - Reloj dinámico en vivo con Días, Horas, Minutos y Segundos.
   - Botones para agendar en **Google Calendar** y descargar archivo **.ics** para Apple Calendar / Outlook.

6. **Itinerario del Evento (Timeline)**:
   - Cronograma nupcial paso a paso con íconos elegantes (Ceremonia, Cóctel, Banquete, Vals y Fiesta).

7. **Ubicación & Navegación GPS**:
   - Lugar: **EL BÚHO NUEVE** (Lebrija, Santander, Colombia).
   - Mapa interactivo de Google Maps embebido con coordenadas exactas.
   - Enlace directo a Google Maps: `https://maps.app.goo.gl/goeLVz2qetJhEaPS7`.
   - Botón directo de navegación GPS en **Waze**.

8. **Detalles & Recomendaciones**:
   - **Código de Vestimenta (Dress Code)**: Formal / Rigurosa Etiqueta con paleta de colores sugerida.
   - **Mesa de Regalos / Lluvia de Sobres**: Buzón en la recepción y cuenta Nequi N.º 3175419845 (Marco Aurelio Ortiz Ardila) con botón de copiado rápido.
   - **Recomendaciones**: Solo adultos, puntualidad, ceremonia unplugged y hashtag oficial `#BodaGloriaYMarco`.

9. **Pase Digital de Acceso en PDF**:
   - Tarjeta de invitación digital con nombres, foto de los novios, número de pases, código QR dinámico y sello de cera monogramado.
   - **Generador de PDF**: Descarga directa en formato PDF tamaño A5 con calidad de imprenta usando `html2pdf.js`.
   - **Visor de Pantalla Completa**: Modal de gala para visualizar el pase.
   - Opción para reenviar el pase por **WhatsApp**.

10. **Confirmación de Asistencia (RSVP)**:
    - Formulario formal con guardado local de respuestas.
    - Botón directo para confirmar vía **WhatsApp** con mensaje automático preconfigurado.

---

## 📱 Optimización para Móviles
El sitio fue concebido con enfoque **Mobile-First**:
- Touch-targets generosos en el botón redondo y todas las tarjetas.
- Adaptabilidad total en iPhone, Android, tablets y ordenadores.

---

## 🛠️ Cómo Visualizarlo
Solo haz doble clic en `index.html` o ábrelo con cualquier navegador web.
