import { createApp } from 'vue'
import { ref } from 'vue';
import SessionKit, { BrowserLocalStorage, Session } from '@wharfkit/session'
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor'
import { WalletPluginCloudWallet } from '@wharfkit/wallet-plugin-cloudwallet'
import WebUIRenderer from '@wharfkit/web-ui-renderer'

import './style.css'
import App from './App.vue'

const app = createApp(App)

const ui = new WebUIRenderer()

const sessionKit = new SessionKit({
    appName: 'demo',
    chains: [
        {
            id: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
            url: 'https://eos.greymass.com'
        },
        {
            id: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
            url: 'https://telos.greymass.com',
        },
        {
            id: '8fc6dce7942189f842170de953932b1f66693ad3788f766e777b6f9d22335c02',
            url: 'https://api.uxnetwork.io',
        },
        {
            id: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
            url: 'https://wax.greymass.com',
        },
    ],
    storage: new BrowserLocalStorage('demo'),
    ui,
    walletPlugins: [
        new WalletPluginAnchor(),
        new WalletPluginCloudWallet(),
    ],
})

let session = ref<Session | undefined>(undefined)

sessionKit.restore().then((s) => {
    session.value = s
})

app.config.globalProperties.$sessionKit = sessionKit
app.config.globalProperties.$session = session

app.mount('#app')
