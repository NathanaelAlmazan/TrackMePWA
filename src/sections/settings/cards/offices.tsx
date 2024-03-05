import { useMutation, useQuery } from '@apollo/client';
import { SettingsCard, Snackbar } from '../../../components';

import { 
    GET_OFFICES,
    CREATE_OFFICE,
    UPDATE_OFFICE,
    DELETE_OFFICE 
} from '../../../graphql/users';

export default function OfficeSettingsCard() {
    const { data: offices, error: getError, loading, refetch } = useQuery(GET_OFFICES, {
        fetchPolicy: 'no-cache'
    });
    const [createOffice, { error: createError }] = useMutation(CREATE_OFFICE);
    const [updateOffice, { error: updateError }] = useMutation(UPDATE_OFFICE);
    const [deleteOffice, { error: deleteError }] = useMutation(DELETE_OFFICE);

    const handleCreateOffice = async (label: string, category?: string) => {
        await createOffice({
            variables: {
                name: label
            }
        });

        await refetch();
    }

    const handleUpdateOffice = async (id: number, label: string, category?: string) => {
        await updateOffice({
            variables: {
                id,
                name: label
            }
        });

        await refetch();
    }

    const handleDeleteOffice = async (id: number) => {
        await deleteOffice({
            variables: {
                id
            }
        });

        await refetch();
    }

    return (
        <>
           {!loading && offices && (
             <SettingsCard 
                title="Offices"
                items={offices.getOffices.map(office => ({
                    id: parseInt(office.id),
                    label: office.name
                }))}
                onCreate={handleCreateOffice}
                onUpdate={handleUpdateOffice}
                onDelete={handleDeleteOffice}
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