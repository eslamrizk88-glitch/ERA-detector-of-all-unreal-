
export enum AnalysisStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface AnalysisResult {
  confidenceScore: number;
  label: 'AUTHENTIC' | 'SYNTHETIC' | 'SUSPICIOUS';
  reasoning: string;
  artifactsFound: string[];
  metadata: {
    resolution?: string;
    fileSize?: string;
    format?: string;
  };
  groundingSources?: { title: string; uri: string }[];
}

export interface MediaFile {
  file: File;
  previewUrl: string;
  type: 'image' | 'video';
}
