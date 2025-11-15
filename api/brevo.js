// Vercel Edge Function para Brevo
// Ubicación: /api/brevo.js

export const config = {
  runtime: 'edge',
}

export default async function handler(req) {
  // Configurar CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // Manejar preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  // Solo permitir POST
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }

  try {
    // Obtener variables de entorno
    const BREVO_API_KEY = process.env.BREVO_API_KEY
    const BREVO_LIST_ID = process.env.BREVO_LIST_ID || '3'
    const BREVO_API_BASE_URL = 'https://api.brevo.com/v3'

    // Validar API key
    if (!BREVO_API_KEY) {
      console.error('API key no configurada')
      return new Response(
        JSON.stringify({ error: 'API key no configurada' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Obtener datos del formulario
    const body = await req.json()
    const { name, email, date, neighborhood, age, pack, message } = body

    // Validar datos requeridos
    if (!name || !email || !date || !neighborhood || !age || !pack) {
      console.error('Datos faltantes:', { name, email, date, neighborhood, age, pack })
      return new Response(
        JSON.stringify({ error: 'Faltan campos requeridos' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Dividir el nombre en firstName y lastName
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Preparar atributos para Brevo
    const attributes = {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      FECHA_EVENTO: date,
      BARRIO: neighborhood,
      EDAD_PEQUE: age,
      PACK: pack,
      MENSAJE: message || '',
    }

    const payload = {
      email,
      attributes,
      listIds: [parseInt(BREVO_LIST_ID, 10)],
      updateEnabled: true,
    }

    console.log('Payload para crear contacto:', payload)

    // Llamar a la API de Brevo
    const brevoResponse = await fetch(`${BREVO_API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    })

    console.log('Respuesta de Brevo:', brevoResponse.status, brevoResponse.statusText)

    if (!brevoResponse.ok) {
      let errorMessage = `Error ${brevoResponse.status}: ${brevoResponse.statusText}`
      try {
        const errorData = await brevoResponse.json()
        errorMessage = errorData.message || errorData.error || brevoResponse.statusText
        console.error('Error de Brevo:', errorData)
      } catch (e) {
        const responseText = await brevoResponse.text()
        console.error('Error parsing error response:', responseText)
      }

      return new Response(
        JSON.stringify({ error: errorMessage }),
        {
          status: brevoResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Éxito
    let result
    try {
      result = await brevoResponse.json()
      console.log('Contacto creado exitosamente:', result)
    } catch (e) {
      console.log('Contacto creado pero respuesta no válida')
      result = { success: true }
    }

    return new Response(
      JSON.stringify({ success: true, data: result }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error en función Brevo:', error)
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
}
