export interface AppConfig {
  env: 'development' | 'production';
  app: {
    name: string;
    version: string;
    url: string;
    port: number;
  };
  airtable: {
    apiKey: string;
    baseId: string;
    tableName: string;
    jobsTable: string;
    companiesTable: string;
  };
  features: {
    enableAnalytics: boolean;
    enableErrorReporting: boolean;
    enableDebugMode: boolean;
    enableThemeSwitcher: boolean;
  };
  api: {
    timeout: number;
    retryAttempts: number;
  };
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    enableConsole: boolean;
  };
}

const getEnvVar = (key: string, fallback: string = ''): string => {
  if (typeof window !== 'undefined') {
    return process.env[key] || fallback;
  }
  return process.env[key] || fallback;
};

const getEnvBoolean = (key: string, fallback: boolean = false): boolean => {
  const value = getEnvVar(key);
  if (!value) return fallback;
  return value.toLowerCase() === 'true' || value === '1';
};

const getEnvNumber = (key: string, fallback: number = 0): number => {
  const value = getEnvVar(key);
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
};

const developmentConfig: AppConfig = {
  env: 'development',
  app: {
    name: 'The Foundery(Dev)',
    version: getEnvVar('npm_package_version', '1.0.0'),
    url: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
    port: getEnvNumber('PORT', 3000),
  },
  airtable: {
    apiKey: getEnvVar('AIRTABLE_API_KEY'),
    baseId: getEnvVar('AIRTABLE_BASE_ID'),
    tableName: getEnvVar('AIRTABLE_TABLE_NAME', 'Applications'),
    jobsTable: getEnvVar('AIRTABLE_JOBS_TABLE', 'Jobs'),
    companiesTable: getEnvVar('AIRTABLE_COMPANIES_TABLE', 'Companies'),
  },
  features: {
    enableAnalytics: getEnvBoolean('NEXT_PUBLIC_ENABLE_ANALYTICS', false),
    enableErrorReporting: getEnvBoolean('NEXT_PUBLIC_ENABLE_ERROR_REPORTING', false),
    enableDebugMode: getEnvBoolean('NEXT_PUBLIC_ENABLE_DEBUG', true),
    enableThemeSwitcher: getEnvBoolean('NEXT_PUBLIC_ENABLE_THEME_SWITCHER', true),
  },
  api: {
    timeout: getEnvNumber('NEXT_PUBLIC_API_TIMEOUT', 10000),
    retryAttempts: getEnvNumber('NEXT_PUBLIC_API_RETRY_ATTEMPTS', 3),
  },
  logging: {
    level: (getEnvVar('NEXT_PUBLIC_LOG_LEVEL', 'debug') as AppConfig['logging']['level']),
    enableConsole: getEnvBoolean('NEXT_PUBLIC_ENABLE_CONSOLE_LOGS', true),
  },
};

const productionConfig: AppConfig = {
  env: 'production',
  app: {
    name: 'The Foundery',
    version: getEnvVar('npm_package_version', '1.0.0'),
    url: getEnvVar('NEXT_PUBLIC_APP_URL', 'https://app.thefoundery.in'),
    port: getEnvNumber('PORT', 3000),
  },
  airtable: {
    apiKey: getEnvVar('AIRTABLE_API_KEY'),
    baseId: getEnvVar('AIRTABLE_BASE_ID'),
    tableName: getEnvVar('AIRTABLE_TABLE_NAME', 'Applications'),
    jobsTable: getEnvVar('AIRTABLE_JOBS_TABLE', 'Jobs'),
    companiesTable: getEnvVar('AIRTABLE_COMPANIES_TABLE', 'Companies'),
  },
  features: {
    enableAnalytics: getEnvBoolean('NEXT_PUBLIC_ENABLE_ANALYTICS', true),
    enableErrorReporting: getEnvBoolean('NEXT_PUBLIC_ENABLE_ERROR_REPORTING', true),
    enableDebugMode: getEnvBoolean('NEXT_PUBLIC_ENABLE_DEBUG', false),
    enableThemeSwitcher: getEnvBoolean('NEXT_PUBLIC_ENABLE_THEME_SWITCHER', true),
  },
  api: {
    timeout: getEnvNumber('NEXT_PUBLIC_API_TIMEOUT', 20000),
    retryAttempts: getEnvNumber('NEXT_PUBLIC_API_RETRY_ATTEMPTS', 1),
  },
  logging: {
    level: (getEnvVar('NEXT_PUBLIC_LOG_LEVEL', 'error') as AppConfig['logging']['level']),
    enableConsole: getEnvBoolean('NEXT_PUBLIC_ENABLE_CONSOLE_LOGS', false),
  },
};

const getCurrentEnvironment = (): AppConfig['env'] => {
  const nodeEnv = getEnvVar('NODE_ENV', 'development');
  const customEnv = getEnvVar('NEXT_PUBLIC_ENVIRONMENT');
  
  if (customEnv) {
    return customEnv as AppConfig['env'];
  }
  
  switch (nodeEnv) {
    case 'production':
      return 'production';
    default:
      return 'development';
  }
};

const getConfig = (): AppConfig => {
  const env = getCurrentEnvironment();
  
  switch (env) {
    case 'production':
      return productionConfig;
    default:
      return developmentConfig;
  }
};

export const config = getConfig();

export const isDevelopment = () => config.env === 'development';
export const isProduction = () => config.env === 'production';

export const validateConfig = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!config.airtable.apiKey) {
    errors.push('AIRTABLE_API_KEY is required');
  }
  
  if (!config.airtable.baseId) {
    errors.push('AIRTABLE_BASE_ID is required');
  }
  
  if (!config.app.url) {
    errors.push('NEXT_PUBLIC_APP_URL is required for non-development environments');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const logger = {
  debug: (...args: any[]) => {
    if (config.logging.enableConsole && ['debug'].includes(config.logging.level)) {
      console.debug('[DEBUG]', ...args);
    }
  },
  info: (...args: any[]) => {
    if (config.logging.enableConsole && ['debug', 'info'].includes(config.logging.level)) {
      console.info('[INFO]', ...args);
    }
  },
  warn: (...args: any[]) => {
    if (config.logging.enableConsole && ['debug', 'info', 'warn'].includes(config.logging.level)) {
      console.warn('[WARN]', ...args);
    }
  },
  error: (...args: any[]) => {
    if (config.logging.enableConsole) {
      console.error('[ERROR]', ...args);
    }
  },
};

export default config;