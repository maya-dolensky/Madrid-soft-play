// Endpoint simple para Railway/Render
// Este archivo es solo de referencia - se despliega en Railway

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/brevo', async (req, res) => {
  try {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_LIST_ID = process.env.BREVO_LIST_ID || '3';

    if (!BREVO_API_KEY) {
      return res.status(500).json({ error: 'API key no configurada' });
    }

    const { name, email, date, neighborhood, age, pack, message } = req.body;

    if (!name || !email || !date || !neighborhood || !age || !pack) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const attributes = {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      FECHA_EVENTO: date,
      BARRIO: neighborhood,
      EDAD_PEQUE: age,
      PACK: pack,
      MENSAJE: message || '',
    };

    const payload = {
      email,
      attributes,
      listIds: [parseInt(BREVO_LIST_ID, 10)],
      updateEnabled: true,
    };

    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json().catch(() => ({}));
      return res.status(brevoResponse.status).json({
        error: errorData.message || errorData.error || 'Error al crear contacto',
      });
    }

    const result = await brevoResponse.json().catch(() => ({ success: true }));
    return res.json({ success: true, data: result });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

