export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Verificar variables de entorno
    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;

    if (!apiKey || !listId) {
      console.error('Missing environment variables:', {
        hasApiKey: !!apiKey,
        hasListId: !!listId
      });
      return res.status(500).json({ 
        error: 'Server configuration error. Please contact the administrator.' 
      });
    }

    // Obtener datos del formulario
    const { name, email, date, neighborhood, age, pack, message } = req.body;

    // Validar datos requeridos
    if (!name || !email || !date || !neighborhood || !age || !pack) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    // Preparar datos para Brevo
    // Dividir el nombre en firstName y lastName si es posible
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Crear el cuerpo del mensaje con todos los detalles
    const emailBody = `
Nueva solicitud de información - Madrid Soft Play

Datos del contacto:
- Nombre: ${name}
- Email: ${email}
- Fecha del evento: ${date}
- Barrio: ${neighborhood}
- Edad del peque: ${age}
- Pack seleccionado: ${pack}
${message ? `- Mensaje adicional: ${message}` : ''}
    `.trim();

    // Datos para crear/actualizar contacto en Brevo
    const contactData = {
      email: email,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        FECHA_EVENTO: date,
        BARRIO: neighborhood,
        EDAD_PEQUE: age,
        PACK: pack,
        MENSAJE: message || ''
      },
      listIds: [parseInt(listId, 10)],
      updateEnabled: true // Actualizar contacto si ya existe
    };

    // Llamar a la API de Brevo para crear/actualizar contacto
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(contactData)
    });

    const brevoResult = await brevoResponse.json();

    if (!brevoResponse.ok) {
      // Si el contacto ya existe, Brevo devuelve 400, pero eso está bien
      if (brevoResponse.status === 400 && brevoResult.code === 'duplicate_parameter') {
        // El contacto ya existe, intentar actualizarlo
        try {
          const updateResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
            method: 'PUT',
            headers: {
              'api-key': apiKey,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              attributes: contactData.attributes,
              listIds: contactData.listIds
            })
          });

          if (!updateResponse.ok) {
            const updateError = await updateResponse.json();
            console.error('Error updating contact:', updateError);
            throw new Error('Error updating contact in Brevo');
          }
        } catch (updateError) {
          console.error('Error in update attempt:', updateError);
          return res.status(500).json({ 
            error: 'Error processing your request. Please try again later.' 
          });
        }
      } else {
        console.error('Brevo API error:', brevoResult);
        return res.status(500).json({ 
          error: 'Error processing your request. Please try again later.' 
        });
      }
    }

    // Éxito
    return res.status(200).json({ 
      success: true,
      message: 'Form submitted successfully' 
    });

  } catch (error) {
    console.error('Error in brevo handler:', error);
    return res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
}

