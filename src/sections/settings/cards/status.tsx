import { useMutation, useQuery } from '@apollo/client';
import { SettingsCard, Snackbar } from '../../../components';

import { Status } from '../../../__generated__/graphql';
import { 
    GET_STATUSES,
    CREATE_STATUS,
    UPDATE_STATUS,
    DELETE_STATUS
} from '../../../graphql/documents';

export default function StatusSettingsCard() {
    const { data: statuses, error: getError, loading, refetch } = useQuery(GET_STATUSES, {
        fetchPolicy: 'no-cache'
    });
    const [createStatus, { error: createError }] = useMutation(CREATE_STATUS);
    const [updateStatus, { error: updateError }] = useMutation(UPDATE_STATUS);
    const [deleteStatus, { error: deleteError }] = useMutation(DELETE_STATUS);

    const handleCreateStatus = async (label: string, category?: string) => {
        if (!category) return;

        await createStatus({
            variables: {
                label,
                category: category as Status
            }
        });

        await refetch();
    }

    const handleUpdateStatus = async (id: number, label: string, category?: string) => {
        if (!category) return;

        await updateStatus({
            variables: {
                id,
                label,
                category: category as Status
            }
        });
        
        await refetch();
    }

    const handleDeleteStatus = async (id: number) => {
        await deleteStatus({
            variables: {
                id
            }
        });

        await refetch();
    }

    return (
        <>
           {!loading && statuses && (
             <SettingsCard 
                title="Document Status"
                items={statuses.getDocumentStatus.map(status => ({
                    id: parseInt(status.id),
                    label: status.label,
                    category: status.category
                }))}
                categories={[
                    { label: "Finished", value: "FINISHED" },
                    { label: "Not Actionable", value: "NOT_ACTIONABLE" },
                    { label: "Referred", value: "REFERRED" },
                    { label: "Submitted", value: "SUBMITTED" }
                ]}
                onCreate={handleCreateStatus}
                onUpdate={handleUpdateStatus}
                onDelete={handleDeleteStatus}
            />
           )}

            <Snackbar 
                severity='error' 
                message={getError?.message || createError?.message ||
                    updateError?.message || deleteError?.message} 
            />
        </>
    );
}