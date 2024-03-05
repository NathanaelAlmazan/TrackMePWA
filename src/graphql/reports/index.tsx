import { gql } from '../../__generated__/gql';

// =============================== REPORTS ==================================

export const GET_REPORTS = gql(`
    query GetReports {
        getReports {
            id
            name
            basis
            frequency
            localDue
            nationalDue
            type
        }
    }
`)

export const GET_REPORT_BY_ID = gql(`
    query GetReportById($id: Int!) {
        getReportById(id: $id) {
            id
            name
            basis
            frequency
            localDue
            nationalDue  
            type
        }
    }
`)

export const GET_REPORT_SUMMARY = gql(`
    query GetReportSummary {
        getReportSummary {
            office
            pending
            submitted
            total
        }
    }
`)

export const GET_REPORT_STATISTICS = gql(`
    query GetReportStatistics($officeId: Int) {
        getReportStatistics(officeId: $officeId) {
            overdue
            pending
            submitted
            total
        }
    }
`)

export const GET_REPORT_STATUS = gql(`
    query GetReportStatus($id: Int!) {
        getSubmittedReportById(id: $id) {
            id
            pending
        }
    }
`)

export const CREATE_REPORT = gql(`
    mutation CreateReport($name: String!, $basis: String!, $localDue: String!, $nationalDue: String!, $frequency: Frequency!, $type: ReportType!) {
        createReport(name: $name, basis: $basis, localDue: $localDue, nationalDue: $nationalDue, frequency: $frequency, type: $type) {
            id
        }
    }
`)

export const UPDATE_REPORT = gql(`
    mutation UpdateReport($id: Int!, $name: String, $basis: String, $localDue: String, $nationalDue: String, $frequency: Frequency, $type: ReportType) {
        updateReport(id: $id, name: $name, basis: $basis, localDue: $localDue, nationalDue: $nationalDue, frequency: $frequency, type: $type) {
            id
        }
    }
`)

export const DELETE_REPORT = gql(`
    mutation DeleteReport($id: Int!) {
        deleteReport(id: $id) {
            id
        }
    }
`)

// =============================== SUBMISSION ==================================

export const GET_SUBMISSIONS = gql(`
    query GetSubmittedReports($officeId: Int) {
        getSubmittedReports(officeId: $officeId) {
            id
            report {
                id
                name
                basis
                type
            }
            status
            localDue
            nationalDue
            pending
        }
    }
`)

export const GET_SUBMISSION_BY_ID = gql(`
    query GetSubmittedReportById($id: Int!) {
        getSubmittedReportById(id: $id) {
            id
            office {
                id
                name
            }
            report {
                id
                name
                basis
                type
            }
            status
            localDue
            nationalDue
            message
            files
        }
    }
`)

export const GET_OFFICE_SUBMISSIONS = gql(`
    query GetOfficeSubmissions($id: Int!) {
        getOfficeSubmissions(id: $id) {
            id
            office {
                id
                name
            }
            status
            message
            files
        }
    }
`)

export const SUBMIT_REPORT = gql(`
    mutation SubmitReport($id: Int!, $message: String, $files: [String!]) {
        submitReport(id: $id, message: $message, files: $files) {
            id
        }
    }
`)

export const CREATE_SUBMISSION = gql(`
    mutation CreateSubmission($reportId: Int!, $localDue: String!, $nationalDue: String!) {
        createSubmission(reportId: $reportId, localDue: $localDue, nationalDue: $nationalDue) {
            id
        }
    }
`)


export const DELETE_SUBMISSION = gql(`
    mutation DeleteSubmission($id: Int!) {
        deleteSubmission(id: $id) {
            id
        }
    }
`)

// =============================== EVENTS ==================================

export const GET_EVENTS = gql(`
    query GetEvents($date: String!, $officeId: Int) {
        getEvents(date: $date, officeId: $officeId) {
            id
            subject
            description
            image
            date
            dateDue
            frequency
            type
        }
    }
`)

export const GET_EVENT_BY_ID = gql(`
    query GetEventById($id: Int!) {
        getEventById(id: $id) {
            date
            description
            image
            id
            subject
            frequency
        }
    }
`)

export const CREATE_EVENT = gql(`
    mutation CreateEvent($subject: String!, $description: String!, $date: String!, $frequency: Frequency!, $image: String) {
        createEvent(subject: $subject, description: $description, date: $date, frequency: $frequency, image: $image) {
            id
        }
    }
`)

export const UPDATE_EVENT = gql(`
    mutation UpdateEvent($id: Int!, $subject: String, $description: String, $image: String, $date: String, $frequency: Frequency) {
        updateEvent(id: $id, subject: $subject, description: $description, image: $image, date: $date, frequency: $frequency) {
            id
        }
    }
`)

export const DELETE_EVENT = gql(`
    mutation DeleteEvent($id: Int!) {
        deleteEvent(id: $id) {
            id
        }
    }
`)