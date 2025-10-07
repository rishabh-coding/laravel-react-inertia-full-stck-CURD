import * as LucidIcons from 'lucide-react';

export const ProductTableConfig = {
    Columns: [
        { label: 'Product Name', key: 'name', className: 'p-2 border' },
        { label: 'Description', key: 'description', className: 'w-90 p-2 border' },
        { label: 'Price (INR)', key: 'price', className: 'p-2 border' },
        { label: 'Featured Image', key: 'featured_image', isImage: true, className: 'p-2 border' },
        { label: 'Created Date', key: 'created_at', className: 'p-2 border' },
        { label: 'Actions', key: 'actions', isAction: true, className: 'p-2 border' }
    ],
    actions: [
        { label: 'View', icon: 'Eye' as keyof typeof LucidIcons, route: 'show', className: 'bg-sky-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-50' },
        { label: 'Edit', icon: 'Pencil' as keyof typeof LucidIcons, route: 'edit', className: 'ms-2 bg-green-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-50' },
        { label: 'Delete', icon: 'Trash2' as keyof typeof LucidIcons, route: 'delete', className: 'ms-2 bg-red-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-50' },
    ],
}
