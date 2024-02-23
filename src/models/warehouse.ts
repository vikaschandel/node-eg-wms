export interface Warehouse {
    id: number,
    name: string,
    isEstablished: boolean,
    total_bins: number,
    rows: number,
    column: number,
    empty_bins: number,
    state: string,
    city: string
}