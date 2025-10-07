import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { CirclePlus, Eye, Pencil, Trash2, X } from 'lucide-react';
import CustomTable from '@/components/custom-table';
import { CategoryTableConfig } from '@/config/tables/category';
import CustomModelForm from '@/components/custom-model-form';
import { CategoryModelFormConfig } from '@/config/forms/category-model-form';
import CategoryController from '@/actions/App/Http/Controllers/CategoryController';
import { useState } from 'react';
import CustomToast from '@/components/custom-toast';
import { toast } from '@/components/custom-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Categories',
        href: '/categories',
    },
];




interface CategoryProps {
    id: number,
    name: string,
    description: string,
    image: string,
    created_at: string,
};

interface IndexProps {
    categories: CategoryProps[];
};

interface flashProps extends Record<string, any> {
    flash?: {
        success?: string,
        error?: string
    }
}

// Handle Submit


export default function Index({ categories }: IndexProps) {

    const { flash } = (usePage<{ flash?: { success?: string; error?: string } }>().props);
    const flashMessage = flash?.success || flash?.error;
    const [modelOpen, setModelOpen] = useState(false);
    const [mode, setMode] = useState<'create' | 'view' | 'edit'>('create');
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { data, setData, errors, processing, post, reset } = useForm({
        name: '',
        description: '',
        image: null as File | null,
        _method: 'POST',
    });


    // single handle for store /update
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Edit mode
        if (mode === 'edit' && selectedCategory) {
            data._method = 'PUT';
            post(CategoryController.update(selectedCategory.id), {
                forceFormData: true,
                onSuccess: (response: { props: flashProps }) => {
                    const successMsg = response.props.flash?.success || 'Category updated successfully';
                    toast.success(successMsg);
                    closeModel();
                },
                onError: (error: Record<string, string>) => {
                    const errorMsg = error?.message || 'Unable to  updated category';
                    toast.error(errorMsg);
                    closeModel();
                },
            })
        }
        else {
            post(CategoryController.store(), {
                onSuccess: (response: { props: flashProps }) => {
                    const successMsg = response.props.flash?.success || 'Category created successfully';
                    toast.success(successMsg);
                    closeModel();
                },
                onError: (error: Record<string, string>) => {
                    const errorMsg = error?.message || 'Unable to  create category';
                    toast.error(errorMsg);
                    closeModel();
                },
            });
        }
    }

    //handle delete
    const handleDeleteCategory = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/categories/${id}`, {
                preserveScroll: true,
                onSuccess: (response: { props: flashProps }) => {
                    const successMsg = response.props.flash?.success || 'Category updated successfully';
                    toast.success(successMsg);
                    closeModel();
                },
                onError: (error: Record<string, string>) => {
                    const errorMsg = error?.message || 'Unable to  create category';
                    toast.error(errorMsg);
                    closeModel();
                },
            });
        }
    }


    // Closing Model
    const closeModel = () => {
        setMode('create');
        setPreviewImage(null);
        setSelectedCategory(null);
        reset();
        setModelOpen(false);
    }

    // Handle Model Toggle
    const handleMOdelToggle = (open: boolean) => {
        setModelOpen(open);
        if (!open) {
            setMode('create');
            setPreviewImage(null);
            setSelectedCategory(null);
            reset();
        }
    }

    // Open model

    const openModel = (mode: 'create' | 'view' | 'edit', category?: any) => {
        setMode(mode);
        console.log('category', category, mode);
        if (category) {
            Object.entries(category).forEach(([key, value]) => {
                if (key !== 'image') {
                    setData(key as keyof typeof data, value as string | null);
                }
            });
            setPreviewImage(category.image);
            setSelectedCategory(category);

        } else {
            reset();
        }
        setModelOpen(true);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Categories" />
            <CustomToast />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="ml-auto">
                    {/* Custom Model Form Componenet */}
                    <CustomModelForm
                        addButton={CategoryModelFormConfig.addButton}
                        title={mode === 'view' ? 'View Category' : mode === 'edit' ? 'Upadte Category' : CategoryModelFormConfig.title}
                        description={CategoryModelFormConfig.description}
                        fields={CategoryModelFormConfig.fields}
                        buttons={CategoryModelFormConfig.buttons}
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        handleSubmit={handleSubmit}
                        open={modelOpen}
                        onOpenChange={handleMOdelToggle}
                        mode={mode}
                        previewImage={previewImage}
                    />
                </div>
                {/* Custom Table Component */}
                <div className='overflow-hidden rounded-lg border bg-white shadow-sm'>
                    <CustomTable
                        columns={CategoryTableConfig.Columns}
                        actions={CategoryTableConfig.actions}
                        data={categories}
                        onView={(category) => openModel('view', category)}
                        onEdit={(category) => openModel('edit', category)}
                        handleDeleteCategory={handleDeleteCategory}
                        isModel={true}
                    />
                </div>



            </div>
        </AppLayout>
    );
}
