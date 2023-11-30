console.log('loaded')
const rootElement = document.querySelector("#root")

const fetchUrl = async (url) => {
  const response = await fetch(url)
  console.log(response)
  return response.json()
}

const beerComponent = (beer) => `
  <div>
    <h2>${beer.id}</h2>
    <h3>${beer.name}</h3>
    <h4>${beer.abv}</h4>
  </div>
`

const errorComponent = (error) => `
  <div>
    <h2>${error.error}</h2>
    <h3>${error.message}</h3>
  </div>
`

const makeDomFromData = (element, data) => {
  element.innerHTML = ""
  if (data.id) element.insertAdjacentHTML("beforeend", beerComponent(data))
  else if (data.length) data.forEach(beer => element.insertAdjacentHTML("beforeend", beerComponent(beer))) 
  else element.insertAdjacentHTML("beforeend", errorComponent(data))
}

async function init() {
  const beerData = await fetchUrl("/beers")
  console.log(beerData)

  makeDomFromData(rootElement, beerData)
}

init()