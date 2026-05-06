import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DonationItem {
    id: number;
    title: string;
    date: string;
    amount: number;
    quantity: number;
}

interface DonationsState {
    items: DonationItem[];
}

const initialState: DonationsState = {
    items: [],
};

const donationsSlice = createSlice({
    name: 'donations',
    initialState,
    reducers: {
        addDonation: (state, action: PayloadAction<DonationItem>) => {
            const existing = state.items.find(item => item.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeDonation: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item && action.payload.quantity > 0) {
                item.quantity = action.payload.quantity;
            } else if (item && action.payload.quantity === 0) {
                state.items = state.items.filter(i => i.id !== action.payload.id);
            }
        },
        clearDonations: (state) => {
            state.items = [];
        },
    },
});

export const { addDonation, removeDonation, updateQuantity, clearDonations } = donationsSlice.actions;
export default donationsSlice.reducer;