import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { StoreState } from '../redux/store';

const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector

export default useAppSelector