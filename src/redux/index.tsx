import { Provider } from 'react-redux';
import { authSlice } from './slices';
import store from './store';
import { Role } from '../__generated__/graphql';

export interface UserData {
    uuid?: string;
    role?: Role;
    firstName?: string;
    lastName?: string;
    office?: string;
    position?: string;
    avatar?: string;
}

// export actions
export const { login, logout, update } = authSlice.actions;

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}