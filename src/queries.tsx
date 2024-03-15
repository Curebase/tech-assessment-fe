import { gql } from '@apollo/client';

export const GET_PARTICIPANTS = gql`
  {
    participants {
      name
      enrolledDate
    }
  }
`;

export const GET_TRIALS = gql`
  {
    trials {
      id
    }
  }
`;

export const GET_TRIALS_WITH_PARTICIPANTS = gql`
  {
    trials {
      id
      participants {
        id
      }
    }
  }
`;

export const VALIDATE_PARTICIPANT = gql`
  query ValidateParticipant($participantId: Int!) {
    validateParticipant(participantId: $participantId) 
  }
`

export const CREATE_PARTICIPANT = gql`
  mutation CreateParticipant(
    $ParticipantInfo: ParticipantInfo!
  ) {
    createParticipant(
      participantInfo: $ParticipantInfo
    ) {
      id
    }
  }
`

export const ENROLL_PARTICIPANT = gql`
mutation EnrollParticipant(
  $participantId: Int!
  $trialId: String!
) {
  enrollParticipant(
    participantId: $participantId
    trialId: $trialId
  ) {
    id
  }
}`
