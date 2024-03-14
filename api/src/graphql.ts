
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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
    trials?: Nullable<Trial[]>;
}

type Nullable<T> = T | null;
