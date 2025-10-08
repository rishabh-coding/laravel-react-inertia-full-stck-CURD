// import { update } from '@/actions/App/Http/Controllers/ProductController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import products, { create, index, store, update, } from '@/routes/products';

import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import React from 'react';
import { route } from 'ziggy-js'



export default function ProductForm({ ...props }) {

    const { product, isView, isEdit } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${isView ? 'Show' : isEdit ? 'Upadte' : 'Create'} Product`,
            href: 'create()',
        },
    ];
    type ProductForm = {
        name: string,
        description: string,
        price: string,
        featured_image: File | null,
        _method:'PUT' | 'POST',


    };
    const form = useForm<ProductForm>({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        featured_image: null as File | null,
        _method: isEdit ? 'PUT' : 'POST',


    });
    const { data, setData, post, put, processing, errors, reset } = form;
    // const { data, setData, post, processing, errors, reset } = useForm({
    //     name: product?.name || '',
    //     description: product?.description || '',
    //     price: product?.price || '',
    //     featured_image: null as File | null,
    //     _method: isEdit ? 'PUT' : 'POST',
    // });
    // form submit handler

    const submit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        if (isEdit) {
            // types mismatch se toString use kiya put ek string url leta hai
            post(route('products.update', product.id), {
                forceFormData: true,
                onSuccess: () => reset(),
            })
        } else {
            post(route('products.store'), {
                onSuccess: () => reset(),
            });
            console.log('data', data);
        }

    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {

            setData('featured_image', e.target.files[0]);
        }
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Products" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className='ml-auto'>
                    <Link as='button' className='flex items-center bg-black text-white w-fit px-4 py-2 text-sm rounded-lg cursor-pointer hover:opacity-50' href={index()}>
                        <ArrowLeft size={18} className='me-1' />Back</Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>{isView ? 'Show' : isEdit ? 'Upadte' : 'Create'} Product</CardTitle>

                        <CardContent>
                            <form onSubmit={submit} className='flex flex-col gap-4' autoComplete='off'>
                                <div className='grid gap-6 '>

                                    {/* product name */}
                                    <div className='grid gap-2'>
                                        <Label htmlFor='name'>Product Name</Label>
                                        <Input
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            id='name'
                                            name='name'
                                            type='text'
                                            placeholder='Product Name'
                                            autoFocus
                                            tabIndex={1}
                                            disabled={isView || processing} />

                                        <InputError message={errors.name} />
                                    </div>

                                    {/* product description */}
                                    <div className='grid gap-2'>

                                        <Label htmlFor='description'>Description</Label>
                                        <CustomTextarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            id='description'
                                            name='description'
                                            tabIndex={2}
                                            placeholder='Product Description'
                                            rows={3}
                                            disabled={isView || processing} />
                                        <InputError message={errors.description} />

                                    </div>

                                    {/* product price */}
                                    <div className='grid gap-2'>
                                        <Label htmlFor='price'>Product Price</Label>
                                        <Input
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            id='price'
                                            name='price' type='text'
                                            placeholder='Product Price'
                                            autoFocus
                                            tabIndex={3}
                                            disabled={isView || processing} />
                                        <InputError message={errors.price} />

                                    </div>

                                    {/* product Featured image */}
                                    {!isView && (
                                        <div className='grid gap-2'>
                                            <Label htmlFor='featured_image'>Featured Image</Label>
                                            <Input onChange={handleFileUpload} id='featured_image' name='featured_image' type='file' autoFocus tabIndex={4} />
                                            <InputError message={errors.featured_image} />

                                        </div>
                                    )}
                                    {/* display Feautred Image */}
                                    {(isView || isEdit) && product.featured_image && (
                                        <div className='grid gap-2'>
                                            <Label htmlFor='featured_image'>Current Featured Image</Label>
                                            <img src={`/storage/${product.featured_image}`} alt='Featured Image' className='h-40 w-40 object-fill rounded-lg border-black border-1' />
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    {!isView && (
                                        <Button

                                            type="submit"
                                            className="mt-4 w-fit cursor-pointer"
                                            tabIndex={4}
                                            data-test="login-button"
                                        >
                                            {processing && (
                                                <LoaderCircle className="h-4 w-4 animate-spin" />
                                            )}
                                            {processing ? (isEdit ? 'Updating...' : 'Creating...') : isEdit ? 'Update' : 'Create'} Product
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
