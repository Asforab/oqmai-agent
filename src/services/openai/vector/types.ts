export interface VectorSearchResult {
  text: string;
  score: number;
}

export interface VectorSearchOptions {
  topK?: number;
  threshold?: number;
}

export interface VectorStore {
  search(query: string, options?: VectorSearchOptions): Promise<VectorSearchResult[]>;
}