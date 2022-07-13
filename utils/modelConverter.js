import { FROZEN, BLIND, PENALTY } from '../appSettings.js';

export const toContestModel = (model) => {
    return {
        eventTitle: model.contest.name,
        duration: Math.trunc(model.contest.durationSeconds / 60),
        frozen: model.contest.durationSeconds - FROZEN,
        blind: model.contest.durationSeconds - BLIND,
        penalty: PENALTY,
        qtdProblems: model.problems.length,
        teams: toTeamModel(model.rows)
    }
}

export const mockToContestModel = (model) => {
    return {
        eventTitle: model.name,
        duration: model.duration,
        frozen: model.frozen,
        blind: model.blind,
        penalty: model.penalty,
        qtdProblems: model.n_questions,
        teams: model.teams
    }
}

export const toTeamModel = (model) => {
    return model.map(r => {
        return {
            teamId: r.party.teamId ?? r.party.members[0].handle,
            college: '',
            name: r.party.teamName ?? r.party.members[0].handle
        }
    })
}

export const toRunModel = (model) => {
    if (!model) {
        return []
    }
    return model.map(r => {
        return {
            runId: r.id,
            time: Math.trunc(r.relativeTimeSeconds / 60), // sec => min
            teamUid: r.author.teamId ?? r.author.members[0].handle,
            problem: r.problem.index,
            verdict: r.verdict == 'OK' ? 'Y' : 'N'
        }
    })
}
