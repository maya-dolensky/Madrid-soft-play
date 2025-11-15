export default async function handler(req, res) {
  // Log para debugging
  console.log('Function called:', req.method, req.url);
  
  // Configurar CORS primero
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir POST después de manejar OPTIONS
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
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
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

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
      updateEnabled: true
    };

    // Llamar a la API de Brevo
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(contactData)
    });

    let brevoResult;
    try {
      brevoResult = await brevoResponse.json();
    } catch (e) {
      const text = await brevoResponse.text();
      console.error('Brevo response not JSON:', text);
      brevoResult = { code: 'unknown', message: text };
    }

    if (!brevoResponse.ok) {
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
            let updateError;
            try {
              updateError = await updateResponse.json();
            } catch (e) {
              updateError = { message: await updateResponse.text() };
            }
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
