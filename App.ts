/// <reference path="Common.ts" />
/// <reference path="Team.ts" />
/// <reference path="Contest.ts" />
/// <reference path="Engine.ts" />
module GameShowApp {
    "use strict";

    export interface GamesStatusEvent {
        (): void;
    }

    export interface GamesEvent {
        (): void;
    }

    export interface ContestEvent {
        (contests: GameShow.Contest[]): void
    }

    export var game: GameShow.Games = new GameShow.Games();

    var showGameStatus: GamesStatusEvent[] = new Array();

    var showGameBegin: GamesEvent[] = new Array();
    var showGameBetween: GamesEvent[] = new Array();
    var showGameWinner: GamesEvent[] = new Array();
    var showGameEnd: GamesEvent[] = new Array();
    var showGameContest: GamesEvent[] = new Array();

    var showContestPeparation: ContestEvent[] = new Array();
    var showContestRunning: ContestEvent[] = new Array();
    var showContestPaused: ContestEvent[] = new Array();
    var showContestStopped: ContestEvent[] = new Array();
    var showContestWinner: ContestEvent[] = new Array();
    var showContestEnded: ContestEvent[] = new Array();
    var showContestInactive: ContestEvent[] = new Array();

    var animationFrame: number = undefined;
    /*
    export var getAnimationFrame = (function () {
        //if (window.hasOwnProperty("msRequestAnimationFrame")) {
        //    return window["msRequestAnimationFrame"];
        //}
        //if (window.hasOwnProperty("mozRequestAnimationFrame")) {
        //    return window["mozRequestAnimationFrame"];
        //}
        if (window.requestAnimationFrame != undefined) {
            return window.requestAnimationFrame;
        }
        if (window.webkitRequestAnimationFrame !== undefined) {
            return window.webkitRequestAnimationFrame;
        }
        return (callback: FrameRequestCallback) : number => {
            return window.setTimeout(callback, 1000 / 60);
        };
    })()
    */

    export function hasGameStatusEvents(): boolean {
        return showGameStatus !== undefined && showGameStatus.length > 0;
    }

    export function hasContestEvents() : boolean {
        return showContestPeparation.length > 0
            || showContestRunning.length > 0
            || showContestPaused.length > 0
            || showContestStopped.length > 0
            || showContestWinner.length > 0
            || showContestEnded.length > 0
            || showContestInactive.length > 0
    }

    export function hasGameEvents(): boolean {
        return showGameBegin.length > 0
            || showGameContest.length > 0
            || showGameBetween.length > 0
            || showGameWinner.length > 0
            || showGameEnd.length > 0
    }

    export function hasEvents(): boolean {
        return hasGameEvents() || hasContestEvents();
    }

    export function clearGameStatusEvents(): void {
        showGameStatus = Array();
    }

    export function clearContestEvents() : void {
        showContestPeparation = new Array();
        showContestRunning = new Array();
        showContestPaused = new Array();
        showContestStopped = new Array();
        showContestWinner = new Array();
        showContestEnded = new Array();
        showContestInactive = new Array();
    }

    export function clearGameEvents(): void {
        showGameBegin = new Array();
        showGameContest = new Array();
        showGameBetween = new Array();
        showGameWinner = new Array();
        showGameEnd = new Array();
    }

    export function clearEvents(): void {
        clearContestEvents();
        clearGameEvents();
    }

    export function addGameStatusEvent(event: GameShowApp.GamesStatusEvent): void {
        if (showGameStatus.indexOf(event) < 0) {
            showGameStatus.push(event);
        }
    }

    export function addGameEvent(status: GameShow.GamesStatus, event: GameShowApp.GamesEvent) : void {
        if (status === GameShow.GamesStatus.Begin && showGameBegin.indexOf(event) < 0) {
            showGameBegin.push(event);
        } else if (status === GameShow.GamesStatus.Between && showGameBetween.indexOf(event) < 0) {
            showGameBetween.push(event);
        } else if (status === GameShow.GamesStatus.Contest && showGameContest.indexOf(event) < 0) {
            showGameContest.push(event);
        } else if (status === GameShow.GamesStatus.Winner && showGameWinner.indexOf(event) < 0) {
            showGameWinner.push(event);
        } else if (status === GameShow.GamesStatus.End && showGameEnd.indexOf(event) < 0) {
            showGameEnd.push(event);
        }
    }

    export function removeGameStatusEvent(event: GameShowApp.GamesEvent): void {
        var index = showGameStatus.indexOf(event);
        if (index >= 0) {
            showGameStatus.splice(index, 1);
        }
    }

    export function removeGameEvent(status: GameShow.GamesStatus, event: GameShowApp.GamesEvent) : void {
        if (status === GameShow.GamesStatus.Begin) {
            var index = showGameBegin.indexOf(event);
            if (index >= 0) {
                showGameBegin.splice(index, 1);
            }
        } else if (status === GameShow.GamesStatus.Between) {
            var index = showGameBetween.indexOf(event);
            if (index >= 0) {
                showGameBetween.splice(index, 1);
            }
        } else if (status === GameShow.GamesStatus.Contest) {
            var index = showGameContest.indexOf(event);
            if (index >= 0) {
                showGameContest.splice(index, 1);
            }
        } else if (status === GameShow.GamesStatus.Winner) {
            var index = showGameWinner.indexOf(event);
            if (index >= 0) {
                showGameWinner.splice(index, 1);
            }
        } else if (status === GameShow.GamesStatus.End) {
            var index = showGameEnd.indexOf(event);
            if (index >= 0) {
                showGameEnd.splice(index, 1);
            }
        }
    }

    export function runGameStatusEvent(): void {
        if (showGameStatus !== undefined && showGameStatus.length > 0) {
            showGameStatus.forEach((value: GamesStatusEvent, index: number) => {
                value();
            });
        }
    }

    export function runGameEvent(events: GameShowApp.GamesEvent[]) : void {
        if (events != undefined && events.length > 0) {
            events.forEach((value: GamesEvent, index: number) => {
                value();
            });
        }
    }

    export function addContestEvent(status: GameShow.ContestStatus, event: ContestEvent) : void {
        if (status == GameShow.ContestStatus.Preparation && showContestPeparation.indexOf(event) < 0) {
            showContestPeparation.push(event);
        } else if (status === GameShow.ContestStatus.Running && showContestRunning.indexOf(event) < 0) {
            showContestRunning.push(event);
        } else if (status === GameShow.ContestStatus.Paused && showContestPaused.indexOf(event) < 0) {
            showContestPaused.push(event);
        } else if (status === GameShow.ContestStatus.Stopped && showContestStopped.indexOf(event) < 0) {
            showContestStopped.push(event);
        } else if (status === GameShow.ContestStatus.Winner && showContestWinner.indexOf(event) < 0) {
            showContestWinner.push(event);
        } else if (status === GameShow.ContestStatus.Ended && showContestEnded.indexOf(event) < 0) {
            showContestEnded.push(event);
        } else if (status === GameShow.ContestStatus.Inactive && showContestInactive.indexOf(event) < 0) {
            showContestInactive.push(event);
        }
    }

    export function removeContestEvent(status: GameShow.ContestStatus, event: GameShowApp.ContestEvent) : void {
        if (status === GameShow.ContestStatus.Preparation) {
            var index = showContestPeparation.indexOf(event);
            if (index >= 0) {
                showContestPeparation.splice(index, 1);
            }
        } else if (status === GameShow.ContestStatus.Running) {
            var index = showContestRunning.indexOf(event);
            if (index >= 0) {
                showContestRunning.splice(index, 1);
            }
        } else if (status === GameShow.ContestStatus.Paused) {
            var index = showContestPaused.indexOf(event);
            if (index >= 0) {
                showContestPaused.splice(index, 1);
            }
        } else if (status === GameShow.ContestStatus.Stopped) {
            var index = showContestStopped.indexOf(event);
            if (index >= 0) {
                showContestStopped.splice(index, 1);
            }
        } else if (status === GameShow.ContestStatus.Winner) {
            var index = showContestWinner.indexOf(event);
            if (index >= 0) {
                showContestWinner.splice(index, 1);
            }
        } else if (status === GameShow.ContestStatus.Ended) {
            var index = showContestEnded.indexOf(event);
            if (index >= 0) {
                showContestEnded.splice(index, 1);
            }
        } else if (status === GameShow.ContestStatus.Inactive) {
            var index = showContestInactive.indexOf(event);
            if (index >= 0) {
                showContestInactive.splice(index, 1);
            }
        }
    }

    export function runContestEvent (events: GameShowApp.ContestEvent[], contests: GameShow.Contest[]) {
        if (events !== undefined && events.length > 0 && contests !== undefined && contests.length > 0) {
            events.forEach((value: GameShowApp.ContestEvent, index: number) => {
                value(contests);
            });
        }
    }

    export function displayGameStatus(time: number = name) {
        runGameStatusEvent();
        if (game.getStatus() == GameShow.GamesStatus.Begin) {
            runGameEvent(showGameBegin);
        } else if (game.getStatus() == GameShow.GamesStatus.Between) {
            runGameEvent(showGameBetween);
        } else if (game.getStatus() == GameShow.GamesStatus.Contest) {
            runGameEvent(showGameContest);
            if (game.isActiveContest()) {
                var prepare = game.getContestsByStatus(GameShow.ContestStatus.Preparation, true);
                var running = game.getContestsByStatus(GameShow.ContestStatus.Running, true);
                var paused = game.getContestsByStatus(GameShow.ContestStatus.Paused, true);
                var stopped = game.getContestsByStatus(GameShow.ContestStatus.Stopped, true);
                var winner = game.getContestsByStatus(GameShow.ContestStatus.Winner, true);
                runContestEvent(showContestRunning, running);
                runContestEvent(showContestPaused, paused);
                runContestEvent(showContestStopped, stopped);
                runContestEvent(showContestWinner, winner);
                runContestEvent(showContestPeparation, prepare);
            } else {
                var ended = game.getContestsByStatus(GameShow.ContestStatus.Ended, false);
                var inactive = game.getContestsByStatus(GameShow.ContestStatus.Inactive, false);
                runContestEvent(showContestInactive, inactive);
                runContestEvent(showContestEnded, ended);
            }

        } else if (game.getStatus() == GameShow.GamesStatus.Winner) {
            runGameEvent(showGameWinner);
        } else if (game.getStatus() == GameShow.GamesStatus.End) {
            runGameEvent(showGameEnd);
        }
        if (animationFrame !== undefined) {
            window.cancelAnimationFrame(animationFrame);
        }
        if (hasEvents()) {
            animationFrame = window.requestAnimationFrame(displayGameStatus);
        }
    }
}