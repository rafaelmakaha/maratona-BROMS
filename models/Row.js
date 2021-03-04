class Row {
  constructor(teamName, totalSolved, totalPenality, totalProblems) {
    this.teamName = teamName;
    this.totalSolved = totalSolved;
    this.totalPenality = totalPenality;
    this.problems = new Array(totalProblems).fill(0);
    this.positionX = x;
    this.positionY = y;
  }
}

export default Row;