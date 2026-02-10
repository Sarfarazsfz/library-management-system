import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
    MenuItem,
    IconButton,
    Typography,
    Chip,
    Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { IssueFormData } from '../../types/Issue';
import { Book } from '../../types/Book';
import bookService from '../../services/bookService';

interface IssueFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: IssueFormData) => void;
}

const IssueForm: React.FC<IssueFormProps> = ({ open, onClose, onSubmit }) => {
    const [books, setBooks] = useState<Book[]>([]);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IssueFormData>({
        defaultValues: {
            bookId: 0,
            memberName: '',
            memberEmail: '',
            remarks: '',
        },
    });

    useEffect(() => {
        if (open) {
            fetchBooks();
            reset({
                bookId: 0,
                memberName: '',
                memberEmail: '',
                remarks: '',
            });
        }
    }, [open, reset]);

    const fetchBooks = async () => {
        try {
            const data = await bookService.getAllBooks();
            setBooks(data.filter((b) => b.availableCopies > 0));
        } catch (error) {
            console.error('Failed to fetch books');
        }
    };

    const handleFormSubmit = (data: IssueFormData) => {
        onSubmit(data);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Issue Book
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <Controller
                                name="bookId"
                                control={control}
                                rules={{ required: 'Please select a book', validate: (v) => v > 0 || 'Please select a book' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Select Book"
                                        fullWidth
                                        select
                                        error={!!errors.bookId}
                                        helperText={errors.bookId?.message}
                                    >
                                        <MenuItem value={0} disabled>
                                            -- Select a Book --
                                        </MenuItem>
                                        {books.map((book) => (
                                            <MenuItem key={book.id} value={book.id}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                                    <Typography variant="body2">
                                                        {book.title} - {book.author}
                                                    </Typography>
                                                    <Chip
                                                        label={`${book.availableCopies} avail`}
                                                        size="small"
                                                        color="success"
                                                        sx={{ ml: 1, fontSize: '0.7rem' }}
                                                    />
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Controller
                                name="memberName"
                                control={control}
                                rules={{ required: 'Member name is required', maxLength: { value: 255, message: 'Max 255 characters' } }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Member Name"
                                        fullWidth
                                        error={!!errors.memberName}
                                        helperText={errors.memberName?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Controller
                                name="memberEmail"
                                control={control}
                                rules={{
                                    required: 'Member email is required',
                                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Member Email"
                                        type="email"
                                        fullWidth
                                        error={!!errors.memberEmail}
                                        helperText={errors.memberEmail?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Controller
                                name="remarks"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Remarks (Optional)" fullWidth multiline rows={2} />
                                )}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose} sx={{ textTransform: 'none' }}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" sx={{ textTransform: 'none', borderRadius: 2, px: 3 }}>
                        Issue Book
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default IssueForm;
