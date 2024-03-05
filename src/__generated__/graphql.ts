/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Comments = {
  __typename?: 'Comments';
  dateCreated: Scalars['String']['output'];
  files?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['String']['output'];
  message: Scalars['String']['output'];
  sender: Officers;
};

export type DocumentEvent = {
  __typename?: 'DocumentEvent';
  eventDate: Scalars['String']['output'];
  eventName: Scalars['String']['output'];
};

export type DocumentPurpose = {
  __typename?: 'DocumentPurpose';
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

export type DocumentStatistics = {
  __typename?: 'DocumentStatistics';
  closed: Scalars['Int']['output'];
  noaction: Scalars['Int']['output'];
  ongoing: Scalars['Int']['output'];
  referred: Scalars['Int']['output'];
};

export type DocumentStatus = {
  __typename?: 'DocumentStatus';
  category: Status;
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

export type DocumentSummary = {
  __typename?: 'DocumentSummary';
  closed: Scalars['Int']['output'];
  noaction: Scalars['Int']['output'];
  office: Scalars['String']['output'];
  ongoing: Scalars['Int']['output'];
  referred: Scalars['Int']['output'];
};

export type DocumentTypes = {
  __typename?: 'DocumentTypes';
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

export type Documents = {
  __typename?: 'Documents';
  comments: Array<Comments>;
  dateCreated: Scalars['String']['output'];
  dateDue: Scalars['String']['output'];
  description: Scalars['String']['output'];
  purpose?: Maybe<DocumentPurpose>;
  receivedFrom: Scalars['String']['output'];
  referenceNum: Scalars['String']['output'];
  refferedTo: Array<Offices>;
  signatory: Officers;
  status?: Maybe<DocumentStatus>;
  subject: Scalars['String']['output'];
  tag?: Maybe<Tags>;
  type?: Maybe<DocumentTypes>;
};

export enum EventType {
  AdminReport = 'ADMIN_REPORT',
  Document = 'DOCUMENT',
  Event = 'EVENT',
  HrReport = 'HR_REPORT'
}

export type Events = {
  __typename?: 'Events';
  date: Scalars['String']['output'];
  dateDue?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  frequency: Frequency;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  subject: Scalars['String']['output'];
  type?: Maybe<EventType>;
};

export enum Frequency {
  Monthly = 'MONTHLY',
  None = 'NONE',
  Yearly = 'YEARLY'
}

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  activateOfficer: Officers;
  createComment: Comments;
  createDocument: Documents;
  createDocumentPurpose: DocumentPurpose;
  createDocumentStatus: DocumentStatus;
  createDocumentType: DocumentTypes;
  createEvent: Events;
  createOffice: Offices;
  createOfficer: Officers;
  createPosition: Positions;
  createReport: Reports;
  createSubmission: Reports;
  deleteDocument: Documents;
  deleteDocumentPurpose: DocumentPurpose;
  deleteDocumentStatus: DocumentStatus;
  deleteDocumentType: DocumentTypes;
  deleteEvent: Events;
  deleteOffice: Offices;
  deleteOfficer: Officers;
  deletePosition: Positions;
  deleteReport: Reports;
  deleteSubmission: SubmittedReports;
  documentUpdateStatus: DocumentStatus;
  submitReport: SubmittedReports;
  updateDocument: Documents;
  updateDocumentPurpose: DocumentPurpose;
  updateDocumentStatus: DocumentStatus;
  updateDocumentType: DocumentTypes;
  updateEvent: Events;
  updateOffice: Offices;
  updateOfficer: Officers;
  updatePosition: Positions;
  updateReport: Reports;
};


export type MutationActivateOfficerArgs = {
  active: Scalars['Boolean']['input'];
  uuid: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  documentId: Scalars['String']['input'];
  files?: InputMaybe<Array<Scalars['String']['input']>>;
  message: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};


export type MutationCreateDocumentArgs = {
  dateDue: Scalars['String']['input'];
  description: Scalars['String']['input'];
  purposeId: Scalars['Int']['input'];
  receivedFrom: Scalars['String']['input'];
  refferedTo: Array<Scalars['Int']['input']>;
  signatureId: Scalars['String']['input'];
  statusId: Scalars['Int']['input'];
  subject: Scalars['String']['input'];
  tag?: InputMaybe<Tags>;
  typeId: Scalars['Int']['input'];
};


export type MutationCreateDocumentPurposeArgs = {
  label: Scalars['String']['input'];
};


export type MutationCreateDocumentStatusArgs = {
  category: Status;
  label: Scalars['String']['input'];
};


export type MutationCreateDocumentTypeArgs = {
  label: Scalars['String']['input'];
};


export type MutationCreateEventArgs = {
  date: Scalars['String']['input'];
  description: Scalars['String']['input'];
  frequency: Frequency;
  image?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
};


export type MutationCreateOfficeArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateOfficerArgs = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  officeId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
  positionId: Scalars['Int']['input'];
};


export type MutationCreatePositionArgs = {
  label: Scalars['String']['input'];
  role: Role;
};


export type MutationCreateReportArgs = {
  basis: Scalars['String']['input'];
  frequency: Frequency;
  localDue: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nationalDue: Scalars['String']['input'];
  type: ReportType;
};


export type MutationCreateSubmissionArgs = {
  localDue: Scalars['String']['input'];
  nationalDue: Scalars['String']['input'];
  reportId: Scalars['Int']['input'];
};


export type MutationDeleteDocumentArgs = {
  referenceNum: Scalars['String']['input'];
};


export type MutationDeleteDocumentPurposeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteDocumentStatusArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteDocumentTypeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteOfficeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteOfficerArgs = {
  uuid: Scalars['String']['input'];
};


export type MutationDeletePositionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteReportArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteSubmissionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDocumentUpdateStatusArgs = {
  referenceNum: Scalars['String']['input'];
  statusId: Scalars['Int']['input'];
};


export type MutationSubmitReportArgs = {
  files?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['Int']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateDocumentArgs = {
  dateDue?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  purposeId?: InputMaybe<Scalars['Int']['input']>;
  receivedFrom?: InputMaybe<Scalars['String']['input']>;
  referenceNum: Scalars['String']['input'];
  refferedTo?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  signatureId: Scalars['String']['input'];
  statusId?: InputMaybe<Scalars['Int']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Tags>;
  typeId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateDocumentPurposeArgs = {
  id: Scalars['Int']['input'];
  label: Scalars['String']['input'];
};


export type MutationUpdateDocumentStatusArgs = {
  category: Status;
  id: Scalars['Int']['input'];
  label: Scalars['String']['input'];
};


export type MutationUpdateDocumentTypeArgs = {
  id: Scalars['Int']['input'];
  label: Scalars['String']['input'];
};


export type MutationUpdateEventArgs = {
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  frequency?: InputMaybe<Frequency>;
  id: Scalars['Int']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateOfficeArgs = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateOfficerArgs = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  officeId?: InputMaybe<Scalars['Int']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  positionId?: InputMaybe<Scalars['Int']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  uuid: Scalars['String']['input'];
};


export type MutationUpdatePositionArgs = {
  id: Scalars['Int']['input'];
  label: Scalars['String']['input'];
  role: Role;
};


export type MutationUpdateReportArgs = {
  basis?: InputMaybe<Scalars['String']['input']>;
  frequency?: InputMaybe<Frequency>;
  id: Scalars['Int']['input'];
  localDue?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nationalDue?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ReportType>;
};

export type Notifications = {
  __typename?: 'Notifications';
  description: Scalars['String']['output'];
  subject: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
};

export type Officers = {
  __typename?: 'Officers';
  active: Scalars['Boolean']['output'];
  avatar: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  office?: Maybe<Offices>;
  phone?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Positions>;
  signature?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type Offices = {
  __typename?: 'Offices';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  officers: Array<Officers>;
  reports: Array<SubmittedReports>;
};


export type OfficesReportsArgs = {
  complied?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Positions = {
  __typename?: 'Positions';
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
  role: Role;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  confirmAccountVerify: Officers;
  confirmResetPassword: Officers;
  getDocumentById: Documents;
  getDocumentPurposes: Array<DocumentPurpose>;
  getDocumentStatistics: DocumentStatistics;
  getDocumentStatus: Array<DocumentStatus>;
  getDocumentSummary: Array<DocumentSummary>;
  getDocumentTypes: Array<DocumentTypes>;
  getDocuments: Array<Documents>;
  getEventById: Events;
  getEvents: Array<Events>;
  getNotifications: Array<Notifications>;
  getOfficeSubmissions: Array<SubmittedReports>;
  getOfficerById?: Maybe<Officers>;
  getOfficers: Array<Officers>;
  getOffices: Array<Offices>;
  getPositions: Array<Positions>;
  getReportById: Reports;
  getReportStatistics: ReportStatistics;
  getReportSummary: Array<ReportSummary>;
  getReports: Array<Reports>;
  getSignatories: Array<Officers>;
  getSubmittedReportById: SubmittedReports;
  getSubmittedReports: Array<SubmittedReports>;
  getTempReferenceNum: Scalars['String']['output'];
  loginOfficer?: Maybe<Officers>;
  requestAccountVerify: Scalars['String']['output'];
  requestResetPassword: Scalars['String']['output'];
};


export type QueryConfirmAccountVerifyArgs = {
  code: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type QueryConfirmResetPasswordArgs = {
  code: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDocumentByIdArgs = {
  referenceNum: Scalars['String']['input'];
};


export type QueryGetDocumentStatisticsArgs = {
  officeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetDocumentsArgs = {
  officeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetEventByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetEventsArgs = {
  date: Scalars['String']['input'];
  officeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetNotificationsArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryGetOfficeSubmissionsArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetOfficerByIdArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryGetReportByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetReportStatisticsArgs = {
  officeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetSubmittedReportByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetSubmittedReportsArgs = {
  officeId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLoginOfficerArgs = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryRequestAccountVerifyArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  uuid: Scalars['String']['input'];
};


export type QueryRequestResetPasswordArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type ReportStatistics = {
  __typename?: 'ReportStatistics';
  overdue: Scalars['Int']['output'];
  pending: Scalars['Int']['output'];
  submitted: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ReportSummary = {
  __typename?: 'ReportSummary';
  office: Scalars['String']['output'];
  pending: Scalars['Int']['output'];
  submitted: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum ReportType {
  Admin = 'ADMIN',
  Hr = 'HR'
}

export type Reports = {
  __typename?: 'Reports';
  basis: Scalars['String']['output'];
  frequency: Frequency;
  id: Scalars['String']['output'];
  localDue: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nationalDue: Scalars['String']['output'];
  type: ReportType;
};

export enum Role {
  Chief = 'CHIEF',
  Director = 'DIRECTOR',
  HrAdmin = 'HR_ADMIN',
  Officer = 'OFFICER',
  Superuser = 'SUPERUSER'
}

export enum Status {
  Finished = 'FINISHED',
  NotActionable = 'NOT_ACTIONABLE',
  NotStarted = 'NOT_STARTED',
  Ongoing = 'ONGOING'
}

export type SubmittedReports = {
  __typename?: 'SubmittedReports';
  dateCreated: Scalars['String']['output'];
  files?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['String']['output'];
  localDue: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  nationalDue: Scalars['String']['output'];
  office: Offices;
  pending: Scalars['Int']['output'];
  report: Reports;
  status: Status;
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']['output']>;
  documentEvents: DocumentEvent;
  officeEvents: DocumentEvent;
};


export type SubscriptionDocumentEventsArgs = {
  referenceNum: Scalars['String']['input'];
};


export type SubscriptionOfficeEventsArgs = {
  officeId?: InputMaybe<Scalars['Int']['input']>;
};

export enum Tags {
  Confidential = 'CONFIDENTIAL',
  FollowUp = 'FOLLOW_UP',
  TopPriority = 'TOP_PRIORITY'
}

export type GetDocumentTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDocumentTypesQuery = { __typename?: 'Query', getDocumentTypes: Array<{ __typename?: 'DocumentTypes', id: string, label: string }> };

export type CreateDocumentTypeMutationVariables = Exact<{
  label: Scalars['String']['input'];
}>;


export type CreateDocumentTypeMutation = { __typename?: 'Mutation', createDocumentType: { __typename?: 'DocumentTypes', id: string, label: string } };

export type UpdateDocumentTypeMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  label: Scalars['String']['input'];
}>;


export type UpdateDocumentTypeMutation = { __typename?: 'Mutation', updateDocumentType: { __typename?: 'DocumentTypes', id: string, label: string } };

export type DeleteDocumentTypeMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteDocumentTypeMutation = { __typename?: 'Mutation', deleteDocumentType: { __typename?: 'DocumentTypes', id: string, label: string } };

export type GetDocumentPurposesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDocumentPurposesQuery = { __typename?: 'Query', getDocumentPurposes: Array<{ __typename?: 'DocumentPurpose', id: string, label: string }> };

export type CreateDocumentPurposeMutationVariables = Exact<{
  label: Scalars['String']['input'];
}>;


export type CreateDocumentPurposeMutation = { __typename?: 'Mutation', createDocumentPurpose: { __typename?: 'DocumentPurpose', id: string, label: string } };

export type UpdateDocumentPurposeMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  label: Scalars['String']['input'];
}>;


export type UpdateDocumentPurposeMutation = { __typename?: 'Mutation', updateDocumentPurpose: { __typename?: 'DocumentPurpose', id: string, label: string } };

export type DeleteDocumentPurposeMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteDocumentPurposeMutation = { __typename?: 'Mutation', deleteDocumentPurpose: { __typename?: 'DocumentPurpose', id: string, label: string } };

export type GetDocumentStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDocumentStatusQuery = { __typename?: 'Query', getDocumentStatus: Array<{ __typename?: 'DocumentStatus', id: string, label: string, category: Status }> };

export type CreateDocumentStatusMutationVariables = Exact<{
  label: Scalars['String']['input'];
  category: Status;
}>;


export type CreateDocumentStatusMutation = { __typename?: 'Mutation', createDocumentStatus: { __typename?: 'DocumentStatus', id: string, label: string, category: Status } };

export type UpdateDocumentStatusMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  label: Scalars['String']['input'];
  category: Status;
}>;


export type UpdateDocumentStatusMutation = { __typename?: 'Mutation', updateDocumentStatus: { __typename?: 'DocumentStatus', id: string, label: string, category: Status } };

export type DeleteDocumentStatusMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteDocumentStatusMutation = { __typename?: 'Mutation', deleteDocumentStatus: { __typename?: 'DocumentStatus', id: string, label: string, category: Status } };

export type TempReferenceNumQueryVariables = Exact<{ [key: string]: never; }>;


export type TempReferenceNumQuery = { __typename?: 'Query', getTempReferenceNum: string };

export type GetDocumentSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDocumentSummaryQuery = { __typename?: 'Query', getDocumentSummary: Array<{ __typename?: 'DocumentSummary', closed: number, noaction: number, office: string, ongoing: number, referred: number }> };

export type GetDocumentsQueryVariables = Exact<{
  officeId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetDocumentsQuery = { __typename?: 'Query', getDocuments: Array<{ __typename?: 'Documents', referenceNum: string, subject: string, description: string, receivedFrom: string, tag?: Tags | null, dateCreated: string, refferedTo: Array<{ __typename?: 'Offices', name: string }>, status?: { __typename?: 'DocumentStatus', label: string, category: Status } | null }> };

export type GetDocumentByIdQueryVariables = Exact<{
  referenceNum: Scalars['String']['input'];
}>;


export type GetDocumentByIdQuery = { __typename?: 'Query', getDocumentById: { __typename?: 'Documents', referenceNum: string, subject: string, description: string, receivedFrom: string, tag?: Tags | null, dateCreated: string, dateDue: string, refferedTo: Array<{ __typename?: 'Offices', id: string, name: string }>, type?: { __typename?: 'DocumentTypes', id: string, label: string } | null, purpose?: { __typename?: 'DocumentPurpose', id: string, label: string } | null, status?: { __typename?: 'DocumentStatus', id: string, label: string, category: Status } | null, comments: Array<{ __typename?: 'Comments', id: string, files?: Array<string> | null, message: string, dateCreated: string, sender: { __typename?: 'Officers', uuid: string, avatar: string, firstName: string, lastName: string, position?: { __typename?: 'Positions', label: string } | null } }>, signatory: { __typename?: 'Officers', uuid: string, avatar: string, firstName: string, lastName: string, signature?: string | null, position?: { __typename?: 'Positions', label: string } | null, office?: { __typename?: 'Offices', id: string, name: string } | null } } };

export type CreateDocumentMutationVariables = Exact<{
  subject: Scalars['String']['input'];
  description: Scalars['String']['input'];
  receivedFrom: Scalars['String']['input'];
  typeId: Scalars['Int']['input'];
  purposeId: Scalars['Int']['input'];
  statusId: Scalars['Int']['input'];
  signatureId: Scalars['String']['input'];
  dateDue: Scalars['String']['input'];
  refferedTo: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  tag?: InputMaybe<Tags>;
}>;


export type CreateDocumentMutation = { __typename?: 'Mutation', createDocument: { __typename?: 'Documents', referenceNum: string } };

export type UpdateDocumentMutationVariables = Exact<{
  referenceNum: Scalars['String']['input'];
  subject?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  receivedFrom?: InputMaybe<Scalars['String']['input']>;
  typeId?: InputMaybe<Scalars['Int']['input']>;
  purposeId?: InputMaybe<Scalars['Int']['input']>;
  statusId?: InputMaybe<Scalars['Int']['input']>;
  signatureId: Scalars['String']['input'];
  tag?: InputMaybe<Tags>;
  dateDue?: InputMaybe<Scalars['String']['input']>;
  refferedTo?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
}>;


export type UpdateDocumentMutation = { __typename?: 'Mutation', updateDocument: { __typename?: 'Documents', referenceNum: string } };

export type DeleteDocumentMutationVariables = Exact<{
  referenceNum: Scalars['String']['input'];
}>;


export type DeleteDocumentMutation = { __typename?: 'Mutation', deleteDocument: { __typename?: 'Documents', subject: string } };

export type DocumentUpdateStatusMutationVariables = Exact<{
  referenceNum: Scalars['String']['input'];
  statusId: Scalars['Int']['input'];
}>;


export type DocumentUpdateStatusMutation = { __typename?: 'Mutation', documentUpdateStatus: { __typename?: 'DocumentStatus', id: string, label: string } };

export type CreateCommentMutationVariables = Exact<{
  documentId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
  message: Scalars['String']['input'];
  files?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comments', id: string } };

export type DocumentEventsSubscriptionVariables = Exact<{
  referenceNum: Scalars['String']['input'];
}>;


export type DocumentEventsSubscription = { __typename?: 'Subscription', documentEvents: { __typename?: 'DocumentEvent', eventDate: string, eventName: string } };

export type GetDocumentStatisticsQueryVariables = Exact<{
  officeId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetDocumentStatisticsQuery = { __typename?: 'Query', getDocumentStatistics: { __typename?: 'DocumentStatistics', closed: number, noaction: number, ongoing: number, referred: number } };

export type GetDocumentByIdStatusQueryVariables = Exact<{
  referenceNum: Scalars['String']['input'];
}>;


export type GetDocumentByIdStatusQuery = { __typename?: 'Query', getDocumentById: { __typename?: 'Documents', status?: { __typename?: 'DocumentStatus', id: string, label: string, category: Status } | null } };

export type GetReportsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReportsQuery = { __typename?: 'Query', getReports: Array<{ __typename?: 'Reports', id: string, name: string, basis: string, frequency: Frequency, localDue: string, nationalDue: string, type: ReportType }> };

export type GetReportByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetReportByIdQuery = { __typename?: 'Query', getReportById: { __typename?: 'Reports', id: string, name: string, basis: string, frequency: Frequency, localDue: string, nationalDue: string, type: ReportType } };

export type GetReportSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReportSummaryQuery = { __typename?: 'Query', getReportSummary: Array<{ __typename?: 'ReportSummary', office: string, pending: number, submitted: number, total: number }> };

export type GetReportStatisticsQueryVariables = Exact<{
  officeId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetReportStatisticsQuery = { __typename?: 'Query', getReportStatistics: { __typename?: 'ReportStatistics', overdue: number, pending: number, submitted: number, total: number } };

export type GetReportStatusQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetReportStatusQuery = { __typename?: 'Query', getSubmittedReportById: { __typename?: 'SubmittedReports', id: string, pending: number } };

export type CreateReportMutationVariables = Exact<{
  name: Scalars['String']['input'];
  basis: Scalars['String']['input'];
  localDue: Scalars['String']['input'];
  nationalDue: Scalars['String']['input'];
  frequency: Frequency;
  type: ReportType;
}>;


export type CreateReportMutation = { __typename?: 'Mutation', createReport: { __typename?: 'Reports', id: string } };

export type UpdateReportMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  basis?: InputMaybe<Scalars['String']['input']>;
  localDue?: InputMaybe<Scalars['String']['input']>;
  nationalDue?: InputMaybe<Scalars['String']['input']>;
  frequency?: InputMaybe<Frequency>;
  type?: InputMaybe<ReportType>;
}>;


export type UpdateReportMutation = { __typename?: 'Mutation', updateReport: { __typename?: 'Reports', id: string } };

export type DeleteReportMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteReportMutation = { __typename?: 'Mutation', deleteReport: { __typename?: 'Reports', id: string } };

export type GetSubmittedReportsQueryVariables = Exact<{
  officeId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetSubmittedReportsQuery = { __typename?: 'Query', getSubmittedReports: Array<{ __typename?: 'SubmittedReports', id: string, status: Status, localDue: string, nationalDue: string, pending: number, report: { __typename?: 'Reports', id: string, name: string, basis: string, type: ReportType } }> };

export type GetSubmittedReportByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetSubmittedReportByIdQuery = { __typename?: 'Query', getSubmittedReportById: { __typename?: 'SubmittedReports', id: string, status: Status, localDue: string, nationalDue: string, message?: string | null, files?: Array<string> | null, office: { __typename?: 'Offices', id: string, name: string }, report: { __typename?: 'Reports', id: string, name: string, basis: string, type: ReportType } } };

export type GetOfficeSubmissionsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetOfficeSubmissionsQuery = { __typename?: 'Query', getOfficeSubmissions: Array<{ __typename?: 'SubmittedReports', id: string, status: Status, message?: string | null, files?: Array<string> | null, office: { __typename?: 'Offices', id: string, name: string } }> };

export type SubmitReportMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type SubmitReportMutation = { __typename?: 'Mutation', submitReport: { __typename?: 'SubmittedReports', id: string } };

export type CreateSubmissionMutationVariables = Exact<{
  reportId: Scalars['Int']['input'];
  localDue: Scalars['String']['input'];
  nationalDue: Scalars['String']['input'];
}>;


export type CreateSubmissionMutation = { __typename?: 'Mutation', createSubmission: { __typename?: 'Reports', id: string } };

export type DeleteSubmissionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteSubmissionMutation = { __typename?: 'Mutation', deleteSubmission: { __typename?: 'SubmittedReports', id: string } };

export type GetEventsQueryVariables = Exact<{
  date: Scalars['String']['input'];
  officeId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetEventsQuery = { __typename?: 'Query', getEvents: Array<{ __typename?: 'Events', id: string, subject: string, description: string, image?: string | null, date: string, dateDue?: string | null, frequency: Frequency, type?: EventType | null }> };

export type GetEventByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetEventByIdQuery = { __typename?: 'Query', getEventById: { __typename?: 'Events', date: string, description: string, image?: string | null, id: string, subject: string, frequency: Frequency } };

export type CreateEventMutationVariables = Exact<{
  subject: Scalars['String']['input'];
  description: Scalars['String']['input'];
  date: Scalars['String']['input'];
  frequency: Frequency;
  image?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Events', id: string } };

export type UpdateEventMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  subject?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  frequency?: InputMaybe<Frequency>;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent: { __typename?: 'Events', id: string } };

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent: { __typename?: 'Events', id: string } };

export type GetOfficesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOfficesQuery = { __typename?: 'Query', getOffices: Array<{ __typename?: 'Offices', id: string, name: string }> };

export type GetOfficesReportsQueryVariables = Exact<{
  complied?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetOfficesReportsQuery = { __typename?: 'Query', getOffices: Array<{ __typename?: 'Offices', id: string, name: string, reports: Array<{ __typename?: 'SubmittedReports', report: { __typename?: 'Reports', id: string, name: string } }> }> };

export type CreateOfficeMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateOfficeMutation = { __typename?: 'Mutation', createOffice: { __typename?: 'Offices', id: string, name: string } };

export type UpdateOfficeMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateOfficeMutation = { __typename?: 'Mutation', updateOffice: { __typename?: 'Offices', id: string, name: string } };

export type DeleteOfficeMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteOfficeMutation = { __typename?: 'Mutation', deleteOffice: { __typename?: 'Offices', id: string, name: string } };

export type GetPositionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPositionsQuery = { __typename?: 'Query', getPositions: Array<{ __typename?: 'Positions', id: string, label: string, role: Role }> };

export type CreatePositionMutationVariables = Exact<{
  label: Scalars['String']['input'];
  role: Role;
}>;


export type CreatePositionMutation = { __typename?: 'Mutation', createPosition: { __typename?: 'Positions', id: string, label: string, role: Role } };

export type UpdatePositionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  label: Scalars['String']['input'];
  role: Role;
}>;


export type UpdatePositionMutation = { __typename?: 'Mutation', updatePosition: { __typename?: 'Positions', id: string, label: string, role: Role } };

export type DeletePositionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeletePositionMutation = { __typename?: 'Mutation', deletePosition: { __typename?: 'Positions', id: string, label: string, role: Role } };

export type GetNotificationsQueryVariables = Exact<{
  uuid: Scalars['String']['input'];
}>;


export type GetNotificationsQuery = { __typename?: 'Query', getNotifications: Array<{ __typename?: 'Notifications', description: string, subject: string, timestamp: string }> };

export type OfficeEventsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OfficeEventsSubscription = { __typename?: 'Subscription', officeEvents: { __typename?: 'DocumentEvent', eventDate: string, eventName: string } };

export type GetOfficersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOfficersQuery = { __typename?: 'Query', getOfficers: Array<{ __typename?: 'Officers', uuid: string, avatar: string, firstName: string, lastName: string, active: boolean, verified: boolean, office?: { __typename?: 'Offices', id: string, name: string } | null, position?: { __typename?: 'Positions', id: string, label: string, role: Role } | null }> };

export type GetSignatoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSignatoriesQuery = { __typename?: 'Query', getSignatories: Array<{ __typename?: 'Officers', uuid: string, avatar: string, firstName: string, lastName: string, signature?: string | null, position?: { __typename?: 'Positions', id: string, label: string } | null }> };

export type GetOfficerByIdQueryVariables = Exact<{
  uuid: Scalars['String']['input'];
}>;


export type GetOfficerByIdQuery = { __typename?: 'Query', getOfficerById?: { __typename?: 'Officers', uuid: string, avatar: string, firstName: string, lastName: string, email?: string | null, phone?: string | null, active: boolean, signature?: string | null, office?: { __typename?: 'Offices', id: string, name: string } | null, position?: { __typename?: 'Positions', id: string, label: string, role: Role } | null } | null };

export type CreateOfficerMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  positionId: Scalars['Int']['input'];
  officeId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
}>;


export type CreateOfficerMutation = { __typename?: 'Mutation', createOfficer: { __typename?: 'Officers', uuid: string } };

export type UpdateOfficerMutationVariables = Exact<{
  uuid: Scalars['String']['input'];
  avatar?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  positionId?: InputMaybe<Scalars['Int']['input']>;
  officeId?: InputMaybe<Scalars['Int']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateOfficerMutation = { __typename?: 'Mutation', updateOfficer: { __typename?: 'Officers', uuid: string } };

export type DeleteOfficerMutationVariables = Exact<{
  uuid: Scalars['String']['input'];
}>;


export type DeleteOfficerMutation = { __typename?: 'Mutation', deleteOfficer: { __typename?: 'Officers', uuid: string } };

export type ActivateOfficerMutationVariables = Exact<{
  uuid: Scalars['String']['input'];
  active: Scalars['Boolean']['input'];
}>;


export type ActivateOfficerMutation = { __typename?: 'Mutation', activateOfficer: { __typename?: 'Officers', uuid: string } };

export type LoginOfficerQueryVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginOfficerQuery = { __typename?: 'Query', loginOfficer?: { __typename?: 'Officers', uuid: string, avatar: string, lastName: string, firstName: string, active: boolean, verified: boolean, signature?: string | null, office?: { __typename?: 'Offices', id: string, name: string } | null, position?: { __typename?: 'Positions', id: string, label: string, role: Role } | null } | null };

export type RequestResetPasswordQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type RequestResetPasswordQuery = { __typename?: 'Query', requestResetPassword: string };

export type ConfirmResetPasswordQueryVariables = Exact<{
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type ConfirmResetPasswordQuery = { __typename?: 'Query', confirmResetPassword: { __typename?: 'Officers', uuid: string } };

export type RequestAccountVerifyQueryVariables = Exact<{
  uuid: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type RequestAccountVerifyQuery = { __typename?: 'Query', requestAccountVerify: string };

export type ConfirmAccountVerifyQueryVariables = Exact<{
  code: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type ConfirmAccountVerifyQuery = { __typename?: 'Query', confirmAccountVerify: { __typename?: 'Officers', uuid: string } };


export const GetDocumentTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDocumentTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDocumentTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<GetDocumentTypesQuery, GetDocumentTypesQueryVariables>;
export const CreateDocumentTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDocumentType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"label"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDocumentType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"label"},"value":{"kind":"Variable","name":{"kind":"Name","value":"label"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<CreateDocumentTypeMutation, CreateDocumentTypeMutationVariables>;
export const UpdateDocumentTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDocumentType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"label"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDocumentType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"label"},"value":{"kind":"Variable","name":{"kind":"Name","value":"label"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<UpdateDocumentTypeMutation, UpdateDocumentTypeMutationVariables>;
export const DeleteDocumentTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteDocumentType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteDocumentType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<DeleteDocumentTypeMutation, DeleteDocumentTypeMutationVariables>;
export const GetDocumentPurposesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDocumentPurposes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDocumentPurposes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<GetDocumentPurposesQuery, GetDocumentPurposesQueryVariables>;
export const CreateDocumentPurposeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDocumentPurpose"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"label"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDocumentPurpose"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"label"},"value":{"kind":"Variable","name":{"kind":"Name","value":"label"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<CreateDocumentPurposeMutation, CreateDocumentPurposeMutationVariables>;
export const UpdateDocumentPurposeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDocumentPurpose"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"label"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDocumentPurpose"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"label"},"value":{"kind":"Variable","name":{"kind":"Name","value":"label"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<UpdateDocumentPurposeMutation, UpdateDocumentPurposeMutationVariables>;
export const DeleteDocumentPurposeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteDocumentPurpose"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteDocumentPurpose"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<DeleteDocumentPurposeMutation, DeleteDocumentPurposeMutationVariables>;
export const GetDocumentStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDocumentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDocumentStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<GetDocumentStatusQuery, GetDocumentStatusQueryVariables>;
export const CreateDocumentStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDocumentStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"label"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Status"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDocumentStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"label"},"value":{"kind":"Variable","name":{"kind":"Name","value":"label"}}},{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<CreateDocumentStatusMutation, CreateDocumentStatusMutationVariables>;
export const UpdateDocumentStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDocumentStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"label"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Status"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDocumentStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"label"},"value":{"kind":"Variable","name":{"kind":"Name","value":"label"}}},{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<UpdateDocumentStatusMutation, UpdateDocumentStatusMutationVariables>;
export const DeleteDocumentStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteDocumentStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteDocumentStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<DeleteDocumentStatusMutation, DeleteDocumentStatusMutationVariables>;
export const TempReferenceNumDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TempReferenceNum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTempReferenceNum"}}]}}]} as unknown as DocumentNode<TempReferenceNumQuery, TempReferenceNumQueryVariables>;
export const GetDocumentSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDocumentSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDocumentSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"closed"}},{"kind":"Field","name":{"kind":"Name","value":"noaction"}},{"kind":"Field","name":{"kind":"Name","value":"office"}},{"kind":"Field","name":{"kind":"Name","value":"ongoing"}},{"kind":"Field","name":{"kind":"Name","value":"referred"}}]}}]}}]} as unknown as DocumentNode<GetDocumentSummaryQuery, GetDocumentSummaryQueryVariables>;
export const GetDocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDocuments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"officeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDocuments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"officeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"officeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"referenceNum"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"receivedFrom"}},{"kind":"Field","name":{"kind":"Name","value":"refferedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}}]}}]}}]} as unknown as DocumentNode<GetDocumentsQuery, GetDocumentsQueryVariables>;
export const GetDocumentByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDocumentById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"referenceNum"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDocumentById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"referenceNum"},"value":{"kind":"Variable","name":{"kind":"Name","value":"referenceNum"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"referenceNum"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"receivedFrom"}},{"kind":"Field","name":{"kind":"Name","value":"refferedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"purpose"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}},{"kind":"Field","name":{"kind":"Name","value":"dateDue"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"files"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}}]}},{"kind":"Field","name":{"kind":"Name","value":"signatory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"signature"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"office"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDocumentByIdQuery, GetDocumentByIdQueryVariables>;
export const CreateDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subject"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receivedFrom"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"typeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"purposeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"statusId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signatureId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateDue"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refferedTo"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tag"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Tags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subject"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"receivedFrom"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receivedFrom"}}},{"kind":"Argument","name":{"kind":"Name","value":"typeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"typeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"purposeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"purposeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"statusId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"statusId"}}},{"kind":"Argument","name":{"kind":"Name","value":"signatureId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signatureId"}}},{"kind":"Argument","name":{"kind":"Name","value":"dateDue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateDue"}}},{"kind":"Argument","name":{"kind":"Name","value":"refferedTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refferedTo"}}},{"kind":"Argument","name":{"kind":"Name","value":"tag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"referenceNum"}}]}}]}}]} as unknown as DocumentNode<CreateDocumentMutation, CreateDocumentMutationVariables>;
export const UpdateDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"referenceNum"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subject"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receivedFrom"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"typeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"purposeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"statusId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signatureId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tag"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Tags"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateDue"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refferedTo"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"referenceNum"},"value":{"kind":"Variable","name":{"kind":"Name","value":"referenceNum"}}},{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subject"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"receivedFrom"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receivedFrom"}}},{"kind":"Argument","name":{"kind":"Name","value":"typeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"typeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"purposeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"purposeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"statusId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"statusId"}}},{"kind":"Argument","name":{"kind":"Name","value":"signatureId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signatureId"}}},{"kind":"Argument","name":{"kind":"Name","value":"tag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tag"}}},{"kind":"Argument","name":{"kind":"Name","value":"dateDue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateDue"}}},{"kind":"Argument","name":{"kind":"Name","value":"refferedTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refferedTo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"referenceNum"}}]}}]}}]} as unknown as DocumentNode<UpdateDocumentMutation, UpdateDocumentMutationVariables>;
export const DeleteDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"referenceNum"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"referenceNum"},"value":{"kind":"Variable","name":{"kind":"Name","value":"referenceNum"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"}}]}}]}}]} as unknown as DocumentNode<DeleteDocumentMutation, DeleteDocumentMutationVariables>;
export const DocumentUpdateStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DocumentUpdateStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"referenceNum"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"statusId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentUpdateStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"referenceNum"},"value":{"kind":"Variable","name":{"kind":"Name","value":"referenceNum"}}},{"kind":"Argument","name":{"kind":"Name","value":"statusId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"statusId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<DocumentUpdateStatusMutation, DocumentUpdateStatusMutationVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"files"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"senderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"Argument","name":{"kind":"Name","value":"files"},"value":{"kind":"Variable","name":{"kind":"Name","value":"files"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const DocumentEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"DocumentEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"referenceNum"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"referenceNum"},"value":{"kind":"Variable","name":{"kind":"Name","value":"referenceNum"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventDate"}},{"kind":"Field","name":{"kind":"Name","value":"eventName"}}]}}]}}]} as unknown as DocumentNode<DocumentEventsSubscription, DocumentEventsSubscriptionVariables>;
export const GetDocumentStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDocumentStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"officeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDocumentStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"officeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"officeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"closed"}},{"kind":"Field","name":{"kind":"Name","value":"noaction"}},{"kind":"Field","name":{"kind":"Name","value":"ongoing"}},{"kind":"Field","name":{"kind":"Name","value":"referred"}}]}}]}}]} as unknown as DocumentNode<GetDocumentStatisticsQuery, GetDocumentStatisticsQueryVariables>;
export const GetDocumentByIdStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDocumentByIdStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"referenceNum"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDocumentById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"referenceNum"},"value":{"kind":"Variable","name":{"kind":"Name","value":"referenceNum"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]}}]} as unknown as DocumentNode<GetDocumentByIdStatusQuery, GetDocumentByIdStatusQueryVariables>;
export const GetReportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getReports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"basis"}},{"kind":"Field","name":{"kind":"Name","value":"frequency"}},{"kind":"Field","name":{"kind":"Name","value":"localDue"}},{"kind":"Field","name":{"kind":"Name","value":"nationalDue"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetReportsQuery, GetReportsQueryVariables>;
export const GetReportByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReportById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getReportById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"basis"}},{"kind":"Field","name":{"kind":"Name","value":"frequency"}},{"kind":"Field","name":{"kind":"Name","value":"localDue"}},{"kind":"Field","name":{"kind":"Name","value":"nationalDue"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetReportByIdQuery, GetReportByIdQueryVariables>;
export const GetReportSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReportSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getReportSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"office"}},{"kind":"Field","name":{"kind":"Name","value":"pending"}},{"kind":"Field","name":{"kind":"Name","value":"submitted"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<GetReportSummaryQuery, GetReportSummaryQueryVariables>;
export const GetReportStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReportStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"officeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getReportStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"officeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"officeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"overdue"}},{"kind":"Field","name":{"kind":"Name","value":"pending"}},{"kind":"Field","name":{"kind":"Name","value":"submitted"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<GetReportStatisticsQuery, GetReportStatisticsQueryVariables>;
export const GetReportStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReportStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSubmittedReportById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pending"}}]}}]}}]} as unknown as DocumentNode<GetReportStatusQuery, GetReportStatusQueryVariables>;
export const CreateReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"basis"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"localDue"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nationalDue"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"frequency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Frequency"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReportType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"basis"},"value":{"kind":"Variable","name":{"kind":"Name","value":"basis"}}},{"kind":"Argument","name":{"kind":"Name","value":"localDue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"localDue"}}},{"kind":"Argument","name":{"kind":"Name","value":"nationalDue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nationalDue"}}},{"kind":"Argument","name":{"kind":"Name","value":"frequency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"frequency"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateReportMutation, CreateReportMutationVariables>;
export const UpdateReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"basis"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"localDue"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nationalDue"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"frequency"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Frequency"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ReportType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"basis"},"value":{"kind":"Variable","name":{"kind":"Name","value":"basis"}}},{"kind":"Argument","name":{"kind":"Name","value":"localDue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"localDue"}}},{"kind":"Argument","name":{"kind":"Name","value":"nationalDue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nationalDue"}}},{"kind":"Argument","name":{"kind":"Name","value":"frequency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"frequency"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateReportMutation, UpdateReportMutationVariables>;
export const DeleteReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteReportMutation, DeleteReportMutationVariables>;
export const GetSubmittedReportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubmittedReports"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"officeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSubmittedReports"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"officeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"officeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"report"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"basis"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"localDue"}},{"kind":"Field","name":{"kind":"Name","value":"nationalDue"}},{"kind":"Field","name":{"kind":"Name","value":"pending"}}]}}]}}]} as unknown as DocumentNode<GetSubmittedReportsQuery, GetSubmittedReportsQueryVariables>;
export const GetSubmittedReportByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubmittedReportById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSubmittedReportById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"office"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"report"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"basis"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"localDue"}},{"kind":"Field","name":{"kind":"Name","value":"nationalDue"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"files"}}]}}]}}]} as unknown as DocumentNode<GetSubmittedReportByIdQuery, GetSubmittedReportByIdQueryVariables>;
export const GetOfficeSubmissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOfficeSubmissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOfficeSubmissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"office"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"files"}}]}}]}}]} as unknown as DocumentNode<GetOfficeSubmissionsQuery, GetOfficeSubmissionsQueryVariables>;
export const SubmitReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"files"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"Argument","name":{"kind":"Name","value":"files"},"value":{"kind":"Variable","name":{"kind":"Name","value":"files"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SubmitReportMutation, SubmitReportMutationVariables>;
export const CreateSubmissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSubmission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reportId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"localDue"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nationalDue"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSubmission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reportId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reportId"}}},{"kind":"Argument","name":{"kind":"Name","value":"localDue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"localDue"}}},{"kind":"Argument","name":{"kind":"Name","value":"nationalDue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nationalDue"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateSubmissionMutation, CreateSubmissionMutationVariables>;
export const DeleteSubmissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSubmission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSubmission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteSubmissionMutation, DeleteSubmissionMutationVariables>;
export const GetEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"officeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"officeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"officeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"dateDue"}},{"kind":"Field","name":{"kind":"Name","value":"frequency"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetEventsQuery, GetEventsQueryVariables>;
export const GetEventByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEventById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"frequency"}}]}}]}}]} as unknown as DocumentNode<GetEventByIdQuery, GetEventByIdQueryVariables>;
export const CreateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subject"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"frequency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Frequency"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subject"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"frequency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"frequency"}}},{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateEventMutation, CreateEventMutationVariables>;
export const UpdateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subject"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"frequency"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Frequency"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subject"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"frequency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"frequency"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateEventMutation, UpdateEventMutationVariables>;
export const DeleteEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteEventMutation, DeleteEventMutationVariables>;
export const GetOfficesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOffices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOffices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetOfficesQuery, GetOfficesQueryVariables>;
export const GetOfficesReportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOfficesReports"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"complied"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOffices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"reports"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"complied"},"value":{"kind":"Variable","name":{"kind":"Name","value":"complied"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"report"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOfficesReportsQuery, GetOfficesReportsQueryVariables>;
export const CreateOfficeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOffice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOffice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateOfficeMutation, CreateOfficeMutationVariables>;
export const UpdateOfficeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOffice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOffice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateOfficeMutation, UpdateOfficeMutationVariables>;
export const DeleteOfficeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOffice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOffice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DeleteOfficeMutation, DeleteOfficeMutationVariables>;
export const GetPositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPositions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPositions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<GetPositionsQuery, GetPositionsQueryVariables>;
export const CreatePositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"label"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"label"},"value":{"kind":"Variable","name":{"kind":"Name","value":"label"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<CreatePositionMutation, CreatePositionMutationVariables>;
export const UpdatePositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"label"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"label"},"value":{"kind":"Variable","name":{"kind":"Name","value":"label"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<UpdatePositionMutation, UpdatePositionMutationVariables>;
export const DeletePositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<DeletePositionMutation, DeletePositionMutationVariables>;
export const GetNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const OfficeEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OfficeEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"officeEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventDate"}},{"kind":"Field","name":{"kind":"Name","value":"eventName"}}]}}]}}]} as unknown as DocumentNode<OfficeEventsSubscription, OfficeEventsSubscriptionVariables>;
export const GetOfficersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOfficers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOfficers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"office"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}}]}}]} as unknown as DocumentNode<GetOfficersQuery, GetOfficersQueryVariables>;
export const GetSignatoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSignatories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSignatories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"signature"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}}]} as unknown as DocumentNode<GetSignatoriesQuery, GetSignatoriesQueryVariables>;
export const GetOfficerByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOfficerById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOfficerById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"office"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"signature"}}]}}]}}]} as unknown as DocumentNode<GetOfficerByIdQuery, GetOfficerByIdQueryVariables>;
export const CreateOfficerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOfficer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"officeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOfficer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"positionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"officeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"officeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]} as unknown as DocumentNode<CreateOfficerMutation, CreateOfficerMutationVariables>;
export const UpdateOfficerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOfficer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"avatar"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"officeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signature"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOfficer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}},{"kind":"Argument","name":{"kind":"Name","value":"avatar"},"value":{"kind":"Variable","name":{"kind":"Name","value":"avatar"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"positionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"officeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"officeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"signature"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signature"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]} as unknown as DocumentNode<UpdateOfficerMutation, UpdateOfficerMutationVariables>;
export const DeleteOfficerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOfficer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOfficer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]} as unknown as DocumentNode<DeleteOfficerMutation, DeleteOfficerMutationVariables>;
export const ActivateOfficerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateOfficer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"active"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activateOfficer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}},{"kind":"Argument","name":{"kind":"Name","value":"active"},"value":{"kind":"Variable","name":{"kind":"Name","value":"active"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]} as unknown as DocumentNode<ActivateOfficerMutation, ActivateOfficerMutationVariables>;
export const LoginOfficerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoginOfficer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginOfficer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"office"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"signature"}}]}}]}}]} as unknown as DocumentNode<LoginOfficerQuery, LoginOfficerQueryVariables>;
export const RequestResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RequestResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestResetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}]}]}}]} as unknown as DocumentNode<RequestResetPasswordQuery, RequestResetPasswordQueryVariables>;
export const ConfirmResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConfirmResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmResetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]} as unknown as DocumentNode<ConfirmResetPasswordQuery, ConfirmResetPasswordQueryVariables>;
export const RequestAccountVerifyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RequestAccountVerify"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestAccountVerify"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}]}]}}]} as unknown as DocumentNode<RequestAccountVerifyQuery, RequestAccountVerifyQueryVariables>;
export const ConfirmAccountVerifyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConfirmAccountVerify"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmAccountVerify"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]} as unknown as DocumentNode<ConfirmAccountVerifyQuery, ConfirmAccountVerifyQueryVariables>;