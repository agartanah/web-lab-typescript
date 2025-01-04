import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isDelModalOpen: false,
    isEditModalOpen: false,
    isShareModalOpen: false,
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openDelModal(state) {
            state.isDelModalOpen = true;
        },
        closeDelModal(state) {
            state.isDelModalOpen = false;
        },
        openEditModal(state) {
            state.isEditModalOpen = true;
        },
        closeEditModal(state) {
            state.isEditModalOpen = false;
        },
        openShareModal(state) {
            state.isShareModalOpen = true;
        },
        closeShareModal(state) {
            state.isShareModalOpen = false;
        },
    },
});

export const {
    openDelModal,
    closeDelModal,
    openEditModal,
    closeEditModal,
    openShareModal,
    closeShareModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;