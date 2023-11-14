export interface EpisodeResponse {
  id: number;
  name: string;
  air_date: string;
  episode: string|null;
  characters: [];
  url: string;
  created: string
}