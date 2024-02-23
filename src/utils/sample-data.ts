import moment from "moment"
import {Warehouse} from "../models/warehouse";

export const warehouses: Warehouse[] = [
    {
        id: 1,
        name: 'Warehouse-1',
        isEstablished: false,
        total_bins: 20,
        rows: 5,
        column: 18,
        empty_bins: 20,
        state: 'Haryana',
        city: 'Hisar'
    },
    {
        id: 2,
        name: 'Warehouse-2',
        isEstablished: false,
        total_bins: 20,
        rows: 3,
        column: 12,
        empty_bins: 4,
        state: 'Haryana',
        city: 'Karnal'
    },
    {
        id: 3,
        name: 'Warehouse-3',
        isEstablished: false,
        total_bins: 20,
        rows: 4,
        column: 10,
        empty_bins: 3,
        state: 'Punjab',
        city: 'Ludhiana'
    },
]

export const bins = [
    {id: 1, name: 'First Bin', capacity: 400, used_space: 200, nearest_dock: 'A1', last_update: moment('12-11-2022')},
    {id: 2, name: 'Mixed Bin', capacity: 600, used_space: 200, nearest_dock: null, last_update: moment('06-01-2023')},
    {id: 4, name: 'First bin', capacity: 800, used_space: 200, nearest_dock: 'A2', last_update: moment('12-12-2022')},
    {id: 8, name: 'First bin', capacity: 200, used_space: 200, nearest_dock: 'A4', last_update: moment('02-22-2022')},
]
