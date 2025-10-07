import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function CustomToast() {
    return (
        <>
            <Toaster position="top-right" duration={3000} richColors />
        </>
    )
}
export { toast };
