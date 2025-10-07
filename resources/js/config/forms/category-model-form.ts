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
        type: 'button',
        variant: 'default',
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
            type: 'button',
            label: 'Cancel',
            variant: 'ghost',
            className: 'cursor-pointer',
        },
        {
            key: 'submit',
            id: 'submit',
            type: 'submit',
            label: 'Save Category',
            variant: 'default',
            className: 'cursor-pointer',
        },
    ],
};
