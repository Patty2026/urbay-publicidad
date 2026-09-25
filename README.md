# Urbay Publicidad

Sitio web oficial de **Urbay Publicidad**, desarrollado con HTML, CSS y JavaScript puro. No requiere instalación, base de datos ni servicios de pago.

## Funciones principales

- Diseño moderno, adaptable a computadora, tableta y celular.
- Paleta oficial: azul `#0D1C6B`, naranja `#E14F0B`, azul claro `#0E9BD9` y blanco.
- Secciones de Inicio, Nosotros, Servicios, Portafolio, Cotizaciones y Contacto.
- Carrusel automático y táctil con once servicios.
- Portafolio filtrable por siete categorías de trabajo.
- Pestañas interactivas para Misión, Visión y Valores.
- Asistente emergente con preguntas frecuentes.
- Formulario que genera una ficha de cotización y la envía al WhatsApp 232 119 1660.
- Ubicación integrada con Google Maps.
- Accesibilidad básica, navegación con teclado y modo de movimiento reducido.

## Servicios incluidos

1. Diseño gráfico
2. Anuncios luminosos
3. Letras 3D
4. Letreros LED y acrílicos
5. Señalética
6. Lonas y toldos
7. Diseño de logotipos
8. Publicidad para redes sociales
9. Papelería
10. Recorte de vinil
11. Souvenirs personalizados

## Archivos principales

```text
index.html
assets/
  styles.css
  script.js
  urbay-logo-transparent.png
  service-signage.jpg
  service-print.jpg
  service-brand.jpg
```

## Modificar el sitio

1. Clona o descarga el repositorio.
2. Abre la carpeta en Visual Studio Code.
3. Cambia textos y secciones en `index.html`.
4. Ajusta colores, tamaños y distribución en `assets/styles.css`.
5. Modifica el carrusel, asistente o formulario en `assets/script.js`.
6. Revisa `index.html` en tu navegador o con la extensión Live Server.

Para agregar trabajos reales, sustituye las tarjetas dentro de `#portafolio` y guarda las fotografías optimizadas en `assets/`.

El número internacional de WhatsApp está en la constante `whatsappNumber` de `assets/script.js`. Si cambia, también deben actualizarse los enlaces `wa.me` de `index.html`.

## Publicar gratis con Cloudflare Pages

1. Crea una cuenta gratuita en Cloudflare.
2. Abre **Workers & Pages**.
3. Selecciona **Create application → Pages → Connect to Git**.
4. Conecta GitHub y elige el repositorio `urbay-publicidad`.
5. Selecciona **None** como framework.
6. Deja vacío el comando de compilación.
7. Usa `/` como directorio de salida.
8. Selecciona **Save and Deploy**.

Cloudflare asignará una dirección gratuita terminada en `.pages.dev`. Los cambios enviados a la rama `main` podrán publicarse automáticamente.

## Contacto configurado

- WhatsApp: 232 119 1660
- Teléfono adicional: 232 113 3179
- Correo: valladolidurbay@hotmail.com
- Dirección: Boulevard Alfinio Flores Beltran, esquina Guillermo Prieto, Col. Melchor Ocampo, C. P. 93600, Martínez de la Torre, Veracruz, México.
- Facebook: https://www.facebook.com/urbaypublicidad
- Instagram: https://www.instagram.com/urbaypublicidad
