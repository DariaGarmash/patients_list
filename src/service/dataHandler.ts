type TFetchMethod = "GET" | "PUT" | "POST" | "DELETE";
type THeaders = Record<string, string>

type TFetchConfig<TMethod extends TFetchMethod, TBody = undefined> = {
    method: TMethod;
    body?: TBody;
    headers?: THeaders;
};

type TFetchConfigGet = Omit<TFetchConfig<"GET">, 'body'>

type TFetchConfigPost<TBody> = TFetchConfig<"POST", TBody> & {
    body: TBody;
}

type TFetchConfigDelete = TFetchConfig<"DELETE"> & {
    id: string;
}

type TFetchConfigPut<TBody> = TFetchConfig<"PUT", TBody> & {
    id: TFetchConfigDelete['id'];
    body: Partial<TFetchConfigPost<TBody>['body']>;
};

type TFetchConfigGeneric<TBody = undefined> = TFetchConfigGet | TFetchConfigPost<TBody> | TFetchConfigDelete | TFetchConfigPut<TBody>;

class DataHandler {
    private apiBaseUrl = '/api/v1/'

    private fetch = async <T, K>(endpoint: string, config: TFetchConfigGeneric<T>): Promise<K> => {
        try {

            const body = this.isConfigPut(config) || this.isConfigPost(config) ? JSON.stringify(config.body) : undefined;

            const defaultHeaders = {
                'Content-Type': 'application/json',
            }

            const fetchConfig = ({
                method: config.method,
                headers: {
                    ...defaultHeaders,
                    ...(config.headers && { ...config.headers })
                },
                body
            });

            const id = this.isConfigPut(config) || this.isConfigDelete(config) ? config.id : undefined;
            const url = `${this.apiBaseUrl}${endpoint}${id ? `/${id}` : ''}`;

            const res = await fetch(url, fetchConfig)
            if (!res.ok) {
                throw Error("Error sending request")
            }

            const data = await res.json();
            return data as K;

        } catch (e: unknown) {
            throw Error("Error sending request")
        }
    }

    private isConfigPut<TBody>(config: TFetchConfigGeneric<TBody>): config is TFetchConfigPut<TBody> {
        return (config as TFetchConfigPut<TBody>).method === 'PUT';
    }

    private isConfigPost<TBody>(config: TFetchConfigGeneric<TBody>): config is TFetchConfigPost<TBody> {
        return (config as TFetchConfigPost<TBody>).method === 'POST';
    }

    private isConfigDelete<TBody>(config: TFetchConfigGeneric<TBody>): config is TFetchConfigDelete {
        return (config as TFetchConfigDelete).method === 'DELETE';
    }

    public get = async <T,>(url: string, headers?: THeaders) => {
        return this.fetch<T, T>(url, { method: "GET", headers })
    }

    public put = async <T, K>(url: string, id: string, body: T, headers?: THeaders) => {
        return this.fetch<T, K>(url, { method: "PUT", headers, id, body })
    }

    public post = async <T, K>(url: string, body: T, headers?: THeaders) => {
        return this.fetch<T, K>(url, { method: 'POST', headers, body })
    }
}

export const dataHandler = new DataHandler();
