import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { AppDispatchType, RootStateType } from '@/redux/config/store';

export const useTypedDispatch: () => AppDispatchType = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootStateType> = useSelector;
