import { InjectionToken } from "@angular/core";

export interface AppConfig {
    apiUrl: string;
    courseCacheSize: number;
}

export const App_Config: AppConfig = {
    apiUrl: 'http://localhost:9000',
    courseCacheSize: 10
}

export const Config_Token = new InjectionToken<AppConfig>('Config_Token',
    {
        providedIn: 'root',
        factory: () => App_Config
    }
);