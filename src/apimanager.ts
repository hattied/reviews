import dummyBook from './dummy/book.json';
import dummySettings from '../settings.json';
import { IReview } from "./objects/review";

const useCachedResults = false;
const localApiDelay = 0;

export interface Settings {
  root: string;
  title: string;
  modules: Modules
}

export interface Modules {
  [name: string]: Module;
}

export interface Module {
  enabled: boolean;
  json: string;
  name?: string;
  route: string;
}

interface OpenLibraryBook {
  publish_date: string;
  isbn_10: string[];
  title: string;
  isbn_13: string[];
  publishers: string[];
}

interface ApiMethods {
  getSettings(): Promise<Settings>;
  getReviewData(endpoint: string): Promise<IReview[]>;
}

class ApiManager implements ApiMethods {

  getSettings = async(): Promise<Settings> => {
    return await this.getJsonFile('./settings.json', dummySettings);
  };

  async getReviewData(endpoint: string): Promise<IReview[]> {
    return await this.getJsonFile(endpoint);
  }

  getBookData = async(isbn: string) => {
    return await this.getJsonFromEndpoint(`https://openlibrary.org/isbn/${isbn}.json`, dummyBook) as OpenLibraryBook;
  };

  /*
   Backend Functions
   */
  private getJsonFile = (endpointUrl: string, cachedResult?: any): Promise<any> => {
    return new Promise((returnResponse, returnError) => {
      // check if we are needing local data
      if (useCachedResults) {
        setTimeout(() => {
          returnResponse(cachedResult);
        }, localApiDelay);
      } else {
        fetch(endpointUrl)
          .then((response: Response) => {
            if (response.status == 200) {
              returnResponse(response.json());
            }

            returnError({});
          })
          .catch(() => {
            returnError({});
          });
      }
    });
  };

  private getJsonFromEndpoint = (endpointUrl: string, cachedResult: any): Promise<any> => {
    return new Promise(returnResponse => {
      // check if we are needing local data
      if (useCachedResults) {
        setTimeout(() => {
          returnResponse(cachedResult);
        }, localApiDelay);
      } else {
        // get data from api
        this.getResponseFromApi(endpointUrl)
          .then(apiResponse => returnResponse(apiResponse));
      }
    })
  };

  private getResponseFromApi = (endpointUrl: string): Promise<any> => {

    return fetch(endpointUrl)
      .then((response) => {

        if (response.status === 200) {
          return response.json();
        } else {
          return {}
        }

      })
      .catch((response) => {

        return {
          status: 'error',
          data: response,
          message: `Fetch error. Data contains entire response.`,
        }

      });
  };
}

export let apiManager = new ApiManager();
