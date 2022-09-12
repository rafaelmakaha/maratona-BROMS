import { MOCK_BASE_URL } from '../appSettings.js';
import { mockToContestModel } from '../utils/modelConverter.js';

export const getMockContest = () => {
  const url = `${MOCK_BASE_URL}/contest`;
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(response => response.json())
    .then(responseJson => mockToContestModel(responseJson))
    .then(resolve)
    .catch(reject)
  })
}

export const getMockContestEnd = () => {
  const url = `${MOCK_BASE_URL}/contest/finish`;
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(response => response.json())
    .then(resolve)
    .catch(reject)
  })
}

export const getMockRuns = () => {
  const url = `${MOCK_BASE_URL}/runs`
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(response => response.json())
    .then(resolve)
    .catch(reject)
  })
}

export const getMockNewRuns = (index) => {
  const url = `${MOCK_BASE_URL}/runs/diff`;
  const method = 'POST';
  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      headers: {
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify(index)
    })
    .then(response => response.json())
    .then(resolve)
    .catch(reject)
  })
}