import { useEffect, useState } from 'react';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';

import Button from '@mui/material/Button';
import { Iconify, Snackbar } from '.';

import { capitalCase } from 'change-case';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_DOCUMENTS, GET_DOCUMENT_STATISTICS } from '../graphql/documents';
import { DocumentRow } from '../sections/documents/table';
import { GET_OFFICES, GET_OFFICE_REPORTS } from '../graphql/users';

interface DocumentExport {
    office: string;
    referred: number;
    closed: number;
    ongoing: number;
    noaction: number;
}

interface ReportExport {
    office: string;
    reports: string;
}

export default function SpreadsheetExport() {
    const { data: documents, error: documentError } = useQuery(GET_DOCUMENTS); 
    const { data: offices, error: officeError } = useQuery(GET_OFFICES);
    const { data: reports, error: reportError } = useQuery(GET_OFFICE_REPORTS);

    const [getDocumentStats, { error: statsError }] = useLazyQuery(GET_DOCUMENT_STATISTICS);

    const [documentList, setDocumentList] = useState<DocumentRow[]>([]);
    const [documentStats, setDocumentStats] = useState<DocumentExport[]>([]);
    const [officeReports, setOfficeReports] = useState<ReportExport[]>([]);

    useEffect(() => {
        if (documents) {
            setDocumentList(documents.getDocuments.map(doc => ({
                referenceNum: doc.referenceNum,
                subject: doc.subject,
                receivedFrom: doc.receivedFrom,
                refferedTo: doc.refferedTo.map(office => office.name).join(', '),
                dateCreated: new Date(doc.dateCreated).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
                status: doc.status ? capitalCase(doc.status.category) : "",
                tag: doc.description
            })));
        }
    }, [documents]);

    useEffect(() => {
        if (reports) {
            setOfficeReports(reports.getOffices.map(office => ({
                office: office.name,
                reports: office.reports.map(report => report.report.name).join(', ')
            })))
        }
    }, [reports]);

    useEffect(() => {
        if (offices) {
            for (let i = 0; i < offices.getOffices.length; i++) {
                const office = offices.getOffices[i];

                getDocumentStats({ variables: { officeId: parseInt(office.id) } })
                    .then(({ data }) => {
                        if (data) {
                            const statistics: DocumentExport = {
                                office: office.name,
                                referred: data.getDocumentStatistics.referred,
                                closed: data.getDocumentStatistics.closed,
                                ongoing: data.getDocumentStatistics.ongoing,
                                noaction: data.getDocumentStatistics.noaction
                            }

                            setDocumentStats(array => [ ...array, statistics ]);
                        }
                    })
            }

            // get summation
            getDocumentStats()
                .then(({ data }) => {
                    if (data) {
                        const statistics: DocumentExport = {
                            office: 'Total',
                            referred: data.getDocumentStatistics.referred,
                            closed: data.getDocumentStatistics.closed,
                            ongoing: data.getDocumentStatistics.ongoing,
                            noaction: data.getDocumentStatistics.noaction
                        }

                        setDocumentStats(array => [ ...array, statistics ]);
                    }
                })
        }
    }, [offices, getDocumentStats]);

    const exportSummary = async () => {
        const workbook = new Workbook();

        // Documents Sheet
        const documentSheet = workbook.addWorksheet('Documents');
      
        documentSheet.columns = [
          { key: 'referenceNum', header: 'Reference Slip' },
          { key: 'subject', header: 'Subject' },
          { key: 'dateCreated', header: 'Date' },
          { key: 'receivedFrom', header: 'Received From' },
          { key: 'refferedTo', header: 'Referred To' },
          { key: 'status', header: 'Status' },
          { key: 'tag', header: 'Remarks' }
        ];
      
        documentList.forEach((document) => {
            documentSheet.addRow(document);
        });

        // Set column colors
        documentSheet.getColumn(1).eachCell({ includeEmpty: true }, function(cell, rowNumber) {
            if (rowNumber === 1) {
                // Header row color
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFA500' } // Orange
                };
            } else {
                // Data row color
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFF00' } // Yellow
                };
            }
        });

        // Set column colors
        documentSheet.columns.forEach(column => {
            column.width = 30;

            if (column.eachCell) {
                column.eachCell({ includeEmpty: true }, function(cell, rowNumber) {
                    if (rowNumber === 1) {
                        // Header row color
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'FFA500' } // Orange
                        };
                    }
                });
            }
        });

        // Document Statistics Sheet
        const statSheet = workbook.addWorksheet('Document Summary');

        statSheet.columns = [
          { key: 'office', header: 'Office' },
          { key: 'referred', header: 'Referred' },
          { key: 'closed', header: 'Closed' },
          { key: 'ongoing', header: 'Ongoing' },
          { key: 'noaction', header: 'No Action' }
        ];

        documentStats.filter(stat => stat.office !== 'Total').forEach((stat) => {
            statSheet.addRow(stat);
        });

        documentStats.filter(stat => stat.office === 'Total').forEach((stat) => {
            statSheet.addRow(stat);
        });

        // Set column colors
        statSheet.columns.forEach(column => {
            column.width = 20;
            
            if (column.eachCell) {
                column.eachCell({ includeEmpty: true }, function(cell, rowNumber) {
                    if (rowNumber === 1) {
                        // Header row color
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'FFA500' } // Orange
                        };
                    }

                    if (rowNumber === (documentStats.length + 1)) {
                        // Data row color
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'FFFF00' } // Yellow
                        };
                    }
                });
            }
        });

        // Export Office Reports
        const reportSheet = workbook.addWorksheet('Office Reports');

        reportSheet.columns = [
          { key: 'office', header: 'Office' },
          { key: 'reports', header: 'Reports' }
        ];

        officeReports.forEach((stat) => {
            reportSheet.addRow(stat);
        });

        reportSheet.getColumn(1).width = 20; // Office column
        reportSheet.getColumn(2).width = 80; // Reports column

        // Set column colors
        reportSheet.columns.forEach(column => {
            if (column.eachCell) {
                column.eachCell({ includeEmpty: true }, function(cell, rowNumber) {
                    if (rowNumber === 1) {
                        // Header row color
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'FFA500' } // Orange
                        };
                    }
                });
            }
        });
      
        // Generate buffer from workbook
        const buffer = await workbook.xlsx.writeBuffer();
    
        // Convert buffer to Blob
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
        // Save the Excel file
        saveAs(blob, 'report.xlsx');
    };

    return (
       <>
            <Button onClick={exportSummary} variant="contained" color="inherit" startIcon={<Iconify icon="ant-design:export-outlined" />}>
                Export
            </Button>
            <Snackbar 
                severity='error' 
                message={documentError?.message || officeError?.message || statsError?.message || reportError?.message} 
            />
       </>
    );
}