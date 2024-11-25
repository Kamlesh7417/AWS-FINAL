import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MOCK_SHIPMENTS } from '../../utils/mockData';

export interface Communication {
  id: string;
  sender: string;
  role: 'carrier' | 'buyer' | 'seller' | 'agent';
  message: string;
  timestamp: string;
  attachments?: Array<{
    name: string;
    url: string;
  }>;
}

interface ShipmentState {
  shipments: Record<string, any>;
  loading: boolean;
  error: string | null;
  selectedShipmentId: string | null;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
  };
  filters: {
    search: string;
    status: string | null;
  };
  communications: Record<string, Communication[]>;
}

const initialState: ShipmentState = {
  shipments: MOCK_SHIPMENTS,
  loading: false,
  error: null,
  selectedShipmentId: null,
  pagination: {
    currentPage: 1,
    itemsPerPage: 9
  },
  filters: {
    search: '',
    status: null
  },
  communications: {}
};

export const fetchShipments = createAsyncThunk(
  'shipments/fetchShipments',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_SHIPMENTS;
  }
);

const shipmentSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<{ search: string; status?: string | null }>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1;
    },
    setSelectedShipment: (state, action: PayloadAction<string | null>) => {
      state.selectedShipmentId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments = action.payload;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch shipments';
      });
  }
});

export const { setPage, setFilters, setSelectedShipment } = shipmentSlice.actions;
export default shipmentSlice.reducer;