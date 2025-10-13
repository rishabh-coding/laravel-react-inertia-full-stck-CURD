import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
interface StatsProps {
    totalProducts: number,
    totalCategories: number,
}
interface LatestProductsProps {
    id: number,
    name: string,
}
interface LatestCategoriesProps {
    id: number,
    name: string,
    image?: string | null,
}
interface DashboardProps {
    stats: StatsProps,
    latestproducts: LatestProductsProps[],
    latestcategories: LatestCategoriesProps[],
}

export default function Dashboard({ stats, latestproducts, latestcategories }: DashboardProps) {
    console.log(stats, latestproducts, latestcategories)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>

            <Head title="Dashboard" />
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalProducts}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Total Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalCategories}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Latest Products and Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Latest Products */}
                <Card>
                    <CardHeader>
                        <CardTitle>Latest Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {latestproducts.length ? (
                            <ul>
                                {latestproducts.map((product) => (
                                    <li key={product.id} className="py-1 border-b">
                                        {product.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">No products found.</p>
                        )}
                    </CardContent>
                </Card>

                {/* Latest Categories */}
                <Card>
                    <CardHeader>
                        <CardTitle>Latest Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {latestcategories.length ? (
                            <ul>
                                {latestcategories.map((category) => (
                                    <li key={category.id} className="flex items-center py-1 border-b">
                                        <img
                                            src={category.image ? `/storage/${category.image}` : '/placeholder.png'}
                                            alt={category.name}
                                            className="h-10 w-10 object-cover rounded mr-2"
                                        />
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">No categories found.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
