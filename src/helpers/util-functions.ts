import currency from 'currency.js';
import { RangeModel } from './models/planing.model';

export const formatCurrency = (amount: number): string => {
	return currency(amount, { separator: ' ', decimal: ',', symbol: '€', precision: 0, pattern: '# !' }).format();
};

export const getQueryParams = (params: Record<string, string | number | boolean>): string => {
	const q = Object.keys(params)
		.map((key) => {
			const v = `${params[key]}`;
			const q = `${key}=${v}`;
			return v.length === 0 ? '' : q;
		})
		.filter((v) => v.length > 0)
		.join('&');

	return q.length > 0 ? `?${q}` : '';
};

export const DEFAULT_AVATAR = 'https://github.com/shadcn.png';

export const RANGES_CONTENT: RangeModel[] = [
	{ start: '08h00', end: '08h30', key_id: 'range_key_1', isTaken: false },
	{ start: '08h30', end: '09h00', key_id: 'range_key_2', isTaken: false },
	{ start: '09h00', end: '09h30', key_id: 'range_key_3', isTaken: false },
	{ start: '09h30', end: '10h00', key_id: 'range_key_4', isTaken: false },
	{ start: '10h00', end: '10h30', key_id: 'range_key_5', isTaken: false },
	{ start: '10h30', end: '11h00', key_id: 'range_key_6', isTaken: false },
	{ start: '11h00', end: '11h30', key_id: 'range_key_7', isTaken: false },
	{ start: '11h30', end: '12h00', key_id: 'range_key_8', isTaken: false },
	{ start: '12h00', end: '12h30', key_id: 'range_key_9', isTaken: false },
	{ start: '12h30', end: '13h00', key_id: 'range_key_10', isTaken: false },
	{ start: '13h00', end: '13h30', key_id: 'range_key_11', isTaken: false },
	{ start: '13h30', end: '14h00', key_id: 'range_key_12', isTaken: false },
	{ start: '14h00', end: '14h30', key_id: 'range_key_13', isTaken: false },
	{ start: '14h30', end: '15h00', key_id: 'range_key_14', isTaken: false },
	{ start: '15h00', end: '15h30', key_id: 'range_key_15', isTaken: false },
	{ start: '15h30', end: '16h00', key_id: 'range_key_16', isTaken: false },
	{ start: '16h00', end: '16h30', key_id: 'range_key_17', isTaken: false },
	{ start: '16h30', end: '17h00', key_id: 'range_key_18', isTaken: false },
	{ start: '17h00', end: '17h30', key_id: 'range_key_19', isTaken: false },
	{ start: '17h30', end: '18h00', key_id: 'range_key_20', isTaken: false },
];