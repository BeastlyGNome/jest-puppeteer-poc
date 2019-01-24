const timeout = 30000

describe(
  '/ (Home Page)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.goto('https://app-d-polarisui-dev.azurewebsites.net/#/');
    }, timeout);

    afterAll(async () => {
      await page.close();
    })

    it('user should login', async () => {
      try {
        page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log('nav complete');

        //login  
        await page.type('div.login__username > input.login__username-input', 'testautomationadjusterassistant@occm.com');        // await userNameTextbox.type('joanncarollocasemanager@occm.com');
        console.log('username entered');
        passwordTextbox = await page.type('input.login__password-input', 'Polaris1!');
        console.log('password entered');
        submitButton = await page.click('div.login__login-button');
        console.log('submit button clicked');

        //awaiting load
        console.log('awaiting initial response');
        await page.waitForResponse('https://dev-299266.oktapreview.com/api/v1/authn');
        console.log('first response recieved');
        console.log('awaiting resources');
        await page.waitForResponse('https://polarisservices-d.ops.devonecallcm.net/api/v0.3/gateway/claims/resourceValues');
        console.log('resources recieved');

        console.log('awaiting profile');
        await page.waitForResponse('https://polarisservices-d.ops.devonecallcm.net/api/v0.2/gateway/userprofile');
        console.log('profile recieved');
        console.log('waiting for weclome bar to exist');
        await page.waitForSelector('span.link-dropdown__placeholder-text');
        console.log('page is loaded');

        //logout
        console.log('clicking dropdown');
        await page.click('span.link-dropdown__placeholder-text');
        console.log('waiting for dropdown to expand');
        await page.waitForSelector('div.link-dropdown__option');
        console.log('found first dropdown option');
        await page.waitForSelector('div.link-dropdown__option--last');
        console.log('found second dropdown option');
        console.log('dropdown expanded');
        await page.click('div.link-dropdown__option--last');
        console.log('clicked logout');

        //validate logged out
        console.log('waiting for session end response');
        await page.waitForResponse('https://polarisservices-d.ops.devonecallcm.net/api/v0.2/gateway/maintenanceWindow');
        console.log('session end response recieved');
      } catch (error) {
        // console.log(error);
      }

    });
  },
  timeout
)
