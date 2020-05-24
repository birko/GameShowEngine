/// <reference path="../DataStructures/datastructures.d.ts" />
declare module DataStructures {
    class List<TValue> {
        private values;
        getValues(): TValue[];
        setValues(values: TValue[]): List<TValue>;
        clear(): List<TValue>;
        getLength(): number;
        hasValues(): boolean;
        indexOf(value: TValue): number;
        add(index: number, value: TValue): List<TValue>;
        addLast(value: TValue): List<TValue>;
        addFirst(value: TValue): List<TValue>;
        unshift(value: TValue): List<TValue>;
        push(value: TValue): List<TValue>;
        addRange(values: TValue[]): List<TValue>;
        get(index: number): TValue;
        set(index: number, value: TValue): List<TValue>;
        remove(index: number): List<TValue>;
        removeFirst(): List<TValue>;
        removeLast(): List<TValue>;
        shift(): List<TValue>;
        pop(): List<TValue>;
    }
}
declare module DataStructures {
    class KeyValuePair<TKey, TValue> {
        private key;
        private value;
        constructor(key: TKey, value: TValue);
        getKey(): TKey;
        setKey(key: TKey): KeyValuePair<TKey, TValue>;
        getValue(): TValue;
        setValue(value: TValue): KeyValuePair<TKey, TValue>;
    }
    class Dictionary<TKey, TValue> {
        private values;
        private keys;
        getKeysList(): List<TKey>;
        getKeys(): TKey[];
        getValuesList(): List<TValue>;
        getValues(): TValue[];
        getItems(): KeyValuePair<TKey, TValue>[];
        clear(): Dictionary<TKey, TValue>;
        getLength(): number;
        containsKey(key: TKey): boolean;
        setItems(items: KeyValuePair<TKey, TValue>[]): Dictionary<TKey, TValue>;
        setItem(item: KeyValuePair<TKey, TValue>): Dictionary<TKey, TValue>;
        set(key: TKey, value: TValue): Dictionary<TKey, TValue>;
        get(key: TKey): TValue;
        remove(key: TKey): TValue;
    }
}
declare module DataStructures {
    interface ISerializeToObject {
        serialize(): any;
        deserialize(object: any): void;
    }
    interface IComparable {
        compare(item: IComparable): number;
    }
    interface IAssocArray<TValue> {
        [index: string]: TValue;
    }
}
declare module GameShow {
    class TeamMember implements DataStructures.ISerializeToObject {
        private nick;
        private images;
        private id;
        constructor(nick?: string, id?: string, images?: string[]);
        getNick(): string;
        setNick(nick: string): TeamMember;
        getId(): string;
        setId(id: string): TeamMember;
        setImages(images: string[]): TeamMember;
        getImages(): string[];
        addImage(image: string): TeamMember;
        removeImage(index: number): TeamMember;
        hasImages(): boolean;
        getImagesLength(): number;
        toString(): string;
        serialize(): {
            nick: string;
            id: string;
            images: any[];
        };
        deserialize(object: any): void;
    }
    class Team implements DataStructures.ISerializeToObject {
        private points;
        private contestsFinished;
        private name;
        private members;
        constructor(name?: string, members?: TeamMember[], points?: number);
        setContestsFinished(contestsFinished: number): Team;
        getContestsFinished(): number;
        setName(name: string): Team;
        getName(): string;
        getMembers(): TeamMember[];
        setMembers(members: TeamMember[]): Team;
        addMembers(members: TeamMember[]): Team;
        addMember(member: TeamMember): Team;
        removeMemberByIndex(index: number): Team;
        removeMember(member: TeamMember): Team;
        clearMembers(): Team;
        getMemberByIndex(index: number): TeamMember;
        getMemberByNick(nick: string): TeamMember;
        getPoints(): number;
        setPoints(points: number): Team;
        addPoints(points: number): Team;
        removePoints(points: number): Team;
        toString(): string;
        serialize(): {
            name: string;
            points: number;
            members: any[];
            contestsFinished: number;
        };
        deserialize(object: any): void;
    }
}
declare module GameShow {
    enum ContestStatus {
        Inactive = 0,
        Preparation = 1,
        Running = 2,
        Paused = 3,
        Stopped = 4,
        Winner = 5,
        Ended = 6,
    }
    enum ContestType {
        Normal = 0,
        TeamNormal = 1,
        StopWatch = 2,
        TeamStopWatch = 3,
        TrackWatch = 4,
        TeamTrackWatch = 5,
    }
    class ContestTeam implements DataStructures.ISerializeToObject {
        private name;
        private result;
        private winner;
        constructor(name?: string);
        getName(): string;
        setName(name: string): ContestTeam;
        getResult(): number;
        setResult(result: number): ContestTeam;
        getWinner(): boolean;
        setWinner(winner: boolean): ContestTeam;
        serialize(): {
            name: string;
            result: number;
            winner: boolean;
        };
        deserialize(object: any): void;
    }
    class Contest implements DataStructures.ISerializeToObject {
        private name;
        private nameAlt;
        private seconds;
        private points;
        private startTime;
        private pauseTime;
        private status;
        private type;
        private run;
        private teams;
        constructor(name?: string, points?: number, active?: boolean, teamNames?: string[]);
        getStatus(): ContestStatus;
        setStatus(status: ContestStatus): Contest;
        hasStatus(status: ContestStatus): boolean;
        getRun(): number;
        setRun(run: number): Contest;
        hasRun(): boolean;
        addRun(run?: number): Contest;
        removeRun(run?: number): Contest;
        getStartTime(): number;
        setStartTime(timestamp: number): Contest;
        clearStartTime(): Contest;
        getPauseTime(): number;
        setPauseTime(timestamp: number): Contest;
        clearPauseTime(): Contest;
        getContestTime(): number;
        getSeconds(): number;
        setSeconds(seconds: number): Contest;
        getPoints(): number;
        setPoints(points: number): Contest;
        getWinner(): ContestTeam;
        protected setWinner(winner: ContestTeam): Contest;
        setWinnerByName(winner: string): Contest;
        setWinnerByIndex(index: number): Contest;
        clearWinner(): Contest;
        getType(): ContestType;
        setType(type: ContestType): Contest;
        isTrackWatch(): boolean;
        setTrackWatch(trackwatch: boolean, team: boolean): Contest;
        isStopWatch(): boolean;
        setStopWatch(stopwatch: boolean, team: boolean): Contest;
        isNormal(): boolean;
        setNormal(normal: boolean, team: boolean): Contest;
        isTeam(): boolean;
        getName(): string;
        setName(name: string): Contest;
        getNameAlt(): string;
        setNameAlt(name: string): Contest;
        isActive(): boolean;
        setActive(active: boolean): Contest;
        isEnded(): boolean;
        setEnded(ended: boolean): Contest;
        getTeams(): ContestTeam[];
        getTeamsResults(): ContestTeam[];
        getTeamByName(name: string): ContestTeam;
        getTeamByIndex(index: number): ContestTeam;
        clearTeams(): Contest;
        setTeams(teams: ContestTeam[]): Contest;
        addTeams(teams: ContestTeam[]): Contest;
        addTeam(team: ContestTeam): Contest;
        removeTeamByIndex(index: number): Contest;
        removeTeamByName(name: string): Contest;
        changeTeamNameByName(oldname: string, name: string): Contest;
        changeTeamNameByIndex(index: number, name: string): Contest;
        serialize(): {
            name: string;
            nameAlt: string;
            teams: any[];
            seconds: number;
            points: number;
            startTime: number;
            status: ContestStatus;
            pauseTime: number;
            type: ContestType;
            run: number;
        };
        deserialize(object: any): void;
    }
}
declare module GameShow {
    enum GamesStatus {
        Begin = 0,
        Between = 1,
        Contest = 2,
        Winner = 3,
        End = 4,
    }
    class Games implements DataStructures.ISerializeToObject {
        private teams;
        private contests;
        private status;
        private allowMultiple;
        constructor(teams?: Team[], contests?: Contest[], allowMultiple?: boolean);
        getAllowMultiple(): boolean;
        setAllowMultiple(allowMultiple: boolean): Games;
        getStatus(): GamesStatus;
        hasStatus(status: GamesStatus): boolean;
        setStatus(status: GamesStatus): Games;
        getContests(): Contest[];
        setContests(contests: Contest[]): Games;
        addContests(contests: Contest[]): Games;
        addContest(contest: Contest): Games;
        clearActiveContests(onlyWinners?: boolean): Games;
        clearContests(): Games;
        removeContestByIndex(index: number): Games;
        removeContest(contest: Contest): Games;
        getContestByIndex(index: number): Contest;
        getContestByName(name: string): Contest;
        isActiveContest(): boolean;
        getContestsByStatus(status: ContestStatus, activeOnly?: boolean): Contest[];
        getActiveContests(): Contest[];
        startContest(contest: Contest): Games;
        clearWinner(contest: Contest): Games;
        getTeams(): Team[];
        getTeamsResults(): Team[];
        setTeams(teams: Team[]): Games;
        addTeams(teams: Team[]): Games;
        addTeam(team: Team): Games;
        removeTeamByIndex(index: number): Games;
        removeTeam(team: Team): Games;
        clearTeams(): Games;
        getTeamByIndex(index: number): Team;
        getTeamByName(name: string): Team;
        getTotalPoints(): number;
        serialize(): {
            teams: any[];
            contests: any[];
            status: GamesStatus;
            allowMultiple: boolean;
        };
        deserialize(object: any): void;
    }
}
declare module GameShowApp {
    interface GamesStatusEvent {
        (): void;
    }
    interface GamesEvent {
        (): void;
    }
    interface ContestEvent {
        (contests: GameShow.Contest[]): void;
    }
    var game: GameShow.Games;
    function hasGameStatusEvents(): boolean;
    function hasContestEvents(): boolean;
    function hasGameEvents(): boolean;
    function hasEvents(): boolean;
    function clearGameStatusEvents(): void;
    function clearContestEvents(): void;
    function clearGameEvents(): void;
    function clearEvents(): void;
    function addGameStatusEvent(event: GameShowApp.GamesStatusEvent): void;
    function addGameEvent(status: GameShow.GamesStatus, event: GameShowApp.GamesEvent): void;
    function removeGameStatusEvent(event: GameShowApp.GamesEvent): void;
    function removeGameEvent(status: GameShow.GamesStatus, event: GameShowApp.GamesEvent): void;
    function runGameStatusEvent(): void;
    function runGameEvent(events: GameShowApp.GamesEvent[]): void;
    function addContestEvent(status: GameShow.ContestStatus, event: ContestEvent): void;
    function removeContestEvent(status: GameShow.ContestStatus, event: GameShowApp.ContestEvent): void;
    function runContestEvent(events: GameShowApp.ContestEvent[], contests: GameShow.Contest[]): void;
    function displayGameStatus(time?: number): void;
}
