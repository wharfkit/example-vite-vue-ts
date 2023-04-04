
<script setup lang="ts">
import type { Ref } from 'vue'
import { getCurrentInstance } from 'vue'
import { Session, SessionKit } from '@wharfkit/session'


defineProps<{ msg: string }>()

const app = getCurrentInstance()

let session: Ref<Session | undefined>
let sessionKit: SessionKit

if (app) {
    session = app.appContext.config.globalProperties.$session
    sessionKit = app.appContext.config.globalProperties.$sessionKit
}

async function login() {
    const response = await sessionKit.login()
    session.value = response.session
}

async function logout() {
    await sessionKit.logout(session.value)
    session.value = undefined
}

async function transact() {
    if (!session.value) {
        throw new Error('cannot transact without a session')
    }
    const action = {
        account: 'eosio.token',
        name: 'transfer',
        authorization: [session.value.permissionLevel],
        data: {
            from: session.value.actor,
            to: 'teamgreymass',
            quantity: '0.00000001 WAX',
            memo: 'Yay WharfKit! Thank you <3',
        },
    }
    session.value.transact({ action }, { broadcast: false }).catch((e) => {
        console.log('error caught in transact', e)
    })
}

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <div v-if="session">
        <p>Logged in as {{ session.actor }}</p>
        <button type="button" class="primary" @click=transact>Test Transaction (No Broadcast)</button>
        <button type="button" @click=logout>Logout</button>
    </div>
    <div v-else>
        <button type="button" @click=login>Login</button>
    </div>

    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
