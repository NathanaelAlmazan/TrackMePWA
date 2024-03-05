import { useDispatch } from 'react-redux';
import type { StoreDispatch } from '../redux/store';

const useAppDispatch: () => StoreDispatch = useDispatch

export default useAppDispatch