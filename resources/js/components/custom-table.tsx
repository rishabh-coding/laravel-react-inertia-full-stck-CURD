
import { Button } from "./ui/button";
import { Link,  } from "@inertiajs/react";
import * as LucidIcons from 'lucide-react';
import { route } from "ziggy-js";


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
    route: string,
    className: string,

}

interface TableRow {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

interface CustomTableProps {
    columns: TableColumn[],
    actions: ActionConfig[],
    data: TableRow[],
    onDelete: (route: string) => void,
    onView?: (row: TableRow) => void,
    onEdit?: (row: TableRow) => void,
    handleDeleteCategory?: (id: number) => void,
    isModel?: boolean,
}

export default function CustomTable({ columns, actions, data, onDelete, onView, onEdit, isModel }: CustomTableProps) {

    const renderActionButtons = (row: TableRow) => {

        return (
            <div className="flex items-center justify-center">
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
                    }
                    // for delete
                    if (action.label === 'Delete') {
                        return (
                            <Button key={index} className={action.className} onClick={() => onDelete(route(action.route, row.id))}>
                                <IconComponent size={18} />
                            </Button>
                        );
                    }
                    return (
                        <Link key={index} as='button' href={route(action.route, row.id)} className={action.className}>
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

                            {columns.map((column) => (
                                <th key={column.key} className={column.className}>
                                    {column.label}
                                </th>

                            ))}


                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row, index) => (

                                < tr key={index} className='text-sm' >

                                    <td className='px-4 py-1 border text-center'>{index + 1}</td>
                                    {
                                        columns.map((col) => (
                                            <td key={col.key} className='px-4 py-1 border text-center'>
                                                {col.isImage && row[col.key] ? (
                                                    <div className='flex items-center justify-center'>
                                                        <div><img src={'/storage/' + row[col.key]} alt={row.name} className='h-16 w-fit rounded-lg object-cover' /></div>
                                                    </div>

                                                ) : col.isAction ? (
                                                    renderActionButtons(row)
                                                ) : (
                                                    row[col.key]
                                                )}
                                            </td>
                                        ))
                                    }

                                </tr>
                            ))

                        ) : (
                            <tr>
                                <td colSpan={7} className='text-center py-4 text-sm font-bold text-red-600'>No {!isModel ? 'Products' : 'Categories'} Found!</td>
                            </tr>
                        )}


                    </tbody>
                </table>
            </div >
        </>
    )
}
