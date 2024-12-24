declare global {
  interface Window {
    electronAPI: {
      send: (channel: string, data: any) => void;
      on: (channel: string, callback: (e: any, name: string, type: number) => void) => void;
      invoke: (channel: string) => Promise<any>;
      removeAllListeners: (channel: string) => void;
    };
  }
}

export {};