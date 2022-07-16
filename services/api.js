import { MODE } from '../appSettings.js';
import { getMockContest, getMockContestEnd, getMockRuns, getMockNewRuns } from './mockApi.js';
import { getCFContest, getCFContestEnd, getCFRuns, getCFNewRuns } from './cfApi.js';

export const getContest = () => {
  switch (MODE) {
    case "MOCK":
      return getMockContest();
    case "CF":
      return getCFContest();
  }
}

export const getContestEnd = () => {
  switch (MODE) {
    case "MOCK":
      return getMockContestEnd();
    case "CF":
      return getCFContestEnd();
  }
}

export const getRuns = () => {
  switch (MODE) {
    case "MOCK":
      return getMockRuns();
    case "CF":
      return getCFRuns();
  }
}

export const getNewRuns = (runId) => {
  switch (MODE) {
    case "MOCK":
      return getMockNewRuns(runId);
    case "CF":
      return getCFNewRuns(runId);
  }
}