import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    TextField,
    InputAdornment,
    Typography,
    Alert,
    Snackbar,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Book } from '../../types/Book';
import bookService from '../../services/bookService';
import BookCard from './BookCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ConfirmDialog from '../common/ConfirmDialog';

interface BookListProps {
    onEdit: (book: Book) => void;
    refreshTrigger: number;
}

const BookList: React.FC<BookListProps> = ({ onEdit, refreshTrigger }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; bookId: number | null; bookTitle: string }>({
        open: false,
        bookId: null,
        bookTitle: '',
    });

    useEffect(() => {
        fetchBooks();
    }, [refreshTrigger]);

    useEffect(() => {
        if (searchQuery.trim()) {
            const filtered = books.filter(
                (book) =>
                    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    book.isbn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (book.category && book.category.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredBooks(filtered);
        } else {
            setFilteredBooks(books);
        }
    }, [searchQuery, books]);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const data = await bookService.getAllBooks();
            setBooks(data);
            setFilteredBooks(data);
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to fetch books', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id: number) => {
        const book = books.find((b) => b.id === id);
        setDeleteConfirm({ open: true, bookId: id, bookTitle: book?.title || '' });
    };

    const handleDeleteConfirm = async () => {
        if (deleteConfirm.bookId === null) return;
        try {
            await bookService.deleteBook(deleteConfirm.bookId);
            setSnackbar({ open: true, message: 'Book deleted successfully', severity: 'success' });
            fetchBooks();
        } catch (error: any) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Failed to delete book',
                severity: 'error',
            });
        } finally {
            setDeleteConfirm({ open: false, bookId: null, bookTitle: '' });
        }
    };

    if (loading) return <LoadingSpinner message="Loading books..." />;

    return (
        <Box>
            <TextField
                id="book-search"
                fullWidth
                placeholder="Search books by title, author, ISBN, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="primary" />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        backgroundColor: 'background.paper',
                    },
                }}
            />

            {filteredBooks.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        {searchQuery ? 'No books found matching your search' : 'No books available'}
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {filteredBooks.map((book) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={book.id}>
                            <BookCard book={book} onEdit={onEdit} onDelete={handleDeleteClick} />
                        </Grid>
                    ))}
                </Grid>
            )}

            <ConfirmDialog
                open={deleteConfirm.open}
                title="Delete Book"
                message={`Are you sure you want to delete "${deleteConfirm.bookTitle}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                severity="error"
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteConfirm({ open: false, bookId: null, bookTitle: '' })}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default BookList;
