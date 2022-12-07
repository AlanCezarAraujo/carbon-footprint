const weightFormatter = new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: 'kilogram',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
});

export default weightFormatter;
