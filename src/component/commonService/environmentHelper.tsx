declare global {
    interface Window {
        env: any;
    }
}

export function getEnvironmentValue(value: string): string {
    let result = window.env[value] || process.env[value];
    if(!result) {
        throw new Error(`Cannot resolve this environment: ${value}`);
    } else {
        return result;
    }
}