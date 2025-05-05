import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewItem } from '@/contract/review'; // Adjust path

interface ReviewState {
  selectedReviewForDetail: ReviewItem | null;
}

const initialState: ReviewState = {
  selectedReviewForDetail: null,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setSelectedReviewForDetail: (state, action: PayloadAction<ReviewItem | null>) => {
      state.selectedReviewForDetail = action.payload;
    },
    clearSelectedReviewForDetail: state => {
      state.selectedReviewForDetail = null;
    },
  },
});

export const { setSelectedReviewForDetail, clearSelectedReviewForDetail } = reviewSlice.actions;

// Optional: Selector for convenience
export const selectReviewForDetail = (state: { review: ReviewState }) => state.review.selectedReviewForDetail;

export default reviewSlice.reducer;
