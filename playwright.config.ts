import { defineConfig, devices } from '@playwright/test'
export default defineConfig({
  testDir: './tests',
  // fullyParallel: true,
  // reporter: 'html',
  // use: {
  //   trace: 'on-first-retry'
  // },
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] }
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] }
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] }
  //   }
  // ],
  // webServer: {
  //   command: 'yarn dev',
  //   url: 'http://127.0.0.1:3000'
  // }
})
