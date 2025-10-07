
import { Button } from "./ui/button";
import { Link, router } from "@inertiajs/react";
import * as LucidIcons from 'lucide-react';


interface TableColumn {
    label: string,
    key: string,
    isImage?: boolean,
    isAction?: boolean,
    className: string,
}

interface ActionConfig {
    label: string,
    icon: keyof typeof LucidIcons,
    route: 'show' | 'edit' ,
    className: string,

}

interface TableRow {
    [key: string]: any;
}

interface CustomTableProps {
    columns: TableColumn[],
    actions: ActionConfig[],
    data: TableRow[],
    from: number,
    onDelete: (id: number, route: string) => void,
    onView: (row: TableRow) => void,
    onEdit: (row: TableRow) => void,
    handleDeleteCategory: (id: number) => void,
    isModel: boolean,
}

export default function CustomTable({ columns, actions, data, from, onDelete, onView, onEdit, handleDeleteCategory, isModel }: CustomTableProps) {

    // URL helper
    const getProductRoute = (route: string, id: number | string) => {
        switch (route) {
            case 'show':
                return `/products/${id}`;
            case 'edit':
                return `/products/${id}/edit`;
            case 'delete':
                return `/products/${id}`;
            default:
                return '/products';
        }
    };




    const renderActionButtons = (row: TableRow) => {

        return (
            <div className="flex">
                {actions.map((action, index) => {
                    const IconComponent = LucidIcons[action.icon] as React.ElementType;

                    if (isModel) {

                        // for view model
                        if (action.label === 'View') {
                            return (
                                <Button key={index} className={action.className} onClick={() => onView?.(row)}>
                                    <IconComponent size={18} />
                                </Button>
                            );
                        }

                        // Edit functionality for model
                        if (action.label === 'Edit') {
                            return (
                                <Button key={index} className={action.className} onClick={() => onEdit?.(row)}>
                                    <IconComponent size={18} />
                                </Button>
                            );
                        }
                        // Delete functionality for model
                        if (action.label === 'Delete') {
                            return (
                                <Button key={index} className={action.className} onClick={() => handleDeleteCategory(row.id)}>
                                    <IconComponent size={18} />
                                </Button>
                            );
                        }
                    }
                    // for delete
                    if (action.label === 'Delete') {
                        return (
                            <Button key={index} className={action.className} onClick={() => onDelete(row.id, getProductRoute(action.route, row.id))}>
                                <IconComponent size={18} />
                            </Button>
                        );
                    }
                    return (
                        <Link key={index} as='button' href={getProductRoute(action.route, row.id)} className={action.className}>
                            <IconComponent size={18} />
                        </Link>
                    );
                })
                }
            </div >
        )
    }
    return (
        <>
            <div className='overflow-hidden rounded-lg border bg-white shadow-sm'>
                <table className='w-full table-auto'>
                    <thead>
                        <tr className='bg-gray-700 text-white text-sm'>
                            <th className='p-2 border'>#</th>

                            {columns.map((column, index) => (
                                <th key={column.key} className={column.className}>
                                    {column.label}
                                </th>

                            ))}


                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row, index) => (
                                <tr key={index} className='text-sm'>

                                    <td className='px-4 py-1 border text-center'>{from + index}</td>
                                    {columns.map((col) => (
                                        <td key={col.key} className='px-4 py-1 border text-center'>
                                            {col.isImage && row[col.key] ? (
                                                <div className='flex items-center justify-center'>
                                                    <div><img src={'storage/' + row[col.key]} alt={row.name} className='h-16 w-fit rounded-lg object-cover' /></div>
                                                </div>
                                            ) : col.isAction ? (
                                                renderActionButtons(row)
                                            ) : (
                                                row[col.key]
                                            )}
                                        </td>
                                    ))}

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className='text-center py-4 text-sm font-bold text-red-600'>No Products Found!</td>
                            </tr>
                        )}


                    </tbody>
                </table>
            </div>
        </>
    )
}
