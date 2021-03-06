﻿/// <reference path="../DataStructures/Types.ts" />
module GameShow {
    "use strict";

    export class TeamMember implements DataStructures.ISerializeToObject {
        private nick: string;
        private images: DataStructures.List<string> = new DataStructures.List<string>();
        private id: string;

        public constructor(nick: string = undefined, id: string = undefined, images: string[] = undefined) {
            if (nick !== undefined && nick !== "" && nick !== null) {
                this.setNick(nick);
            }
            if (id !== undefined && id !== "" && id !== null) {
                this.setId(id);
            }
            if (images !== undefined && images != null) {
                this.setImages(images);
            }
        }

        public getNick(): string {
            return this.nick;
        }

        public setNick(nick: string): TeamMember {
            this.nick = nick;
            return this;
        }

        public getId(): string {
            return this.id;
        }

        public setId(id: string): TeamMember {
            this.id = id;
            return this;
        }

        public setImages(images: string[]): TeamMember {
            this.images = new DataStructures.List<string>();
            this.images.addRange(images);
            return this;
        }

        public getImages(): string[] {
            return this.images.getValues();
        }

        public addImage(image: string): TeamMember {
            this.images.addLast(image);
            return this;
        }

        public removeImage(index: number): TeamMember {
            this.images.remove(index);
            return this;
        }

        public hasImages(): boolean {
            return this.images.hasValues();
        }

        public getImagesLength(): number {
            return this.images.getLength();
        }

        public toString(): string {
            return "[" + this.getId() + "] " + this.getNick();
        }

        public serialize() {
            var imagesList: any[] = [];
            this.getImages().forEach((value: string, index: number) => {
                imagesList.push(value);
            });
            return {
                nick: this.getNick(),
                id: this.getId(),
                images: imagesList
            }
        }

        public deserialize(object: any) {
            this.setNick(object["nick"])
                .setId(object["id"])
                ;
            if (object["images"] !== undefined) {
                object["images"].forEach(function (value: string, index: number) {
                    this.addImage(value);
                }.bind(this));
            }
        }
    }

    export class Team implements DataStructures.ISerializeToObject {
        private points: number;
        private contestsFinished: number;
        private name: string;
        private members: TeamMember[];

        public constructor(name: string = undefined, members: TeamMember[] = [], points: number = 0) {
            this
                .setName(name)
                .setMembers(members)
                .setPoints(points)
                .setContestsFinished(0)
                ;
        }

        public setContestsFinished(contestsFinished: number): Team {
            this.contestsFinished = (!isNaN(contestsFinished) && contestsFinished !== undefined && contestsFinished != null) ? contestsFinished : 0;
            return this;
        }

        public getContestsFinished(): number {
            return (!isNaN(this.contestsFinished) && this.contestsFinished !== undefined && this.contestsFinished !== null) ? this.contestsFinished : 0;
        }

        public setName(name: string): Team {
            this.name = name;
            return this;
        }

        public getName(): string {
            return this.name;
        }

        public getMembers(): TeamMember[] {
            if (this.members === undefined) {
                this.members = [];
            }
            return this.members;
        }

        public setMembers(members: TeamMember[]): Team {
            this.members = [];
            this.addMembers(members);
            return this;
        }

        public addMembers(members: TeamMember[]): Team {
            if (members !== undefined && members.length > 0) {
                members.forEach(function (value: TeamMember, index: number) {
                    this.addMember(value);
                }.bind(this));
            }
            return this;
        }

        public addMember(member: TeamMember): Team {
            if (this.members === undefined) {
                this.members = [];
            }
            this.members.push(member);
            return this;
        }

        public removeMemberByIndex(index: number): Team {
            if (index >= 0 && this.getMembers().length > index) {
                this.members.splice(index, 1);
            }
            return this;
        }

        public removeMember(member: TeamMember): Team {
            var index: number = this.getMembers().indexOf(member);
            return this.removeMemberByIndex(index);
        }

        public clearMembers(): Team {
            this.setMembers([]);
            return this;
        }

        public getMemberByIndex(index: number): TeamMember {
            if (index >= 0 && index < this.getMembers().length) {
                return this.getMembers()[index];
            }
            return undefined;
        }

        public getMemberByNick(nick: string): TeamMember {
            var member: TeamMember = undefined;
            this.getMembers().forEach((value: TeamMember, index: number) => {
                if (value.getNick() === name) {
                    member = value;
                    return;
                }
            });
            return member;
        }

        public getPoints(): number {
            return (!isNaN(this.points) && this.points !== undefined && this.points !== null) ? this.points : 0;
        }

        public setPoints(points: number): Team {
            this.points = (!isNaN(points) && points !== undefined && points !== null) ? points : 0;
            return this;
        }

        public addPoints(points: number): Team {
            if (!isNaN(points) && points !== undefined && points !== null) {
                this.setPoints(this.getPoints() + points);
            }
            return this;
        }

        public removePoints(points: number): Team {
            if (!isNaN(points) && points !== undefined && points !== null) {
                this.setPoints(this.getPoints() - points);
            }
            return this;
        }

        public toString(): string {
            var members: string = "";
            this.getMembers().forEach((value: TeamMember, index: number) => {
                if (members !== "") {
                    members += ", ";
                }
                members += value.toString();
            });

            return this.getName() + " [p:" + this.getPoints() + ", f:" + this.getContestsFinished() + "] - " + members;
        }

        public serialize() {
            var memberList: any[] = [];
            this.getMembers().forEach((value: TeamMember, index: number) => {
                memberList.push(value.serialize());
            });
            return {
                name: this.getName(),
                points: this.getPoints(),
                members: memberList,
                contestsFinished: this.getContestsFinished()
            };
        }

        public deserialize(object: any) {
            this.setName(object["name"]);
            this.setPoints(object["points"]);
            this.clearMembers();
            if (object["members"] !== undefined) {
                object["members"].forEach(function (value: {}, index: number) {
                    var member: TeamMember = new TeamMember();
                    member.deserialize(value);
                    this.addMember(member);
                }.bind(this));
            }
            this.setContestsFinished(object["contestsFinished"]);
        }
    }
}