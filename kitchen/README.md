# Restaurant Kitchen Microservice

El microservicio kitchen es el responsable de manejar los aspectos de dominio relacionados al área de cocina. Este se encarga del manejo de ordenes, de la entrega de platillos a los clientes y del catálogo que se ofrece.

## Módulos

- `orders`: Este módulo se encarga de manejar las órdenes de la cocina, de la preparación, de la actualización de estados de las ordenes, de la comunicación con el microservicio de inventario para la validación de los ingredientes y de la actualización de las notas.

- `ordersHistory`: Este módulo se encarga de la gestión del historial de cambios de los estados de las ordenes.

- `recipes`: El módulo recipes se encarga de manejar el catalogo de platillos y de mostrar información sobre estos.
