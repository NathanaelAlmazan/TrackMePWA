import { gql } from '../../__generated__/gql';


// ================================ TYPES =================================

export const GET_TYPES = gql(`
    query GetDocumentTypes {
        getDocumentTypes {
            id
            label
        }
    }
`)

export const CREATE_TYPE = gql(`
    mutation CreateDocumentType($label: String!) {
        createDocumentType(label: $label) {
            id
            label
        }
    }
`)

export const UPDATE_TYPE = gql(`
    mutation UpdateDocumentType($id: Int!, $label: String!) {
        updateDocumentType(id: $id, label: $label) {
            id
            label
        }
    }
`)

export const DELETE_TYPE = gql(`
    mutation DeleteDocumentType($id: Int!) {
        deleteDocumentType(id: $id) {
            id  
            label
        }
    }
`)

// ================================ PURPOSES =================================

export const GET_PURPOSES = gql(`
    query GetDocumentPurposes {
        getDocumentPurposes {
            id
            label
        }
    }
`)

export const CREATE_PURPOSE = gql(`
    mutation CreateDocumentPurpose($label: String!) {
        createDocumentPurpose(label: $label) {
            id
            label
        }
    }
`)

export const UPDATE_PURPOSE = gql(`
    mutation UpdateDocumentPurpose($id: Int!, $label: String!) {
        updateDocumentPurpose(id: $id, label: $label) {
            id
            label
        }
    }
`)

export const DELETE_PURPOSE = gql(`
    mutation DeleteDocumentPurpose($id: Int!) {
        deleteDocumentPurpose(id: $id) {
            id
            label
        }
    }
`)

// ================================ STATUS =================================

export const GET_STATUSES = gql(`
    query GetDocumentStatus {
        getDocumentStatus {
            id
            label
            category
        }
    }
`)

export const CREATE_STATUS = gql(`
    mutation CreateDocumentStatus($label: String!, $category: Status!) {
        createDocumentStatus(label: $label, category: $category) {
            id
            label
            category
        }
    }
`)

export const UPDATE_STATUS = gql(`
    mutation UpdateDocumentStatus($id: Int!, $label: String!, $category: Status!) {
        updateDocumentStatus(id: $id, label: $label, category: $category) {
            id
            label
            category
        }
    }
`)

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
`)

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
`)

export const GET_DOCUMENTS = gql(`
    query GetDocuments($officeId: Int) {
        getDocuments(officeId: $officeId) {
            referenceNum
            subject
            description
            receivedFrom
            refferedTo {
                name
            }
            tag
            status {
                label
                category
            }
            dateCreated
        }
    }
`)

export const GET_DOCUMENT_BY_ID = gql(`
    query GetDocumentById($referenceNum: String!) {
        getDocumentById(referenceNum: $referenceNum) {
            referenceNum
            subject
            description
            receivedFrom
            refferedTo {
                id
                name
            }
            type {
                id
                label
            }
            purpose {
                id
                label
            }
            tag
            status {
                id
                label
                category
            }
            dateCreated
            dateDue
            comments {
                id
                sender {
                    uuid
                    avatar
                    firstName
                    lastName
                    position {
                        label
                    }
                }   
                files
                message
                dateCreated
            }
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
        }
    }
`)

export const CREATE_DOCUMENT = gql(`
    mutation CreateDocument($subject: String!, $description: String!, $receivedFrom: String!, $typeId: Int!, $purposeId: Int!, $statusId: Int!, $signatureId: String!, $dateDue: String!, $refferedTo: [Int!]!, $tag: Tags) {
        createDocument(subject: $subject, description: $description, receivedFrom: $receivedFrom, typeId: $typeId, purposeId: $purposeId, statusId: $statusId, signatureId: $signatureId, dateDue: $dateDue, refferedTo: $refferedTo, tag: $tag) {
            referenceNum
        }
    }
`)

export const UPDATE_DOCUMENT = gql(`
    mutation UpdateDocument($referenceNum: String!, $subject: String, $description: String, $receivedFrom: String, $typeId: Int, $purposeId: Int, $statusId: Int, $signatureId: String!, $tag: Tags, $dateDue: String, $refferedTo: [Int]) {
        updateDocument(referenceNum: $referenceNum, subject: $subject, description: $description, receivedFrom: $receivedFrom, typeId: $typeId, purposeId: $purposeId, statusId: $statusId, signatureId: $signatureId, tag: $tag, dateDue: $dateDue, refferedTo: $refferedTo) {
            referenceNum
        }
    }
`)

export const DELETE_DOCUMENT = gql(`
    mutation DeleteDocument($referenceNum: String!) {
        deleteDocument(referenceNum: $referenceNum) {
            subject
        }
    }
`)

export const UPDATE_DOCUMENT_STATUS = gql(`
    mutation DocumentUpdateStatus($referenceNum: String!, $statusId: Int!) {
        documentUpdateStatus(referenceNum: $referenceNum, statusId: $statusId) {
            id
            label
        }
    }
`)

export const CREATE_COMMENT = gql(`
    mutation CreateComment($documentId: String!, $senderId: String!, $message: String!, $files: [String!]) {
        createComment(documentId: $documentId, senderId: $senderId, message: $message, files: $files) {
            id
        }
    }
`)

export const SUBSCRIBE_DOCUMENT_EVENTS = gql(`
    subscription DocumentEvents($referenceNum: String!) {
        documentEvents(referenceNum: $referenceNum) {
            eventDate
            eventName
        }
    }
`)

export const GET_DOCUMENT_STATISTICS = gql(`
    query GetDocumentStatistics($officeId: Int) {
        getDocumentStatistics(officeId: $officeId) {
            closed
            noaction
            ongoing
            referred
        }
    }
`)

export const GET_DOCUMENT_BY_ID_STATUS = gql(`
    query GetDocumentByIdStatus($referenceNum: String!) {
        getDocumentById(referenceNum: $referenceNum) {
            status {
                id
                label
                category
            }
        }
    }
`)