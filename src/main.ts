import { createApp } from 'vue'
import { ref } from 'vue';
import { Chains, Session, SessionKit } from '@wharfkit/session'
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor'
import { WalletPluginCloudWallet } from '@wharfkit/wallet-plugin-cloudwallet'
import WebRenderer from '@wharfkit/web-renderer'

import './style.css'
import App from './App.vue'

const app = createApp(App)

const sessionKit = new SessionKit({
    appName: 'demo',
    chains: [Chains.Jungle4],
    ui: new WebRenderer(),
    walletPlugins: [
        new WalletPluginAnchor(),
    ],
})

let session = ref<Session | undefined>(undefined)

sessionKit.restore().then((s) => {
    session.value = s
})

app.config.globalProperties.$sessionKit = sessionKit
app.config.globalProperties.$session = session

app.provide('sessionKit', sessionKit)

app.mount('#app')
