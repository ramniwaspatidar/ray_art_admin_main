import toast, { ToastOptions, Renderable, ValueFunction } from 'react-hot-toast';

const defaultOptions: ToastOptions = {
  duration: 4000,
  position: 'top-center',
  style: {
    background: '#363636',
    color: '#fff',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: '500',
  },
};

const successOptions: ToastOptions = {
  ...defaultOptions,
  style: {
    ...defaultOptions.style,
    background: '#10b981',
    color: '#fff',
  },
  iconTheme: {
    primary: '#fff',
    secondary: '#10b981',
  },
};

const errorOptions: ToastOptions = {
  ...defaultOptions,
  style: {
    ...defaultOptions.style,
    background: '#ef4444',
    color: '#fff',
  },
  iconTheme: {
    primary: '#fff',
    secondary: '#ef4444',
  },
};

const warningOptions: ToastOptions = {
  ...defaultOptions,
  style: {
    ...defaultOptions.style,
    background: '#f59e0b',
    color: '#fff',
  },
  iconTheme: {
    primary: '#fff',
    secondary: '#f59e0b',
  },
};

const infoOptions: ToastOptions = {
  ...defaultOptions,
  style: {
    ...defaultOptions.style,
    background: '#3b82f6',
    color: '#fff',
  },
  iconTheme: {
    primary: '#fff',
    secondary: '#3b82f6',
  },
};

export const toastService = {
  success: (message: Renderable, options?: ToastOptions) => {
    return toast.success(message, { ...successOptions, ...options });
  },

  error: (message: Renderable, options?: ToastOptions) => {
    return toast.error(message, { ...errorOptions, ...options });
  },

  warning: (message: Renderable, options?: ToastOptions) => {
    return toast(message, { 
      ...warningOptions, 
      ...options,
      icon: '⚠️',
    });
  },

  info: (message: Renderable, options?: ToastOptions) => {
    return toast(message, { 
      ...infoOptions, 
      ...options,
      icon: 'ℹ️',
    });
  },

  loading: (message: Renderable, options?: ToastOptions) => {
    return toast.loading(message, { ...defaultOptions, ...options });
  },

  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: Renderable;
      success: ValueFunction<Renderable, T>;
      error: ValueFunction<Renderable, any>;
    },
    options?: ToastOptions
  ) => {
    return toast.promise(promise, messages, { ...defaultOptions, ...options });
  },

  custom: (message: Renderable, options?: ToastOptions) => {
    return toast(message, { ...defaultOptions, ...options });
  },

  dismiss: (toastId?: string) => {
    return toast.dismiss(toastId);
  },

  dismissAll: () => {
    return toast.dismiss();
  },

  remove: (toastId?: string) => {
    return toast.remove(toastId);
  },
};

export const {
  success,
  error,
  warning,
  info,
  loading,
  promise,
  custom,
  dismiss,
  dismissAll,
  remove,
} = toastService;

export default toastService;