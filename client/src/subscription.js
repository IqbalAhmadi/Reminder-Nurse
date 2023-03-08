import icon from './assets/images/rn_static_01.png';
import { useMutation } from '@apollo/client';

const convertedVapidKey = urlBase64ToUint8Array(
  'BEWOytsZz34O1JgD-UgcRFhVtKYzVwpxMdFjMP3EAw7A394Pci1Peiy0EkWn2X5dPQNya3eR_tSZFdN1dd7YURI'
);

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  console.log(base64String);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function sendSubscription(subscription, data) {
  console.log('here', subscription);
  return fetch(`/notifications/subscribe`, {
    method: 'POST',
    body: JSON.stringify({
      subscription: subscription,
      title: 'Welcome!',
      description: 'This is how notifications will look',
      icon: icon,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
//conditional render
let clicked = true;

export async function subscribeUser() {
  if (clicked) {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;

      if (!registration.pushManager) {
        console.log('Push manager unavailable.');
        return;
      }

      const existedSubscription =
        await registration.pushManager.getSubscription();

      if (existedSubscription === null) {
        console.log('No subscription detected, make a request.');
        const newSubscription = await registration.pushManager.subscribe({
          applicationServerKey: convertedVapidKey,
          userVisibleOnly: true,
        });
        console.log('New subscription added.', newSubscription);
        sendSubscription(newSubscription);
      } else {
        console.log('Existed subscription detected.');
        sendSubscription(existedSubscription);
      }
    }
  } else {
    console.log('Can not reachable to the service worker');
  }
}
