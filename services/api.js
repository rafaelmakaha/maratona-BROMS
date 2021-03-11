const FILE_SEPARATOR = String.fromCharCode(28);

export const getContest = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(response => response.text())
    .then(text => { 
      text = text.split('\n')
      let [eventTitle, eventInfo, values] = text
      const [duration, frozen, blind, penality] = eventInfo.split(FILE_SEPARATOR)
      eventInfo = {duration, frozen, blind, penality}
      const [qtdTeams, qtdProblems] = values.split(FILE_SEPARATOR)
      text = text.slice(3)
      const teams = text.slice(0,qtdTeams)
      return {eventTitle, eventInfo, values, qtdTeams, qtdProblems, teams}
    })
    .then(resolve)
    .catch(reject)
  })
}
