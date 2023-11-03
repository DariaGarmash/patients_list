type TFetchMethod = "GET" | "PUT" | "POST" | "DELETE";

type TFetchConfig<TMethod extends TFetchMethod, TBody = undefined> = {
    method: TMethod;
    body?: TBody;
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

    private fetch = async <T>(endpoint: string, config: TFetchConfigGeneric<T>): Promise<T> => {
        try {
           
            const body = this.isConfigPut(config) || this.isConfigPost(config) ? JSON.stringify(config.body) : undefined;
            
            const fetchConfig = ({ 
                method: config.method, 
                headers: {
                    'Content-Type': 'application/json',
                },
                body
            });

            const id = this.isConfigPut(config) || this.isConfigDelete(config) ? config.id : undefined;
            const url = `${this.apiBaseUrl}${endpoint}${id ? `/${id}` : ''}`;

            const res = await fetch(url, fetchConfig)
            if(!res.ok){
                throw Error("Error sending request")
            }

            const data = await res.json();
            return data as T;
        
        }catch(e: unknown){
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
    
    public get = async <T>(url: string) => {
        return this.fetch<T>(url, {method: "GET"})
    }

    public put = async <T>(url: string, id: string, body: T) => {
        return this.fetch<T>(url, {method: "PUT", id, body})
    }

    public post = async <T>(url: string, body: T) => {
        return this.fetch<T>(url, {method: 'POST', body})
    }
}

export const dataHandler = new DataHandler();
