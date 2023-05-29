import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class axioxServices {
	
	private axiosInstance: AxiosInstance

	constructor() {
		this.axiosInstance = this.createAxios()
		this.axiosResInterceptor()
	}

	private createAxios() {
		return axios.create({
			baseURL: import.meta.env.VITE_MY_API_URL,
			headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
			params: {
        key: import.meta.env.VITE_MY_API_KEY
    }
		})
	}

	private axiosResInterceptor () {
		this.axiosInstance.interceptors.request.use((config) => {
			config.params['key'] = import.meta.env.VITE_MY_API_KEY
			console.log(config.params)
			return config
		}, (err) => {
			

			return Promise.reject(err)
		})
	}

	private async extractData<T>(request: Promise<AxiosResponse<T>>) {
    const { data } = await request
    return data
  }

	async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		return this.extractData(this.axiosInstance.request({ url, method: 'get', ...config }))
	}

}

function execute () {
	const axioxService = new axioxServices

	return () => axioxService
}

export const useAxiosService = execute()

