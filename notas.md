# Dependencias:

npm i jest enzyme enzyme-adapter-react-16 --save-dev

- Enzyme es una libreria que nos facilitará trabajar con las pruebas y los componentes creados con react
- Enzyme-adapter es un adaptador necesario para utilizar enzyme

# Editar package.json:

Dentro de "scripts", añadir:
    "test": "jest",
    "test:watch": "jest --watch"

Para que se muestren los títulos de cada test, añadir dentro de "jest": { "verbose": true,}

### Deshabilitar error e dev-dependencies

En .eslintrc:
"rules": {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "react/jsx-filename-extension": 0,
...
}

# Archivos adicionales:

Crear la carpeta __test__ dentro de la carpeta src, y dentro de ella, el archivo setupTest.js que contendrá la configuración del adaptador de de enzyme

# Error en el mount

" It looks like you called `mount()` without a global document being loaded."

Añadir en la configuración de jest:
"testEnvironment": "jsdom"

# Mocks

## Estilos

En primer lugar, Jest no sabe trabajar bien con los archivos de estilos, con lo cual es necesario implementar un mock para que pueda ejecutar las pruebas sin inconvenientes. 

Para ello se crea dentro de scr, una carpeta llamada __mocks__ y un archivo en su interior (styleMock.js) el cual contendrá un módulo vacío.

También es necesario modificar la configuración de jest en el package.json ("moduleNameMapper")

"\\.(styl|css)$" le dice que al encontrarse con archivos del tipo .styl o .css, aplique el styleMock creado.

## Redux

Para trabajar con redux, es necesario crear un mock del provider, con la cual yo tnego que pasarle un estado inicial y todo lo necesario para simular la accion

### Actions

Creamos la carpeta actions dentro de __test__ y dentro de ella el test

## Fetch

Para simular la petición fetch en el test, debemos instalar "jest-fetch-mock", lo cual nos ayudará a crear el mock correspondiente.

Tambien, dentro de la configuración (setupTest.js), colocar "global.fetch = require('jest-fetch-mock');". Esto permite capturar las pticiones sin necesidad de ejecutar el fetch dentro del navegador.

## Axios

Para testear con una librería como Axios, hay que llamar las funciones que creadas con Axios en lugar de las creadas con fetch

Función con Axios:

export const searchTrack = (songName, sort) =>
  axios.get(`localhost:3000/search-tracks/${songName}/${sort}`);
Test de la promesa creada con Axios:

test("Search a term and get the response as array", () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));

    searchTrack("Dear friend", "desc").then((response) => {
      return expect(response.data).toEqual([]);
    });
  });

# SnapShots

Cuando se deben testear componentes que no tienen lógica, sino que son estáticos y representan una estructura visual solamente, se utilizan los snapshots para testear la UI del componente.

En caso de que un componente deba ser actualizado para cumplir algun nuevo requerimiento, se debe ejecutar en la terminal "jest --updateSnapshot", para que los snapshots existentes se actualizen y las pruebas se comparen con la nueva UI.

# Travis CI + deployment

CI: Continuous Integration

Permite automatizar el proceso de enviar a producción el proyecto. Para ello utilizamos Travis CI.
Travis permite ver y comprobar que las pruebas estén cumpliendose, y enviar el proyecto a produccion una vez cumplidas.

Travis ofrece todos los requisitos para crear un entorno capaz de clonar el repositorio, prepararlo para poder trabajar, correr las pruebas en eun máquina virtual y una vez cumpldidas, procederá a enviarlo a produccion

Documentación: https://docs.travis-ci.com/user/languages/javascript-with-nodejs/

### Pasos a seguir:

- Iniciar sesión o registrarse en Travis
- Aceptar los permisos para poder conectar con la cuenta de Github (Travis permite hacer el deploy para repositorios públicos gratuitamente)
- Generar el archivo .travis.yml en el directorio raíz
- En las Settings de Travis, sincronizamos con Github (botón Sync account) y luego buscamos el repositorio que estamos trabajando
- En las settings de ese repo debemos añadir el GITHUB_TOKEN
- En Github, dentro de Settings > Developer settings, generamos un nuevo Personal Access tokens, le damos un nombre y accesos al repo y a un hook que se encuentra en admin:repo_hook, opción read:repo_hook
- Copiamos el token y lo añadimos en Travis, con el nombre GITHUB_TOKEN

### Problemas con el deploy

Si cuando ven el proyecto en GitHub pages les aparece la pantalla de Not Found se debe a un problema de la organización de las rutas dentro del proyecto.
.
Al desplegar en travis, la ruta inicial se coloca automáticamente en: https://<TU_NOMBRE_DE_USUARIO>.github.io/<NOMBRE_DEL_REPOSITORIO>
.
Se genera un conflico ya que en el proyecto se indica que se inicia en / y travis lo coloca en lo dicho anteriormente.
.
Cómo solucionarlo:

Entren a su proyecto, luego a la carpeta src y routes.
En el archivo app se van a encontrar con la rutas del proyecto. La ruta inicial es esta:
 <Route exact path="/" component={Home} />
Se debe cambiar ese path inicial (/) por el nombre de su repositorio.
 <Route exact path="<NOMBRE_DEL_REPOSITORIO>" component={Home} />
Al darle click sobre el logo también nos seguira llevando al NotFound. Debemos ingresar al componente Header y cambiar la ruta de ese enlace. Además, deberemos actualizar el snapshot del componente Header.
<h1 className="Header-title">
      <Link to="<NOMBRE_DEL_REPOSITORIO>">
        Platzi Store
      </Link>
 </h1>
.
Con esto ya se vera todo normal.