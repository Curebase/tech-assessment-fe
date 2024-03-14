
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
    hasCovid?: Nullable<boolean>;
    enrolledDate?: Nullable<Date>;
}

export interface IQuery {
    trials(): Trial[] | Promise<Trial[]>;
    participants(): Participant[] | Promise<Participant[]>;
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
    hasCovid: boolean;
    enrolledDate: Date;
    trials?: Nullable<Trial[]>;
}

export interface IMutation {
    createParticipant(participantInfo: ParticipantInfo, trialId?: Nullable<string>): Nullable<Participant> | Promise<Nullable<Participant>>;
}

type Nullable<T> = T | null;
