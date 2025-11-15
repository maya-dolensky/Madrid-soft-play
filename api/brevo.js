// Vercel Serverless Function para Brevo
// Ubicación: /api/brevo.js

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Configuración de Brevo
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_LIST_ID = process.env.BREVO_LIST_ID || 3;
  const BREVO_API_BASE_URL = 'https://api.brevo.com/v3';

  // Validar API key
  if (!BREVO_API_KEY) {
    console.error('API key no configurada');
    return res.status(500).json({ error: 'API key no configurada' });
  }

  console.log('Método:', req.method);
  console.log('URL:', req.url);
  console.log('Body:', req.body);

  try {
    if (req.method === 'POST') {
      // Obtener datos del formulario
      const { name, email, date, neighborhood, age, pack, message } = req.body;

      // Validar datos requeridos
      if (!name || !email || !date || !neighborhood || !age || !pack) {
        console.error('Datos faltantes:', { name, email, date, neighborhood, age, pack });
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      // Dividir el nombre en firstName y lastName
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Preparar atributos para Brevo
      const attributes = {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        FECHA_EVENTO: date,
        BARRIO: neighborhood,
        EDAD_PEQUE: age,
        PACK: pack,
        MENSAJE: message || ''
      };

      const payload = {
        email,
        attributes,
        listIds: [parseInt(BREVO_LIST_ID)],
        updateEnabled: true
      };

      console.log('Payload para crear contacto:', payload);

      const response = await fetch(`${BREVO_API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY
        },
        body: JSON.stringify(payload)
      });

      console.log('Respuesta de crear contacto:', response.status, response.statusText);

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || response.statusText;
          console.error('Error de Brevo al crear:', errorData);
        } catch (e) {
          console.error('Error parsing error response:', e);
          const responseText = await response.text();
          console.log('Response text:', responseText);
        }
        return res.status(response.status).json({
          error: errorMessage
        });
      }

      try {
        const result = await response.json();
        console.log('Contacto creado exitosamente:', result);
        return res.json({ success: true, data: result });
      } catch (e) {
        console.error('Error parsing success response:', e);
        const responseText = await response.text();
        console.log('Response text:', responseText);
        return res.json({ success: true, message: 'Contacto creado exitosamente' });
      }

    } else {
      console.log('Método no permitido:', req.method);
      return res.status(405).json({ error: 'Método no permitido' });
    }

  } catch (error) {
    console.error('Error en función Brevo:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
