import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    IconButton,
    Tooltip,
    CardActions,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Inventory as BookIcon,
} from '@mui/icons-material';
import { Book } from '../../types/Book';
import { formatCurrency } from '../../utils/helpers';

interface BookCardProps {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: (id: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                },
            }}
        >
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Chip
                        label={book.category || 'Uncategorized'}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ borderRadius: 1.5, fontSize: '0.7rem' }}
                    />
                    <Chip
                        label={`${book.availableCopies}/${book.quantity}`}
                        size="small"
                        color={book.availableCopies > 0 ? 'success' : 'error'}
                        sx={{ borderRadius: 1.5, fontWeight: 600, fontSize: '0.75rem' }}
                    />
                </Box>

                <Typography variant="h6" fontWeight={600} gutterBottom noWrap>
                    {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    by {book.author}
                </Typography>

                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                        ISBN: {book.isbn}
                    </Typography>
                    {book.publisher && (
                        <Typography variant="caption" color="text.secondary">
                            Publisher: {book.publisher}
                        </Typography>
                    )}
                    {book.publicationYear && (
                        <Typography variant="caption" color="text.secondary">
                            Year: {book.publicationYear}
                        </Typography>
                    )}
                    {book.price && (
                        <Typography variant="body2" fontWeight={600} color="primary.main" sx={{ mt: 1 }}>
                            {formatCurrency(book.price)}
                        </Typography>
                    )}
                </Box>
            </CardContent>

            <CardActions sx={{ px: 2, pb: 2, justifyContent: 'flex-end' }}>
                <Tooltip title="Edit">
                    <IconButton size="small" color="primary" onClick={() => onEdit(book)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton size="small" color="error" onClick={() => onDelete(book.id)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};

export default BookCard;
