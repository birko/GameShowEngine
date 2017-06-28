/// <reference path="Common.ts" />
/// <reference path="Contest.ts" />
/// <reference path="Team.ts" />
module GameShow {
    "use strict";

    export enum GamesStatus {
        Begin,
        Between,
        Contest,
        Winner,
        End,
    }

    export class Games implements ISerializeToObject {
        private teams: Team[];
        private contests: Contest[];
        private status: GamesStatus = GamesStatus.Begin;
        private allowMultiple: boolean;

        public constructor(teams: Team[] = [], contests: Contest[] = [], allowMultiple: boolean = false) {
            this.setTeams(teams)
                .setContests(contests)
                .setStatus(GamesStatus.Begin)
                .setAllowMultiple(allowMultiple)
                ;
        }

        public getAllowMultiple(): boolean {
            return (this.allowMultiple !== undefined && this.allowMultiple != null) ? this.allowMultiple : false;
        }

        public setAllowMultiple(allowMultiple: boolean): Games {
            this.allowMultiple = (allowMultiple !== undefined && allowMultiple != null) ? allowMultiple : false;;
            return this;
        }

        public getStatus(): GamesStatus {
            return (this.status !== undefined && this.status != null) ? this.status : GamesStatus.Begin;
        }

        public hasStatus(status: GamesStatus): boolean {
            return this.getStatus() === status;
        }

        public setStatus(status: GamesStatus): Games {
            this.status = status;
            return this;
        }

        public getContests(): Contest[] {
            if (this.contests === undefined) {
                this.contests = [];
            }
            return this.contests;
        }

        public setContests(contests: Contest[]): Games {
            this.contests = undefined;
            return this.addContests(contests);
        }

        public addContests(contests: Contest[]): Games {
            if (contests !== undefined && contests.length > 0) {
                contests.forEach(function (value: Contest, index: number) {
                    this.addContest(value);
                }.bind(this));
            }
            return this;
        }

        public addContest(contest: Contest): Games {
            if (this.contests === undefined) {
                this.contests = [];
            }
            if (contest.isActive()) {
                this.clearActiveContests(this.getAllowMultiple());
            }
            this.contests.push(contest);
            return this;
        }

        public clearActiveContests(onlyWinners: boolean = false): Games {
            this.getContests().forEach(function (value: Contest, index: number) {
                if (value.hasStatus(ContestStatus.Winner)) {
                    value.setStatus(ContestStatus.Ended);
                }
                if (!onlyWinners && !value.hasStatus(ContestStatus.Ended)) {
                    value.setStatus(ContestStatus.Inactive);
                }
            });
            return this;
        }

        public clearContests(): Games {
            return this.setContests([]);
        }

        public removeContestByIndex(index: number): Games {
            if (index >= 0 && this.getContests().length > index) {
                this.contests.splice(index, 1);
            }
            return this;
        }

        public removeContest(contest: Contest): Games {
            var index: number = this.getContests().indexOf(contest);
            return this.removeContestByIndex(index);
        }

        public getContestByIndex(index: number): Contest {
            if (index >= 0 && index < this.getContests().length) {
                return this.getContests()[index];
            }
            return undefined;
        }

        public getContestByName(name: string): Contest {
            var contest: Contest = undefined;
            this.getContests().forEach((value: Contest, index: number) => {
                if (value.getName() === name) {
                    contest = value;
                    return;
                }
            });
            return contest;
        }

        public isActiveContest(): boolean {
            var result: Contest[] = this.getActiveContests();
            return result !== undefined && result !== null && result.length > 0;
        }

        public getContestsByStatus(status: ContestStatus, activeOnly: boolean = true): Contest[] {
            var filter = (activeOnly) ? this.getActiveContests() : this.getContests();
            return filter.filter((value: Contest, index: number) => {
                return value.getStatus() == status;
            });
        }

        public getActiveContests(): Contest[] {
            return this.getContests().filter((value: Contest, index: number) => {
                return value.isActive();
            });
        }

        public startContest(contest: Contest): Games {
            this.clearActiveContests(this.getAllowMultiple());
            if (contest !== null && contest !== undefined) {
                contest.setStatus(ContestStatus.Running);
                var date: number = Date.now();
                contest.setStartTime(date);
                contest.clearPauseTime();
                if (!contest.isTeam()) {
                    contest.setRun(0);
                }
            }
            return this;
        }

        public clearWinner(contest: Contest): Games {
            if (contest !== undefined && contest !== null) {
                var winner = contest.getWinner();
                if (winner !== undefined && winner !== null) {
                    var team: GameShow.Team = this.getTeamByName(winner.getName());
                    if (team !== undefined && team !== null) {
                        team.removePoints(contest.getPoints());
                    }
                    contest.getTeams().forEach((value: ContestTeam, index: number) => {
                        var team: GameShow.Team = this.getTeamByName(winner.getName());
                        if (team !== undefined && team !== null) {
                            team.setContestsFinished(team.getContestsFinished() - 1);
                        }
                    });
                }
                contest.clearWinner();
            }
            return this;
        }

        public getTeams(): Team[] {
            if (this.teams === undefined) {
                this.teams = [];
            }
            return this.teams;
        }

        public getTeamsResults(): Team[] {
            return this.getTeams().sort((a: Team, b : Team) => {
                return b.getPoints() - a.getPoints(); // more is better
            });
        };

        public setTeams(teams: Team[]): Games {
            this.teams = undefined;
            return this.addTeams(teams);
        }

        public addTeams(teams: Team[]): Games {
            if (teams !== undefined && teams.length > 0) {
                teams.forEach(function (value: Team, index: number) {
                    this.addTeam(value);
                }.bind(this));
            }
            return this;
        }

        public addTeam(team: Team): Games {
            if (this.teams === undefined) {
                this.teams = [];
            }
            this.teams.push(team);
            return this;
        }

        public removeTeamByIndex(index: number): Games {
            if (index >= 0 && this.getTeams().length > index) {
                this.teams.splice(index, 1);
            }
            return this;
        }

        public removeTeam(team: Team): Games {
            var index: number = this.getTeams().indexOf(team);
            return this.removeTeamByIndex(index);
        }

        public clearTeams(): Games {
            return this.setTeams([]);
        }

        public getTeamByIndex(index: number): Team {
            if (index >= 0 && index < this.getTeams().length) {
                return this.getTeams()[index];
            }
            return undefined;
        }

        public getTeamByName(name: string): Team {
            var team: Team = undefined;
            this.getTeams().forEach((value: Team, index: number) => {
                if (value.getName() === name) {
                    team = value;
                    return;
                }
            });
            return team;
        }

        public getTotalPoints(): number {
            var total: number = 0;
            this.getTeams().forEach((value: Team, index: number) => {
                if (value !== undefined && value !== null) {
                    total += value.getPoints();
                }
            });
            return total;
        }

        public serialize() {
            var teamList:any[] = [];
            var contestList:any[] = [];
            this.getTeams().forEach((value: Team, index: number) => {
                teamList.push(value.serialize());
            });
            this.getContests().forEach((value: Contest, index: number) => {
                contestList.push(value.serialize());
            });
            return {
                teams: teamList,
                contests: contestList,
                status: this.getStatus(),
                allowMultiple: this.getAllowMultiple()
            };
        }

        public deserialize(object: any) {
            this.clearTeams();
            if (object["teams"] !== undefined) {
                object["teams"].forEach(function (value: {}, index: number) {
                    var team: Team = new Team();
                    team.deserialize(value);
                    this.addTeam(team);
                }.bind(this));
            }

            this.clearContests();
            if (object["contests"] !== undefined) {
                object["contests"].forEach(function (value: {}, index: number) {
                    var contest: Contest = new Contest();
                    contest.deserialize(value);
                    this.addContest(contest);
                }.bind(this));
            }
            if (object["status"] !== undefined) {
                this.setStatus(object["status"]);
            } else {
                this.setStatus(GamesStatus.Begin);
            }
            if (object["allowMultiple"] !== undefined) {
                this.setAllowMultiple(object["allowMultiple"]);
            } else {
                this.setAllowMultiple(false);
            }
        }
    }
}