import React, { useEffect } from 'react';
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
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { Book, BookFormData } from '../../types/Book';
import { BOOK_CATEGORIES } from '../../utils/constants';

interface BookFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: BookFormData) => void;
    book?: Book | null;
}

const BookForm: React.FC<BookFormProps> = ({ open, onClose, onSubmit, book }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BookFormData>({
        defaultValues: {
            title: '',
            author: '',
            isbn: '',
            category: '',
            publisher: '',
            publicationYear: new Date().getFullYear(),
            quantity: 1,
            price: 0,
            description: '',
        },
    });

    useEffect(() => {
        if (book) {
            reset({
                title: book.title,
                author: book.author,
                isbn: book.isbn,
                category: book.category || '',
                publisher: book.publisher || '',
                publicationYear: book.publicationYear || new Date().getFullYear(),
                quantity: book.quantity,
                price: book.price || 0,
                description: book.description || '',
            });
        } else {
            reset({
                title: '',
                author: '',
                isbn: '',
                category: '',
                publisher: '',
                publicationYear: new Date().getFullYear(),
                quantity: 1,
                price: 0,
                description: '',
            });
        }
    }, [book, reset]);

    const handleFormSubmit = (data: BookFormData) => {
        onSubmit(data);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {book ? 'Edit Book' : 'Add New Book'}
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Controller
                                name="title"
                                control={control}
                                rules={{ required: 'Title is required', maxLength: { value: 255, message: 'Max 255 characters' } }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Title"
                                        fullWidth
                                        error={!!errors.title}
                                        helperText={errors.title?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Controller
                                name="author"
                                control={control}
                                rules={{ required: 'Author is required', maxLength: { value: 255, message: 'Max 255 characters' } }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Author"
                                        fullWidth
                                        error={!!errors.author}
                                        helperText={errors.author?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Controller
                                name="isbn"
                                control={control}
                                rules={{
                                    required: 'ISBN is required',
                                    minLength: { value: 10, message: 'ISBN must be at least 10 characters' },
                                    maxLength: { value: 13, message: 'ISBN must be at most 13 characters' },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="ISBN"
                                        fullWidth
                                        error={!!errors.isbn}
                                        helperText={errors.isbn?.message}
                                        disabled={!!book}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Category" fullWidth select>
                                        {BOOK_CATEGORIES.map((cat) => (
                                            <MenuItem key={cat} value={cat}>
                                                {cat}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Controller
                                name="publisher"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Publisher" fullWidth />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Controller
                                name="publicationYear"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Publication Year" type="number" fullWidth />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Controller
                                name="quantity"
                                control={control}
                                rules={{ required: 'Quantity is required', min: { value: 0, message: 'Minimum is 0' } }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Quantity"
                                        type="number"
                                        fullWidth
                                        error={!!errors.quantity}
                                        helperText={errors.quantity?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Controller
                                name="price"
                                control={control}
                                rules={{ min: { value: 0, message: 'Minimum is 0' } }}
                                render={({ field }) => (
                                    <TextField {...field} label="Price (₹)" type="number" fullWidth />
                                )}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Description" fullWidth multiline rows={3} />
                                )}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose} sx={{ textTransform: 'none' }}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            textTransform: 'none',
                            borderRadius: 2,
                            px: 3,
                        }}
                    >
                        {book ? 'Update Book' : 'Add Book'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default BookForm;
