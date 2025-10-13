import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputError from "./input-error";


interface AddButtonProps {
    id: string;
    label: string;
    className: string;
    icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>> | string;
    type: 'button' | 'submit' | 'reset' | undefined;
    variant: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | undefined;
}

interface FieldsProps {
    id: string;
    key: string;
    name: string;
    label: string;
    type: string;
    placefolder?: string;
    autocomplete?: string;
    tabIndex: number;
    autoFocus?: boolean;
    rows?: number;
    accept?: string;
    className?: string;
}

interface ButtonProps {
    key: string;
    type: 'button' | 'submit' | 'reset' | undefined;
    label: string;
    variant: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | undefined;
    className: string;
}

interface CustomModelFormProps {
    addButton: AddButtonProps;
    title: string;
    description: string;
    fields: FieldsProps[];
    buttons: ButtonProps[];
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>;
    setData: (name: string, value: unknown) => void;
    errors: Record<string, string>;
    processing: boolean;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleSubmit: (data: any) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: 'create' | 'view' | 'edit';
    previewImage: string | null;

}
export default function CustomModelForm(
    { addButton,
        title,
        description,
        fields,
        buttons,
        data,
        setData,
        errors,
        processing,
        handleSubmit,
        open,
        onOpenChange,
        mode = 'create',
        previewImage,
    }: CustomModelFormProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal>

            <DialogTrigger asChild>
                <Button type={addButton.type} id={addButton.id} variant={addButton.variant} className={addButton.className}>
                    {addButton.icon && <addButton.icon />}{addButton.label}
                </Button>
            </DialogTrigger>

            {/* Dialoge Content */}
            <DialogContent onInteractOutside={(e)=>e.preventDefault()} className="sm:max-[600px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-6">

                        {fields.map((field) => (
                            <div key={field.key} className="grid gap-3">
                                <Label htmlFor={field.id}>{field.label}</Label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        id={field.id}
                                        name={field.name}
                                        placeholder={field.placefolder}
                                        rows={field.rows}
                                        autoComplete={field.autocomplete}
                                        tabIndex={field.tabIndex}
                                        className={field.className}
                                        onChange={(e) => setData(field.name, e.target.value)}
                                        value={data[field.name] || ''}
                                        disabled={mode === 'view' || processing}
                                    />
                                ) : field.type === 'file' ? (
                                    <div className="space-y-2">
                                        {/* Image Preview */}
                                        {mode !== 'create' && previewImage && (
                                            <img src={'storage/' + previewImage} alt={data?.[field.key]} className="w-30 h-30 rounded border border-black object-fill" />

                                        )}
                                        {/* File Input */}
                                        {mode != 'view' && (
                                            <Input
                                                id={field.id}
                                                name={field.name}
                                                type={field.type}
                                                accept={field.accept}
                                                tabIndex={field.tabIndex}
                                                onChange={(e) => setData(field.name, e.target.files ? e.target.files[0] : null)}
                                                disabled={processing}
                                            />

                                        )}
                                    </div>
                                ) : (
                                    <Input
                                        id={field.id}
                                        name={field.name}
                                        type={field.type}
                                        placeholder={field.placefolder}
                                        autoComplete={field.autocomplete}
                                        tabIndex={field.tabIndex}
                                        autoFocus={field.autoFocus}
                                        onChange={(e) => setData(field.name, e.target.value)}
                                        value={data[field.name] || ''}
                                        disabled={mode === 'view' || processing}
                                    />
                                )}
                                <InputError message={errors?.[field.name]} />
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        {buttons.map((button) => {
                            if (button.key === 'cancel') {
                                return (
                                    <DialogClose asChild key={button.key}>
                                        <Button
                                            key={button.key}
                                            type={button.type}
                                            variant={button.variant}
                                            className={button.className}
                                        >{button.label}</Button>
                                    </DialogClose>
                                );
                            } else if (mode !== 'view') {
                                return (
                                    <Button
                                        key={button.key}
                                        type={button.type}
                                        variant={button.variant}
                                        className={button.className}
                                    >{button.label}</Button>
                                );
                            }
                        }
                        )}

                        {/* <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button> */}
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    )
}
