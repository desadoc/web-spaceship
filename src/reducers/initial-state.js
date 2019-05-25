
export const initialState = {
  systems: {
    byName: {
      root: {
        name: 'root',
        title: 'Hello, Administrator.',
      },
      clock: {
        name: 'clock',
        title: 'Clock',
        reference: null,
        elapsedTime: 0,
        isPaused: true,
      },
      emergency: {
        name: 'emergency',
        title: 'Emergency',
      },
      notifications: {
        name: 'notifications',
        items: [],        
      }
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
