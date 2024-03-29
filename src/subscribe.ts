const convertedVapidKey = urlBase64ToUint8Array('BCkiHiZGqwSaNyU7enams5FExH5leaxj6q_xehf4AJfKGz8x-E6NUQbzkKCn-KIJ_7zOCNdbOwZz0_kP9eLqPhs');

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function sendSubscription(subscription: PushSubscription, uid: string) {
  return fetch(`${process.env.REACT_APP_SUBSCRIBE_URL}/${uid}`, {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export default function subscribeUser(uuid: string) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function(registration) {

            if (!registration.pushManager) {
                console.log('Push manager unavailable.')
                return
            }

            registration.pushManager.getSubscription().then(function(existedSubscription) {
                if (existedSubscription === null) {
                    console.log('No subscription detected, make a request.')

                    registration.pushManager.subscribe({
                        applicationServerKey: convertedVapidKey,
                        userVisibleOnly: true,
                    }).then(function(newSubscription) {
                        console.log('New subscription added.', newSubscription)
                        sendSubscription(newSubscription, uuid)
                    }).catch(function(e) {
                        if (Notification.permission !== 'granted') {
                            console.log('Permission was not granted.')
                        } else {
                            console.error('An error ocurred during the subscription process.', e)
                        }
                    })

                } else {
                    console.log('Existed subscription detected.');
                    sendSubscription(existedSubscription, uuid);
                }
            })
        })
        .catch(function(e) {
            console.error('An error ocurred during Service Worker registration.', e)
        })
    }
}