const puppeteer = require('puppeteer');

const openPortal = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            userDataDir: './myChromeSession'
        });
        const page = await browser.newPage();

        const client = await page.target().createCDPSession();
        const location = {
            accuracy: 98,
            latitude: -19.9375716,
            longitude: -44.0131347,
        }
        
        await client.send('Emulation.setGeolocationOverride', location);
        await page.goto('https://portalfuncionario.teknisa.com/#/');

        // const baterPontoButton = await page.waitForXPath('/html/body/div/div[1]/div[1]/main/div/div[1]/div[1]/div[2]/div/div/button');
        const baterPontoButton = await page.waitForXPath('/html/body/div/div[1]/div[1]/main/div/div/div[1]/div/button');
        baterPontoButton.click();

        return page;
    } catch (error) {
        // console.log('deu erro 1')
    }
}


module.exports = {

    async teste(){
        const page = await openPortal();
        console.log('abriu')
        setTimeout(() => {
            page.browser().close();
        }, 10000)
    },
    
    async entrar(){
        try {

            const page = await openPortal();
            const okButton = await page.waitForSelector('#app > div.v-dialog__content.v-dialog__content--active > div > div > div > button:nth-child(3)');
            
            setTimeout(() => {
                okButton.click();
                setTimeout(() => {
                    console.log('Registrando entrada')
                    page.browser().close();
                }, 10000)
            }, 7000)

        } catch (error) {
            // console.log('deu erro 1')
        }
    },
    
    async sairAlmoco() {
        try {

            const page = await openPortal();
            const almocoButton = await page.waitForSelector('#app > div.v-dialog__content.v-dialog__content--active > div > div > div > div:nth-child(3) > button:nth-child(1)');
           
            setTimeout(() => {
                almocoButton.click();
                setTimeout(() => {
                    console.log('Começou almoço')
                    page.browser().close();
                }, 10000)
            }, 7000)

        } catch (error) {
            // console.log('deu erro 2')
        }
    },

    async finalizarServico() {
        try {

            const page = await openPortal();
            const okButton = await page.waitForSelector('#app > div.v-dialog__content.v-dialog__content--active > div > div > div > div:nth-child(3) > button:nth-child(3)');
            
            setTimeout(() => {
                okButton.click();
                setTimeout(() => {
                    console.log('Registrando saida')
                    page.browser().close();
                }, 10000)
            }, 7000)

        } catch (error) {
            // console.log('deu erro 3')
        }
    },

}
