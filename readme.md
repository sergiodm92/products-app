# Proyecto Full-Stack

Este proyecto incluye una aplicación full-stack con un front-end desarrollado en Next.js y un back-end desarrollado en NestJS.

## Tabla de Contenidos

- Requisitos
- Instalación
- Configuración
- Ejecución
- Scripts Disponibles
- Estructura del Proyecto

## Requisitos

- Node.js (versión 14 o superior)
- Yarn (opcional, se puede usar npm)
- MongoDB (instancia local o cluster)

## Instalación

Clona el repositorio y navega a los directorios correspondientes para instalar las dependencias tanto del front-end como del back-end.

```bash
git clone https://github.com/sergiodm92/scalboost-Prueba-3.git

cd scalboost-Prueba-3

# Instalación de dependencias para el front-end
cd client
yarn install  # o npm install

# Instalación de dependencias para el back-end
cd ../api
yarn install  # o npm install

```

## Configuración
- Para configurar el back-end, crea un archivo .env basado en el archivo .env.template y configura la variable MONGODB con la URL de tu instancia de MongoDB.

- Para configurar el front-end, crea un archivo .env.local basado en el archivo .env.local.template y configura la variable NEXT_PUBLIC_API_URL con la URL de tu instancia de NestJS.

## Ejecución
Para ejecutar el back-end, ejecuta el siguiente comando en la carpeta api:
```bash
yarn start:dev
```
Para ejecutar el front-end, ejecuta el siguiente comando en la carpeta client:
```bash
yarn run dev
```

## Notas
- Asegúrate de que tu instancia de MongoDB esté en funcionamiento antes de iniciar el back-end.
- Al iniciar el back-end, se crearan automaticamente una lista de productos y categorías en la base de datos.

## Documentación Backend

- Para obtener información sobre el uso de la API, consulta la documentación de swagger una vez inicializado el proyecto en http://localhost:7000/api/docs o {base_api_url}/api/docs.