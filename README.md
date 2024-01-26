# Microservicios de la aplicación de cocina de Alegra configurada con AWS Lambda & Serverless Framework

## Descripción

Este proyecto son los microservicios que sirven de Backend para la aplicación de restaurante de Alegra, los cuáles se implementaran en la Jornada de Almuerzo Gratis. Estos microservicios se han desarrollado con AWS Lambda y Serverless Framework, por lo que para implementarlos es necesario tener una cuenta de AWS para poder hacer los despliegues de la infraestructura y de los servicios. Este sistema permite realizar ordenes de platillo, las cuáles deberán primero verificar la existencia de los ingredientes en el inventario. Sí existen los ingredientes las ordenes se procederán a preparar, en caso contrario se deberá realizar la compra al servicio del mercadito. Sí los ingredientes se logran comprar en el mercadito entonces el platillo se pondrá en preparación, sino deberá esperarse hasta que los ingredientes para ese platillo estén disponibles. Además, se podrán consultar el catálogo de platillos, el listado de ordenes, los ingredientes con sus cantidades disponibles en inventario, los movimientos del inventario de ingredientes y los diferentes pasos por los que pasó cada orden.

El código de los microservicios está desarrollando en TypeScript, cada microservicio servicio se despliega en Lambdas AWS, que se comunican haciendo uso de diferentes herramientas de infraestructura como API Gateway, SNS y SQS. API Gateway se utiliza para asegurar la comunicación con los microservicios, solo aquellas Lambdas con eventos de tipo HTTP pueden ser accedidas desde el exterior de la aplicación. Para la comunicación asíncrona entre microservicios utilizamos SNS, que se implementa en una arquitectura **Event Driven Architecture**, en conjunto con patrones de diseño como **Domain Events** y **Event Bus**. Por último, SQS nos ayuda a manejar las ordenes nuevas como una cola, en la que cada platillo se procesa uno a uno (invocando una lambda para preparación), de esta manera nos evitamos problemas de concurrencia (por ejemplo: race condition).

## Inicialización del Proyecto

Para inicializar el proyecto, el interesado deberá instalar las dependencias de cada **Bounded Context**. Para esto deberá ingresar en las carpetas **core**, **account**, **kitchen** y **warehoues**, y ejecutar el comando `npm install`. De esta formas se instalarán los paquetes necesarios para cada proyecto.

Posteriomente el usuario deberá instalar el paquete npm para poder utilizar Serverless Framework en su sistema operativo. Esto se logrará con el comando:

`npm install -g serverless`

**NOTA**: En este punto se menciona es este proyecto fue desarrollado con el sistema operativo Windows 11, por lo que se pueden presentar ciertas inconsistencias a la hora de intentarlos inicializar en sistemas como Linux y MAC. Más que todo, puede que sea necesario reconfigurar la forma en que se manejan las variables de entorno en los archivos `package.json`. Si este es el caso, puede contactar al correo [Soymichel Dev](mailto:mtraatabladaa94@gmail.com).

Ahora es necesario configurar su entorno local, para que sea capaz de hacer despliegues de los servicios deberás tener acceso a una cuenta de AWS. Y deberás crear un usuario con credenciales de acceso programático a dicha cuenta. Luego, de eso deberás crear las 4 variables de entorno explicadas a continuación:

- `AWS_ACCESS_KEY_ID`: El access key obtenido de las credenciales programáticas de AWS.
- `AWS_SECRET_ACCESS_KEY`: El secret key obtenido de las credenciales programáticas de AWS.
- `AWS_REGION`: La región AWS en la que deseas desplegar los servicios.
- `STAGE`: El environment que deseas desplegar. En este momento solo hemos configurado `dev` en este repositorio.

En este momento ya podemos realizar los despliegues manuales a AWS. Usando una consola ingrese al microservicio que desea desplegar y ejecute el comando `npm run build`, este se encargará de traspilar el código de typescript a javascript utilizar el compilar ESBuild (cabe mencionar que no utilizamos ESBuild directamente, sino que esto se hace mediante el plugin `serverless-esbuild`). Posteriormente en esta misma consola ejecute el comando `npm run deploy` y esto hará que se desplieguen en AWS la infraestructura de ese microservicios, sus endpoints y demás servicios.

## Buenas prácitcas

Este proyecto se desarrolló siguiendo las buenas prácticas, recomendaciones, arquitecturas, metodologías y patrones de diseño sugeridos por **Domain Driven Design**. Esto se aborda más adelante, pero a su vez se implementaron los siguientes mecanismos para asegurar la calidad de código:

- Este proyecto cuando con una configuración de ESLint en el que se han definido ciertas reglas, que en mi criterio ayudan a mantener el código saludable.
- Existe una configuración de prettier, que ayuda a automatizar la corrección y aplicación de reglas con buenas prácticas en nuestro código. Cabe mencionar, que esto se debe añadir a la configuración de su Visual Studio Code.
- Se han añadido test unitarios y de integración usando los paquetes `jest` y `ts-mockito`, estos se encargan de probar principalmente los aggregate root's y los casos de uso. 

## Configuración de CI/CD

Para los sistemas de CI y CD se implementó una configuración independiente para cada microservicio haciendo uso de **GitHub Actions**. Cada manifiesto se encarga de ejecutar steps para verificar el código con el Linter, ejecutar los tests, hacer el build y desplegar a AWS.

Actualmente este proyecto está configurado para crear un usuario con los roles y permisos estrictamente necesarios para desplegar estos microservicios. Sí desea llevar este proyecto a otro repositorio, no se recomienda configurar el GitHub con credenciales de administrador u otro tipo de usuarios, sino implementar el que se crea cuando se despliega por primera vez este proyecto.

## Arquitectura y Patrones de Diseño basados en DDD

Este proyecto sigue los lineamientos de **Domain Driven Design**. Esto incluye las aquitecturas y patrones de diseño que se implementan, para mantener el proyecto escalable, testeable y mantenible. En un sentido general la arquitectura que implementamos es una arquitectura de microservicios, basada en Serverless y segmentada de forma semántica en base a **Bounded Contexts** por micorservicio o aplicación distribuida. No está de más decir, que esto último se hizo en base a mi interpretación del problema. De ahí que nacieran 3 microservicios, más 1 orientado a la infraestructura.

### Microservicios

#### Core

El microservicio core es el encargado de aquellos aspectos genéricos de la infraestructura, por tanto no posee ninguna responsabilidad en la resolución del problema. Simplemente se encarga de la creación y configuración de API Gateway, Lambda Authorizer y otros aspectos génericos que pudieran surgir a futuro.

#### Account

El microservicio account es el bounded context que agrupa la responsabilidad de la gestión de usuarios y autenticación. En este caso la sesión se implementa haciendo uso de JWT y en este momento no se manejan roles de usuario, por lo que no tiene más responsabilidades. También, hay que añadir que este microservicio es el que cuenta con la lambda que invocará API Gateway (infraestructura del microservicio Core) para la autorización de aquellas rutas que se marquen como protegidas, por lo que se invoca constantemente incluso cuando las llamadas a endpoints pertenecen a otros microservicios. De todas formas, es importante aclarar que la invocación de esta lambda es trabajo de API Gateway, por lo que de cara a los demás microservicios esto es agnóstico.

#### Kitchen

El microservicio kitchen es el responsable de manejar los aspectos de dominio relacionados al área de cocina. Este se encarga del manejo de ordenes, de la entrega de platillos a los clientes y del catálogo que se ofrece.

#### Warehouse

El microservicio warehouse es el bounded context responsable de la gestión de las operaciones del inventario. Es por eso que este maneja los servicios relacionados con los ingresos y salidas de ingredientes, con la compra en el mercadito y con el manejo de las cantidades disponibles en el inventario.

### Arquitectura de microservicios

En esta sección podemos ver una ilustración de la arquitectura general del sistema. En esta se pueden apreciar los componentes y como se relacionan entre sí, para poder ofrecer una solución al problema en cuestión.

![arquitectura restaurant](https://github.com/soymichelt/restaurant-microservices/assets/17261237/f04355fc-463d-472e-bc61-befcc51c744b)

### Scaffold

Para la organización de código, este proyecto sigue la estructura de una arquitectura en capaz, propuesta por DDD. Específicamente se implementa la Arquitectura Hexagonal para la organización de cada elemento de los servicios, en el que la pieza central que nos guía es el dominio. El dominio son las piezas centrales que nos guían semánticamente acerca del problema que abordamos y que no tienen ninguna implementación de aspectos de infraestructura. El dominio como tal es la capa más interna de nuestro sistema y no conoce de la existencia de ninguna otra capa. Luego, tenemos la capa de aplicación que se encarga de manejar la lógica de negocio y de utilizar los elementos de dominio como piedra angular, en síntesis se podría decir que la capa de aplicación define las cosas que podemos hacer en el sistema o aquello que comúnmente conocemos como casos de uso. Al igual que la capa de dominio, esta no tiene ninguna implementación de infraestructura, de esta manera se encarga de resolver el problema y se olvida de todo el ruido generado por dicha infraestructura. Por último, tenemos la capa de infraestructura que es la encargada de implementar los servicios de dominio y repositorios, cuya abstración (suelen ser interfaces) nace en el dominio. Estos mecanismos de infraestructura, se pasan a la capa de aplicación (sin conocer la infraestructura) para que esta pueda cumplir con su función. Ya que la capa de aplicación no debe conocer la implementación, nos vemos en la necesidad de implementar principios como Open/Close, inversión de dependencias, substitución de Liskov y una forma de inversión de control, que para nuestro proyecto es la inyección de dependencias. Podrá haber notado que la mayoría de los principios a los que me refiero forman parte de los principios SOLID.

#### Dominio

Como explicamos antes, el dominio son aquellos componentes encargados de modelar o representar semánticamente el problema que estamos abordando. Y que deben ser la guía que seguimos para poder crear cada servicio necesario en nuestro sistema. A continuación se enumeran los elementos de dominio:

- `Aggregate roots`: esta es la entidad de dominio entorno a la cúal giran otras entidades y value objects dentro de un modulo. Para poder marcar una entidad como un agregado raíz, es necesario extender dicha entidad de la clase genérica  `AggregateRoot`. Como regla general, solo puede haber una entidad de tipo `AggregateRoot` dentro de un mismo módulo.

- `Entidades de Dominio`: las entidades de dominio son la modelación de aquellos elementos semánticos del problema que abordamos, pero que se pueden identificar. Es decir, que tienen entidad. O lo que sería lo mismo, tienen un identificador único que ayuda a agrupar todas sus demás entidades y value objects internos.

- `Value Objects`: Los value objects son un patrón de diseño que busca la combinación de las bondades de los objectos por valor y objetos por referencia. Este es uno de los patrones principales dentro de nuestra arquitectura, ya que se encarga de mantener las claúsulas de guarda, invariantes y validaciones de los campos dentro de nuestras entidades de dominio. Una mala implementación de este patrón puede ensuciar y complicar mucho el código, y hacer que un mantenimiento a futuro sea problemático.

- `Excepciones de Dominio`: Las excepciones de dominio son excepciones que surgen en nuestro código y que nos ayudan a simplificar problemas en nuestros elementos. Además, también nos ayudan a estandarizar las respuestas de errores y warnings producidas por nuestros servicios, algo que es muy importante al momento de implementar un sistema de observabilidad y trazabilidad para monitorear nuestros sistemas.

- `Servicios de dominio`: Estas son abstracciones que definen acciones que se pueden realizar con nuestros entidades de dominio. Normalmente se implementan mediante interfaces; pero, también es posible hacerlo con clases abstractas.

- `Repositorios`: este es otro de los patrones de diseño más importantes dentro de nuestra arquitectura, ya que nos permite abstraer nuestros mecanismos de almacenamiento de información. En este se definen las acciones que se pueden realizar con nuestras entidades de dominio; pero, desde el punto de vista de un sistema de almacenamiento de datos.

#### Application

- `Responses`: Los responses no son más que definiciones de los tipos primitives con los que responderán los casos de uso. Estos pueden ser simples, es decir, representan los valores de una única entidad. O compuestos, es decir, representan los valores de múltiplse entidades.

- `Use Cases`: Los casos de uso son las acciones que se pueden realizar en nuestro sistema. Estos continenen todas las reglas de negocio necesarias para asegurarse de que la funcionalidad se cumple debidamente. Para realizar sus funciones los casos de uso utilizan los elementos de dominio, para poder ejecutar operaciones con las entidades de dominio. Esos elementos de dominio implementan una forma de inversión de control conocida como inyección de dependencias. En este caso cabe mencionar que TypeScript carece de un mecanismo para crear un contenedor de inyección de dependencias, por lo que se tuvo que instalar el paquete `TSYringe`, el cuál ha sido desarrollado por microsoft y es uno de los más famosos en el mercado de desarrolladores de TypeScript y JavaScript. 

#### Infrastructure

En la arquitectura hexagonal existen dos tipos de mecanismos de infraestructura. Los controladores, que son los mecanismos para poder exponer los servicios al exterior (en este caso AWS Lambda). Y los proveedores o colaboradores, que son mecanismos que nos permiten interactuar con plataformas o servicios externos (por ejemplo: sistemas de bases de datos, sistemas de storage de archivos, brokers de mensajería, etc).

- `Functions`: Aquí se deben añadir las funciones Lambda para exponer los casos de uso al exterior. De esta forma se adjuntarán a un evento que puede ser HTTP o no, para ejecutar una tarea en específico. Cabe mencionar que este módulo es descartable, en este punto podríamos implementar cualquier otra herramienta que sirva de middleware como ExpressJS, NestJS, Azure Functions, Cloudflare Workers, etc.

- `Persistence`: La persistencia tendrá ubicado la implementación de los repositorios que se definieron en el dominio. Como estos elementos deben estar implementados, aquí si que se debe añadir un mecanismo de almacenamiento real. En los microservicios desarrollados, se han utilizado bases de datos MongoDB, que se encuentran desplegadas en Mongo Atlas.

- `Domain Services`: Igual que con los repositorios, aquí se deben implementar los servicios de dominio que se definieron en la capa de dominio. Aquí se debe implementar la infraestructura requerida. Por ejemplo, para el Domain Servicio MarketplaceService, se implementó la petición de ingredientes al mercadito haciendo uso del paquete `axios`.

- `Loggers`: Aquí se deben implementar los mecanismos para el manejo de loggers. El proyecto desarrolló un logger haciendo uso de la herramienta Winston.

- `Event Bus`: Este es el mecanismo utilizado para implementar la arquitectura **Event Driven Architecture**. Aquí se deben implementar el patrón Event Bus, para poder emitir eventos de dominio. Estos eventos serán utilizados para comunicar asíncronamente los microservicios, ya que emiten información de las acciones que se realizan y estos disparán otras lambdas para realizar otras acciones. Para este proyecto hay implementaciones con SNS y SQS. La ventaja de esta arquitectura, es que si necesitaramos escalar podríamos perfectamente implementar otros sistemas como RabbitMQ o Apache Kafka sin necesidad de modificar nada más que la implementación del EventBus y el inyector de dependencias.

## Releases

Para el versionamiento de nuestros microservicios estamos utilizando `release-please`. Esta herramienta tiene una configuración que dispara una GitHub action, que detecta el microservicio que ha sido modificado al crear una PR. De esta forma realiza las operaciones necesarias para poder generar los releases de forma independiente de cada microservcio.

## Contacto

Añado información de contacto, para cualquier duda o información:

- [mtraatabladaa94@gmail.com](mailto:mtraatabladaa94@gmail.com)
- [soymichel.dev@gmail.com](mailto:soymichel.dev@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/soymichelt)

![Foto de Perfil](https://github.com/soymichelt/CV/blob/master/public/res/circleProfile64x64.png)