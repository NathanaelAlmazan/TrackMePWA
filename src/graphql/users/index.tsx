import { gql } from '../../__generated__/gql';


// ================================ OFFICES =================================

export const GET_OFFICES = gql(`
    query GetOffices {
        getOffices {
            id
            name
        }
    }
`)

export const GET_OFFICE_REPORTS = gql(`
    query GetOfficesReports($complied: Boolean) {
        getOffices {
            id
            name
            reports(complied: $complied) {
                report {
                    id
                    name
                }
            }
        }
    }
`)

export const CREATE_OFFICE = gql(`
    mutation CreateOffice($name: String!) {
        createOffice(name: $name) {
            id
            name
        } 
    }
`)

export const UPDATE_OFFICE = gql(`
    mutation UpdateOffice($id: Int!, $name: String) {
        updateOffice(id: $id, name: $name) {
            id
            name
        }
    }
`)

export const DELETE_OFFICE = gql(`
   mutation DeleteOffice($id: Int!) {
        deleteOffice(id: $id) {
            id
            name
        }
    }
`)

// ================================ POSITIONS =================================

export const GET_POSITIONS = gql(`
    query GetPositions {
        getPositions {
            id
            label
            role
        }
    }
`)

export const CREATE_POSITION = gql(`
    mutation CreatePosition($label: String!, $role: Role!) {
        createPosition(label: $label, role: $role) {
            id
            label
            role
        }
    }
`)

export const UPDATE_POSITION = gql(`
    mutation UpdatePosition($id: Int!, $label: String!, $role: Role!) {
        updatePosition(id: $id, label: $label, role: $role) {
            id
            label
            role
        }
    }
`)

export const DELETE_POSITION = gql(`
    mutation DeletePosition($id: Int!) {
        deletePosition(id: $id) {
            id
            label
            role
        }
    }
`)

// ================================ ACCOUNTS =================================
export const GET_NOTIFICATIONS = gql(`
    query GetNotifications($uuid: String!) {
        getNotifications(uuid: $uuid) {
            description
            subject
            timestamp
        }
    }
`)

export const SUBSCRIBE_OFFICE_EVENTS = gql(`
    subscription OfficeEvents {
        officeEvents {
            eventDate
            eventName
        }
    }
`)

export const GET_OFFICERS = gql(`
    query GetOfficers($officeId: Int) {
        getOfficers(officeId: $officeId) {
            uuid
            avatar
            firstName
            lastName
            office {
                id
                name
            }
            position {
                id
                label
                role
            }
            active
            verified
        }
    }
`)

export const GET_SIGNATORIES = gql(`
    query GetSignatories {
        getSignatories {
            uuid
            avatar
            firstName
            lastName
            signature
            position {
                id
                label
            }
        }
    }
`)

export const GET_OFFICER_BY_ID = gql(`
    query GetOfficerById($uuid: String!) {
        getOfficerById(uuid: $uuid) {
            uuid
            avatar
            firstName
            lastName
            email
            phone
            office {
                id
                name
            }
            position {
                id
                label
                role
            }
            active  
            signature
        }
    }
`)

export const CREATE_OFFICER = gql(`
    mutation CreateOfficer($firstName: String!, $lastName: String!, $positionId: Int!, $officeId: Int!, $password: String, $email: String, $phone: String) {
        createOfficer(firstName: $firstName, lastName: $lastName, positionId: $positionId, officeId: $officeId, password: $password, email: $email, phone: $phone) {
            uuid
        }
    }
`)

export const UPDATE_OFFICER = gql(`
   mutation UpdateOfficer($uuid: String!, $avatar: String, $firstName: String, $email: String, $lastName: String, $phone: String, $positionId: Int, $officeId: Int, $password: String, $signature: String) {
        updateOfficer(uuid: $uuid, avatar: $avatar, firstName: $firstName, email: $email, lastName: $lastName, phone: $phone, positionId: $positionId, officeId: $officeId, password: $password, signature: $signature) {
            uuid
        }
    }
`)

export const DELETE_OFFICER = gql(`
    mutation DeleteOfficer($uuid: String!) {
        deleteOfficer(uuid: $uuid) {
            uuid
        }
    }
`)

export const ACTIVATE_OFFICER = gql(`
    mutation ActivateOfficer($uuid: String!, $active: Boolean!) {
        activateOfficer(uuid: $uuid, active: $active) {
            uuid
        }
    }
`)

export const LOGIN_OFFICER = gql(`
    query LoginOfficer($username: String!, $password: String!) {
    loginOfficer(username: $username, password: $password) {
        uuid
        avatar
        lastName
        firstName
        office {
            id
            name
        }
        position {
            id
            label
            role
        }
        active
            verified
            signature
        }
    }
`)

export const REQUEST_RESET_PASSWORD = gql(`
    query RequestResetPassword($email: String, $phone: String) {
        requestResetPassword(email: $email, phone: $phone)
    }
`)

export const CONFIRM_RESET_PASSWORD = gql(`
    query ConfirmResetPassword($code: String!, $password: String!, $email: String, $phone: String) {
        confirmResetPassword(code: $code, password: $password, email: $email, phone: $phone) {
            uuid
            position {
                id
                label
                role
            }
        }
    }
`)

export const REQUEST_VERIFY_ACCOUNT = gql(`
    query RequestAccountVerify($uuid: String!, $contact: String!) {
        requestAccountVerify(uuid: $uuid, contact: $contact)
    }
`)

export const CONFIRM_VERIFY_ACCOUNT = gql(`
    query ConfirmAccountVerify($code: String!, $contact: String!) {
        confirmAccountVerify(code: $code, contact: $contact) {
            uuid
            position {
                id
                label
                role
            }
        }
    }
`)