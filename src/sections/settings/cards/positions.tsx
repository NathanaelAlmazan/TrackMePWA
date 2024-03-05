import { useMutation, useQuery } from '@apollo/client';
import { SettingsCard, Snackbar } from '../../../components';

import { Role } from '../../../__generated__/graphql';
import { 
    GET_POSITIONS,
    CREATE_POSITION,
    UPDATE_POSITION,
    DELETE_POSITION,
} from '../../../graphql/users';

export default function PositionSettingsCard() {
    const { data: positions, error: getError, loading, refetch } = useQuery(GET_POSITIONS, {
        fetchPolicy: 'no-cache'
    });
    const [createPosition, { error: createError }] = useMutation(CREATE_POSITION);
    const [updatePosition, { error: updateError }] = useMutation(UPDATE_POSITION);
    const [deletePosition, { error: deleteError }] = useMutation(DELETE_POSITION);

    const handleCreatePosition = async (label: string, role?: string) => {
        if (!role) return;

        await createPosition({
            variables: {
                label,
                role: role as Role
            }
        });

        await refetch();
    }

    const handleUpdatePosition = async (id: number, label: string, role?: string) => {
        if (!role) return;

        await updatePosition({
            variables: {
                id,
                label,
                role: role as Role
            }
        });
        
        await refetch();
    }

    const handleDeletePosition = async (id: number) => {
        await deletePosition({
            variables: {
                id
            }
        });

        await refetch();
    }

    return (
        <>
           {!loading && positions && (
             <SettingsCard 
                title="Positions"
                items={positions.getPositions.map(position => ({
                    id: parseInt(position.id),
                    label: position.label,
                    category: position.role
                }))}
                categories={[
                    { label: "Officer", value: "OFFICER" },
                    { label: "Chief", value: "CHIEF" },
                    { label: "Director", value: "DIRECTOR" },
                    { label: "Superuser", value: "SUPERUSER" },
                    { label: "HR Admin", value: "HR_ADMIN" }
                ]}
                onCreate={handleCreatePosition}
                onUpdate={handleUpdatePosition}
                onDelete={handleDeletePosition}
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