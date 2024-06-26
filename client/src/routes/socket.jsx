const socket = io('http:// http://localhost:3000');

socket.on('connect', () => {
  console.log('Соединение установлено');
  socket.emit('hello', 'Привет серверу!');
});

socket.on('message', (data) => {
  console.log('Данные получены: ' + data);
});

socket.on('disconnect', () => {
  console.log('Соединение прервано');
});