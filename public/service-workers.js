self.addEventListener("push", (event) => {
  let data = event.data.json();
  const options = data;
  self.registration.showNotification(data.title, options);
});

self.addEventListener("notificationclick", (event) => {
  // TODO
  event.notification.close();
  event.waitUntil(self.clients.openWindow("https://web.dev"));
});
