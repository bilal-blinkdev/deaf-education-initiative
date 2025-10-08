import type { SelectField } from 'payload';

// Generate options from 0x to 20x
const paddingOptions = [{ label: 'None', value: '0x' }];
for (let i = 1; i <= 40; i += 1) {
  paddingOptions.push({
    label: `${i}x`,
    value: `${i}x`,
  });
}

type PaddingField = (overrides?: Partial<SelectField>) => SelectField;

export const paddingField: PaddingField = (overrides) =>
  ({
    name: 'padding', // Default name, will be overridden
    label: 'Padding', // Default label, will be overridden
    type: 'select',
    options: paddingOptions,
    defaultValue: '0x',
    ...overrides,
  }) as SelectField;
