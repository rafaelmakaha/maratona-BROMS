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

// For api mock key it is the index of the next run to be requested 
// and for api cf it is the id of the last run processed
export const getNewRuns = (key) => {
  switch (MODE) {
    case "MOCK":
      return getMockNewRuns(key);
    case "CF":
      return getCFNewRuns(key);
  }
}