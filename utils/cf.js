import { CF_KEY, CF_SEC, CF_CONTEST_ID } from '../appSettings.js';
import { getCFRuns } from '../services/cfApi.js';

export async function getApiUrl(api, count = null, index = null) {
    let params = `contest.${api}?apiKey=${CF_KEY}&contestId=${CF_CONTEST_ID}`;

    if (count && index) {
        params = params.concat(`&count=${count}&from=${index}`);
    }

    const time = Math.trunc(new Date().getTime() / 1000);

    params = params.concat(`&time=${time}`)

    const rand = generateRandomString();
    let hash = '';

    await sha512(`${rand}/${params}#${CF_SEC}`).then(h => hash = h);

    const url = `https://codeforces.com/api/${params}&apiSig=${rand}${hash}`;

    return url;
}

const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 8);
}

const sha512 = (str) => {
    return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
        return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
    });
}

export async function getNewRunsCF(runId, count) {
    let runsMap = new Map();
    let found = false;
    let i = 1;
    
    while (!found) {
        let runs = await getCFRuns(count, i);
        runs.forEach(r => {
            if (r.runId > runId) {
                runsMap.set(r.runId, r)
            }
            else {
                found = true;
            }
        })
        i += count;
    }

    let newRuns = [];

    for (let [_, value] of runsMap) {
        newRuns.push(value);
    }

    return newRuns.sort((a,b) => a.runId > b.runId ? 1 : -1);
}
