# Restaurant Account Microservice

El microservicio account es el bounded context que agrupa la responsabilidad de la gestión de usuarios y autenticación. En este caso la sesión se implementa haciendo uso de JWT y en este momento no se manejan roles de usuario, por lo que no tiene más responsabilidades. También, hay que añadir que este microservicio es el que cuenta con la lambda que invocará API Gateway (infraestructura del microservicio Core) para la autorización de aquellas rutas que se marquen como protegidas, por lo que se invoca constantemente incluso cuando las llamadas a endpoints pertenecen a otros microservicios. De todas formas, es importante aclarar que la invocación de esta lambda es trabajo de API Gateway, por lo que de cara a los demás microservicios esto es agnóstico.

## Módulos

- `auth:`: Este módulo se encarga de exponer los servicios necesarios para que API Gateway, puede configurar Lambda Authorizer para la autenticación y autorización de los microservicios.

- `users`: Este módulo se encarga de gestionar las cuentas de usuarios, del la validación de las credenciales para generar los tokens de sesión y de notificar por email cuando los usuarios se dan de alta.
