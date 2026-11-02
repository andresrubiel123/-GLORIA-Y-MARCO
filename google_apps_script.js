/**
 * CÓDIGO GOOGLE APPS SCRIPT PARA GOOGLE SHEETS
 * Boda Gloria & Marco - Lista Oficial de Confirmados
 *
 * Instrucciones:
 * 1. En tu Google Sheet, ve a: Extensiones > Apps Script
 * 2. Borra el código actual y pega este contenido.
 * 3. Haz clic en "Guardar" (icono de disquete).
 * 4. Haz clic en "Implementar" (botón azul arriba a la derecha) > "Administrar implementaciones".
 * 5. Haz clic en el lápiz (Editar) de la versión activa, selecciona "Nueva versión", y haz clic en "Implementar".
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Fecha y hora formateada en zona horaria Colombia (GMT-5)
    var fechaStr = Utilities.formatDate(new Date(), "America/Bogota", "dd/MM/yyyy, hh:mm a");

    var attendance = (data.attendance || "SI").toString().toUpperCase();
    var isAttending = attendance === "SI" || attendance.indexOf("SÍ") !== -1;

    // 1. Hoja principal: "Confirmados (Asistencia SÍ)"
    if (isAttending) {
      var sheetSi = ss.getSheetByName("Confirmados (Asistencia SÍ)") || ss.getSheets()[0];
      var nextRowSi = sheetSi.getLastRow() + 1;
      // Fila 1 es título, fila 2 vacía, fila 3 encabezados -> El consecutivo inicia en 1 para la fila 4
      var consecutivoSi = Math.max(1, nextRowSi - 3);

      sheetSi.appendRow([
        consecutivoSi,                                    // Col A: N°
        fechaStr,                                         // Col B: Fecha y Hora
        data.name || "Invitado",                          // Col C: Nombre Completo
        data.phone ? "'" + data.phone : "",               // Col D: Teléfono / Celular (con ' para preservar formato)
        "SÍ",                                             // Col E: ¿Asistirá?
        Number(data.tickets) || 2,                        // Col F: Pases
        data.song || "",                                  // Col G: Canción Solicitada
        data.message || "",                               // Col H: Dedicatoria / Mensaje
        data.codigoPase || "PAS-GM-2026"                  // Col I: Código Pase Digital
      ]);
    }

    // 2. Hoja secundaria: "Todas las Respuestas" (si existe)
    var sheetAll = ss.getSheetByName("Todas las Respuestas");
    if (sheetAll) {
      var nextRowAll = sheetAll.getLastRow() + 1;
      var consecutivoAll = Math.max(1, nextRowAll - 3);

      sheetAll.appendRow([
        consecutivoAll,                                   // Col A: N°
        fechaStr,                                         // Col B: Fecha y Hora
        data.name || "Invitado",                          // Col C: Nombre Completo
        data.phone ? "'" + data.phone : "",               // Col D: Teléfono / Celular
        isAttending ? "SÍ" : "NO",                        // Col E: ¿Asistirá?
        isAttending ? (Number(data.tickets) || 2) : 0,    // Col F: Pases
        data.song || "",                                  // Col G: Canción Solicitada
        data.message || "",                               // Col H: Dedicatoria / Mensaje
        data.codigoPase || "PAS-GM-2026"                  // Col I: Código Pase Digital
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Registro guardado correctamente" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
