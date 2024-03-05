import { useMutation, useQuery } from '@apollo/client';
import { SettingsCard, Snackbar } from '../../../components';

import { 
    GET_TYPES,
    CREATE_TYPE,
    UPDATE_TYPE,
    DELETE_TYPE 
} from '../../../graphql/documents';

export default function TypesSettingsCard() {
    const { data: types, error: getError, loading, refetch } = useQuery(GET_TYPES, {
        fetchPolicy: 'no-cache'
    });
    const [createType, { error: createError }] = useMutation(CREATE_TYPE);
    const [updateType, { error: updateError }] = useMutation(UPDATE_TYPE);
    const [deleteType, { error: deleteError }] = useMutation(DELETE_TYPE);

    const handleCreateType = async (label: string, category?: string) => {
        await createType({
            variables: {
                label
            }
        });

        await refetch();
    }

    const handleUpdateType = async (id: number, label: string, category?: string) => {
        await updateType({
            variables: {
                id,
                label
            }
        });
        
        await refetch();
    }

    const handleDeleteType = async (id: number) => {
        await deleteType({
            variables: {
                id
            }
        });

        await refetch();
    }

    return (
        <>
           {!loading && types && (
             <SettingsCard 
                title="Document Types"
                items={types.getDocumentTypes.map(type => ({
                    id: parseInt(type.id),
                    label: type.label
                }))}
                onCreate={handleCreateType}
                onUpdate={handleUpdateType}
                onDelete={handleDeleteType}
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