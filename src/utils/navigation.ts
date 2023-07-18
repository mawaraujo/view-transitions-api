function isStartViewTransitionSupported() {
  return Boolean(document.startViewTransition)
}

async function fetchPage(url: string) {
  const response = await fetch(url)
  const text = await response.text()

  const [_, data] = text.match(/<body>([\s\S]*)<\/body>/i)

  return data
}

export function startViewTransition() {
  if(!isStartViewTransitionSupported()) {
    return
  }

  window.navigation.addEventListener('navigate', (event) => {
			const destinationUrl: URL = new URL(event.destination.url)

			// Check external page
			if(location.origin !== destinationUrl.origin) {
				return
			}

			event.intercept({
				async handler() {
          const page = await fetchPage(destinationUrl.pathname)

          document.startViewTransition(() => {
            document.body.innerHTML = page
            document.documentElement.scrollTop = 0
          })
				}
			})
  })
}