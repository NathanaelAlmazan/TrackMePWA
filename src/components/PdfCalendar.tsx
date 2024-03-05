import React, { useEffect, useState } from "react";
import {
    Document,
    Page,
    View,
    Text,
    Font,
    Image,
    StyleSheet
} from '@react-pdf/renderer';
import { useTheme } from '@mui/material/styles';

import { generateDates } from "./Calendar";
import { EventType, Events, Frequency } from "../__generated__/graphql";

Font.register({
    family: '"Open Sans", sans-serif',
    src: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap'
});

interface CalendarEvents {
    subject: string;
    color: string;
    image?: string | null;
    date: Date;
    frequency: Frequency;
}

export function filterEvents(events: CalendarEvents[], date: Date) {
    return events.filter((event) => {
        if (event.frequency === Frequency.Monthly) return (new Date(event.date).getDate() === date.getDate());
        return (new Date(event.date).getMonth() === date.getMonth() && new Date(event.date).getDate() === date.getDate());
    });
}

export default function PdfCalendar({
    events,
    currentDate
}: {
    currentDate: Date,
    events: Events[]
}) {
    const theme = useTheme();
    const [dates, setDates] = useState<Date[][]>([]);
    const [pinned, setPinned] = useState<CalendarEvents[]>([]);

    useEffect(() => {
        const firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        firstDate.setDate(firstDate.getDate() - firstDate.getDay());

        const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        lastDate.setDate(lastDate.getDate() + (6 - lastDate.getDay()));

        setDates(generateDates(firstDate, lastDate));
    }, [currentDate]);

    useEffect(() => {
        if (events) {
            const getEventColor = (type?: EventType | null) => {
                switch (type) {
                    case 'EVENT':
                        return theme.palette.info.light;
                    case 'DOCUMENT':
                        return theme.palette.warning.light;
                    default:
                        return theme.palette.success.light;
                }
            }

            const reminders: CalendarEvents[] = [];

            events.forEach((event) => {
                if (event.dateDue && event.dateDue !== event.date) {
                    reminders.push({
                        subject: `${event.subject} National Deadline`,
                        color: getEventColor(event.type),
                        date: new Date(event.date),
                        frequency: event.frequency
                    });

                    reminders.push({
                        subject: `${event.subject} (Local Deadline)`,
                        color: getEventColor(event.type),
                        date: new Date(event.dateDue),
                        frequency: event.frequency
                    });
                } else {
                    reminders.push({
                        subject: event.subject,
                        color: getEventColor(event.type),
                        date: new Date(event.date),
                        frequency: event.frequency,
                        image: event.image
                    });
                }
            });

            setPinned(reminders);
        }
    }, [events, theme])
    
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.body}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.emptyCol}>
                            <Text>{new Date(currentDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }).toUpperCase()}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.dayCol}>
                            <Text style={styles.dayText}>SUNDAY</Text>
                        </View>
                        <View style={styles.dayCol}>
                            <Text style={styles.dayText}>MONDAY</Text>
                        </View>
                        <View style={styles.dayCol}>
                            <Text style={styles.dayText}>TUESDAY</Text>
                        </View>
                        <View style={styles.dayCol}>
                            <Text style={styles.dayText}>WEDNESSDAY</Text>
                        </View>
                        <View style={styles.dayCol}>
                            <Text style={styles.dayText}>THURSDAY</Text>
                        </View>
                        <View style={styles.dayCol}>
                            <Text style={styles.dayText}>FRIDAY</Text>
                        </View>
                        <View style={styles.dayCol}>
                            <Text style={styles.dayText}>SATURDAY</Text>
                        </View>
                    </View>
                    
                    {dates.map((week, index) => (
                        <View key={index} style={styles.tableRow}>
                            {week.map(day => (
                                <View key={day.getTime()} style={styles.tableCol}>
                                    <Text style={styles.dateText}>{day.getDate()}</Text>
                                    {filterEvents(pinned, day).map(pin => (
                                        <React.Fragment key={pin.subject}>
                                            {pin.image && (
                                                <Image style={styles.eventImage} src={pin.image} />
                                            )}
                                            <Text style={{ ...styles.eventText, backgroundColor: pin.color }}>{pin.subject}</Text>
                                        </React.Fragment>
                                    ))}
                                </View>
                            ))}
                        </View>
                    ))}

                </View>
            </Page>
        </Document>
    );
}

const styles = StyleSheet.create({
    body: {
      padding: 15
    },
    table: { 
      width: "auto",
      borderStyle: "solid", 
      borderWidth: 1
    },
    tableRow: { 
      flexDirection: "row"
    }, 
    tableCol: { 
      width: `${100 / 7}%`,
      flexDirection: "column",
      borderStyle: "solid", 
      borderWidth: 1,
      minHeight: 50
    },
  	dayCol: { 
      width: `${100 / 7}%`,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderStyle: "solid", 
      borderWidth: 1,
      height: 20
    },
  	emptyCol: { 
      width: '100%',
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderStyle: "solid", 
      borderWidth: 1,
      height: 20,
      fontSize: 14
    },
  	dayText: {
      fontSize: 12,
      textAlign: "center"
    },
 	dateText: {
      fontSize: 12,
      padding: 3
    },
  	eventText: {
      padding: 2,
      fontSize: 9,
      textAlign: "center",
      borderStyle: "dotted", 
      borderWidth: 1
    },
    eventImage: {
        maxWidth: 68,
        maxHeight: 38
    }
});