export const formatDate = (dateStr: string | undefined): string => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const formatCurrency = (amount: number | undefined): string => {
    if (amount === undefined || amount === null) return '₹0.00';
    return `₹${amount.toFixed(2)}`;
};

export const getStatusColor = (status: string): 'success' | 'warning' | 'error' | 'default' => {
    switch (status) {
        case 'ISSUED':
            return 'warning';
        case 'RETURNED':
            return 'success';
        case 'OVERDUE':
            return 'error';
        default:
            return 'default';
    }
};

export const isOverdue = (dueDate: string, returnDate?: string): boolean => {
    if (returnDate) return false;
    return new Date(dueDate) < new Date();
};
