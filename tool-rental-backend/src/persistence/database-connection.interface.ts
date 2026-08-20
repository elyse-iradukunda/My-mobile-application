export interface DatabaseConnectionInterface {
  query<T = any>(text: string, params?: any[]): Promise<T[]>;
  getClient(): Promise<any>;
}
