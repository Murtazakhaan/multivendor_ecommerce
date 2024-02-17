importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyCNAF2fXuBAPxZqi0Z8ZWr6qozDlNqkupY",
    authDomain: "pathabo-a9872.firebaseapp.com",
    databaseURL: "https://pathabo-a9872-default-rtdb.firebaseio.com",
    projectId: "pathabo-a9872",
    storageBucket: "pathabo-a9872.appspot.com",
    messagingSenderId: "491299201486",
    appId: "1:491299201486:web:c8d4850fdaa67590c28b9f",
    measurementId: "G-WSW5X4XJ6T"

});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});