import React, { useState } from 'react';
import { Box, Typography, Button, Alert, Snackbar } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import BookList from '../components/books/BookList';
import BookForm from '../components/books/BookForm';
import { Book, BookFormData } from '../types/Book';
import bookService from '../services/bookService';

const Books: React.FC = () => {
    const [formOpen, setFormOpen] = useState(false);
    const [editBook, setEditBook] = useState<Book | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    const handleAdd = () => {
        setEditBook(null);
        setFormOpen(true);
    };

    const handleEdit = (book: Book) => {
        setEditBook(book);
        setFormOpen(true);
    };

    const handleSubmit = async (data: BookFormData) => {
        try {
            if (editBook) {
                await bookService.updateBook(editBook.id, data);
                setSnackbar({ open: true, message: 'Book updated successfully!', severity: 'success' });
            } else {
                await bookService.createBook(data);
                setSnackbar({ open: true, message: 'Book added successfully!', severity: 'success' });
            }
            setRefreshTrigger((prev) => prev + 1);
        } catch (error: any) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Operation failed',
                severity: 'error',
            });
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" fontWeight={700}>
                        Books
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage library book collection
                    </Typography>
                </Box>
                <Button
                    id="add-book-btn"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                    sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        px: 3,
                        boxShadow: '0 4px 15px rgba(25,118,210,0.3)',
                    }}
                >
                    Add Book
                </Button>
            </Box>

            <BookList onEdit={handleEdit} refreshTrigger={refreshTrigger} />

            <BookForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSubmit={handleSubmit}
                book={editBook}
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

export default Books;
