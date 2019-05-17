
export const initialState = {
  systems: {
    byName: {
      root: {
        name: 'root',
        title: 'Hello, Administrator.',
      },
      emergency: {
        name: 'emergency',
        title: 'Emergency',
      },
    }
  },
  uiState: {
    byName: {
      root: {
        loading: false,
      },
      emergency: {
        loading: false,
      },
    }
  }
};
