import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { Suspense, useMemo } from 'react'

const pages = import.meta.glob('./pages/**/*.jsx')

function toRoutePath(filePath) {
  return filePath
    .replace('./pages', '')
    .replace(/\.jsx$/, '')
    .replace(/\/index$/, '')
    .replace(/\[(.+?)\]/g, ':$1') || '/'
}

export default function App() {
  const routes = useMemo(() => {
    return Object.entries(pages).map(([path, loader]) => {
      const routePath = toRoutePath(path)
      const Component = React.lazy(loader)
      return (
        <Route
          key={routePath}
          path={routePath}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>
          }
        />
      )
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>{routes}</Routes>
    </BrowserRouter>
  )
}