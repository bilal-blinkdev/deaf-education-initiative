import type { SelectField } from 'payload';

const colorOptions = [
  { label: '🔵 Dark Blue', value: '#0000cc' },
  { label: '🟡 Yellow', value: '#ffff00' },
  { label: '⚫ Ebony', value: '#121127' },
  { label: '⚫ Mine Shaft', value: '#2f2f2f' },
  { label: '🔵 Dodger Blue', value: '#3399ff' },
  { label: '🟠 Sandy Brown', value: '#f29559' },
  { label: '🟠 Flamingo', value: '#f26419' },
  { label: '🔴 Red', value: '#ff080c' },
  { label: '🟢 Green Haze', value: '#039855' },
  { label: '⚪ Titan White', value: '#f2f3ff' },
  { label: '⚪ Alabaster', value: '#fcfcfc' },
  { label: '⚪ Athens Gray', value: '#eaecf0' },
  { label: '⚪ Mischka', value: '#d0d5dd' },
  { label: '⚫ Woodsmoke', value: '#0a090c' },
  { label: '🔵 Cerulean Blue', value: '#444bd3' },
  { label: '⚪ Mercury', value: '#e9e9e9' },
  { label: '🔵 Pattens Blue', value: 'rgb(223, 245, 255)' },
  { label: '⚪ White', value: '#fff' },
  { label: '⚫ Black', value: '#000' },
];

type ColorSelectorField = (overrides?: Partial<SelectField>) => SelectField;

export const colorSelectorField: ColorSelectorField = (overrides = {}) =>
  ({
    ...overrides,
    name: overrides.name || 'color',
    label: overrides.label || 'Color',
    type: 'select',
    options: colorOptions,
  }) as SelectField;
