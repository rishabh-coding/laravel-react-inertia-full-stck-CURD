export const CategoryTableConfig = {
    Columns: [
        { label: 'Category Name', key: 'name', className: 'p-2 border' },
        { label: 'Description', key: 'description', className: 'w-90 p-2 border' },
        { label: 'Image', key: 'image', isImage: true, className: 'p-2 border' },
        { label: 'Created Date', key: 'created_at', className: 'p-2 border' },
        { label: 'Actions', key: 'actions', isAction: true, className: 'p-2 border' }
    ],
    actions: [
        { label: 'View', icon: 'Eye',  className: 'bg-sky-600 text-white p-1.5 rounded-lg cursor-pointer hover:opacity-50' },
        { label: 'Edit', icon: 'Pencil',  className: 'ms-2 bg-green-600 text-white p-1.5 rounded-lg cursor-pointer hover:opacity-50' },
        { label: 'Delete', icon: 'Trash2', route:'categories.destroy',  className: 'ms-2 bg-red-600 text-white p-1.5 rounded-lg cursor-pointer hover:opacity-50' },
    ],
}
