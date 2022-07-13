import { getApiUrl, getNewRunsCF } from '../utils/cf.js';
import { toContestModel, toRunModel } from '../utils/modelConverter.js';

export const getCFContest = () => {
  return new Promise((resolve, reject) => {
    getApiUrl('standings')
    .then(url => fetch(url))
    .then(response => response.json())
    .then(responseJson => toContestModel(responseJson.result))
    .then(resolve)
    .catch(reject)
  }) 
}

export const getCFContestEnd = () => {
  return new Promise((resolve, reject) => {
    getApiUrl('standings', 1, 1)
    .then(url => fetch(url))
    .then(response => response.json())
    .then(responseJson => responseJson.result ? responseJson.result?.contest.phase == 'FINISHED' : false)
    .then(resolve)
    .catch(reject)
  })
}

export const getCFRuns = (count, index) => {
  return new Promise((resolve, reject) => {
    getApiUrl('status', count, index)
    .then(url =>fetch(url))
    .then(response => response.json())
    .then(responseJson => toRunModel(responseJson.result?.reverse()))
    .then(resolve)
    .catch(reject)
  })
}

export const getCFNewRuns = (runId, count = 50) => {
  return getNewRunsCF(runId, count);
}
