window.addEventListener('load', () => {
  console.log('analytics!')
  const app = document.querySelector('#app')
  app.innerHTML += `<p>
    <span>this shouldn't be in the body as this script</span>
    <span>should never have ran during build</span>
    </p>`
})
