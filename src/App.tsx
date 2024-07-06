import React, { useState } from 'react';
import { CacheProvider, ThemeProvider } from "@emotion/react"
import { BrowserRouter } from 'react-router-dom'
import createCache from "@emotion/cache"
import theme from './styles/mui'
import RouterApp from './RouterApp';
import { CronProvider } from './providers/CronProvider';
import { CheckerProvider } from './providers/DockerCheckProvider';
import { ProcessProvider } from './providers/ProcessProvider';

const cacheRtl = createCache({
  key: "muirtl",
})

function App() {

  return (
    <BrowserRouter>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <ProcessProvider>
            <CheckerProvider>
              <CronProvider>
                <RouterApp />
              </CronProvider>
            </CheckerProvider>
          </ProcessProvider>
        </ThemeProvider>
      </CacheProvider>
    </BrowserRouter>
  );
}

export default App;
