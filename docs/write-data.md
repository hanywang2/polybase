---
slug: /write
sidebar_position: 2
---

# Write data

You can perform a set by calling `.set(data)` on a collection:

```ts
const colRef = db.collection("org/places")
const doc = await colRef.set({
  id: "london",
  name: "London",
  country: "UK",
})
```

Or `.set(data)` on a specific document:

```ts
const colRef = db.collection("org/places")
const doc = await colRef.doc("london").set({
  name: "London",
  country: "UK",
})
```

> **Note**
> `$` is not allowed at the start of field names, as this is reserved for internal use.

## Encrypt data

As all data is public and accessible, it's important to ensure private information is encrypted. There are a number of different ways to achieve this.

### 1/ Wallet only

You can send a request to metamask (or other compatible wallet) to obtain an encryption key, which can be used to encrypt values. However, decryption is only possible by sending a secondary request to the wallet (which results in permission window being presented to the user) to ask for permission for each value to be decrypted. This can result in a poor user experience, if there are a number of different values to decrypt, as the user will have to give permission separately for each value.

Here is an example:

```ts
import { Spacetime } from '@spacetimexyz/client'
import eth from '@spacetimexyz/eth'
// import { encryptSafely } from '@metamask/eth-sig-util'
// import Eth from 'web3-eth'

// Init
// const eth = new Eth()
const db = new Spacetime()

 // A permission dialog will be presented to the user
const accounts = await eth.requestAccounts()

// If there is more than one account, you may wish to ask the user which 
// account they would like to use
const account = accounts[0]

// A permission dialog will be presented to the user
const encryptionKey = await eth.getEncryptionKey(account)
const encryptedValue = await eth.encrypt(encryptionKey, value)

await db.collection("org/places").doc("london").set({
  name: "London",
  location: encryptedValue
})

// Later...

// Get the data from Spacetime as normal
const london = await db.collection("org/places").doc("london").get()

// Get the encrypted value
const encryptedValue = london.data.location

 // A permission dialog will be presented to the user every time this method 
 // is called
const decryptedValue = await eth.decryptWithAccount(account, encryptedValue)
```


### 2/ Create your own wallet

You can create your own wallet (public/private key), allowing you to encrypt/decrypt values without having to ask the user for explicit permission each time. The private key should still be encrypted using a users existing wallet or a password, but rather than encrypting a specific value, you encrypt the private key. That means you only need to ask the user a single time for permission to decrypt their private key, and then use that private key to decrypt all other received values. It is then your responsibility to ensure that the encrypted private key is kept safe.

Here is an example:

```ts
import Wallet from 'ethereumjs-wallet'

// First time the user signs up to your dapp
const wallet = Wallet.generate()
const publicKey = wallet.getPublicKey()

// Encrypt (e.g. using approach above) and save the private key somewhere safe 
const privateKey = wallet.getPrivateKey()

const encryptedValue = await encrypt(publicKey, value)

await db.collection("org/places").doc("london").set({
  name: "London",
  location: encryptedValue
})

// Later...

// Get the data from Spacetime as normal
const london = await db.collection("org/places").doc("london").get()

// Get the encrypted value
const encryptedValue = london.data.location

 // A permission dialog will be presented to the user every time this method 
 // is called
const decryptedValue = await eth.decrypt(privateKey, encryptedValue)
```

There are a number of different places to store the encrypted private key that lead to different trade offs. You must find a tradeoff that is acceptable for your specific application.

#### Store locally

You could store the encrypted private key locally on the browser device (e.g. in local storage). The tradeoff is that the private key could easily become lost if the user resets their browser (which would make all data unavailable and there would be no recovery method), and it would be difficult for users to work across devices. 


#### Store on Spacetime

You could store the encrypted private key on Spacetime, this allow the encrypted private key to obtained by the user and then decrypted on any device.
