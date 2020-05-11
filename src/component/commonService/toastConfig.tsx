import { toast } from 'react-toastify';
const globalOption = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
    draggable: false,
}
export default {
    success(msg: any, options: any  = {}) {
        return toast.success(msg, {
            // Merge additionals options
            ...options,
            ...globalOption
        });
    },
    error(msg: any, options: any = {}) {
        return toast.error(msg, {
            ...options,
            ...globalOption
        });
    },
    warn(msg: string, options: any  = {}) {
        return toast.error(msg, {
            ...options,
            ...globalOption
        });
    },
    info(msg: string, options: any  = {}) {
        return toast.error(msg, {
            ...options,
            ...globalOption
        });
    }
}