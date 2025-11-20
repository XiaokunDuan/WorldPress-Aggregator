import React from 'react';

export interface NewsCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  prompt: string;
  description: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface NewsResponse {
  markdown: string;
  groundingChunks: GroundingChunk[];
  timestamp: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}