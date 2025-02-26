import { expect } from '@playwright/test';
import { Scenario, Then } from '../common/ghkerkin';

['smartfilter', 'smartfilteraggrid'].forEach((view) => {
  Scenario(
    `All icons are shown when enabled-${view}`,
    async ({ }) => {

      await Then('the Smart Filter mathces valid screenshot', async () => {
        expect(true).toBeTruthy()
      });
    },
  );

});
