import { gql } from "../../__generated__/gql";

// ================================ TYPES =================================

export const GET_TYPES = gql(`
    query GetDocumentTypes {
        getDocumentTypes {
            id
            label
        }
    }
`);

export const CREATE_TYPE = gql(`
    mutation CreateDocumentType($label: String!) {
        createDocumentType(label: $label) {
            id
            label
        }
    }
`);

export const UPDATE_TYPE = gql(`
    mutation UpdateDocumentType($id: Int!, $label: String!) {
        updateDocumentType(id: $id, label: $label) {
            id
            label
        }
    }
`);

export const DELETE_TYPE = gql(`
    mutation DeleteDocumentType($id: Int!) {
        deleteDocumentType(id: $id) {
            id  
            label
        }
    }
`);

// ================================ PURPOSES =================================

export const GET_PURPOSES = gql(`
    query GetDocumentPurposes {
        getDocumentPurposes {
            id
            label
        }
    }
`);

export const CREATE_PURPOSE = gql(`
    mutation CreateDocumentPurpose($label: String!) {
        createDocumentPurpose(label: $label) {
            id
            label
        }
    }
`);

export const UPDATE_PURPOSE = gql(`
    mutation UpdateDocumentPurpose($id: Int!, $label: String!) {
        updateDocumentPurpose(id: $id, label: $label) {
            id
            label
        }
    }
`);

export const DELETE_PURPOSE = gql(`
    mutation DeleteDocumentPurpose($id: Int!) {
        deleteDocumentPurpose(id: $id) {
            id
            label
        }
    }
`);

// ================================ STATUS =================================

export const GET_STATUSES = gql(`
    query GetDocumentStatus {
        getDocumentStatus {
            id
            label
            category
        }
    }
`);

export const CREATE_STATUS = gql(`
    mutation CreateDocumentStatus($label: String!, $category: Status!) {
        createDocumentStatus(label: $label, category: $category) {
            id
            label
            category
        }
    }
`);

export const UPDATE_STATUS = gql(`
    mutation UpdateDocumentStatus($id: Int!, $label: String!, $category: Status!) {
        updateDocumentStatus(id: $id, label: $label, category: $category) {
            id
            label
            category
        }
    }
`);

export const DELETE_STATUS = gql(`
    mutation DeleteDocumentStatus($id: Int!) {
        deleteDocumentStatus(id: $id) {
            id
            label
            category
        }
    }
`);

// ================================ DOCUMENTS =================================

export const GET_TEMP_REF_NUM = gql(`
    query TempReferenceNum {
        getTempReferenceNum
    }
`);

export const GET_DOCUMENT_SUMMARY = gql(`
    query GetDocumentSummary {
        getDocumentSummary {
            closed
            noaction
            office
            ongoing
            referred
        }
    }
`);

export const GET_DOCUMENTS = gql(`
    query GetDocuments($officerId: String!) {
        getDocuments(officerId: $officerId) {
            referenceNum
            subject
            description
            receivedFrom
            referredTo {
                office {
                    id
                    name
                }
                status {
                    id
                    label
                    category
                }
            }
            directorAssigned {
                uuid
                firstName
                lastName
                position {
                    label
                    role
                }
                office {
                    name
                }
            }
            status
            tag
            dateCreated
        }
    }
`);

export const GET_DOCUMENT_BY_ID = gql(`
    query GetDocumentById($referenceNum: String!, $officerId: String!) {
        getDocumentById(referenceNum: $referenceNum) {
            referenceNum
            subject
            description
            receivedFrom
            referredTo {
                office {
                    id 
                    name
                }
                status {
                    id
                    label
                    category
                }
            }
            type {
                id
                label
            }
            purpose {
                id
                label
            }
            status
            tag
            dateCreated
            dateDue
            signatory {
                uuid
                avatar
                firstName
                lastName
                signature
                position {
                    label
                }
                office {
                    id
                    name
                }
            }
            directorAssigned {
                uuid
                firstName
                lastName
                position {
                    label
                    role
                }
                office {
                    name
                }
            }
            chiefAssigned(officerId: $officerId) {
                uuid
                firstName
                lastName
                position {
                    label
                    role
                }
                office {
                    name
                }
            }
            comments(officerId: $officerId) {
                id
                message
                sender {
                    uuid
                    avatar
                    firstName
                    lastName
                    position {
                        role
                    }
                    office {
                        name
                    }
                }
                recipient {
                    uuid
                    avatar
                    firstName
                    lastName
                    position {
                        role
                    }
                    office {
                        name
                    }
                }
                dateCreated
            }
            recipients(officerId: $officerId) {
                uuid
                firstName
                lastName
            }
        }
    }
`);

export const CREATE_DOCUMENT = gql(`
    mutation CreateDocument($subject: String!, $description: String!, $receivedFrom: String!, $typeId: Int!, $purposeIds: String!, $dateDue: String, $signatureId: String!, $referredTo: [ReferralInput!]!, $tag: Tags, $assignedTo: [String!]!) {
        createDocument(subject: $subject, description: $description, receivedFrom: $receivedFrom, typeId: $typeId, purposeIds: $purposeIds, dateDue: $dateDue, signatureId: $signatureId, referredTo: $referredTo, tag: $tag, assignedTo: $assignedTo) {
            referenceNum
        }
    }
`);

export const UPDATE_DOCUMENT = gql(`
    mutation UpdateDocument($referenceNum: String!, $signatureId: String!, $subject: String, $description: String, $receivedFrom: String, $typeId: Int, $purposeIds: String, $tag: Tags, $dateDue: String, $assignedTo: [String!]) {
        updateDocument(referenceNum: $referenceNum, signatureId: $signatureId, subject: $subject, description: $description, receivedFrom: $receivedFrom, typeId: $typeId, purposeIds: $purposeIds, tag: $tag, dateDue: $dateDue, assignedTo: $assignedTo) {
            referenceNum
        }
    }
`);

export const DELETE_DOCUMENT = gql(`
    mutation DeleteDocument($referenceNum: String!) {
        deleteDocument(referenceNum: $referenceNum) {
            subject
        }
    }
`);

export const UPDATE_DOCUMENT_STATUS = gql(`
    mutation DocumentUpdateStatus($referenceNum: String!, $officeId: Int!, $statusId: Int!) {
        documentUpdateStatus(referenceNum: $referenceNum, officeId: $officeId, statusId: $statusId) {
            label
        }
    }
`);

export const SUBSCRIBE_DOCUMENT_EVENTS = gql(`
    subscription DocumentEvents($referenceNum: String!) {
        documentEvents(referenceNum: $referenceNum) {
            eventDate
            eventName
        }
    }
`);

export const GET_DOCUMENT_STATISTICS = gql(`
    query GetDocumentStatistics($officeId: Int) {
        getDocumentStatistics(officeId: $officeId) {
            closed
            noaction
            ongoing
            referred
        }
    }
`);

export const GET_DOCUMENT_BY_ID_STATUS = gql(`
    query GetDocumentByIdStatus($referenceNum: String!) {
        getDocumentById(referenceNum: $referenceNum) {
            status
            referredTo {
                status {
                    id
                    label
                    category
                }
            }
        }
    }
`);

export const ASSIGN_OFFICERS = gql(`
    mutation AssignOfficers($documentId: String!, $officerIds: [String!]!) {
        assignOfficers(documentId: $documentId, officerIds: $officerIds) {
            referenceNum
        }
    }
`);

export const CREATE_COMMENT = gql(`
    mutation CreateComment($documentId: String!, $senderId: String!, $recipientId: String!, $message: String!) {
        createComment(documentId: $documentId, senderId: $senderId, recipientId: $recipientId, message: $message) {
            id
        }
    }
`);
