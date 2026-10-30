# Urbay Publicidad

Sitio web oficial de **Urbay Publicidad**, desarrollado con HTML, CSS y JavaScript puro. No requiere instalación, base de datos ni servicios de pago para funcionar. Está publicado en **https://urbaypublicidad.com**.

## Funciones principales

- Diseño moderno, adaptable a computadora, tableta y celular.
- Paleta oficial: azul `#0D1C6B`, naranja `#E14F0B`, azul claro `#0E9BD9` y blanco.
- Secciones de Inicio, Nosotros, Catálogo de Servicios, Clientes, Cotizaciones y Contacto.
- Carrusel automático y táctil con once servicios.
- Portafolio filtrable por once categorías, con veintiocho proyectos y visor ampliado.
- Sección de clientes con tres banners horizontales de desplazamiento infinito en direcciones alternadas, preparada para integrar logotipos oficiales.
- Inicio de pantalla completa con una fachada moderna de Urbay, logotipo integrado y contenido legible sobre la imagen.
- Pestañas interactivas para Misión, Visión y Valores.
- Asistente emergente con preguntas frecuentes.
- Formulario que genera una ficha de cotización y la envía al WhatsApp 232 119 1660.
- Ubicación integrada con Google Maps.
- Accesibilidad básica, navegación con teclado y modo de movimiento reducido.

## Servicios incluidos

1. Diseño gráfico
2. Anuncios luminosos
3. Letras 3D
4. Acrílicos y neón
5. Señalética
6. Lonas y toldos
7. Papelería
8. Recorte de vinil
9. Souvenirs
10. Productos corporativos
11. Impresión profesional

## Archivos principales

```text
index.html
CNAME
assets/
  styles.css
  script.js
  urbay-logo-transparent.png
  urbay-fachada-banner.jpg
  urbay-hero-facade-v2.webp
  service-signage.jpg
  service-print.jpg
  service-brand.jpg
  portfolio-*.webp
```

El archivo `CNAME` contiene el dominio `urbaypublicidad.com`. **No debe borrarse ni modificarse**, porque GitHub Pages lo usa para servir el sitio con el dominio propio.

## Modificar el sitio

### Opción 1: editar directamente en GitHub

1. Abre el archivo que quieras cambiar en el repositorio.
2. Pulsa el ícono del lápiz (o presiona la tecla `.` para abrir el editor en el navegador).
3. Haz el cambio y pulsa **Commit changes** con un mensaje breve que describa lo que modificaste.

### Opción 2: trabajar en la computadora

1. Clona el repositorio una sola vez:
   `git clone https://github.com/patty2026/urbay-publicidad.git`
2. Abre la carpeta en Visual Studio Code.
3. Antes de empezar a trabajar, trae los cambios más recientes:
   `git pull origin main`
4. Edita los archivos y revisa el resultado en tu navegador o con la extensión Live Server.
5. Sube los cambios:
   `git add .`
   `git commit -m "descripción del cambio"`
   `git push origin main`

### Qué archivo editar

- Textos y secciones: `index.html`
- Colores, tamaños y distribución: `assets/styles.css`
- Carrusel, asistente o formulario: `assets/script.js`

Para agregar trabajos al portafolio, duplica una tarjeta dentro de `#portfolio-gallery`, asigna su categoría con `data-portfolio-category` y guarda la fotografía optimizada en `assets/`. Las imágenes actuales del portafolio usan el prefijo `portfolio-`.

El número internacional de WhatsApp está en la constante `whatsappNumber` de `assets/script.js`. Si cambia, también deben actualizarse los enlaces `wa.me` de `index.html`.

## Publicación con GitHub Pages y dominio propio

El sitio se publica gratis con **GitHub Pages** desde la rama `main`, carpeta raíz (`/`). Cada cambio enviado a `main` se publica automáticamente en uno o dos minutos.

**Configuración en GitHub** (Settings → Pages):

- Source: Deploy from a branch, rama `main`, carpeta `/ (root)`.
- Custom domain: `urbaypublicidad.com`.
- Enforce HTTPS: activado.

**Configuración del dominio** (registrado en Namecheap, sección Advanced DNS → Host Records):

| Tipo | Host | Valor |
|---|---|---|
| A Record | `@` | `185.199.108.153` |
| A Record | `@` | `185.199.109.153` |
| A Record | `@` | `185.199.110.153` |
| A Record | `@` | `185.199.111.153` |
| CNAME Record | `www` | `patty2026.github.io` |

La dirección anterior, `https://patty2026.github.io/urbay-publicidad`, redirige al dominio propio.

## Mantenimiento del dominio

- El dominio `urbaypublicidad.com` se registró por un año en Namecheap, con renovación automática y privacidad del dominio activadas.
- A partir del segundo año se cobra el precio regular de renovación, por lo que conviene mantener un método de pago vigente en la cuenta.
- No se deben modificar los registros DNS ni borrar el archivo `CNAME`, ya que el sitio dejaría de abrir con el dominio.

## Contacto configurado

- WhatsApp: 232 119 1660
- Teléfono adicional: 232 113 3179
- Correo: valladolidurbay@hotmail.com
- Dirección: Boulevard Alfinio Flores Beltran, esquina Guillermo Prieto, Col. Melchor Ocampo, C. P. 93600, Martínez de la Torre, Veracruz, México.
- Facebook: https://www.facebook.com/urbaypublicidad
- Instagram: https://www.instagram.com/urbaypublicidadblicidad
