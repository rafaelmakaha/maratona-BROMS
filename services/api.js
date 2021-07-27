const FILE_SEPARATOR = String.fromCharCode(28);
const baseUrl = 'http://localhost:8000'

export const getContest = () => {
  const url = `${baseUrl}/contest`;
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(response => response.json())
    .then(resolve)
    .catch(reject)
  })
}

export const getContestEnd = () => {
  const url = `${baseUrl}/contest/finish`;
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(response => response.json())
    .then(resolve)
    .catch(reject)
  })
}

export const getRuns = () => {
  const url = `${baseUrl}/runs`
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(response => response.json())
    .then(resolve)
    .catch(reject)
  })
}

export const getNewRuns = (runId) => {
  const url = `${baseUrl}/runs/diff`;
  const method = 'POST';
  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      headers: {
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify(runId)
    })
    .then(response => response.json())
    .then(resolve)
    .catch(reject)
  })
}