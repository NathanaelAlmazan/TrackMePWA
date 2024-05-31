import {
  Document,
  Page,
  View,
  Text,
  Font,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { GetDocumentByIdQuery } from "../__generated__/graphql";

Font.register({
  family: '"Open Sans", sans-serif',
  src: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap",
});

export default function ReferenceSlip({
  document,
}: {
  document: GetDocumentByIdQuery | undefined;
}) {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.body}>
        <View style={styles.container}>
          <View style={styles.containerLeft}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableColLeft}>
                  <Text style={styles.tableCellLeft}>BIR</Text>
                  <Text style={styles.tableCellLeft}>FORM 2309</Text>
                  <Text style={styles.tableCellTagLeft}>
                    (REVISED OCTOBER, 1971)
                  </Text>
                </View>
                <View style={styles.tableColRight}>
                  <Text style={styles.tableCellRight}>
                    BUREAU OF INTERNAL REVENUE
                  </Text>
                  <Text style={styles.tableCellRight}>
                    Revenue Region No. 6 - Manila
                  </Text>
                  <Text
                    style={styles.tableCellRight}
                  >{`REFERENCE SLIP #${document?.getDocumentById.referenceNum}`}</Text>
                  {document?.getDocumentById.tag && (
                    <Text style={styles.tableCellTagRight}>
                      {document.getDocumentById.tag}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.recipientCol}>
                  <Text style={styles.tableCellLeftBold}>TO:</Text>
                  <Text style={styles.tableCellLeft}>
                    {document?.getDocumentById.directorAssigned.length === 0
                      ? document?.getDocumentById.referredTo
                          .map((ref) => ref.office.name)
                          .join(", ")
                      : document?.getDocumentById.directorAssigned
                          .map(
                            (officer) =>
                              `${officer.firstName} ${officer.lastName}`
                          )
                          .join(", ")}
                  </Text>
                </View>
                <View style={styles.dateCol}>
                  <Text style={styles.tableCellLeftBold}>DATE:</Text>
                  <Text style={styles.tableCellLeft}>
                    {new Date(
                      document?.getDocumentById.dateCreated || ""
                    ).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.purposeCol}>
                  <Text style={styles.tableCellLeftBold}>SUBJECT:</Text>
                  <Text style={styles.tableCellLeft}>
                    {document?.getDocumentById.subject}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.recipientCol}>
                  <Text style={styles.tableCellLeftBold}>FOR:</Text>
                  <Text style={styles.tableCellLeft}>
                    {document?.getDocumentById.purpose
                      ?.map((p) => p.label)
                      .join(", ")}
                  </Text>
                </View>
                <View style={styles.dateCol}>
                  <Text style={styles.tableCellLeftBold}>DEADLINE:</Text>
                  <Text style={styles.tableCellLeft}>
                    {document?.getDocumentById.dateDue
                      ? new Date(
                          document?.getDocumentById.dateDue
                        ).toLocaleDateString(undefined, {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "None"}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.purposeCol}>
                  <Text style={styles.tableCellLeftBold}>
                    REMARKS (or additional instructions):
                  </Text>
                  <Text style={styles.tableCellLeft}>
                    {document?.getDocumentById.description}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.recipientCol}>
                  <Text style={styles.tableCellLeftBold}>FROM:</Text>
                  {document?.getDocumentById.signatory.signature ? (
                    <View style={styles.signatureContainer}>
                      <Image
                        style={styles.signatureImage}
                        src={document?.getDocumentById.signatory.signature}
                      />
                    </View>
                  ) : (
                    <Text style={styles.emptyCell}></Text>
                  )}
                  <Text style={styles.tableCellCenter}>
                    {document?.getDocumentById.signatory.firstName +
                      " " +
                      document?.getDocumentById.signatory.lastName}
                  </Text>
                  <Text style={styles.tableCellCenterSmall}>
                    {document?.getDocumentById.signatory.position?.label}
                  </Text>
                  <Text style={styles.tableCellCenterSmall}>
                    Revenue Region 6, Manila
                  </Text>
                </View>
                <View style={styles.dateCol}>
                  <Text style={styles.tableCellLeftBold}>RR-6</Text>
                </View>
              </View>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.purposeCol}>
                  <Text style={styles.tableCellLeftBoldSmall}>
                    NOTE: This slip must be filled with the papers to which it
                    is attached.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.containerRight}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableColLeft}>
                  <Text style={styles.tableCellLeft}>BIR</Text>
                  <Text style={styles.tableCellLeft}>FORM 2309</Text>
                  <Text style={styles.tableCellTagLeft}>
                    (REVISED OCTOBER, 1971)
                  </Text>
                </View>
                <View style={styles.tableColRight}>
                  <Text style={styles.tableCellRight}>
                    BUREAU OF INTERNAL REVENUE
                  </Text>
                  <Text style={styles.tableCellRight}>
                    Revenue Region No. 6 - Manila
                  </Text>
                  <Text
                    style={styles.tableCellRight}
                  >{`REFERENCE SLIP #${document?.getDocumentById.referenceNum}`}</Text>
                  {document?.getDocumentById.tag && (
                    <Text style={styles.tableCellTagRight}>
                      {document.getDocumentById.tag}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.recipientCol}>
                  <Text style={styles.tableCellLeftBold}>TO:</Text>
                  <Text style={styles.tableCellLeft}>
                    {document?.getDocumentById.directorAssigned.length === 0
                      ? document?.getDocumentById.referredTo
                          .map((ref) => ref.office.name)
                          .join(", ")
                      : document?.getDocumentById.directorAssigned
                          .map(
                            (officer) =>
                              `${officer.firstName} ${officer.lastName}`
                          )
                          .join(", ")}
                  </Text>
                </View>
                <View style={styles.dateCol}>
                  <Text style={styles.tableCellLeftBold}>DATE:</Text>
                  <Text style={styles.tableCellLeft}>
                    {new Date(
                      document?.getDocumentById.dateCreated || ""
                    ).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.purposeCol}>
                  <Text style={styles.tableCellLeftBold}>SUBJECT:</Text>
                  <Text style={styles.tableCellLeft}>
                    {document?.getDocumentById.subject}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.recipientCol}>
                  <Text style={styles.tableCellLeftBold}>FOR:</Text>
                  <Text style={styles.tableCellLeft}>
                    {document?.getDocumentById.purpose
                      ?.map((p) => p.label)
                      .join(", ")}
                  </Text>
                </View>
                <View style={styles.dateCol}>
                  <Text style={styles.tableCellLeftBold}>DEADLINE:</Text>
                  <Text style={styles.tableCellLeft}>
                    {document?.getDocumentById.dateDue
                      ? new Date(
                          document?.getDocumentById.dateDue
                        ).toLocaleDateString(undefined, {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "None"}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.purposeCol}>
                  <Text style={styles.tableCellLeftBold}>
                    REMARKS (or additional instructions):
                  </Text>
                  <Text style={styles.tableCellLeft}>
                    {document?.getDocumentById.description}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.recipientCol}>
                  <Text style={styles.tableCellLeftBold}>FROM:</Text>
                  {document?.getDocumentById.signatory.signature ? (
                    <View style={styles.signatureContainer}>
                      <Image
                        style={styles.signatureImage}
                        src={document?.getDocumentById.signatory.signature}
                      />
                    </View>
                  ) : (
                    <Text style={styles.emptyCell}></Text>
                  )}
                  <Text style={styles.tableCellCenter}>
                    {document?.getDocumentById.signatory.firstName +
                      " " +
                      document?.getDocumentById.signatory.lastName}
                  </Text>
                  <Text style={styles.tableCellCenterSmall}>
                    {document?.getDocumentById.signatory.position?.label}
                  </Text>
                  <Text style={styles.tableCellCenterSmall}>
                    Revenue Region 6, Manila
                  </Text>
                </View>
                <View style={styles.dateCol}>
                  <Text style={styles.tableCellLeftBold}>RR-6</Text>
                </View>
              </View>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.purposeCol}>
                  <Text style={styles.tableCellLeftBoldSmall}>
                    NOTE: This slip must be filled with the papers to which it
                    is attached.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
  containerLeft: {
    width: "50%",
  },
  containerRight: {
    paddingLeft: 10,
    width: "50%",
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 2,
  },
  tableRow: {
    margin: "auto",
    marginTop: 2,
    flexDirection: "row",
  },
  tableColRight: {
    width: "60%",
  },
  tableColLeft: {
    width: "40%",
  },
  recipientCol: {
    width: "70%",
  },
  dateCol: {
    width: "30%",
  },
  purposeCol: {
    width: "100%",
  },
  tableCellLeft: {
    margin: 2,
    fontSize: 12,
    textAlign: "left",
  },
  emptyCell: {
    height: 30,
  },
  tableCellLeftBold: {
    margin: 2,
    fontSize: 12,
    textAlign: "left",
    fontWeight: 800,
  },
  tableCellLeftBoldSmall: {
    margin: 2,
    fontSize: 8,
    textAlign: "left",
    fontWeight: "bold",
  },
  tableCellRight: {
    margin: 2,
    fontSize: 12,
    textAlign: "right",
  },
  tableCellTagRight: {
    margin: 2,
    fontSize: 10,
    textAlign: "right",
    color: "red",
  },
  tableCellTagLeft: {
    margin: 2,
    fontSize: 10,
    textAlign: "left",
  },
  tableCellCenter: {
    margin: 2,
    fontSize: 12,
    textAlign: "center",
  },
  tableCellCenterSmall: {
    margin: 2,
    fontSize: 9,
    textAlign: "center",
  },
  signatureContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  signatureImage: {
    width: 68,
    height: 38,
  },
});
