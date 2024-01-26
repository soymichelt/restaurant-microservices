# Changelog

## [0.11.2](https://github.com/soymichelt/restaurant-microservices/compare/restaurant-kitchen-v0.11.1...restaurant-kitchen-v0.11.2) (2024-01-26)


### Bug Fixes

* implement aggregate and sample to get a random recipe ([7dfdd8a](https://github.com/soymichelt/restaurant-microservices/commit/7dfdd8a17a6b7a0a8c816fc791086f726506a24d))

## [0.11.1](https://github.com/soymichelt/restaurant-microservices/compare/restaurant-kitchen-v0.11.0...restaurant-kitchen-v0.11.1) (2024-01-25)


### Bug Fixes

* correcting bug to create order history use case ([5d271d4](https://github.com/soymichelt/restaurant-microservices/commit/5d271d468f8037670c7791581b881b459a91be93))

## [0.11.0](https://github.com/soymichelt/restaurant-microservices/compare/restaurant-kitchen-v0.10.0...restaurant-kitchen-v0.11.0) (2024-01-25)


### Features

* add get all orders history use case ([d12f3c3](https://github.com/soymichelt/restaurant-microservices/commit/d12f3c3025b7af8f7eef6380e4fa1b4df61d93d5))

## [0.10.0](https://github.com/soymichelt/restaurant-microservices/compare/restaurant-kitchen-v0.9.0...restaurant-kitchen-v0.10.0) (2024-01-25)


### Features

* add create order history use case ([ba92c1b](https://github.com/soymichelt/restaurant-microservices/commit/ba92c1b3117bd8a2d15d6f4bd3ca9ac25b3726c3))
* add new aggregate root OrderHistory ([18ff1ad](https://github.com/soymichelt/restaurant-microservices/commit/18ff1adc5be6938b42df797edb502c0612b35699))
* add new repository to order history ([b037d8f](https://github.com/soymichelt/restaurant-microservices/commit/b037d8ffd6b4ddc74cb61b952db8d74fbb88ad98))
* promove OrderId and OrderState to shared kernel ([b6f34be](https://github.com/soymichelt/restaurant-microservices/commit/b6f34be089bf1ecfb9d5368a0c189cba230dea83))

## [0.9.0](https://github.com/soymichelt/restaurant-microservices/compare/restaurant-kitchen-v0.8.1...restaurant-kitchen-v0.9.0) (2024-01-25)


### Features

* add update order notes use case ([1e0b27a](https://github.com/soymichelt/restaurant-microservices/commit/1e0b27a627e2370e4a77ad1097bdf887e7fee438))

## [0.8.1](https://github.com/soymichelt/restaurant-microservices/compare/restaurant-kitchen-v0.8.0...restaurant-kitchen-v0.8.1) (2024-01-25)


### Bug Fixes

* correcting bug in updateState when new state is DONE ([acf90db](https://github.com/soymichelt/restaurant-microservices/commit/acf90db8c6f4b74f85334f4d461c2248196bb552))

## [0.8.0](https://github.com/soymichelt/restaurant-microservices/compare/restaurant-kitchen-v0.7.0...restaurant-kitchen-v0.8.0) (2024-01-25)


### Features

* add update order state use case ([5618105](https://github.com/soymichelt/restaurant-microservices/commit/56181059c410668bac65814f0cdd9d5e5fc1e148))

## [0.7.0](https://github.com/soymichelt/restaurant-microservices/compare/restaurant-kitchen-v0.6.0...restaurant-kitchen-v0.7.0) (2024-01-24)


### Features

* add done order use case ([7a01f45](https://github.com/soymichelt/restaurant-microservices/commit/7a01f45f09833f2205e32735863718f1a35959e8))

## [0.6.0](https://github.com/soymichelt/restaurant-microservices/compare/restaurant-kitchen-v0.5.0...restaurant-kitchen-v0.6.0) (2024-01-24)


### Features

* add prepare order use case ([f74655a](https://github.com/soymichelt/restaurant-microservices/commit/f74655a8c33946be4cfe856872a9490eb7623d75))

## [0.5.0](https://github.com/soymichelt/restaurant-microservices/compare/restaurant-kitchen-v0.4.0...restaurant-kitchen-v0.5.0) (2024-01-24)


### Features

* add ingredient entity to recipe aggregate root ([ab7c957](https://github.com/soymichelt/restaurant-microservices/commit/ab7c9578af4640a9898c23e4a78190b9aa8ff3bf))

## [0.4.0](https://github.com/soymichelt/restaurant-microservices/compare/restaurant-kitchen-v0.3.0...restaurant-kitchen-v0.4.0) (2024-01-21)


### Features

* add get all orders use case ([5f01f17](https://github.com/soymichelt/restaurant-microservices/commit/5f01f174405cd7916bea67f3f946b659a495c1c0))

## [0.3.0](https://github.com/soymichelt/restaurant-microservices/compare/restaurant-kitchen-v0.2.0...restaurant-kitchen-v0.3.0) (2024-01-21)


### Features

* add create order use case ([72f1f5c](https://github.com/soymichelt/restaurant-microservices/commit/72f1f5c08bb21d765a6e02dd86d56d49acc2e406))
* add EventBus implement with SQS to Shared DI ([5b81446](https://github.com/soymichelt/restaurant-microservices/commit/5b814466877cbb5d747c60b4b43d7a733fb5d58a))
* add find random recipe to RecipeRepository ([53239e8](https://github.com/soymichelt/restaurant-microservices/commit/53239e89ac08378ecd6eb41a2638c2da5c4b092a))
* add order aggregate root ([df5bf79](https://github.com/soymichelt/restaurant-microservices/commit/df5bf7996f18a61fc252420dfe056e5a38e19531))
* add order repository implement with mongodb ([9e4961b](https://github.com/soymichelt/restaurant-microservices/commit/9e4961b31b02514d1c8db86793e16268039e6d8f))
* promove recipeId to shared kernel ([259687f](https://github.com/soymichelt/restaurant-microservices/commit/259687f4f21089676b21c32a3c8e5456fdddcb81))

## [0.2.0](https://github.com/soymichelt/restaurant-microservices/compare/restaurant-kitchen-v0.1.0...restaurant-kitchen-v0.2.0) (2024-01-20)


### Features

* add createdAt and updatedAt fields to recipe aggregate root ([9bff225](https://github.com/soymichelt/restaurant-microservices/commit/9bff225791cdde2c050bcf262b8aa68605e58757))

## [0.1.0](https://github.com/soymichelt/restaurant-microservices/compare/restaurant-kitchen-v0.0.1...restaurant-kitchen-v0.1.0) (2024-01-20)


### Features

* add get all recipes use case ([f3f3f0b](https://github.com/soymichelt/restaurant-microservices/commit/f3f3f0b52af0f5547f95d70bfe291093b7c9421d))
* implement uuid v4 to id value object ([8493011](https://github.com/soymichelt/restaurant-microservices/commit/8493011e99b081529b0bcffbb9b8678106d12fec))
