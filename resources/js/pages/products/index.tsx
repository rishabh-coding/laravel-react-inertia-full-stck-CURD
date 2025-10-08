import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ChangeEvent, useEffect, useState } from 'react';
import { create, destroy, edit, index, show } from '@/routes/products';
import { CirclePlus, Eye, Pencil, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import CustomTable from '@/components/custom-table';
import { ProductTableConfig } from '@/config/tables/product-table';
import { route } from 'ziggy-js';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Products',
        href: '/products',
    },
];

interface LinkProps {
    active: boolean;
    label: string;
    url: string;
};


interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    featured_image: string,
    featured_image_original_name: string,
    created_at: string,
};
interface ProductPagination {
    data: Product[];
    links: LinkProps[];
    from: number;
    to: number;
    total: number;
};

interface FillterProps {
    search: string,
    perPage: string,
};

interface IndexProps {
    products: ProductPagination;
    fillters: FillterProps,
    totalCount: number,
    fillteredCount: number,
};


export default function Index({ products, fillters, totalCount, fillteredCount }: IndexProps) {

    const { flash } = (usePage<{ flash?: { success?: string; error?: string } }>().props);
    const flashMessage = flash?.success || flash?.error;
    const [message, setMessage]=useState('');
    const [showAlert, setShowAlert] = useState(flashMessage ? true : false );

    console.log(products)
    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    const { data, setData } = useForm({
        search: fillters.search || '',
        perPage: fillters.perPage || '5',
    });
    // handle change for input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;
        setData('search', value);

        const queryString = {
            ...(value && { search: value }),
            ...(data.perPage && { perPage: data.perPage }),

        };

        router.get(index(), queryString, {
            preserveState: true,
            preserveScroll: true,
        });

    };
    // to reset applied fillter
    const handleReset = () => {
        setData('search', '');
        setData('perPage', '5');

        const queryString = {};

        router.get(index(), queryString, {
            preserveState: true,
            preserveScroll: true,
        });
    }
    // per page function

    const handlePerPageChance = (value: string) => {
        setData('perPage', value);

        const queryString = {
            ...(data.search && { search: data.search }),
            ...(value && { perPage: value }),
        };


        router.get(index(), queryString, {
            preserveState: true,
            preserveScroll: true,
        });
    };
    //handle delete
    const handleDelete = (route: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route, {
                preserveScroll: true,
                onSuccess:(page)=>{
                    // const message=page.props.flash?.success
                     setMessage(flashMessage || 'Product deleted successfully');
                     setShowAlert(true);

                },
                  onError:(page)=>{
                    // const message=page.props.flash?.success
                     setMessage(flashMessage || 'Unable to delete product. Please try again.');
                     setShowAlert(true);
                },
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Products" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                {showAlert && flashMessage && (
                    <Alert variant={'default'} className={`${flash?.success ? 'bg-green-800' : (flash?.error ? 'bg-red-800' : '')} ml-auto max-w-md text-white`}>
                        <AlertTitle></AlertTitle>
                        <AlertDescription className='text-white'>
                            {flash.success ? 'Success!' : 'Error!'} {'  '}
                            {flashMessage}
                        </AlertDescription>
                    </Alert>
                )}
                {/* Seach button and add product */}

                <div className='mb-4 flex items-center justify-between gap-4'>
                    <Input
                        type='text'
                        value={data.search}
                        onChange={handleChange}
                        className='h-10 w-1/2'
                        placeholder='Search....'
                        name='search'
                    />
                    <Button onClick={handleReset} className='bg-red-600 h-10 cursor-pointer hover:opacity-50'>
                        <X />
                    </Button>

                    {/* add product button */}
                    <div className='ml-auto'>

                        <Link as='button' href={route('products.create')}
                            className='flex items-center bg-black text-white px-4 py-2 text-sm rounded-lg cursor-pointer hover:opacity-50'>
                            <CirclePlus size={18} className='me-1' />Add Product
                        </Link>

                    </div>
                </div>



                <div className='overflow-hidden rounded-lg border bg-white shadow-sm'>
                    {/* <table className='w-full table-auto'>
                        <thead>
                            <tr className='bg-gray-700 text-white text-sm'>
                                <th className='p-2 border'>#</th>
                                <th className='p-2 border'>Name</th>
                                <th className='w-90 p-2 border'>Description</th>
                                <th className='p-2 border'>Price (INR)</th>
                                <th className='p-2 border'>Featured Image</th>
                                <th className='p-2 border'>Created Date</th>
                                <th className='p-2 border'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data.length > 0 ? (
                                products.data.map((product, index) => (
                                    <tr key={index} className='text-sm'>
                                        <td className='px-3 py-1 border text-center'>{products.from + index}</td>
                                        <td className='px-3 py-1 text-center border'>{product.name}</td>
                                        <td className='px-3 py-1 text-center border'>{product.description}</td>
                                        <td className='px-3 py-1 text-center border'>{product.price}</td>
                                        <td className='px-3 py-1 text-center border'>
                                            {product.featured_image && (
                                                <div className='flex items-center justify-center'>
                                                    <img src={'storage/' + product.featured_image} alt={product.featured_image}
                                                        className='h-16 w-fit object-cover' />
                                                </div>

                                            )}
                                        </td>
                                        <td className='px-4 py-1 text-center border'>{product.created_at}</td>
                                        <td className='px-4 py-1 text-center border'>
                                            <Link
                                                as='button'
                                                className='bg-sky-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-50' href={show(product.id)}>
                                                <Eye size={18} />
                                            </Link>

                                            <Link
                                                as='button'
                                                className='ms-2 bg-green-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-50' href={edit(product.id)}>
                                                <Pencil size={18} />
                                            </Link>

                                            <Button
                                                className='ms-2 bg-red-600 text-white rounded-lg cursor-pointer hover:opacity-50'
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this product?')) {
                                                        router.delete(destroy(product.id), {
                                                            preserveScroll: true,
                                                        })
                                                    }
                                                }} >
                                                <Trash2 size={16} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className='text-center py-4 text-sm font-bold text-red-600'>No Products Found!</td>
                                </tr>
                            )}


                        </tbody>
                    </table> */}
                </div>
                {/* Custom Table Component */}

                <CustomTable columns={ProductTableConfig.Columns} actions={ProductTableConfig.actions} data={products.data} from={products.from} onDelete={handleDelete} />

                <Pagination products={products} perPage={data.perPage} onPerPageChange={handlePerPageChance} totalCount={totalCount} fillteredCount={fillteredCount} search={data.search} />
            </div>
        </AppLayout>
    );
}
