// Push notification logic.

const VAPID_PUBLIC_KEY =
  "BH8-jSRr_OO5ay2y6qRCdfpBgopqEr6SnTcROP_Om2RxKRVohbWrJ1q57Uw7q_p6X7vfgFmkKq_252ThODhbgB8";

async function subscribeButtonHandler() {
  // Prevent the user from clicking the subscribe button multiple times.
  const result = await Notification.requestPermission();
  if (result === "denied") {
    console.error("The user explicitly denied the permission request.");
    return;
  }
  if (result === "granted") {
    console.info("The user accepted the permission request.");
  }

  const registration = await navigator.serviceWorker.register(
    "./service-workers.js"
  );
  const subscribed = await registration.pushManager.getSubscription();
  if (subscribed) {
    console.info("User is already subscribed.");
    return;
  }
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  let id_token = localStorage.getItem("accessToken");

  if (id_token) {
    fetch("http://localhost:8000/api/push_notification/subscribe/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "fm " + id_token,
      },
      body: JSON.stringify(subscription),
    });
  } else {
    console.log("User not logged in.");
  }
}

// Convert a base64 string to Uint8Array.
// Must do this so the server can understand the VAPID_PUBLIC_KEY.
function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Startup logic.

// Step 1 - TODO add startup logic here
// Client will need a service worker to receive and display notifications.
// It's best to register the service worker as early as possible.
if ("serviceWorker" in navigator && "PushManager" in window) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then((serviceWorkerRegistration) => {
      console.info("Service worker was registered.");
      console.info({ serviceWorkerRegistration });
    })
    .catch((error) => {
      console.error("An error occurred while registering the service worker.");
      console.error(error);
    });
} else {
  console.error("Browser does not support service workers or push messages.");
}

setTimeout(() => {
  subscribeButtonHandler();
  console.log("setvice worker");
}, 1000);
