import { CirclePlus } from "lucide-react";

export const CategoryModelFormConfig = {
    moduleTitle: 'Manage Categories',
    title: 'Create Category',
    description: 'Fill in the details below to create a new category.',
    addButton: {
        id: 'add-category',
        label: 'Add Category',
        className: 'bg-teal-600 text-white rounded-lg hover:bg-teal-700 cursor-pointer',
        icon: CirclePlus,
        type: 'button' as const,
        variant: 'default' as const,
    },
    fields: [
        {
            id: 'category-name',
            key: 'name',
            name: 'name',
            label: 'Category Name',
            type: 'text',
            placefolder: 'Enter category name',
            autocomplete: 'name',
            tabIndex: 1,
            autoFocus: true,

        },
        {
            id: 'category-description',
            key: 'description',
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placefolder: 'Enter category description',
            autocomplete: 'description',
            tabIndex: 2,
            row: 3,
            className: 'rounded border p-2 w-full'

        },
        {
            id: 'category-image',
            key: 'image',
            name: 'image',
            label: 'Image (optinal)',
            type: 'file',
            accept: 'image/*',
            tabIndex: 3,

        },

    ],
    buttons: [
        {
            key: 'cancel',
            id: 'cancel',
            type: 'button' as const,
            label: 'Cancel',
            variant: 'ghost' as const,
            className: 'cursor-pointer',
        },
        {
            key: 'submit',
            id: 'submit',
            type: 'submit' as const,
            label: 'Save Category',
            variant: 'default' as const,
            className: 'cursor-pointer',
        },
    ],
};
