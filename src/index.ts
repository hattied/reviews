import './style/main.styl';
import { Route, router } from "./router";
import { populateTemplate } from "./templatelib";

import * as root from "./templates/root.html";
import { apiManager, Modules, Module } from "./apimanager";
import { IReview } from "./objects/review";
import { Book, IBook } from "./objects/book";
import { IPlace, Place } from "./objects/place";

let header = document.getElementById("header") as HTMLLinkElement;
let nav = document.getElementById("nav") as HTMLElement;
let content = document.getElementById("content") as HTMLElement;

const initiateRouter = async() => {

  const addRemainingRoutes = async(modules: Modules) => {
    const enabledModules = Object.keys(modules)
      .filter((moduleName: string) => modules[moduleName].enabled)
      .map((moduleName: string) => {
        modules[moduleName]['name'] = moduleName;
        return modules[moduleName];
      });

    enabledModules.forEach((module: Module) => {

      const generator = async(): Promise<HTMLElement[]> => {
        const data: IReview[] = await apiManager.getReviewData(module.json);

        let reviews: IReview[];

        if (module.name === 'Books') {
          reviews = data.map((object) => new Book(object as IBook));
        }
        else if (module.name === 'Places') {
          reviews = data.map((object) => new Place(object as IPlace));
        }
        else {
          reviews = [];
        }

        const htmlElements = await Promise.all(reviews.map((review: IReview) => {
          return review.render();
        }));

        return ([] as HTMLElement[]).concat(...htmlElements);
      };

      router.addRoute({
        url: module.route,
        name: module.name,
        generator,
      } as Route);
    })
  };

  router.getOrCreate(header, nav, content);

  router.addRoute({
    url: '/',
    name: 'Home',
    generator: async () => await populateTemplate(root.toString(), {})
  } as Route);

  await addRemainingRoutes((await apiManager.getSettings()).modules);

  await router.generatePage();
  document.getElementById('body')!.className = "";
};

initiateRouter();

