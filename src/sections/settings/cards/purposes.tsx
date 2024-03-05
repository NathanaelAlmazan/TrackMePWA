import { useMutation, useQuery } from '@apollo/client';
import { SettingsCard, Snackbar } from '../../../components';

import { 
    GET_PURPOSES,
    CREATE_PURPOSE,
    UPDATE_PURPOSE,
    DELETE_PURPOSE 
} from '../../../graphql/documents';

export default function PurposeSettingsCard() {
    const { data: purposes, error: getError, loading, refetch } = useQuery(GET_PURPOSES, {
        fetchPolicy: 'no-cache'
    });
    const [createPurpose, { error: createError }] = useMutation(CREATE_PURPOSE);
    const [updatePurpose, { error: updateError }] = useMutation(UPDATE_PURPOSE);
    const [deletePurpose, { error: deleteError }] = useMutation(DELETE_PURPOSE);

    const handleCreatePurpose = async (label: string, category?: string) => {
        await createPurpose({
            variables: {
                label
            }
        });

        await refetch();
    }

    const handleUpdatePurpose = async (id: number, label: string, category?: string) => {
        await updatePurpose({
            variables: {
                id,
                label
            }
        });

        await refetch();
    }

    const handleDeletePurpose = async (id: number) => {
        await deletePurpose({
            variables: {
                id
            }
        });

        await refetch();
    }

    return (
        <>
           {!loading && purposes && (
             <SettingsCard 
                title="Document Purpose"
                items={purposes.getDocumentPurposes.map(purpose => ({
                    id: parseInt(purpose.id),
                    label: purpose.label
                }))}
                onCreate={handleCreatePurpose}
                onUpdate={handleUpdatePurpose}
                onDelete={handleDeletePurpose}
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