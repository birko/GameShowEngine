/// <reference path="Common.ts" />
/// <reference path="Team.ts" />
module GameShow {
    "use strict";

    export enum ContestStatus {
        Inactive,
        Preparation,
        Running,
        Paused,
        Stopped,
        Winner,
        Ended,
    }

    export enum ContestType {
        Normal,
        TeamNormal,
        StopWatch,
        TeamStopWatch,
        TrackWatch,
        TeamTrackWatch,
    }

    export class ContestTeam implements ISerializeToObject {
        private name: string;
        private result: number;
        private winner: boolean;

        public constructor(name: string = "") {
            this
                .setName(name)
                .setResult(0);
        }
        public getName(): string {
            return this.name;
        }

        public setName(name: string): ContestTeam {
            this.name = (name !== undefined && name != null) ? name : "";
            return this;
        }

        public getResult(): number {
            return (this.result !== undefined && this.result != null) ? this.result : 0;
        }

        public setResult(result: number): ContestTeam {
            this.result = (result !== undefined && result != null) ? result : 0;
            return this;
        }

        public getWinner(): boolean {
            return (this.winner !== undefined && this.winner != null) ? this.winner : false;
        }

        public setWinner(winner: boolean): ContestTeam {
            this.winner = (winner !== undefined && winner != null) ? winner : false;
            return this;
        }

        public serialize() {
            return {
                name: this.getName(),
                result: this.getResult(),
                winner: this.getWinner(),
            };
        }

        public deserialize(object: any) {
            this
                .setName(object["name"])
                .setResult(object["result"])
                .setWinner(object["winner"]);;
        }
    }

    export class Contest implements ISerializeToObject {
        private name: string;
        private nameAlt: string;
        private seconds: number;
        private points: number;
        private startTime: number;
        private pauseTime: number;
        private status: ContestStatus;
        private type: ContestType;
        private run: number;
        private teams: ContestTeam[];

        public constructor(name: string = "", points: number = 0, active: boolean = false, teamNames: string[] = []) {
            this.setName(name)
                .setPoints(points)
                .setActive(active)
                .setNameAlt("")
                ;
        }

        public getStatus(): ContestStatus {
            return (this.status !== undefined && this.status !== null) ? this.status : ContestStatus.Inactive;
        }

        public setStatus(status: ContestStatus): Contest {
            this.status = (status !== undefined && status !== null) ? status : ContestStatus.Inactive;
            return this;
        }

        public hasStatus(status: ContestStatus): boolean {
            return this.getStatus() === status;
        }

        public getRun(): number {
            return (this.run < 0 || this.run === undefined || this.run == null) ? 0 : this.run;
        }

        public setRun(run: number): Contest {
            this.run = (run < 0 || run === undefined || run == null) ? 0 : run;
            return this;
        }

        public hasRun(): boolean {
            if (this.isTeam() && this.getTeams().length > 0) {
                return this.getRun() < this.getTeams().length
            }
            return this.getRun() < 1;
        }

        public addRun(run: number = 1): Contest {
            return this.setRun(this.getRun() + run);
        }

        public removeRun(run: number = 1): Contest {
            return this.setRun(this.getRun() - run);
        }

        public getStartTime(): number {
            return this.startTime;
        }

        public setStartTime(timestamp: number): Contest {
            this.startTime = timestamp;
            return this;
        }

        public clearStartTime(): Contest {
            console.log("clearstarttime");
            this.startTime = undefined;
            return this;
        }

        public getPauseTime(): number {
            return this.pauseTime;
        }

        public setPauseTime(timestamp: number): Contest {
            this.pauseTime = timestamp;
            return this;
        }

        public clearPauseTime(): Contest {
            this.pauseTime = undefined;
            return this;
        }

        public getContestTime(): number {
            if (!this.isTrackWatch() && !this.isStopWatch()) {
                return null;
            }
            if (!this.hasStatus(ContestStatus.Inactive) && !this.hasStatus(ContestStatus.Winner)) {
                var startTime = this.getStartTime();
                if (startTime !== undefined && startTime !== null && startTime > 0) {
                    var now = Date.now();
                    var pauseTime = this.getPauseTime();
                    //if is paused add delay to start time
                    if (pauseTime !== undefined && pauseTime !== null && pauseTime > 0) {
                        startTime += now - pauseTime;
                        //startTime = this.setStartTime(startTime + now - pauseTime).setPauseTime(now).getStartTime();
                    }

                    var time = Math.floor((now - startTime) / 1000);
                    if (this.isStopWatch()) {
                        return this.getSeconds() - time;
                    }

                    return time;
                }
            }
            return null;
        }

        public getSeconds(): number {
            return (this.seconds !== undefined && this.seconds !== null && !isNaN(this.seconds)) ? this.seconds : 0;
        }

        public setSeconds(seconds: number): Contest {
            this.seconds = ((seconds !== undefined && seconds !== null && !isNaN(seconds))) ? seconds : 0;

            if (this.getSeconds() == 0) {
                this.setStopWatch(false, false);
            }

            return this;
        }

        public getPoints(): number {
            return (this.points !== undefined && this.points !== null && !isNaN(this.points)) ? this.points : 0;
        }

        public setPoints(points: number): Contest {
            this.points = points;
            return this;
        }

        public getWinner(): ContestTeam {
            var winners = this.getTeams().filter((value: ContestTeam, index: number) => {
                return value.getWinner();
            });
            return (winners.length > 0) ? winners[0] : null;
        }

        protected setWinner(winner: ContestTeam): Contest {
            this.getTeams().forEach((value: ContestTeam, index: number) => {
                value.setWinner(false);
            });
            if (winner !== null && winner !== undefined) {
                winner.setWinner(true);
            }
            return this;
        }

        public setWinnerByName(winner: string): Contest {
            var winners = this.getTeams().filter((value: ContestTeam, index: number) => {
                return value.getName() == winner;
            });
            if (winners.length > 0) {
                this.setWinner(winners[0]);
            }
            return this;
        }

        public setWinnerByIndex(index: number): Contest {
            if (this.getTeams().length > 0 && this.getTeams().length > index) {
                this.setWinner(this.getTeams()[index]);
                this.getTeams()[index].setWinner(true);
            }
            return this;
        }

        public clearWinner(): Contest {
            this.setWinner(null);
            return this;
        }

        public getType(): ContestType {
            return this.type;
        }

        public setType(type: ContestType): Contest {
            this.type = (type !== undefined && type !== null) ? type : ContestType.Normal;
            return this;
        }

        public isTrackWatch(): boolean {
            return this.type == ContestType.TrackWatch || this.type == ContestType.TeamTrackWatch;
        }

        public setTrackWatch(trackwatch: boolean, team: boolean): Contest {
            if (trackwatch) {
                this.setType((team) ? ContestType.TeamTrackWatch : ContestType.TrackWatch);
            }
            return this;
        }

        public isStopWatch(): boolean {
            return this.type == ContestType.StopWatch || this.type == ContestType.TeamStopWatch;
        }

        public setStopWatch(stopwatch: boolean, team: boolean): Contest {
            if (stopwatch) {
                this.setType((team) ? ContestType.TeamStopWatch : ContestType.StopWatch);
            }
            return this;
        }

        public isNormal(): boolean {
            return this.type == ContestType.Normal || this.type == ContestType.TeamNormal;
        }

        public setNormal(normal: boolean, team: boolean): Contest {
            if (normal) {
                this.setType((team) ? ContestType.TeamNormal : ContestType.Normal);
            }
            return this;
        }

        public isTeam(): boolean {
            return this.type == ContestType.TeamTrackWatch || this.type == ContestType.TeamStopWatch || this.type == ContestType.TeamNormal;
        }

        public getName(): string {
            return this.name;
        }

        public setName(name: string): Contest {
            this.name = (name !== undefined && name != null) ? name : "";
            return this;
        }

        public getNameAlt(): string {
            return this.nameAlt;
        }

        public setNameAlt(name: string): Contest {
            this.nameAlt = (name !== undefined && name != null) ? name : "";
            return this;
        }

        public isActive(): boolean {
            var inActive = [ContestStatus.Inactive, ContestStatus.Ended];
            return (inActive.indexOf(this.getStatus()) < 0);
        }

        public setActive(active: boolean): Contest {
            return this.setStatus((active) ? ContestStatus.Preparation : ContestStatus.Inactive);
        }

        public isEnded(): boolean {
            return this.getStatus() === ContestStatus.Ended;
        }

        public setEnded(ended: boolean): Contest {
            if (ended) {
                this.setStatus(ContestStatus.Ended);
            }
            return this;
        }

        public getTeams(): ContestTeam[] {
            if (this.teams === undefined) {
                this.teams = [];
            }
            return this.teams;
        }

        public getTeamsResults(): ContestTeam[] {
            return this.getTeams().sort((a: ContestTeam, b: ContestTeam) => {
                return b.getResult() - a.getResult();
            });
        };

        public getTeamByName(name: string): ContestTeam {
            if (this.getTeams().length > 0) {
                var team: ContestTeam = null;
                this.getTeams().forEach(function (value: ContestTeam, index: number) {
                    var teamname = value.getName();
                    if (teamname.trim() === name.trim()) {
                        team = value;
                    }
                }.bind(this));
                return team;
            }
            return null;
        }

        public getTeamByIndex(index: number): ContestTeam {
            return (index >= 0 && this.getTeams().length > index) ? this.getTeams()[index] : null;
        }

        public setTeams(teams: ContestTeam[]): Contest {
            this.teams = undefined;
            return this.addTeams(teams);
        }

        public addTeams(teams: ContestTeam[]): Contest {
            if (teams !== undefined && teams.length > 0) {
                teams.forEach(function (value: string, index: number) {
                    this.addTeamName(value);
                }.bind(this));
            }
            return this;
        }

        public addTeam(team: ContestTeam): Contest {
            if (team !== null && team !== undefined) {
                var test = this.getTeamByName(team.getName());
                if (test === null || test === undefined) {
                    if (this.teams === undefined) {
                        this.teams = [];
                    }
                    this.teams.push(team);
                }
            }
            return this;
        }

        public removeTeamByIndex(index: number): Contest {
            if (index >= 0 && this.getTeams().length > index) {
                this.teams.splice(index, 1);
            }
            return this;
        }

        public removeTeamByName(name: string): Contest {
            var team = this.getTeamByName(name);
            if (team !== null && team !== undefined) {
                var index = this.getTeams().indexOf(team);
                this.removeTeamByIndex(index);
            }
            return this;
        }
        public changeTeamNameByName(oldname: string, name: string): Contest {
            var team = this.getTeamByName(oldname);
            if (team !== null && team !== undefined) {
                team.setName(name);
            }
            return this;
        }

        public changeTeamNameByIndex(index: number, name: string): Contest {
            var team = this.getTeamByIndex(index);
            if (team !== null && team !== undefined) {
                team.setName(name);
            }
            return this;
        }

        public serialize() {
            var teamList: any[] = [];
            this.getTeams().forEach((value: ContestTeam, index: number) => {
                teamList.push(value.serialize());
            });
            return {
                name: this.getName(),
                nameAlt: this.getNameAlt(),
                teams: teamList,
                seconds: this.getSeconds(),
                points: this.getPoints(),
                startTime: this.getStartTime(),
                status: this.getStatus(),
                pauseTime: this.getPauseTime(),
                type: this.getType(),
                run: this.getRun()
            };
        }

        public deserialize(object: any) {
            if (object["teams"] !== undefined) {
                object["teams"].forEach(function (value: {}, index: number) {
                    var team: ContestTeam = new ContestTeam();
                    team.deserialize(value);
                    this.addTeam(team);
                }.bind(this));
            }
            this.setName(object["name"]).
                setNameAlt(object["nameAlt"]).
                setSeconds(object["seconds"]).
                setPoints(object["points"]).
                setStartTime(object["startTime"]).
                setStatus(object["status"]).
                setPauseTime(object["pauseTime"]).
                setType(object["type"]).
                setRun(object["run"])
                ;
        }
    }
}