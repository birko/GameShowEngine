"use strict";
var GameShow;
(function (GameShow) {
    "use strict";
})(GameShow || (GameShow = {}));
"use strict";
var GameShow;
(function (GameShow) {
    "use strict";
    var TeamMember = (function () {
        function TeamMember(nick, id) {
            if (nick === void 0) { nick = undefined; }
            if (id === void 0) { id = undefined; }
            if (nick != undefined || nick != "") {
                this.setNick(nick);
            }
            if (id != undefined || id != "") {
                this.setId(id);
            }
        }
        TeamMember.prototype.getNick = function () {
            return this.nick;
        };
        TeamMember.prototype.setNick = function (nick) {
            this.nick = nick;
            return this;
        };
        TeamMember.prototype.getId = function () {
            return this.id;
        };
        TeamMember.prototype.setId = function (id) {
            this.id = id;
            return this;
        };
        TeamMember.prototype.toString = function () {
            return "[" + this.getId() + "] " + this.getNick();
        };
        TeamMember.prototype.serialize = function () {
            return {
                nick: this.getNick(),
                id: this.getId()
            };
        };
        TeamMember.prototype.deserialize = function (object) {
            this.setNick(object["nick"])
                .setId(object['id']);
        };
        return TeamMember;
    }());
    GameShow.TeamMember = TeamMember;
    var Team = (function () {
        function Team(name, members, points) {
            if (name === void 0) { name = undefined; }
            if (members === void 0) { members = []; }
            if (points === void 0) { points = 0; }
            this
                .setName(name)
                .setMembers(members)
                .setPoints(points)
                .setContestsFinished(0);
        }
        Team.prototype.setContestsFinished = function (contestsFinished) {
            this.contestsFinished = (!isNaN(contestsFinished) && contestsFinished !== undefined && contestsFinished != null) ? contestsFinished : 0;
            return this;
        };
        Team.prototype.getContestsFinished = function () {
            return (!isNaN(this.contestsFinished) && this.contestsFinished !== undefined && this.contestsFinished !== null) ? this.contestsFinished : 0;
        };
        Team.prototype.setName = function (name) {
            this.name = name;
            return this;
        };
        Team.prototype.getName = function () {
            return this.name;
        };
        Team.prototype.getMembers = function () {
            if (this.members === undefined) {
                this.members = [];
            }
            return this.members;
        };
        Team.prototype.setMembers = function (members) {
            this.members = [];
            this.addMembers(members);
            return this;
        };
        Team.prototype.addMembers = function (members) {
            if (members !== undefined && members.length > 0) {
                members.forEach(function (value, index) {
                    this.addMember(value);
                }.bind(this));
            }
            return this;
        };
        Team.prototype.addMember = function (member) {
            if (this.members === undefined) {
                this.members = [];
            }
            this.members.push(member);
            return this;
        };
        Team.prototype.removeMemberByIndex = function (index) {
            if (index >= 0 && this.getMembers().length > index) {
                this.members.splice(index, 1);
            }
            return this;
        };
        Team.prototype.removeMember = function (member) {
            var index = this.getMembers().indexOf(member);
            return this.removeMemberByIndex(index);
        };
        Team.prototype.clearMembers = function () {
            this.setMembers([]);
            return this;
        };
        Team.prototype.getMemberByIndex = function (index) {
            if (index >= 0 && index < this.getMembers().length) {
                return this.getMembers()[index];
            }
            return undefined;
        };
        Team.prototype.getMemberByNick = function (nick) {
            var member = undefined;
            this.getMembers().forEach(function (value, index) {
                if (value.getNick() === name) {
                    member = value;
                    return;
                }
            });
            return member;
        };
        Team.prototype.getPoints = function () {
            return (!isNaN(this.points) && this.points !== undefined && this.points !== null) ? this.points : 0;
        };
        Team.prototype.setPoints = function (points) {
            this.points = (!isNaN(points) && points !== undefined && points !== null) ? points : 0;
            return this;
        };
        Team.prototype.addPoints = function (points) {
            if (!isNaN(points) && points !== undefined && points !== null) {
                this.setPoints(this.getPoints() + points);
            }
            return this;
        };
        Team.prototype.removePoints = function (points) {
            if (!isNaN(points) && points !== undefined && points !== null) {
                this.setPoints(this.getPoints() - points);
            }
            return this;
        };
        Team.prototype.toString = function () {
            var members = "";
            this.getMembers().forEach(function (value, index) {
                if (members !== "") {
                    members += ", ";
                }
                members += value.toString();
            });
            return this.getName() + " [p:" + this.getPoints() + ", f:" + this.getContestsFinished() + "] - " + members;
        };
        Team.prototype.serialize = function () {
            var memberList = [];
            this.getMembers().forEach(function (value, index) {
                memberList.push(value.serialize());
            });
            return {
                name: this.getName(),
                points: this.getPoints(),
                members: memberList,
                contestsFinished: this.getContestsFinished()
            };
        };
        Team.prototype.deserialize = function (object) {
            this.setName(object["name"]);
            this.setPoints(object["points"]);
            this.clearMembers();
            if (object["members"] !== undefined) {
                object["members"].forEach(function (value, index) {
                    var member = new TeamMember();
                    member.deserialize(value);
                    this.addMember(member);
                }.bind(this));
            }
            this.setContestsFinished(object["contestsFinished"]);
        };
        return Team;
    }());
    GameShow.Team = Team;
})(GameShow || (GameShow = {}));
"use strict";
var GameShow;
(function (GameShow) {
    "use strict";
    var ContestStatus;
    (function (ContestStatus) {
        ContestStatus[ContestStatus["Inactive"] = 0] = "Inactive";
        ContestStatus[ContestStatus["Preparation"] = 1] = "Preparation";
        ContestStatus[ContestStatus["Running"] = 2] = "Running";
        ContestStatus[ContestStatus["Paused"] = 3] = "Paused";
        ContestStatus[ContestStatus["Stopped"] = 4] = "Stopped";
        ContestStatus[ContestStatus["Winner"] = 5] = "Winner";
        ContestStatus[ContestStatus["Ended"] = 6] = "Ended";
    })(ContestStatus = GameShow.ContestStatus || (GameShow.ContestStatus = {}));
    var ContestType;
    (function (ContestType) {
        ContestType[ContestType["Normal"] = 0] = "Normal";
        ContestType[ContestType["TeamNormal"] = 1] = "TeamNormal";
        ContestType[ContestType["StopWatch"] = 2] = "StopWatch";
        ContestType[ContestType["TeamStopWatch"] = 3] = "TeamStopWatch";
        ContestType[ContestType["TrackWatch"] = 4] = "TrackWatch";
        ContestType[ContestType["TeamTrackWatch"] = 5] = "TeamTrackWatch";
    })(ContestType = GameShow.ContestType || (GameShow.ContestType = {}));
    var ContestTeam = (function () {
        function ContestTeam(name) {
            if (name === void 0) { name = ""; }
            this
                .setName(name)
                .setResult(0);
        }
        ContestTeam.prototype.getName = function () {
            return this.name;
        };
        ContestTeam.prototype.setName = function (name) {
            this.name = (name !== undefined && name != null) ? name : "";
            return this;
        };
        ContestTeam.prototype.getResult = function () {
            return (this.result !== undefined && this.result != null) ? this.result : 0;
        };
        ContestTeam.prototype.setResult = function (result) {
            this.result = (result !== undefined && result != null) ? result : 0;
            return this;
        };
        ContestTeam.prototype.getWinner = function () {
            return (this.winner !== undefined && this.winner != null) ? this.winner : false;
        };
        ContestTeam.prototype.setWinner = function (winner) {
            this.winner = (winner !== undefined && winner != null) ? winner : false;
            return this;
        };
        ContestTeam.prototype.serialize = function () {
            return {
                name: this.getName(),
                result: this.getResult(),
                winner: this.getWinner()
            };
        };
        ContestTeam.prototype.deserialize = function (object) {
            this
                .setName(object["name"])
                .setResult(object["result"])
                .setWinner(object["winner"]);
            ;
        };
        return ContestTeam;
    }());
    GameShow.ContestTeam = ContestTeam;
    var Contest = (function () {
        function Contest(name, points, active, teamNames) {
            if (name === void 0) { name = ""; }
            if (points === void 0) { points = 0; }
            if (active === void 0) { active = false; }
            if (teamNames === void 0) { teamNames = []; }
            this.setName(name)
                .setPoints(points)
                .setActive(active)
                .setNameAlt("");
        }
        Contest.prototype.getStatus = function () {
            return (this.status !== undefined && this.status !== null) ? this.status : ContestStatus.Inactive;
        };
        Contest.prototype.setStatus = function (status) {
            this.status = (status !== undefined && status !== null) ? status : ContestStatus.Inactive;
            return this;
        };
        Contest.prototype.hasStatus = function (status) {
            return this.getStatus() === status;
        };
        Contest.prototype.getRun = function () {
            return (this.run < 0 || this.run === undefined || this.run == null) ? 0 : this.run;
        };
        Contest.prototype.setRun = function (run) {
            this.run = (run < 0 || run === undefined || run == null) ? 0 : run;
            return this;
        };
        Contest.prototype.hasRun = function () {
            if (this.isTeam() && this.getTeams().length > 0) {
                return this.getRun() < this.getTeams().length;
            }
            return this.getRun() < 1;
        };
        Contest.prototype.addRun = function (run) {
            if (run === void 0) { run = 1; }
            return this.setRun(this.getRun() + run);
        };
        Contest.prototype.removeRun = function (run) {
            if (run === void 0) { run = 1; }
            return this.setRun(this.getRun() - run);
        };
        Contest.prototype.getStartTime = function () {
            return this.startTime;
        };
        Contest.prototype.setStartTime = function (timestamp) {
            this.startTime = timestamp;
            return this;
        };
        Contest.prototype.clearStartTime = function () {
            console.log("clearstarttime");
            this.startTime = undefined;
            return this;
        };
        Contest.prototype.getPauseTime = function () {
            return this.pauseTime;
        };
        Contest.prototype.setPauseTime = function (timestamp) {
            this.pauseTime = timestamp;
            return this;
        };
        Contest.prototype.clearPauseTime = function () {
            this.pauseTime = undefined;
            return this;
        };
        Contest.prototype.getContestTime = function () {
            if (!this.isTrackWatch() && !this.isStopWatch()) {
                return null;
            }
            if (!this.hasStatus(ContestStatus.Inactive) && !this.hasStatus(ContestStatus.Winner)) {
                var startTime = this.getStartTime();
                if (startTime !== undefined && startTime !== null && startTime > 0) {
                    var now = Date.now();
                    var pauseTime = this.getPauseTime();
                    if (pauseTime !== undefined && pauseTime !== null && pauseTime > 0) {
                        startTime += now - pauseTime;
                    }
                    var time = Math.floor((now - startTime) / 1000);
                    if (this.isStopWatch()) {
                        return this.getSeconds() - time;
                    }
                    return time;
                }
            }
            return null;
        };
        Contest.prototype.getSeconds = function () {
            return (this.seconds !== undefined && this.seconds !== null && !isNaN(this.seconds)) ? this.seconds : 0;
        };
        Contest.prototype.setSeconds = function (seconds) {
            this.seconds = ((seconds !== undefined && seconds !== null && !isNaN(seconds))) ? seconds : 0;
            if (this.getSeconds() == 0) {
                this.setStopWatch(false, false);
            }
            return this;
        };
        Contest.prototype.getPoints = function () {
            return (this.points !== undefined && this.points !== null && !isNaN(this.points)) ? this.points : 0;
        };
        Contest.prototype.setPoints = function (points) {
            this.points = points;
            return this;
        };
        Contest.prototype.getWinner = function () {
            var winners = this.getTeams().filter(function (value, index) {
                return value.getWinner();
            });
            return (winners.length > 0) ? winners[0] : null;
        };
        Contest.prototype.setWinner = function (winner) {
            this.getTeams().forEach(function (value, index) {
                value.setWinner(false);
            });
            if (winner !== null && winner !== undefined) {
                winner.setWinner(true);
            }
            return this;
        };
        Contest.prototype.setWinnerByName = function (winner) {
            var winners = this.getTeams().filter(function (value, index) {
                return value.getName() == winner;
            });
            if (winners.length > 0) {
                this.setWinner(winners[0]);
            }
            return this;
        };
        Contest.prototype.setWinnerByIndex = function (index) {
            if (this.getTeams().length > 0 && this.getTeams().length > index) {
                this.setWinner(this.getTeams()[index]);
                this.getTeams()[index].setWinner(true);
            }
            return this;
        };
        Contest.prototype.clearWinner = function () {
            this.setWinner(null);
            return this;
        };
        Contest.prototype.getType = function () {
            return this.type;
        };
        Contest.prototype.setType = function (type) {
            this.type = (type !== undefined && type !== null) ? type : ContestType.Normal;
            return this;
        };
        Contest.prototype.isTrackWatch = function () {
            return this.type == ContestType.TrackWatch || this.type == ContestType.TeamTrackWatch;
        };
        Contest.prototype.setTrackWatch = function (trackwatch, team) {
            if (trackwatch) {
                this.setType((team) ? ContestType.TeamTrackWatch : ContestType.TrackWatch);
            }
            return this;
        };
        Contest.prototype.isStopWatch = function () {
            return this.type == ContestType.StopWatch || this.type == ContestType.TeamStopWatch;
        };
        Contest.prototype.setStopWatch = function (stopwatch, team) {
            if (stopwatch) {
                this.setType((team) ? ContestType.TeamStopWatch : ContestType.StopWatch);
            }
            return this;
        };
        Contest.prototype.isNormal = function () {
            return this.type == ContestType.Normal || this.type == ContestType.TeamNormal;
        };
        Contest.prototype.setNormal = function (normal, team) {
            if (normal) {
                this.setType((team) ? ContestType.TeamNormal : ContestType.Normal);
            }
            return this;
        };
        Contest.prototype.isTeam = function () {
            return this.type == ContestType.TeamTrackWatch || this.type == ContestType.TeamStopWatch || this.type == ContestType.TeamNormal;
        };
        Contest.prototype.getName = function () {
            return this.name;
        };
        Contest.prototype.setName = function (name) {
            this.name = (name !== undefined && name != null) ? name : "";
            return this;
        };
        Contest.prototype.getNameAlt = function () {
            return this.nameAlt;
        };
        Contest.prototype.setNameAlt = function (name) {
            this.nameAlt = (name !== undefined && name != null) ? name : "";
            return this;
        };
        Contest.prototype.isActive = function () {
            var inActive = [ContestStatus.Inactive, ContestStatus.Ended];
            return (inActive.indexOf(this.getStatus()) < 0);
        };
        Contest.prototype.setActive = function (active) {
            return this.setStatus((active) ? ContestStatus.Preparation : ContestStatus.Inactive);
        };
        Contest.prototype.isEnded = function () {
            return this.getStatus() === ContestStatus.Ended;
        };
        Contest.prototype.setEnded = function (ended) {
            if (ended) {
                this.setStatus(ContestStatus.Ended);
            }
            return this;
        };
        Contest.prototype.getTeams = function () {
            if (this.teams === undefined) {
                this.teams = [];
            }
            return this.teams;
        };
        Contest.prototype.getTeamsResults = function () {
            return this.getTeams().sort(function (a, b) {
                return b.getResult() - a.getResult();
            });
        };
        ;
        Contest.prototype.getTeamByName = function (name) {
            if (this.getTeams().length > 0) {
                var team = null;
                this.getTeams().forEach(function (value, index) {
                    var teamname = value.getName();
                    if (teamname.trim() === name.trim()) {
                        team = value;
                    }
                }.bind(this));
                return team;
            }
            return null;
        };
        Contest.prototype.getTeamByIndex = function (index) {
            return (index >= 0 && this.getTeams().length > index) ? this.getTeams()[index] : null;
        };
        Contest.prototype.clearTeams = function () {
            return this.setTeams([]);
        };
        Contest.prototype.setTeams = function (teams) {
            this.teams = undefined;
            return this.addTeams(teams);
        };
        Contest.prototype.addTeams = function (teams) {
            if (teams !== undefined && teams.length > 0) {
                teams.forEach(function (value, index) {
                    this.addTeamName(value);
                }.bind(this));
            }
            return this;
        };
        Contest.prototype.addTeam = function (team) {
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
        };
        Contest.prototype.removeTeamByIndex = function (index) {
            if (index >= 0 && this.getTeams().length > index) {
                this.teams.splice(index, 1);
            }
            return this;
        };
        Contest.prototype.removeTeamByName = function (name) {
            var team = this.getTeamByName(name);
            if (team !== null && team !== undefined) {
                var index = this.getTeams().indexOf(team);
                this.removeTeamByIndex(index);
            }
            return this;
        };
        Contest.prototype.changeTeamNameByName = function (oldname, name) {
            var team = this.getTeamByName(oldname);
            if (team !== null && team !== undefined) {
                team.setName(name);
            }
            return this;
        };
        Contest.prototype.changeTeamNameByIndex = function (index, name) {
            var team = this.getTeamByIndex(index);
            if (team !== null && team !== undefined) {
                team.setName(name);
            }
            return this;
        };
        Contest.prototype.serialize = function () {
            var teamList = [];
            this.getTeams().forEach(function (value, index) {
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
        };
        Contest.prototype.deserialize = function (object) {
            this.clearTeams();
            if (object["teams"] !== undefined) {
                object["teams"].forEach(function (value, index) {
                    var team = new ContestTeam();
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
                setRun(object["run"]);
        };
        return Contest;
    }());
    GameShow.Contest = Contest;
})(GameShow || (GameShow = {}));
"use strict";
var GameShow;
(function (GameShow) {
    "use strict";
    var GamesStatus;
    (function (GamesStatus) {
        GamesStatus[GamesStatus["Begin"] = 0] = "Begin";
        GamesStatus[GamesStatus["Between"] = 1] = "Between";
        GamesStatus[GamesStatus["Contest"] = 2] = "Contest";
        GamesStatus[GamesStatus["Winner"] = 3] = "Winner";
        GamesStatus[GamesStatus["End"] = 4] = "End";
    })(GamesStatus = GameShow.GamesStatus || (GameShow.GamesStatus = {}));
    var Games = (function () {
        function Games(teams, contests, allowMultiple) {
            if (teams === void 0) { teams = []; }
            if (contests === void 0) { contests = []; }
            if (allowMultiple === void 0) { allowMultiple = false; }
            this.status = GamesStatus.Begin;
            this.setTeams(teams)
                .setContests(contests)
                .setStatus(GamesStatus.Begin)
                .setAllowMultiple(allowMultiple);
        }
        Games.prototype.getAllowMultiple = function () {
            return (this.allowMultiple !== undefined && this.allowMultiple != null) ? this.allowMultiple : false;
        };
        Games.prototype.setAllowMultiple = function (allowMultiple) {
            this.allowMultiple = (allowMultiple !== undefined && allowMultiple != null) ? allowMultiple : false;
            ;
            return this;
        };
        Games.prototype.getStatus = function () {
            return (this.status !== undefined && this.status != null) ? this.status : GamesStatus.Begin;
        };
        Games.prototype.hasStatus = function (status) {
            return this.getStatus() === status;
        };
        Games.prototype.setStatus = function (status) {
            this.status = status;
            return this;
        };
        Games.prototype.getContests = function () {
            if (this.contests === undefined) {
                this.contests = [];
            }
            return this.contests;
        };
        Games.prototype.setContests = function (contests) {
            this.contests = undefined;
            return this.addContests(contests);
        };
        Games.prototype.addContests = function (contests) {
            if (contests !== undefined && contests.length > 0) {
                contests.forEach(function (value, index) {
                    this.addContest(value);
                }.bind(this));
            }
            return this;
        };
        Games.prototype.addContest = function (contest) {
            if (this.contests === undefined) {
                this.contests = [];
            }
            if (contest.isActive()) {
                this.clearActiveContests(this.getAllowMultiple());
            }
            this.contests.push(contest);
            return this;
        };
        Games.prototype.clearActiveContests = function (onlyWinners) {
            if (onlyWinners === void 0) { onlyWinners = false; }
            this.getContests().forEach(function (value, index) {
                if (value.hasStatus(GameShow.ContestStatus.Winner)) {
                    value.setStatus(GameShow.ContestStatus.Ended);
                }
                if (!onlyWinners && !value.hasStatus(GameShow.ContestStatus.Ended)) {
                    value.setStatus(GameShow.ContestStatus.Inactive);
                }
            });
            return this;
        };
        Games.prototype.clearContests = function () {
            return this.setContests([]);
        };
        Games.prototype.removeContestByIndex = function (index) {
            if (index >= 0 && this.getContests().length > index) {
                this.contests.splice(index, 1);
            }
            return this;
        };
        Games.prototype.removeContest = function (contest) {
            var index = this.getContests().indexOf(contest);
            return this.removeContestByIndex(index);
        };
        Games.prototype.getContestByIndex = function (index) {
            if (index >= 0 && index < this.getContests().length) {
                return this.getContests()[index];
            }
            return undefined;
        };
        Games.prototype.getContestByName = function (name) {
            var contest = undefined;
            this.getContests().forEach(function (value, index) {
                if (value.getName() === name) {
                    contest = value;
                    return;
                }
            });
            return contest;
        };
        Games.prototype.isActiveContest = function () {
            var result = this.getActiveContests();
            return result !== undefined && result !== null && result.length > 0;
        };
        Games.prototype.getContestsByStatus = function (status, activeOnly) {
            if (activeOnly === void 0) { activeOnly = true; }
            var filter = (activeOnly) ? this.getActiveContests() : this.getContests();
            return filter.filter(function (value, index) {
                return value.getStatus() == status;
            });
        };
        Games.prototype.getActiveContests = function () {
            return this.getContests().filter(function (value, index) {
                return value.isActive();
            });
        };
        Games.prototype.startContest = function (contest) {
            this.clearActiveContests(this.getAllowMultiple());
            if (contest !== null && contest !== undefined) {
                contest.setStatus(GameShow.ContestStatus.Running);
                var date = Date.now();
                contest.setStartTime(date);
                contest.clearPauseTime();
                if (!contest.isTeam()) {
                    contest.setRun(0);
                }
            }
            return this;
        };
        Games.prototype.clearWinner = function (contest) {
            var _this = this;
            if (contest !== undefined && contest !== null) {
                var winner = contest.getWinner();
                if (winner !== undefined && winner !== null) {
                    var team = this.getTeamByName(winner.getName());
                    if (team !== undefined && team !== null) {
                        team.removePoints(contest.getPoints());
                    }
                    contest.getTeams().forEach(function (value, index) {
                        var team = _this.getTeamByName(winner.getName());
                        if (team !== undefined && team !== null) {
                            team.setContestsFinished(team.getContestsFinished() - 1);
                        }
                    });
                }
                contest.clearWinner();
            }
            return this;
        };
        Games.prototype.getTeams = function () {
            if (this.teams === undefined) {
                this.teams = [];
            }
            return this.teams;
        };
        Games.prototype.getTeamsResults = function () {
            return this.getTeams().sort(function (a, b) {
                return b.getPoints() - a.getPoints();
            });
        };
        ;
        Games.prototype.setTeams = function (teams) {
            this.teams = undefined;
            return this.addTeams(teams);
        };
        Games.prototype.addTeams = function (teams) {
            if (teams !== undefined && teams.length > 0) {
                teams.forEach(function (value, index) {
                    this.addTeam(value);
                }.bind(this));
            }
            return this;
        };
        Games.prototype.addTeam = function (team) {
            if (this.teams === undefined) {
                this.teams = [];
            }
            this.teams.push(team);
            return this;
        };
        Games.prototype.removeTeamByIndex = function (index) {
            if (index >= 0 && this.getTeams().length > index) {
                this.teams.splice(index, 1);
            }
            return this;
        };
        Games.prototype.removeTeam = function (team) {
            var index = this.getTeams().indexOf(team);
            return this.removeTeamByIndex(index);
        };
        Games.prototype.clearTeams = function () {
            return this.setTeams([]);
        };
        Games.prototype.getTeamByIndex = function (index) {
            if (index >= 0 && index < this.getTeams().length) {
                return this.getTeams()[index];
            }
            return undefined;
        };
        Games.prototype.getTeamByName = function (name) {
            var team = undefined;
            this.getTeams().forEach(function (value, index) {
                if (value.getName() === name) {
                    team = value;
                    return;
                }
            });
            return team;
        };
        Games.prototype.getTotalPoints = function () {
            var total = 0;
            this.getTeams().forEach(function (value, index) {
                if (value !== undefined && value !== null) {
                    total += value.getPoints();
                }
            });
            return total;
        };
        Games.prototype.serialize = function () {
            var teamList = [];
            var contestList = [];
            this.getTeams().forEach(function (value, index) {
                teamList.push(value.serialize());
            });
            this.getContests().forEach(function (value, index) {
                contestList.push(value.serialize());
            });
            return {
                teams: teamList,
                contests: contestList,
                status: this.getStatus(),
                allowMultiple: this.getAllowMultiple()
            };
        };
        Games.prototype.deserialize = function (object) {
            this.clearTeams();
            if (object["teams"] !== undefined) {
                object["teams"].forEach(function (value, index) {
                    var team = new GameShow.Team();
                    team.deserialize(value);
                    this.addTeam(team);
                }.bind(this));
            }
            this.clearContests();
            if (object["contests"] !== undefined) {
                object["contests"].forEach(function (value, index) {
                    var contest = new GameShow.Contest();
                    contest.deserialize(value);
                    this.addContest(contest);
                }.bind(this));
            }
            if (object["status"] !== undefined) {
                this.setStatus(object["status"]);
            }
            else {
                this.setStatus(GamesStatus.Begin);
            }
            if (object["allowMultiple"] !== undefined) {
                this.setAllowMultiple(object["allowMultiple"]);
            }
            else {
                this.setAllowMultiple(false);
            }
        };
        return Games;
    }());
    GameShow.Games = Games;
})(GameShow || (GameShow = {}));
"use strict";
var GameShowApp;
(function (GameShowApp) {
    "use strict";
    GameShowApp.game = new GameShow.Games();
    var showGameStatus = new Array();
    var showGameBegin = new Array();
    var showGameBetween = new Array();
    var showGameWinner = new Array();
    var showGameEnd = new Array();
    var showGameContest = new Array();
    var showContestPeparation = new Array();
    var showContestRunning = new Array();
    var showContestPaused = new Array();
    var showContestStopped = new Array();
    var showContestWinner = new Array();
    var showContestEnded = new Array();
    var showContestInactive = new Array();
    var animationFrame = undefined;
    function hasGameStatusEvents() {
        return showGameStatus !== undefined && showGameStatus.length > 0;
    }
    GameShowApp.hasGameStatusEvents = hasGameStatusEvents;
    function hasContestEvents() {
        return showContestPeparation.length > 0
            || showContestRunning.length > 0
            || showContestPaused.length > 0
            || showContestStopped.length > 0
            || showContestWinner.length > 0
            || showContestEnded.length > 0
            || showContestInactive.length > 0;
    }
    GameShowApp.hasContestEvents = hasContestEvents;
    function hasGameEvents() {
        return showGameBegin.length > 0
            || showGameContest.length > 0
            || showGameBetween.length > 0
            || showGameWinner.length > 0
            || showGameEnd.length > 0;
    }
    GameShowApp.hasGameEvents = hasGameEvents;
    function hasEvents() {
        return hasGameEvents() || hasContestEvents();
    }
    GameShowApp.hasEvents = hasEvents;
    function clearGameStatusEvents() {
        showGameStatus = Array();
    }
    GameShowApp.clearGameStatusEvents = clearGameStatusEvents;
    function clearContestEvents() {
        showContestPeparation = new Array();
        showContestRunning = new Array();
        showContestPaused = new Array();
        showContestStopped = new Array();
        showContestWinner = new Array();
        showContestEnded = new Array();
        showContestInactive = new Array();
    }
    GameShowApp.clearContestEvents = clearContestEvents;
    function clearGameEvents() {
        showGameBegin = new Array();
        showGameContest = new Array();
        showGameBetween = new Array();
        showGameWinner = new Array();
        showGameEnd = new Array();
    }
    GameShowApp.clearGameEvents = clearGameEvents;
    function clearEvents() {
        clearContestEvents();
        clearGameEvents();
    }
    GameShowApp.clearEvents = clearEvents;
    function addGameStatusEvent(event) {
        if (showGameStatus.indexOf(event) < 0) {
            showGameStatus.push(event);
        }
    }
    GameShowApp.addGameStatusEvent = addGameStatusEvent;
    function addGameEvent(status, event) {
        if (status === GameShow.GamesStatus.Begin && showGameBegin.indexOf(event) < 0) {
            showGameBegin.push(event);
        }
        else if (status === GameShow.GamesStatus.Between && showGameBetween.indexOf(event) < 0) {
            showGameBetween.push(event);
        }
        else if (status === GameShow.GamesStatus.Contest && showGameContest.indexOf(event) < 0) {
            showGameContest.push(event);
        }
        else if (status === GameShow.GamesStatus.Winner && showGameWinner.indexOf(event) < 0) {
            showGameWinner.push(event);
        }
        else if (status === GameShow.GamesStatus.End && showGameEnd.indexOf(event) < 0) {
            showGameEnd.push(event);
        }
    }
    GameShowApp.addGameEvent = addGameEvent;
    function removeGameStatusEvent(event) {
        var index = showGameStatus.indexOf(event);
        if (index >= 0) {
            showGameStatus.splice(index, 1);
        }
    }
    GameShowApp.removeGameStatusEvent = removeGameStatusEvent;
    function removeGameEvent(status, event) {
        if (status === GameShow.GamesStatus.Begin) {
            var index = showGameBegin.indexOf(event);
            if (index >= 0) {
                showGameBegin.splice(index, 1);
            }
        }
        else if (status === GameShow.GamesStatus.Between) {
            var index = showGameBetween.indexOf(event);
            if (index >= 0) {
                showGameBetween.splice(index, 1);
            }
        }
        else if (status === GameShow.GamesStatus.Contest) {
            var index = showGameContest.indexOf(event);
            if (index >= 0) {
                showGameContest.splice(index, 1);
            }
        }
        else if (status === GameShow.GamesStatus.Winner) {
            var index = showGameWinner.indexOf(event);
            if (index >= 0) {
                showGameWinner.splice(index, 1);
            }
        }
        else if (status === GameShow.GamesStatus.End) {
            var index = showGameEnd.indexOf(event);
            if (index >= 0) {
                showGameEnd.splice(index, 1);
            }
        }
    }
    GameShowApp.removeGameEvent = removeGameEvent;
    function runGameStatusEvent() {
        if (showGameStatus !== undefined && showGameStatus.length > 0) {
            showGameStatus.forEach(function (value, index) {
                value();
            });
        }
    }
    GameShowApp.runGameStatusEvent = runGameStatusEvent;
    function runGameEvent(events) {
        if (events != undefined && events.length > 0) {
            events.forEach(function (value, index) {
                value();
            });
        }
    }
    GameShowApp.runGameEvent = runGameEvent;
    function addContestEvent(status, event) {
        if (status == GameShow.ContestStatus.Preparation && showContestPeparation.indexOf(event) < 0) {
            showContestPeparation.push(event);
        }
        else if (status === GameShow.ContestStatus.Running && showContestRunning.indexOf(event) < 0) {
            showContestRunning.push(event);
        }
        else if (status === GameShow.ContestStatus.Paused && showContestPaused.indexOf(event) < 0) {
            showContestPaused.push(event);
        }
        else if (status === GameShow.ContestStatus.Stopped && showContestStopped.indexOf(event) < 0) {
            showContestStopped.push(event);
        }
        else if (status === GameShow.ContestStatus.Winner && showContestWinner.indexOf(event) < 0) {
            showContestWinner.push(event);
        }
        else if (status === GameShow.ContestStatus.Ended && showContestEnded.indexOf(event) < 0) {
            showContestEnded.push(event);
        }
        else if (status === GameShow.ContestStatus.Inactive && showContestInactive.indexOf(event) < 0) {
            showContestInactive.push(event);
        }
    }
    GameShowApp.addContestEvent = addContestEvent;
    function removeContestEvent(status, event) {
        if (status === GameShow.ContestStatus.Preparation) {
            var index = showContestPeparation.indexOf(event);
            if (index >= 0) {
                showContestPeparation.splice(index, 1);
            }
        }
        else if (status === GameShow.ContestStatus.Running) {
            var index = showContestRunning.indexOf(event);
            if (index >= 0) {
                showContestRunning.splice(index, 1);
            }
        }
        else if (status === GameShow.ContestStatus.Paused) {
            var index = showContestPaused.indexOf(event);
            if (index >= 0) {
                showContestPaused.splice(index, 1);
            }
        }
        else if (status === GameShow.ContestStatus.Stopped) {
            var index = showContestStopped.indexOf(event);
            if (index >= 0) {
                showContestStopped.splice(index, 1);
            }
        }
        else if (status === GameShow.ContestStatus.Winner) {
            var index = showContestWinner.indexOf(event);
            if (index >= 0) {
                showContestWinner.splice(index, 1);
            }
        }
        else if (status === GameShow.ContestStatus.Ended) {
            var index = showContestEnded.indexOf(event);
            if (index >= 0) {
                showContestEnded.splice(index, 1);
            }
        }
        else if (status === GameShow.ContestStatus.Inactive) {
            var index = showContestInactive.indexOf(event);
            if (index >= 0) {
                showContestInactive.splice(index, 1);
            }
        }
    }
    GameShowApp.removeContestEvent = removeContestEvent;
    function runContestEvent(events, contests) {
        if (events !== undefined && events.length > 0 && contests !== undefined && contests.length > 0) {
            events.forEach(function (value, index) {
                value(contests);
            });
        }
    }
    GameShowApp.runContestEvent = runContestEvent;
    function displayGameStatus(time) {
        if (time === void 0) { time = name; }
        runGameStatusEvent();
        if (GameShowApp.game.getStatus() == GameShow.GamesStatus.Begin) {
            runGameEvent(showGameBegin);
        }
        else if (GameShowApp.game.getStatus() == GameShow.GamesStatus.Between) {
            runGameEvent(showGameBetween);
        }
        else if (GameShowApp.game.getStatus() == GameShow.GamesStatus.Contest) {
            runGameEvent(showGameContest);
            if (GameShowApp.game.isActiveContest()) {
                var prepare = GameShowApp.game.getContestsByStatus(GameShow.ContestStatus.Preparation, true);
                var running = GameShowApp.game.getContestsByStatus(GameShow.ContestStatus.Running, true);
                var paused = GameShowApp.game.getContestsByStatus(GameShow.ContestStatus.Paused, true);
                var stopped = GameShowApp.game.getContestsByStatus(GameShow.ContestStatus.Stopped, true);
                var winner = GameShowApp.game.getContestsByStatus(GameShow.ContestStatus.Winner, true);
                runContestEvent(showContestRunning, running);
                runContestEvent(showContestPaused, paused);
                runContestEvent(showContestStopped, stopped);
                runContestEvent(showContestWinner, winner);
                runContestEvent(showContestPeparation, prepare);
            }
            else {
                var ended = GameShowApp.game.getContestsByStatus(GameShow.ContestStatus.Ended, false);
                var inactive = GameShowApp.game.getContestsByStatus(GameShow.ContestStatus.Inactive, false);
                runContestEvent(showContestInactive, inactive);
                runContestEvent(showContestEnded, ended);
            }
        }
        else if (GameShowApp.game.getStatus() == GameShow.GamesStatus.Winner) {
            runGameEvent(showGameWinner);
        }
        else if (GameShowApp.game.getStatus() == GameShow.GamesStatus.End) {
            runGameEvent(showGameEnd);
        }
        if (animationFrame !== undefined) {
            window.cancelAnimationFrame(animationFrame);
        }
        if (hasEvents()) {
            animationFrame = window.requestAnimationFrame(displayGameStatus);
        }
    }
    GameShowApp.displayGameStatus = displayGameStatus;
})(GameShowApp || (GameShowApp = {}));
//# sourceMappingURL=GameShowEngine.js.map