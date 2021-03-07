const FILE_SEPARATOR = String.fromCharCode(28);

export const getContest = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(response => response.text())
    .then(text => { 
      text = text.split('\n')
      const [eventTitle, eventInfo, values] = text
      const [qtdTeams, qtdQuestions] = values.split(FILE_SEPARATOR)
      text = text.slice(3)
      const teams = text.slice(0,qtdTeams)
      return {eventTitle, eventInfo, values, qtdTeams, qtdQuestions, teams}
    })
    .then(resolve)
    .catch(reject)
  })
}
