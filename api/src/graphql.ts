
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    participants(): Participant[] | Promise<Participant[]>;
    trials(): Trial[] | Promise<Trial[]>;
}

export interface Participant {
    id: number;
    name: string;
    height: number;
    weight: number;
    hasDiabetes: boolean;
    hasCovid: boolean;
}

export interface Trial {
    id: string;
}

type Nullable<T> = T | null;
