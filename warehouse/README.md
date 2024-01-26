# Restaurant Warehouse Microservice

El microservicio warehouse es el bounded context responsable de la gestión de las operaciones del inventario. Es por eso que este maneja los servicios relacionados con los ingresos y salidas de ingredientes, con la compra en el mercadito y con el manejo de las cantidades disponibles en el inventario.

## Módulos

- `ingredients`: Este módulo se encarga de gestionar el catalogo de ingredientes y sus saldos. Este se encarga además de emitir los eventos pertinentes sobre las modificaciones de los saldos.

- `movements`: Este módulo registra los movimientos de entradas y salidas sobre los ingredientes. Y también, cuenta con un servicio que permite mostrar dicha información.
