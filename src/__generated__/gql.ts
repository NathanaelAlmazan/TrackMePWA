/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query GetDocumentTypes {\n        getDocumentTypes {\n            id\n            label\n        }\n    }\n": types.GetDocumentTypesDocument,
    "\n    mutation CreateDocumentType($label: String!) {\n        createDocumentType(label: $label) {\n            id\n            label\n        }\n    }\n": types.CreateDocumentTypeDocument,
    "\n    mutation UpdateDocumentType($id: Int!, $label: String!) {\n        updateDocumentType(id: $id, label: $label) {\n            id\n            label\n        }\n    }\n": types.UpdateDocumentTypeDocument,
    "\n    mutation DeleteDocumentType($id: Int!) {\n        deleteDocumentType(id: $id) {\n            id  \n            label\n        }\n    }\n": types.DeleteDocumentTypeDocument,
    "\n    query GetDocumentPurposes {\n        getDocumentPurposes {\n            id\n            label\n        }\n    }\n": types.GetDocumentPurposesDocument,
    "\n    mutation CreateDocumentPurpose($label: String!) {\n        createDocumentPurpose(label: $label) {\n            id\n            label\n        }\n    }\n": types.CreateDocumentPurposeDocument,
    "\n    mutation UpdateDocumentPurpose($id: Int!, $label: String!) {\n        updateDocumentPurpose(id: $id, label: $label) {\n            id\n            label\n        }\n    }\n": types.UpdateDocumentPurposeDocument,
    "\n    mutation DeleteDocumentPurpose($id: Int!) {\n        deleteDocumentPurpose(id: $id) {\n            id\n            label\n        }\n    }\n": types.DeleteDocumentPurposeDocument,
    "\n    query GetDocumentStatus {\n        getDocumentStatus {\n            id\n            label\n            category\n        }\n    }\n": types.GetDocumentStatusDocument,
    "\n    mutation CreateDocumentStatus($label: String!, $category: Status!) {\n        createDocumentStatus(label: $label, category: $category) {\n            id\n            label\n            category\n        }\n    }\n": types.CreateDocumentStatusDocument,
    "\n    mutation UpdateDocumentStatus($id: Int!, $label: String!, $category: Status!) {\n        updateDocumentStatus(id: $id, label: $label, category: $category) {\n            id\n            label\n            category\n        }\n    }\n": types.UpdateDocumentStatusDocument,
    "\n    mutation DeleteDocumentStatus($id: Int!) {\n        deleteDocumentStatus(id: $id) {\n            id\n            label\n            category\n        }\n    }\n": types.DeleteDocumentStatusDocument,
    "\n    query TempReferenceNum {\n        getTempReferenceNum\n    }\n": types.TempReferenceNumDocument,
    "\n    query GetDocumentSummary {\n        getDocumentSummary {\n            closed\n            noaction\n            office\n            ongoing\n            referred\n        }\n    }\n": types.GetDocumentSummaryDocument,
    "\n    query GetDocuments($officerId: String!) {\n        getDocuments(officerId: $officerId) {\n            referenceNum\n            subject\n            description\n            receivedFrom\n            referredTo {\n                office {\n                    id\n                    name\n                }\n                status {\n                    id\n                    label\n                    category\n                }\n            }\n            directorAssigned {\n                uuid\n                firstName\n                lastName\n                position {\n                    label\n                    role\n                }\n                office {\n                    name\n                }\n            }\n            status\n            tag\n            dateCreated\n        }\n    }\n": types.GetDocumentsDocument,
    "\n    query GetDocumentById($referenceNum: String!, $officerId: String!) {\n        getDocumentById(referenceNum: $referenceNum) {\n            referenceNum\n            subject\n            description\n            receivedFrom\n            referredTo {\n                office {\n                    id \n                    name\n                }\n                status {\n                    id\n                    label\n                    category\n                }\n            }\n            type {\n                id\n                label\n            }\n            purpose {\n                id\n                label\n            }\n            status\n            tag\n            dateCreated\n            dateDue\n            signatory {\n                uuid\n                avatar\n                firstName\n                lastName\n                signature\n                position {\n                    label\n                }\n                office {\n                    id\n                    name\n                }\n            }\n            directorAssigned {\n                uuid\n                firstName\n                lastName\n                position {\n                    label\n                    role\n                }\n                office {\n                    name\n                }\n            }\n            chiefAssigned(officerId: $officerId) {\n                uuid\n                firstName\n                lastName\n                position {\n                    label\n                    role\n                }\n                office {\n                    name\n                }\n            }\n            comments(officerId: $officerId) {\n                id\n                message\n                sender {\n                    uuid\n                    avatar\n                    firstName\n                    lastName\n                    position {\n                        role\n                    }\n                    office {\n                        name\n                    }\n                }\n                recipient {\n                    uuid\n                    avatar\n                    firstName\n                    lastName\n                    position {\n                        role\n                    }\n                    office {\n                        name\n                    }\n                }\n                dateCreated\n            }\n            recipients(officerId: $officerId) {\n                uuid\n                firstName\n                lastName\n            }\n        }\n    }\n": types.GetDocumentByIdDocument,
    "\n    mutation CreateDocument($subject: String!, $description: String!, $receivedFrom: String!, $typeId: Int!, $purposeIds: String!, $dateDue: String, $signatureId: String!, $referredTo: [ReferralInput!]!, $tag: Tags, $assignedTo: [String!]!) {\n        createDocument(subject: $subject, description: $description, receivedFrom: $receivedFrom, typeId: $typeId, purposeIds: $purposeIds, dateDue: $dateDue, signatureId: $signatureId, referredTo: $referredTo, tag: $tag, assignedTo: $assignedTo) {\n            referenceNum\n        }\n    }\n": types.CreateDocumentDocument,
    "\n    mutation UpdateDocument($referenceNum: String!, $signatureId: String!, $subject: String, $description: String, $receivedFrom: String, $typeId: Int, $purposeIds: String, $tag: Tags, $dateDue: String, $assignedTo: [String!]) {\n        updateDocument(referenceNum: $referenceNum, signatureId: $signatureId, subject: $subject, description: $description, receivedFrom: $receivedFrom, typeId: $typeId, purposeIds: $purposeIds, tag: $tag, dateDue: $dateDue, assignedTo: $assignedTo) {\n            referenceNum\n        }\n    }\n": types.UpdateDocumentDocument,
    "\n    mutation DeleteDocument($referenceNum: String!) {\n        deleteDocument(referenceNum: $referenceNum) {\n            subject\n        }\n    }\n": types.DeleteDocumentDocument,
    "\n    mutation DocumentUpdateStatus($referenceNum: String!, $officeId: Int!, $statusId: Int!) {\n        documentUpdateStatus(referenceNum: $referenceNum, officeId: $officeId, statusId: $statusId) {\n            label\n        }\n    }\n": types.DocumentUpdateStatusDocument,
    "\n    subscription DocumentEvents($referenceNum: String!) {\n        documentEvents(referenceNum: $referenceNum) {\n            eventDate\n            eventName\n        }\n    }\n": types.DocumentEventsDocument,
    "\n    query GetDocumentStatistics($officeId: Int) {\n        getDocumentStatistics(officeId: $officeId) {\n            closed\n            noaction\n            ongoing\n            referred\n        }\n    }\n": types.GetDocumentStatisticsDocument,
    "\n    query GetDocumentByIdStatus($referenceNum: String!) {\n        getDocumentById(referenceNum: $referenceNum) {\n            status\n            referredTo {\n                status {\n                    id\n                    label\n                    category\n                }\n            }\n        }\n    }\n": types.GetDocumentByIdStatusDocument,
    "\n    mutation AssignOfficers($documentId: String!, $officerIds: [String!]!) {\n        assignOfficers(documentId: $documentId, officerIds: $officerIds) {\n            referenceNum\n        }\n    }\n": types.AssignOfficersDocument,
    "\n    mutation CreateComment($documentId: String!, $senderId: String!, $recipientId: String!, $message: String!) {\n        createComment(documentId: $documentId, senderId: $senderId, recipientId: $recipientId, message: $message) {\n            id\n        }\n    }\n": types.CreateCommentDocument,
    "\n    query GenerateReport {\n        generateReport\n    }\n": types.GenerateReportDocument,
    "\n    query GetReports {\n        getReports {\n            id\n            name\n            basis\n            frequency\n            localDue\n            nationalDue\n            type\n        }\n    }\n": types.GetReportsDocument,
    "\n    query GetReportById($id: Int!) {\n        getReportById(id: $id) {\n            id\n            name\n            basis\n            frequency\n            localDue\n            nationalDue  \n            type\n        }\n    }\n": types.GetReportByIdDocument,
    "\n    query GetReportSummary {\n        getReportSummary {\n            office\n            pending\n            submitted\n            total\n        }\n    }\n": types.GetReportSummaryDocument,
    "\n    query GetReportStatistics($officeId: Int) {\n        getReportStatistics(officeId: $officeId) {\n            overdue\n            pending\n            submitted\n            total\n        }\n    }\n": types.GetReportStatisticsDocument,
    "\n    query GetReportStatus($id: Int!) {\n        getSubmittedReportById(id: $id) {\n            id\n            pending\n        }\n    }\n": types.GetReportStatusDocument,
    "\n    mutation CreateReport($name: String!, $basis: String!, $localDue: String!, $nationalDue: String!, $frequency: Frequency!, $type: ReportType!) {\n        createReport(name: $name, basis: $basis, localDue: $localDue, nationalDue: $nationalDue, frequency: $frequency, type: $type) {\n            id\n        }\n    }\n": types.CreateReportDocument,
    "\n    mutation UpdateReport($id: Int!, $name: String, $basis: String, $localDue: String, $nationalDue: String, $frequency: Frequency, $type: ReportType) {\n        updateReport(id: $id, name: $name, basis: $basis, localDue: $localDue, nationalDue: $nationalDue, frequency: $frequency, type: $type) {\n            id\n        }\n    }\n": types.UpdateReportDocument,
    "\n    mutation DeleteReport($id: Int!) {\n        deleteReport(id: $id) {\n            id\n        }\n    }\n": types.DeleteReportDocument,
    "\n    query GetSubmittedReports($officeId: Int) {\n        getSubmittedReports(officeId: $officeId) {\n            id\n            report {\n                id\n                name\n                basis\n                type\n            }\n            status\n            localDue\n            nationalDue\n            pending\n        }\n    }\n": types.GetSubmittedReportsDocument,
    "\n    query GetSubmittedReportById($id: Int!) {\n        getSubmittedReportById(id: $id) {\n            id\n            office {\n                id\n                name\n            }\n            report {\n                id\n                name\n                basis\n                type\n            }\n            status\n            localDue\n            nationalDue\n            message\n            files\n        }\n    }\n": types.GetSubmittedReportByIdDocument,
    "\n    query GetOfficeSubmissions($id: Int!) {\n        getOfficeSubmissions(id: $id) {\n            id\n            office {\n                id\n                name\n            }\n            status\n            message\n            files\n        }\n    }\n": types.GetOfficeSubmissionsDocument,
    "\n    mutation SubmitReport($id: Int!, $message: String, $files: [String!]) {\n        submitReport(id: $id, message: $message, files: $files) {\n            id\n        }\n    }\n": types.SubmitReportDocument,
    "\n    mutation CreateSubmission($reportId: Int!, $localDue: String!, $nationalDue: String!) {\n        createSubmission(reportId: $reportId, localDue: $localDue, nationalDue: $nationalDue) {\n            id\n        }\n    }\n": types.CreateSubmissionDocument,
    "\n    mutation DeleteSubmission($id: Int!) {\n        deleteSubmission(id: $id) {\n            id\n        }\n    }\n": types.DeleteSubmissionDocument,
    "\n    query GetEvents($date: String!, $officeId: Int) {\n        getEvents(date: $date, officeId: $officeId) {\n            id\n            subject\n            description\n            image\n            date\n            dateDue\n            frequency\n            type\n        }\n    }\n": types.GetEventsDocument,
    "\n    query GetEventById($id: Int!) {\n        getEventById(id: $id) {\n            date\n            description\n            image\n            id\n            subject\n            frequency\n        }\n    }\n": types.GetEventByIdDocument,
    "\n    mutation CreateEvent($subject: String!, $description: String!, $date: String!, $frequency: Frequency!, $image: String) {\n        createEvent(subject: $subject, description: $description, date: $date, frequency: $frequency, image: $image) {\n            id\n        }\n    }\n": types.CreateEventDocument,
    "\n    mutation UpdateEvent($id: Int!, $subject: String, $description: String, $image: String, $date: String, $frequency: Frequency) {\n        updateEvent(id: $id, subject: $subject, description: $description, image: $image, date: $date, frequency: $frequency) {\n            id\n        }\n    }\n": types.UpdateEventDocument,
    "\n    mutation DeleteEvent($id: Int!) {\n        deleteEvent(id: $id) {\n            id\n        }\n    }\n": types.DeleteEventDocument,
    "\n    query GetOffices {\n        getOffices {\n            id\n            name\n        }\n    }\n": types.GetOfficesDocument,
    "\n    query GetOfficesReports($complied: Boolean) {\n        getOffices {\n            id\n            name\n            reports(complied: $complied) {\n                report {\n                    id\n                    name\n                }\n            }\n        }\n    }\n": types.GetOfficesReportsDocument,
    "\n    mutation CreateOffice($name: String!) {\n        createOffice(name: $name) {\n            id\n            name\n        } \n    }\n": types.CreateOfficeDocument,
    "\n    mutation UpdateOffice($id: Int!, $name: String) {\n        updateOffice(id: $id, name: $name) {\n            id\n            name\n        }\n    }\n": types.UpdateOfficeDocument,
    "\n   mutation DeleteOffice($id: Int!) {\n        deleteOffice(id: $id) {\n            id\n            name\n        }\n    }\n": types.DeleteOfficeDocument,
    "\n    query GetPositions {\n        getPositions {\n            id\n            label\n            role\n        }\n    }\n": types.GetPositionsDocument,
    "\n    mutation CreatePosition($label: String!, $role: Role!) {\n        createPosition(label: $label, role: $role) {\n            id\n            label\n            role\n        }\n    }\n": types.CreatePositionDocument,
    "\n    mutation UpdatePosition($id: Int!, $label: String!, $role: Role!) {\n        updatePosition(id: $id, label: $label, role: $role) {\n            id\n            label\n            role\n        }\n    }\n": types.UpdatePositionDocument,
    "\n    mutation DeletePosition($id: Int!) {\n        deletePosition(id: $id) {\n            id\n            label\n            role\n        }\n    }\n": types.DeletePositionDocument,
    "\n    query GetNotifications($uuid: String!) {\n        getNotifications(uuid: $uuid) {\n            description\n            subject\n            timestamp\n        }\n    }\n": types.GetNotificationsDocument,
    "\n    subscription OfficeEvents {\n        officeEvents {\n            eventDate\n            eventName\n        }\n    }\n": types.OfficeEventsDocument,
    "\n    query GetOfficers($officeId: [Int!]) {\n        getOfficers(officeId: $officeId) {\n            uuid\n            avatar\n            firstName\n            lastName\n            office {\n                id\n                name\n            }\n            position {\n                id\n                label\n                role\n            }\n            active\n            verified\n        }\n    }\n": types.GetOfficersDocument,
    "\n    query GetSignatories {\n        getSignatories {\n            uuid\n            avatar\n            firstName\n            lastName\n            signature\n            position {\n                id\n                label\n            }\n        }\n    }\n": types.GetSignatoriesDocument,
    "\n    query GetOfficerById($uuid: String!) {\n        getOfficerById(uuid: $uuid) {\n            uuid\n            avatar\n            firstName\n            lastName\n            email\n            phone\n            office {\n                id\n                name\n            }\n            position {\n                id\n                label\n                role\n            }\n            active  \n            signature\n        }\n    }\n": types.GetOfficerByIdDocument,
    "\n    mutation CreateOfficer($firstName: String!, $lastName: String!, $positionId: Int!, $officeId: Int!, $password: String, $email: String, $phone: String) {\n        createOfficer(firstName: $firstName, lastName: $lastName, positionId: $positionId, officeId: $officeId, password: $password, email: $email, phone: $phone) {\n            uuid\n        }\n    }\n": types.CreateOfficerDocument,
    "\n   mutation UpdateOfficer($uuid: String!, $avatar: String, $firstName: String, $email: String, $lastName: String, $phone: String, $positionId: Int, $officeId: Int, $password: String, $signature: String) {\n        updateOfficer(uuid: $uuid, avatar: $avatar, firstName: $firstName, email: $email, lastName: $lastName, phone: $phone, positionId: $positionId, officeId: $officeId, password: $password, signature: $signature) {\n            uuid\n        }\n    }\n": types.UpdateOfficerDocument,
    "\n    mutation DeleteOfficer($uuid: String!) {\n        deleteOfficer(uuid: $uuid) {\n            uuid\n        }\n    }\n": types.DeleteOfficerDocument,
    "\n    mutation ActivateOfficer($uuid: String!, $active: Boolean!) {\n        activateOfficer(uuid: $uuid, active: $active) {\n            uuid\n        }\n    }\n": types.ActivateOfficerDocument,
    "\n    query LoginOfficer($username: String!, $password: String!) {\n    loginOfficer(username: $username, password: $password) {\n        uuid\n        avatar\n        lastName\n        firstName\n        office {\n            id\n            name\n        }\n        position {\n            id\n            label\n            role\n        }\n        active\n            verified\n            signature\n        }\n    }\n": types.LoginOfficerDocument,
    "\n    query RequestResetPassword($email: String, $phone: String) {\n        requestResetPassword(email: $email, phone: $phone)\n    }\n": types.RequestResetPasswordDocument,
    "\n    query ConfirmResetPassword($code: String!, $password: String!, $email: String, $phone: String) {\n        confirmResetPassword(code: $code, password: $password, email: $email, phone: $phone) {\n            uuid\n            position {\n                id\n                label\n                role\n            }\n        }\n    }\n": types.ConfirmResetPasswordDocument,
    "\n    query RequestAccountVerify($uuid: String!, $contact: String!) {\n        requestAccountVerify(uuid: $uuid, contact: $contact)\n    }\n": types.RequestAccountVerifyDocument,
    "\n    query ConfirmAccountVerify($code: String!, $contact: String!) {\n        confirmAccountVerify(code: $code, contact: $contact) {\n            uuid\n            position {\n                id\n                label\n                role\n            }\n        }\n    }\n": types.ConfirmAccountVerifyDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetDocumentTypes {\n        getDocumentTypes {\n            id\n            label\n        }\n    }\n"): (typeof documents)["\n    query GetDocumentTypes {\n        getDocumentTypes {\n            id\n            label\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateDocumentType($label: String!) {\n        createDocumentType(label: $label) {\n            id\n            label\n        }\n    }\n"): (typeof documents)["\n    mutation CreateDocumentType($label: String!) {\n        createDocumentType(label: $label) {\n            id\n            label\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateDocumentType($id: Int!, $label: String!) {\n        updateDocumentType(id: $id, label: $label) {\n            id\n            label\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateDocumentType($id: Int!, $label: String!) {\n        updateDocumentType(id: $id, label: $label) {\n            id\n            label\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteDocumentType($id: Int!) {\n        deleteDocumentType(id: $id) {\n            id  \n            label\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteDocumentType($id: Int!) {\n        deleteDocumentType(id: $id) {\n            id  \n            label\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetDocumentPurposes {\n        getDocumentPurposes {\n            id\n            label\n        }\n    }\n"): (typeof documents)["\n    query GetDocumentPurposes {\n        getDocumentPurposes {\n            id\n            label\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateDocumentPurpose($label: String!) {\n        createDocumentPurpose(label: $label) {\n            id\n            label\n        }\n    }\n"): (typeof documents)["\n    mutation CreateDocumentPurpose($label: String!) {\n        createDocumentPurpose(label: $label) {\n            id\n            label\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateDocumentPurpose($id: Int!, $label: String!) {\n        updateDocumentPurpose(id: $id, label: $label) {\n            id\n            label\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateDocumentPurpose($id: Int!, $label: String!) {\n        updateDocumentPurpose(id: $id, label: $label) {\n            id\n            label\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteDocumentPurpose($id: Int!) {\n        deleteDocumentPurpose(id: $id) {\n            id\n            label\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteDocumentPurpose($id: Int!) {\n        deleteDocumentPurpose(id: $id) {\n            id\n            label\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetDocumentStatus {\n        getDocumentStatus {\n            id\n            label\n            category\n        }\n    }\n"): (typeof documents)["\n    query GetDocumentStatus {\n        getDocumentStatus {\n            id\n            label\n            category\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateDocumentStatus($label: String!, $category: Status!) {\n        createDocumentStatus(label: $label, category: $category) {\n            id\n            label\n            category\n        }\n    }\n"): (typeof documents)["\n    mutation CreateDocumentStatus($label: String!, $category: Status!) {\n        createDocumentStatus(label: $label, category: $category) {\n            id\n            label\n            category\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateDocumentStatus($id: Int!, $label: String!, $category: Status!) {\n        updateDocumentStatus(id: $id, label: $label, category: $category) {\n            id\n            label\n            category\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateDocumentStatus($id: Int!, $label: String!, $category: Status!) {\n        updateDocumentStatus(id: $id, label: $label, category: $category) {\n            id\n            label\n            category\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteDocumentStatus($id: Int!) {\n        deleteDocumentStatus(id: $id) {\n            id\n            label\n            category\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteDocumentStatus($id: Int!) {\n        deleteDocumentStatus(id: $id) {\n            id\n            label\n            category\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query TempReferenceNum {\n        getTempReferenceNum\n    }\n"): (typeof documents)["\n    query TempReferenceNum {\n        getTempReferenceNum\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetDocumentSummary {\n        getDocumentSummary {\n            closed\n            noaction\n            office\n            ongoing\n            referred\n        }\n    }\n"): (typeof documents)["\n    query GetDocumentSummary {\n        getDocumentSummary {\n            closed\n            noaction\n            office\n            ongoing\n            referred\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetDocuments($officerId: String!) {\n        getDocuments(officerId: $officerId) {\n            referenceNum\n            subject\n            description\n            receivedFrom\n            referredTo {\n                office {\n                    id\n                    name\n                }\n                status {\n                    id\n                    label\n                    category\n                }\n            }\n            directorAssigned {\n                uuid\n                firstName\n                lastName\n                position {\n                    label\n                    role\n                }\n                office {\n                    name\n                }\n            }\n            status\n            tag\n            dateCreated\n        }\n    }\n"): (typeof documents)["\n    query GetDocuments($officerId: String!) {\n        getDocuments(officerId: $officerId) {\n            referenceNum\n            subject\n            description\n            receivedFrom\n            referredTo {\n                office {\n                    id\n                    name\n                }\n                status {\n                    id\n                    label\n                    category\n                }\n            }\n            directorAssigned {\n                uuid\n                firstName\n                lastName\n                position {\n                    label\n                    role\n                }\n                office {\n                    name\n                }\n            }\n            status\n            tag\n            dateCreated\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetDocumentById($referenceNum: String!, $officerId: String!) {\n        getDocumentById(referenceNum: $referenceNum) {\n            referenceNum\n            subject\n            description\n            receivedFrom\n            referredTo {\n                office {\n                    id \n                    name\n                }\n                status {\n                    id\n                    label\n                    category\n                }\n            }\n            type {\n                id\n                label\n            }\n            purpose {\n                id\n                label\n            }\n            status\n            tag\n            dateCreated\n            dateDue\n            signatory {\n                uuid\n                avatar\n                firstName\n                lastName\n                signature\n                position {\n                    label\n                }\n                office {\n                    id\n                    name\n                }\n            }\n            directorAssigned {\n                uuid\n                firstName\n                lastName\n                position {\n                    label\n                    role\n                }\n                office {\n                    name\n                }\n            }\n            chiefAssigned(officerId: $officerId) {\n                uuid\n                firstName\n                lastName\n                position {\n                    label\n                    role\n                }\n                office {\n                    name\n                }\n            }\n            comments(officerId: $officerId) {\n                id\n                message\n                sender {\n                    uuid\n                    avatar\n                    firstName\n                    lastName\n                    position {\n                        role\n                    }\n                    office {\n                        name\n                    }\n                }\n                recipient {\n                    uuid\n                    avatar\n                    firstName\n                    lastName\n                    position {\n                        role\n                    }\n                    office {\n                        name\n                    }\n                }\n                dateCreated\n            }\n            recipients(officerId: $officerId) {\n                uuid\n                firstName\n                lastName\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetDocumentById($referenceNum: String!, $officerId: String!) {\n        getDocumentById(referenceNum: $referenceNum) {\n            referenceNum\n            subject\n            description\n            receivedFrom\n            referredTo {\n                office {\n                    id \n                    name\n                }\n                status {\n                    id\n                    label\n                    category\n                }\n            }\n            type {\n                id\n                label\n            }\n            purpose {\n                id\n                label\n            }\n            status\n            tag\n            dateCreated\n            dateDue\n            signatory {\n                uuid\n                avatar\n                firstName\n                lastName\n                signature\n                position {\n                    label\n                }\n                office {\n                    id\n                    name\n                }\n            }\n            directorAssigned {\n                uuid\n                firstName\n                lastName\n                position {\n                    label\n                    role\n                }\n                office {\n                    name\n                }\n            }\n            chiefAssigned(officerId: $officerId) {\n                uuid\n                firstName\n                lastName\n                position {\n                    label\n                    role\n                }\n                office {\n                    name\n                }\n            }\n            comments(officerId: $officerId) {\n                id\n                message\n                sender {\n                    uuid\n                    avatar\n                    firstName\n                    lastName\n                    position {\n                        role\n                    }\n                    office {\n                        name\n                    }\n                }\n                recipient {\n                    uuid\n                    avatar\n                    firstName\n                    lastName\n                    position {\n                        role\n                    }\n                    office {\n                        name\n                    }\n                }\n                dateCreated\n            }\n            recipients(officerId: $officerId) {\n                uuid\n                firstName\n                lastName\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateDocument($subject: String!, $description: String!, $receivedFrom: String!, $typeId: Int!, $purposeIds: String!, $dateDue: String, $signatureId: String!, $referredTo: [ReferralInput!]!, $tag: Tags, $assignedTo: [String!]!) {\n        createDocument(subject: $subject, description: $description, receivedFrom: $receivedFrom, typeId: $typeId, purposeIds: $purposeIds, dateDue: $dateDue, signatureId: $signatureId, referredTo: $referredTo, tag: $tag, assignedTo: $assignedTo) {\n            referenceNum\n        }\n    }\n"): (typeof documents)["\n    mutation CreateDocument($subject: String!, $description: String!, $receivedFrom: String!, $typeId: Int!, $purposeIds: String!, $dateDue: String, $signatureId: String!, $referredTo: [ReferralInput!]!, $tag: Tags, $assignedTo: [String!]!) {\n        createDocument(subject: $subject, description: $description, receivedFrom: $receivedFrom, typeId: $typeId, purposeIds: $purposeIds, dateDue: $dateDue, signatureId: $signatureId, referredTo: $referredTo, tag: $tag, assignedTo: $assignedTo) {\n            referenceNum\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateDocument($referenceNum: String!, $signatureId: String!, $subject: String, $description: String, $receivedFrom: String, $typeId: Int, $purposeIds: String, $tag: Tags, $dateDue: String, $assignedTo: [String!]) {\n        updateDocument(referenceNum: $referenceNum, signatureId: $signatureId, subject: $subject, description: $description, receivedFrom: $receivedFrom, typeId: $typeId, purposeIds: $purposeIds, tag: $tag, dateDue: $dateDue, assignedTo: $assignedTo) {\n            referenceNum\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateDocument($referenceNum: String!, $signatureId: String!, $subject: String, $description: String, $receivedFrom: String, $typeId: Int, $purposeIds: String, $tag: Tags, $dateDue: String, $assignedTo: [String!]) {\n        updateDocument(referenceNum: $referenceNum, signatureId: $signatureId, subject: $subject, description: $description, receivedFrom: $receivedFrom, typeId: $typeId, purposeIds: $purposeIds, tag: $tag, dateDue: $dateDue, assignedTo: $assignedTo) {\n            referenceNum\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteDocument($referenceNum: String!) {\n        deleteDocument(referenceNum: $referenceNum) {\n            subject\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteDocument($referenceNum: String!) {\n        deleteDocument(referenceNum: $referenceNum) {\n            subject\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DocumentUpdateStatus($referenceNum: String!, $officeId: Int!, $statusId: Int!) {\n        documentUpdateStatus(referenceNum: $referenceNum, officeId: $officeId, statusId: $statusId) {\n            label\n        }\n    }\n"): (typeof documents)["\n    mutation DocumentUpdateStatus($referenceNum: String!, $officeId: Int!, $statusId: Int!) {\n        documentUpdateStatus(referenceNum: $referenceNum, officeId: $officeId, statusId: $statusId) {\n            label\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    subscription DocumentEvents($referenceNum: String!) {\n        documentEvents(referenceNum: $referenceNum) {\n            eventDate\n            eventName\n        }\n    }\n"): (typeof documents)["\n    subscription DocumentEvents($referenceNum: String!) {\n        documentEvents(referenceNum: $referenceNum) {\n            eventDate\n            eventName\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetDocumentStatistics($officeId: Int) {\n        getDocumentStatistics(officeId: $officeId) {\n            closed\n            noaction\n            ongoing\n            referred\n        }\n    }\n"): (typeof documents)["\n    query GetDocumentStatistics($officeId: Int) {\n        getDocumentStatistics(officeId: $officeId) {\n            closed\n            noaction\n            ongoing\n            referred\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetDocumentByIdStatus($referenceNum: String!) {\n        getDocumentById(referenceNum: $referenceNum) {\n            status\n            referredTo {\n                status {\n                    id\n                    label\n                    category\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetDocumentByIdStatus($referenceNum: String!) {\n        getDocumentById(referenceNum: $referenceNum) {\n            status\n            referredTo {\n                status {\n                    id\n                    label\n                    category\n                }\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AssignOfficers($documentId: String!, $officerIds: [String!]!) {\n        assignOfficers(documentId: $documentId, officerIds: $officerIds) {\n            referenceNum\n        }\n    }\n"): (typeof documents)["\n    mutation AssignOfficers($documentId: String!, $officerIds: [String!]!) {\n        assignOfficers(documentId: $documentId, officerIds: $officerIds) {\n            referenceNum\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateComment($documentId: String!, $senderId: String!, $recipientId: String!, $message: String!) {\n        createComment(documentId: $documentId, senderId: $senderId, recipientId: $recipientId, message: $message) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation CreateComment($documentId: String!, $senderId: String!, $recipientId: String!, $message: String!) {\n        createComment(documentId: $documentId, senderId: $senderId, recipientId: $recipientId, message: $message) {\n            id\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GenerateReport {\n        generateReport\n    }\n"): (typeof documents)["\n    query GenerateReport {\n        generateReport\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetReports {\n        getReports {\n            id\n            name\n            basis\n            frequency\n            localDue\n            nationalDue\n            type\n        }\n    }\n"): (typeof documents)["\n    query GetReports {\n        getReports {\n            id\n            name\n            basis\n            frequency\n            localDue\n            nationalDue\n            type\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetReportById($id: Int!) {\n        getReportById(id: $id) {\n            id\n            name\n            basis\n            frequency\n            localDue\n            nationalDue  \n            type\n        }\n    }\n"): (typeof documents)["\n    query GetReportById($id: Int!) {\n        getReportById(id: $id) {\n            id\n            name\n            basis\n            frequency\n            localDue\n            nationalDue  \n            type\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetReportSummary {\n        getReportSummary {\n            office\n            pending\n            submitted\n            total\n        }\n    }\n"): (typeof documents)["\n    query GetReportSummary {\n        getReportSummary {\n            office\n            pending\n            submitted\n            total\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetReportStatistics($officeId: Int) {\n        getReportStatistics(officeId: $officeId) {\n            overdue\n            pending\n            submitted\n            total\n        }\n    }\n"): (typeof documents)["\n    query GetReportStatistics($officeId: Int) {\n        getReportStatistics(officeId: $officeId) {\n            overdue\n            pending\n            submitted\n            total\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetReportStatus($id: Int!) {\n        getSubmittedReportById(id: $id) {\n            id\n            pending\n        }\n    }\n"): (typeof documents)["\n    query GetReportStatus($id: Int!) {\n        getSubmittedReportById(id: $id) {\n            id\n            pending\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateReport($name: String!, $basis: String!, $localDue: String!, $nationalDue: String!, $frequency: Frequency!, $type: ReportType!) {\n        createReport(name: $name, basis: $basis, localDue: $localDue, nationalDue: $nationalDue, frequency: $frequency, type: $type) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation CreateReport($name: String!, $basis: String!, $localDue: String!, $nationalDue: String!, $frequency: Frequency!, $type: ReportType!) {\n        createReport(name: $name, basis: $basis, localDue: $localDue, nationalDue: $nationalDue, frequency: $frequency, type: $type) {\n            id\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateReport($id: Int!, $name: String, $basis: String, $localDue: String, $nationalDue: String, $frequency: Frequency, $type: ReportType) {\n        updateReport(id: $id, name: $name, basis: $basis, localDue: $localDue, nationalDue: $nationalDue, frequency: $frequency, type: $type) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateReport($id: Int!, $name: String, $basis: String, $localDue: String, $nationalDue: String, $frequency: Frequency, $type: ReportType) {\n        updateReport(id: $id, name: $name, basis: $basis, localDue: $localDue, nationalDue: $nationalDue, frequency: $frequency, type: $type) {\n            id\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteReport($id: Int!) {\n        deleteReport(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteReport($id: Int!) {\n        deleteReport(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetSubmittedReports($officeId: Int) {\n        getSubmittedReports(officeId: $officeId) {\n            id\n            report {\n                id\n                name\n                basis\n                type\n            }\n            status\n            localDue\n            nationalDue\n            pending\n        }\n    }\n"): (typeof documents)["\n    query GetSubmittedReports($officeId: Int) {\n        getSubmittedReports(officeId: $officeId) {\n            id\n            report {\n                id\n                name\n                basis\n                type\n            }\n            status\n            localDue\n            nationalDue\n            pending\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetSubmittedReportById($id: Int!) {\n        getSubmittedReportById(id: $id) {\n            id\n            office {\n                id\n                name\n            }\n            report {\n                id\n                name\n                basis\n                type\n            }\n            status\n            localDue\n            nationalDue\n            message\n            files\n        }\n    }\n"): (typeof documents)["\n    query GetSubmittedReportById($id: Int!) {\n        getSubmittedReportById(id: $id) {\n            id\n            office {\n                id\n                name\n            }\n            report {\n                id\n                name\n                basis\n                type\n            }\n            status\n            localDue\n            nationalDue\n            message\n            files\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetOfficeSubmissions($id: Int!) {\n        getOfficeSubmissions(id: $id) {\n            id\n            office {\n                id\n                name\n            }\n            status\n            message\n            files\n        }\n    }\n"): (typeof documents)["\n    query GetOfficeSubmissions($id: Int!) {\n        getOfficeSubmissions(id: $id) {\n            id\n            office {\n                id\n                name\n            }\n            status\n            message\n            files\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation SubmitReport($id: Int!, $message: String, $files: [String!]) {\n        submitReport(id: $id, message: $message, files: $files) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation SubmitReport($id: Int!, $message: String, $files: [String!]) {\n        submitReport(id: $id, message: $message, files: $files) {\n            id\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateSubmission($reportId: Int!, $localDue: String!, $nationalDue: String!) {\n        createSubmission(reportId: $reportId, localDue: $localDue, nationalDue: $nationalDue) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation CreateSubmission($reportId: Int!, $localDue: String!, $nationalDue: String!) {\n        createSubmission(reportId: $reportId, localDue: $localDue, nationalDue: $nationalDue) {\n            id\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteSubmission($id: Int!) {\n        deleteSubmission(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteSubmission($id: Int!) {\n        deleteSubmission(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetEvents($date: String!, $officeId: Int) {\n        getEvents(date: $date, officeId: $officeId) {\n            id\n            subject\n            description\n            image\n            date\n            dateDue\n            frequency\n            type\n        }\n    }\n"): (typeof documents)["\n    query GetEvents($date: String!, $officeId: Int) {\n        getEvents(date: $date, officeId: $officeId) {\n            id\n            subject\n            description\n            image\n            date\n            dateDue\n            frequency\n            type\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetEventById($id: Int!) {\n        getEventById(id: $id) {\n            date\n            description\n            image\n            id\n            subject\n            frequency\n        }\n    }\n"): (typeof documents)["\n    query GetEventById($id: Int!) {\n        getEventById(id: $id) {\n            date\n            description\n            image\n            id\n            subject\n            frequency\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateEvent($subject: String!, $description: String!, $date: String!, $frequency: Frequency!, $image: String) {\n        createEvent(subject: $subject, description: $description, date: $date, frequency: $frequency, image: $image) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation CreateEvent($subject: String!, $description: String!, $date: String!, $frequency: Frequency!, $image: String) {\n        createEvent(subject: $subject, description: $description, date: $date, frequency: $frequency, image: $image) {\n            id\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateEvent($id: Int!, $subject: String, $description: String, $image: String, $date: String, $frequency: Frequency) {\n        updateEvent(id: $id, subject: $subject, description: $description, image: $image, date: $date, frequency: $frequency) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateEvent($id: Int!, $subject: String, $description: String, $image: String, $date: String, $frequency: Frequency) {\n        updateEvent(id: $id, subject: $subject, description: $description, image: $image, date: $date, frequency: $frequency) {\n            id\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteEvent($id: Int!) {\n        deleteEvent(id: $id) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteEvent($id: Int!) {\n        deleteEvent(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetOffices {\n        getOffices {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    query GetOffices {\n        getOffices {\n            id\n            name\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetOfficesReports($complied: Boolean) {\n        getOffices {\n            id\n            name\n            reports(complied: $complied) {\n                report {\n                    id\n                    name\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetOfficesReports($complied: Boolean) {\n        getOffices {\n            id\n            name\n            reports(complied: $complied) {\n                report {\n                    id\n                    name\n                }\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateOffice($name: String!) {\n        createOffice(name: $name) {\n            id\n            name\n        } \n    }\n"): (typeof documents)["\n    mutation CreateOffice($name: String!) {\n        createOffice(name: $name) {\n            id\n            name\n        } \n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateOffice($id: Int!, $name: String) {\n        updateOffice(id: $id, name: $name) {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateOffice($id: Int!, $name: String) {\n        updateOffice(id: $id, name: $name) {\n            id\n            name\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n   mutation DeleteOffice($id: Int!) {\n        deleteOffice(id: $id) {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n   mutation DeleteOffice($id: Int!) {\n        deleteOffice(id: $id) {\n            id\n            name\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetPositions {\n        getPositions {\n            id\n            label\n            role\n        }\n    }\n"): (typeof documents)["\n    query GetPositions {\n        getPositions {\n            id\n            label\n            role\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreatePosition($label: String!, $role: Role!) {\n        createPosition(label: $label, role: $role) {\n            id\n            label\n            role\n        }\n    }\n"): (typeof documents)["\n    mutation CreatePosition($label: String!, $role: Role!) {\n        createPosition(label: $label, role: $role) {\n            id\n            label\n            role\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdatePosition($id: Int!, $label: String!, $role: Role!) {\n        updatePosition(id: $id, label: $label, role: $role) {\n            id\n            label\n            role\n        }\n    }\n"): (typeof documents)["\n    mutation UpdatePosition($id: Int!, $label: String!, $role: Role!) {\n        updatePosition(id: $id, label: $label, role: $role) {\n            id\n            label\n            role\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeletePosition($id: Int!) {\n        deletePosition(id: $id) {\n            id\n            label\n            role\n        }\n    }\n"): (typeof documents)["\n    mutation DeletePosition($id: Int!) {\n        deletePosition(id: $id) {\n            id\n            label\n            role\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetNotifications($uuid: String!) {\n        getNotifications(uuid: $uuid) {\n            description\n            subject\n            timestamp\n        }\n    }\n"): (typeof documents)["\n    query GetNotifications($uuid: String!) {\n        getNotifications(uuid: $uuid) {\n            description\n            subject\n            timestamp\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    subscription OfficeEvents {\n        officeEvents {\n            eventDate\n            eventName\n        }\n    }\n"): (typeof documents)["\n    subscription OfficeEvents {\n        officeEvents {\n            eventDate\n            eventName\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetOfficers($officeId: [Int!]) {\n        getOfficers(officeId: $officeId) {\n            uuid\n            avatar\n            firstName\n            lastName\n            office {\n                id\n                name\n            }\n            position {\n                id\n                label\n                role\n            }\n            active\n            verified\n        }\n    }\n"): (typeof documents)["\n    query GetOfficers($officeId: [Int!]) {\n        getOfficers(officeId: $officeId) {\n            uuid\n            avatar\n            firstName\n            lastName\n            office {\n                id\n                name\n            }\n            position {\n                id\n                label\n                role\n            }\n            active\n            verified\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetSignatories {\n        getSignatories {\n            uuid\n            avatar\n            firstName\n            lastName\n            signature\n            position {\n                id\n                label\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetSignatories {\n        getSignatories {\n            uuid\n            avatar\n            firstName\n            lastName\n            signature\n            position {\n                id\n                label\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetOfficerById($uuid: String!) {\n        getOfficerById(uuid: $uuid) {\n            uuid\n            avatar\n            firstName\n            lastName\n            email\n            phone\n            office {\n                id\n                name\n            }\n            position {\n                id\n                label\n                role\n            }\n            active  \n            signature\n        }\n    }\n"): (typeof documents)["\n    query GetOfficerById($uuid: String!) {\n        getOfficerById(uuid: $uuid) {\n            uuid\n            avatar\n            firstName\n            lastName\n            email\n            phone\n            office {\n                id\n                name\n            }\n            position {\n                id\n                label\n                role\n            }\n            active  \n            signature\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateOfficer($firstName: String!, $lastName: String!, $positionId: Int!, $officeId: Int!, $password: String, $email: String, $phone: String) {\n        createOfficer(firstName: $firstName, lastName: $lastName, positionId: $positionId, officeId: $officeId, password: $password, email: $email, phone: $phone) {\n            uuid\n        }\n    }\n"): (typeof documents)["\n    mutation CreateOfficer($firstName: String!, $lastName: String!, $positionId: Int!, $officeId: Int!, $password: String, $email: String, $phone: String) {\n        createOfficer(firstName: $firstName, lastName: $lastName, positionId: $positionId, officeId: $officeId, password: $password, email: $email, phone: $phone) {\n            uuid\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n   mutation UpdateOfficer($uuid: String!, $avatar: String, $firstName: String, $email: String, $lastName: String, $phone: String, $positionId: Int, $officeId: Int, $password: String, $signature: String) {\n        updateOfficer(uuid: $uuid, avatar: $avatar, firstName: $firstName, email: $email, lastName: $lastName, phone: $phone, positionId: $positionId, officeId: $officeId, password: $password, signature: $signature) {\n            uuid\n        }\n    }\n"): (typeof documents)["\n   mutation UpdateOfficer($uuid: String!, $avatar: String, $firstName: String, $email: String, $lastName: String, $phone: String, $positionId: Int, $officeId: Int, $password: String, $signature: String) {\n        updateOfficer(uuid: $uuid, avatar: $avatar, firstName: $firstName, email: $email, lastName: $lastName, phone: $phone, positionId: $positionId, officeId: $officeId, password: $password, signature: $signature) {\n            uuid\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteOfficer($uuid: String!) {\n        deleteOfficer(uuid: $uuid) {\n            uuid\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteOfficer($uuid: String!) {\n        deleteOfficer(uuid: $uuid) {\n            uuid\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation ActivateOfficer($uuid: String!, $active: Boolean!) {\n        activateOfficer(uuid: $uuid, active: $active) {\n            uuid\n        }\n    }\n"): (typeof documents)["\n    mutation ActivateOfficer($uuid: String!, $active: Boolean!) {\n        activateOfficer(uuid: $uuid, active: $active) {\n            uuid\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query LoginOfficer($username: String!, $password: String!) {\n    loginOfficer(username: $username, password: $password) {\n        uuid\n        avatar\n        lastName\n        firstName\n        office {\n            id\n            name\n        }\n        position {\n            id\n            label\n            role\n        }\n        active\n            verified\n            signature\n        }\n    }\n"): (typeof documents)["\n    query LoginOfficer($username: String!, $password: String!) {\n    loginOfficer(username: $username, password: $password) {\n        uuid\n        avatar\n        lastName\n        firstName\n        office {\n            id\n            name\n        }\n        position {\n            id\n            label\n            role\n        }\n        active\n            verified\n            signature\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query RequestResetPassword($email: String, $phone: String) {\n        requestResetPassword(email: $email, phone: $phone)\n    }\n"): (typeof documents)["\n    query RequestResetPassword($email: String, $phone: String) {\n        requestResetPassword(email: $email, phone: $phone)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query ConfirmResetPassword($code: String!, $password: String!, $email: String, $phone: String) {\n        confirmResetPassword(code: $code, password: $password, email: $email, phone: $phone) {\n            uuid\n            position {\n                id\n                label\n                role\n            }\n        }\n    }\n"): (typeof documents)["\n    query ConfirmResetPassword($code: String!, $password: String!, $email: String, $phone: String) {\n        confirmResetPassword(code: $code, password: $password, email: $email, phone: $phone) {\n            uuid\n            position {\n                id\n                label\n                role\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query RequestAccountVerify($uuid: String!, $contact: String!) {\n        requestAccountVerify(uuid: $uuid, contact: $contact)\n    }\n"): (typeof documents)["\n    query RequestAccountVerify($uuid: String!, $contact: String!) {\n        requestAccountVerify(uuid: $uuid, contact: $contact)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query ConfirmAccountVerify($code: String!, $contact: String!) {\n        confirmAccountVerify(code: $code, contact: $contact) {\n            uuid\n            position {\n                id\n                label\n                role\n            }\n        }\n    }\n"): (typeof documents)["\n    query ConfirmAccountVerify($code: String!, $contact: String!) {\n        confirmAccountVerify(code: $code, contact: $contact) {\n            uuid\n            position {\n                id\n                label\n                role\n            }\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;