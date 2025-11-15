module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;

    if (!apiKey || !listId) {
      return res.status(500).json({ 
        error: 'Server configuration error' 
      });
    }

    const { name, email, date, neighborhood, age, pack, message } = req.body;

    if (!name || !email || !date || !neighborhood || !age || !pack) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

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

    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });

    if (!brevoResponse.ok) {
      const brevoResult = await brevoResponse.json().catch(() => ({}));
      
      if (brevoResponse.status === 400 && brevoResult.code === 'duplicate_parameter') {
        // Contacto existe, actualizar
        const updateResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
          method: 'PUT',
          headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            attributes: contactData.attributes,
            listIds: contactData.listIds
          })
        });

        if (!updateResponse.ok) {
          return res.status(500).json({ 
            error: 'Error processing request' 
          });
        }
      } else {
        return res.status(500).json({ 
          error: 'Error processing request' 
        });
      }
    }

    return res.status(200).json({ 
      success: true,
      message: 'Form submitted successfully' 
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
};
