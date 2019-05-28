
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
      notifications: {
        name: 'notifications',
        items: [],        
      },
      emergency: {
        name: 'emergency',
        title: 'Emergency',
      },
      engineering: {
        name: 'engineering',
        title: 'Engineering',
        energyProduction: {
          emergency: {
            status: 'STATUS_NORMAL',
            output: 0.01,
          },
          auxiliar: {
            status: 'STATUS_NEEDS_REPAIR',
            output: 0.2,
          }
        }
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
      status: {
        loading: false,
      },
      engineering: {
        loading: false,
      },
      energyProduction: {
        loading: false,
      },
    }
  }
};
