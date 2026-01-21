
import { GoogleGenAI } from "@google/genai";
import { Language } from '../types';

/**
 * CONFIGURACIÓN DE API KEY
 * ------------------------------------------------------------------
 * Si esta constante está vacía o es el placeholder, el chat funcionará
 * en "Modo Básico" (respuestas predefinidas sin IA).
 * Para activar la IA real, coloca tu clave aquí.
 * ------------------------------------------------------------------
 */
const API_KEY = 'TU_API_KEY_DE_GOOGLE_AI_STUDIO_AQUI'; 

const SYSTEM_INSTRUCTION = `
Eres el Chatbot del portafolio de Lucas Daniel Román.

OBJETIVO PRINCIPAL
Tu función principal es ayudar a los visitantes a conocer mejor a Lucas Román como profesional: su experiencia, habilidades, formación, proyectos y forma de trabajar. Estás dentro de su portfolio web, no eres un chatbot genérico.

TONO
- Cuando respondas en español:
  - Habla en español neutro.
  - Sé claro, profesional y cercano.
  - Usa frases cortas y fáciles de leer.
  - Puedes usar “vos” o “tú”, pero mantené coherencia.
- Cuando respondas en inglés:
  - Usa English for international tech/professional context.
  - Be clear, concise and professional.
  - Avoid slang and keep a neutral, global tone.

IDENTIDAD DEL DESARROLLADOR

Datos personales:
- Nombre completo: Lucas Daniel Román
- Profesión: Programador / Software Developer
- Ubicación: Salta (CP 4400), Argentina
- Teléfono: 387-4404472
- Correo electrónico: lucasromanh@gmail.com
- LinkedIn: lucasromanh

ACTUALIDAD Y TRABAJOS ACTIVOS (2026 - Presente)
1) Vectra Group (Sistemas ISO 14001) - 2026 a Actualidad
   - Encargado de trabajar con la norma ISO 14001 (Estándar internacional para Sistemas de Gestión Ambiental).
   - Implementación tecnológica para cumplimiento normativo ambiental.

2) Municipalidad de Cachi (App Turística) - 2026 a Actualidad
   - Está desarrollando una aplicación móvil de circuitos turísticos audioguiados con geolocalización.

EXPERIENCIA RECIENTE Y PASADA
3) Municipalidad de Salta (Modernización del Estado) - 2024 a 2025 (Finalizado)
   - Creó y desarrolló la App oficial "Salta Municipalidad".
   - Trabajó en la modernización de procesos gubernamentales y sistemas digitales.

4) CEO – SALTACODERS (Dic 2022 – Presente)
   - *ESTADO ACTUAL:* En receso operativo durante el ciclo 2026.
   - Gestión y desarrollo de sistemas de organización.

5) Tutor – Academia CIMNE-IBER (Mayo 2022 – Dic 2023)
   - Recopilación y evaluación de trabajos de estudiantes.

6) Hotel Asturias – Cafayate (2022 – Actualidad, remoto)
   - Desarrollo de software y aplicaciones web.

7) Consultora Cognitia (CABA) (2024 – Actualidad, remoto)
   - Creación de sitio web y soporte técnico.

Habilidades principales:
- Desarrollo de software de gestión y dashboards.
- Desarrollo de aplicaciones web progresivas (PWA).
- Documentación de proyectos y análisis de modelos de negocio.
- Investigación y capacitación de usuarios.

Soft skills:
- Comunicación efectiva, Liderazgo, Resolución de problemas, Adaptabilidad, Pensamiento crítico.

Lenguajes y tecnologías:
- Python (Django/Flask)
- Java
- PHP (Laravel)
- JavaScript / TypeScript (React, Next.js)
- HTML, CSS, Sass, Tailwind
- MySQL, PostgreSQL
- GIS (Mapas) y Geolocalización
- Web3 (En aprendizaje)

Formación académica:
- Universidad Provincial de Administración, Tecnología y Oficios (UPATECO): Técnico en Desarrollo de Software (Finalizado 2025).
- Academia BA – Codo a Codo: Full Stack Python y PHP.

CÓMO DEBES RESPONDER

1) Preguntas sobre "Qué hace actualmente"
- Menciona prioritariamente Vectra Group (ISO 14001) y la App de Turismo de Cachi (ambos 2026).
- Aclara que el trabajo en la Municipalidad de Salta ya finalizó (creación de la App).
- Aclara que SaltaCoders está en receso.

2) Preguntas técnicas / de código
- Responde dudas simples. Si es complejo, sugiere contactar a Lucas.

3) Invitación a contacto
- Sugiere escribir a lucasromanh@gmail.com o LinkedIn.
`;

let aiClient: GoogleGenAI | null = null;

// Inicializar cliente solo si hay una key real
if (API_KEY && API_KEY !== 'TU_API_KEY_DE_GOOGLE_AI_STUDIO_AQUI') {
  aiClient = new GoogleGenAI({ apiKey: API_KEY });
}

// ---- MODO BÁSICO MEJORADO (SIMULACIÓN DE CONVERSACIÓN) ----
const getSimulatedResponse = (message: string, lang: Language): string => {
  const msg = message.toLowerCase();
  
  // --- ESPAÑOL ---
  if (lang === 'es') {
    
    // 1. Trabajos Actuales (Vectra, Muni, etc)
    if (msg.match(/actual|ahora|trabajo|muni|salta|cachi|vectra|iso|ambiente/)) {
        return "Para este ciclo 2026, Lucas está enfocado en:\n1. **Vectra Group**: Sistemas ISO 14001.\n2. **Municipalidad de Cachi**: App de turismo.\n\nEl trabajo en la Muni de Salta (App Oficial) finalizó en 2025.";
    }

    // 2. Servicios / Empresa
    if (msg.match(/empresa|negocio|contrat|ayuda|ofrece|servicio|hacer|valor|freelance|consult|desarroll/)) {
        return "Lucas desarrolla **Sistemas de Gestión a medida** y PWAs. Su enfoque es optimizar procesos operativos y transformar requerimientos de negocio en soluciones técnicas funcionales.";
    }

    // 3. Conocimientos
    if (msg.match(/conocimiento|sabe|habilidad|stack|tecnolog|lenguaje|estudio|aprende|formacion|python|react|php/)) {
        return "Lucas tiene un perfil técnico sólido:\n• **Backend:** Python (Django/Flask), PHP (Laravel).\n• **Frontend:** React, JavaScript, GIS (Mapas).\n• **Datos:** MySQL, Postgres.\n\nActualmente está profundizando en Web3.";
    }

    // 4. Proyectos
    if (msg.match(/proyecto|experiencia|hizo|creado|portafolio|web|app/)) {
        return "Entre sus proyectos más destacados están:\n1. **App Salta Municipalidad**: GovTech (Finalizado).\n2. **App Turismo Cachi**: Audio-guías (En curso).\n3. **GeoSurface Studio**: Visualización de datos.\n\nMira la sección 'PROYECTOS' para más detalles.";
    }

    // 5. Contacto
    if (msg.match(/contacto|comunicar|hablar|mail|correo|linkedin|telefono|llamar|donde/)) {
        return "La mejor forma de contactar con Lucas es:\n• Email: **lucasromanh@gmail.com**\n• LinkedIn: **/in/lucasromanh**";
    }

    // 6. Saludos
    if (msg.match(/\b(hola|buen|buenas|hey|que tal)\b/)) {
        return "¡Hola! Soy Botardo. Puedo contarte sobre los trabajos actuales de Lucas en 2026 (Vectra, Cachi), su experiencia pasada o cómo contactarlo.";
    }

    return "Entiendo tu mensaje, pero como estoy en modo básico (sin IA real conectada), prueba preguntarme:\n• '¿En qué trabaja actualmente?'\n• '¿Qué servicios ofrece?'\n• '¿Cómo lo contacto?'";
  } 
  
  // --- ENGLISH ---
  else {
    // 1. Current Work
    if (msg.match(/current|now|work|job|muni|vectra|iso|envir/)) {
        return "For the 2026 cycle, Lucas is focused on:\n1. **Vectra Group**: ISO 14001 Systems.\n2. **Cachi Municipality**: Tourism App.\n\nWork at Salta Municipality (Official App) finished in 2025.";
    }

    // 2. Services
    if (msg.match(/company|business|hire|contract|service|offer|help|do|build|develop/)) {
        return "Lucas develops **Custom Management Systems** and PWAs. He focuses on optimizing operational processes.";
    }

    // 3. Skills
    if (msg.match(/knowledge|know|skill|stack|tech|language|study|learn|education|react|python/)) {
        return "Lucas has a strong technical profile:\n• **Backend:** Python (Django/Flask), PHP (Laravel).\n• **Frontend:** React, GIS (Maps).\n• **Data:** MySQL, Postgres.\n\nHe is currently learning Web3.";
    }

    // 4. Projects
    if (msg.match(/project|experience|made|created|portfolio|web|app/)) {
        return "Some top projects include:\n1. **Salta Muni App**: GovTech (Finished).\n2. **Cachi Tourism App**: Audio-guides (Ongoing).\n3. **GeoSurface Studio**: Data visualization.\n\nCheck the 'PROJECTS' section for more.";
    }

    // 5. Contact
    if (msg.match(/contact|reach|talk|email|mail|linkedin|phone|call|where/)) {
        return "Reach Lucas via:\n• Email: **lucasromanh@gmail.com**\n• LinkedIn: **/in/lucasromanh**";
    }

    // 6. Greetings
    if (msg.match(/\b(hello|hi|hey|good|morning|afternoon)\b/)) {
        return "Hello! I'm Botardo. I can tell you about Lucas' current work in 2026, his past experience, or contact info.";
    }

    return "I understand, but in basic mode, try asking:\n• 'What is he working on now?'\n• 'What services does he offer?'\n• 'How do I contact him?'";
  }
};

export const sendMessageToGemini = async (
  message: string, 
  currentLang: Language,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
) => {
  // FALLBACK: Si no hay cliente configurado, usar modo básico
  if (!aiClient) {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      text: getSimulatedResponse(message, currentLang)
    };
  }

  try {
    const contextAwareMessage = `[CONTEXT: The user is currently viewing the portfolio in language mode: ${currentLang.toUpperCase()}]\n\n${message}`;

    const model = aiClient.models.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(contextAwareMessage);
    const response = await result.response;
    
    return { text: response.text() };

  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return {
       text: getSimulatedResponse(message, currentLang)
    };
  }
};
