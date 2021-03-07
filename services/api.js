export const getTeams = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(response => response.text())
    .then(text => text.split('\n').slice(3,75))
    .then(resolve)
    .catch(reject)
  })
}
