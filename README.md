# truco royale


## Installation

* `git clone git@github.com:herlon214/truco-royale.git`
* `cd parcel-react`
* `npm install`
* `npm start`


## Eventos do socket
Abaixo está listado todos os eventos que ocorrem na comunicação entre cliente-servidor.

### Servidor
O arquivo responsável por fazer o handling dos eventos está localizado em `server/socket/events.js`. É um objeto onde a key é o evento e o value é a função que será executada quando o evendo disparar.

O value sempre receberá tres argumentos: `(context, socket, data)`.

|Evento|Descrição|
|------|---------|
|`createGame`|Cria um novo jogo|
|`joinGame`|

### Cliente