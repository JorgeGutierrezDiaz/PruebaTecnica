# Registro de Empleados

Proyecto de registro de empleados desarrollado con Angular 13.

## Demostración

Explora la demo del proyecto en vivo: [Registro de Empleados Demo](https://657c64a6e346351e06cd2b48--inspiring-pavlova-352cf9.netlify.app/)


## Descripcion del proyecto

El proyecto "Registro de Empleados" es un sistema de gestión de empleados desarrollado en Angular 13. Permite realizar operaciones clave en el registro de empleados, como agregar, editar, eliminar y cambiar el estado. Incorpora características como búsqueda, paginación y alertas visuales.

## Características Principales

- **Registro de Empleados:** Agrega nuevos empleados con información detallada.
- **Edición de Empleados:** Permite editar la información de los empleados de manera sencilla.
- **Eliminación de Empleados:** Posibilita la eliminación de registros, con confirmación para evitar acciones accidentales.
- **Cambio de Estado:** Cambia el estado activo/inactivo de un empleado.
- **Búsqueda Rápida:** Implementa una barra de búsqueda para filtrar empleados por criterios específicos.
- **Paginación:** Ofrece un sistema de paginación para una mejor organización de los registros.
- **Configuración de Registros por Página:** Personaliza la cantidad de registros visualizados por página.
- **Inserción Rápida:** Facilita la inserción inmediata de múltiples registros.
- **Sistema de Alertas:** Utiliza alertas visuales y confirmaciones para mejorar la experiencia del usuario.
- **Persistencia de Datos:** Utiliza LocalStorage para almacenar datos y evitar la pérdida de información al recargar la página.


## Requisitos para su instalacion

- Node.js (versión 16.20.2)
- npm (versión 8.19.4)
- Angular CLI (versión 13.1.0)

## Dependencias y Plugins utilizados

- Angular 13
- Bootstrap 5.3
- Sweetalert2 11.10
- ngx-pagination
  
## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/JorgeGutierrezDiaz/PruebaTecnica.git
   cd PruebaTecnica

   ```

2. **Instala las dependencias:**
   Ejecuta el comando
   ```bash
   npm install
    ```

## Ejecutar el proyecto

Para ejecutar la aplicación abre la linea de comandos y ejecuta

```bash
 ng serve

```

Abre tu navegador y navega a http://localhost:4200/ para ver la aplicación.

# Estructura del Proyecto

## /src

Contiene el código fuente de la aplicación.

### /app

Directorio principal de la aplicación.

#### /app/pages

Contiene los componentes específicos de la aplicación.

#### /app/assets

Archivos estáticos como imágenes o estilos.

#### /app/core

Contiene servicios, modelos, pipes, validadores, etc.

