/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface ParticipantInfo {
    name: string;
    height: number;
    weight: number;
    hasDiabetes?: Nullable<boolean>;
    hadCovid?: Nullable<boolean>;
    enrolledDate?: Nullable<Date>;
}

export interface Trial {
    id: string;
    participants?: Nullable<Participant[]>;
}

export interface Participant {
    id: number;
    name: string;
    height: number;
    weight: number;
    hasDiabetes: boolean;
    hadCovid: boolean;
    enrolledDate: Date;
    trials?: Nullable<Trial[]>;
}

export interface IMutation {
    createParticipant(participantInfo: ParticipantInfo, trialId?: Nullable<string>): Nullable<Participant> | Promise<Nullable<Participant>>;
}

export interface IQuery {
    trials(): Trial[] | Promise<Trial[]>;
    participants(): Participant[] | Promise<Participant[]>;
    validateParticipant(participantId: number): Nullable<boolean> | Promise<Nullable<boolean>>;
}

type Nullable<T> = T | null;
