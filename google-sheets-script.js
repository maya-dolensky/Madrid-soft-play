// Google Apps Script para recibir datos del formulario
// Copia y pega este código en Google Apps Script
// IMPORTANTE: Con no-cors, esta función debe funcionar sin devolver respuesta visible

function doPost(e) {
  try {
    // Obtener la hoja de cálculo por ID
    const SPREADSHEET_ID = '1CoICvYaKoWSaNLe4j2p5PwhVRxaaEjwv5P67PNJG3sk';
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Parsear los datos recibidos
    const data = JSON.parse(e.postData.contents);
    const { name, email, date, neighborhood, age, pack, message } = data;
    
    // Validar datos requeridos
    if (!name || !email || !date || !neighborhood || !age || !pack) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Faltan campos requeridos'
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
    }
    
    // Agregar fila con los datos
    // Ajusta el orden de las columnas según tu hoja de cálculo
    const row = [
      new Date(), // Timestamp
      name,
      email,
      date,
      neighborhood,
      age,
      pack,
      message || ''
    ];
    
    sheet.appendRow(row);
    
    // Respuesta exitosa con headers CORS
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Datos guardados correctamente'
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    
  } catch (error) {
    // Manejo de errores
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
  }
}

// Función para manejar OPTIONS (CORS preflight)
function doOptions() {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

